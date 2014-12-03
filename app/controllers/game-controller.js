var NavController = require('controllers/nav-controller');
var CardCollection = require('collections/card-collection');
var DeckView = require('views/deck/deck-view');
var GameOverView = require('views/gameover/gameover-view');
var GameWinView = require('views/gamewin/gamewin-view');
var Statistics = require('models/statistics');
var GameModel = require('models/game');
var Move = require('models/move');

module.exports = Chaplin.Controller.extend({
   show: function (params) {
      this.model = new GameModel();
      this.deck = new CardCollection();

      this.nav = new NavController({ model: this.model });

      this.view = new DeckView({
         model: this.model,
         collection: this.deck
      });

      this.subscribeEvent('game:new', _.bind(this.newGame, this));
      this.subscribeEvent('game:undo', _.bind(this.undoMove, this));
      this.subscribeEvent('card:dragged', _.bind(this.cardDragged, this));
      this.subscribeEvent('card:dropped', _.bind(this.cardDropped, this));
      this.subscribeEvent('card:find', _.bind(this.findCard, this));
      this.subscribeEvent('card:move', _.bind(this.findGap, this));

      this.newGame();
   },

   newGame: function() {
      this.increaseStatistics('gamesStarted');
      this.model.set(this.model.defaults);
      this.lastMove = null;
      this.deck.shuffle();
      this.checkState();
   },

   newRound: function() {
      this.model.set('round', this.model.get('round') + 1);
      this.lastMove = null;
      this.deck.reShuffle();
      this.checkState();
   },

   undoMove: function() {
      if(_.isObject(this.lastMove)) {
         this.moveCard(new Move({
            from: this.lastMove.get('to'),
            to: this.lastMove.get('from')
         }));
      }
   },

   cardDragged: function(card) {
      this.card = card;
   },

   cardDropped: function(gap) {
      if(this.isCorrectGap(gap, this.card)) {
         this.moveCard(new Move({
            from: this.card,
            to: gap
         }));
      }
   },

   moveCard: function(move) {
      this.deck.swap(move.get('from'), move.get('to'));
      this.lastMove = move;

      this.model.set('moves', this.model.get('moves') + 1);
      this.checkState();
   },

   findCard: function(gap) {
      _.each(this.deck.models, function(card) {
         if(this.isCorrectGap(gap, card)) {
            card.trigger('flash:hint');
         }
      }, this);
   },

   findGap: function(card) {
      var foundGap = null;
      _.each(this.deck.models, function(gap) {
         if(this.isCorrectGap(gap, card)) {
            foundGap = gap;
         }
      }, this);

      if(foundGap !== null) {
         this.moveCard(new Move({
            from: card,
            to: foundGap
         }));
      }
      else {
         card.trigger('flash:error');
      }
   },

   isCorrectGap: function(gap, card) {
      var index = this.deck.models.indexOf(gap);
      var previous = index > 0 ? this.deck.models[index - 1] : null;

      var isGapFirstInRow = index % 13 === 0;
      var isCardValueTwo = card.get('value') === 2;
      var isSuitMatch = previous !== null && card.get('suit') == previous.get('suit');
      var isValueMatch = previous !== null && card.get('value') == previous.get('value') + 1;

      if(gap.get('value') === 1) {
         if(isGapFirstInRow && isCardValueTwo) {
            return true;
         }
         else if(!isGapFirstInRow && !isCardValueTwo && isSuitMatch && isValueMatch) {
            return true
         }
      }
      return false;
   },

   checkState: function() {
      this.checkAllCards();

      if(this.model.get('locked') === 4) {
         if(this.deck.length - this.model.get('locked') === this.model.get('placed')) {
            this.gameWinView = new GameWinView({
               model: this.model
            });
         }
         else if(this.model.get('round') < this.model.get('rounds')) {
            this.gameOverView = new GameOverView({
               model: this.model,
               closed: _.bind(this.newRound, this)
            });
         }
         else {
            this.gameOverView = new GameOverView({
               model: this.model
            });
         }
      }
   },

   checkAllCards: function() {
      var score = 0;
      var locked = 0;
      var placed = 0;
      var suit = null;

      _.each(this.deck.models, function(card) {
         var index = this.deck.models.indexOf(card);
         var previous = index > 0 ? this.deck.models[index - 1] : null;
         var isFirstInRow = index % 13 === 0;

         suit = this.checkRoundPlaced(suit, index, card);
         if(card.has('roundPlaced')) {
            placed++;
         }
         if(!isFirstInRow && this.isLockedGap(card, previous)) {
            locked++;
         }
         score += this.getCardScore(card);
      }, this);

      score -= (this.model.get('round') - 1) * 100;
      score -= this.model.get('moves') * 5;

      this.model.set('placed', placed);
      this.model.set('locked', locked);
      this.model.set('score', score);
   },

   checkRoundPlaced: function(suit, index, card) {
      var isFirstInRow = index % 13 === 0;

      if (isFirstInRow && card.get('value') === 2) {
         this.setRoundPlaced(card);
         return card.get('suit');
      }
      else if (!isFirstInRow && card.get('value') !== 2 && card.get('suit') == suit && card.get('value') === ((index % 13) + 2)) {
         this.setRoundPlaced(card);
         return card.get('suit');
      }
      else {
         card.unset('roundPlaced');
         return null;
      }
   },

   setRoundPlaced: function(card) {
      if (!card.has('roundPlaced')) {
         card.set('roundPlaced', this.model.get('round'));
      }
   },

   getCardScore: function(card) {
      var value = card.get('value');
      var rounds = this.model.get('rounds');
      var roundPlaced = card.get('roundPlaced') || 0;

      if (roundPlaced > 0) {
         if (value === 13) {
            return (rounds - roundPlaced + 1) * 60;
         }
         else if (value >= 10) {
            return (rounds - roundPlaced + 1) * 40;
         }
         else {
            return (rounds - roundPlaced + 1) * 20;
         }
      }
      return 0;
   },

   isLockedGap: function(card, previous) {
      return card.get('value') === 1 && (previous.get('value') === 1 || previous.get('value') === 13);
   },

   increaseStatistics: function(property) {
      var statistics = new Statistics({
         name: property
      });
      statistics.save();
   }
});
