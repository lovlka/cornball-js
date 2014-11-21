var NavController = require('controllers/nav-controller');
var CardCollection = require('collections/card-collection');
var DeckView = require('views/deck/deck-view');
var GameOverView = require('views/gameover/gameover-view');
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
      this.model.set(this.model.defaults);
      this.deck.shuffle();
      this.checkState();
   },

   newRound: function() {
      this.model.set('round', this.model.get('round') + 1);
      this.deck.reShuffle();
      this.checkState();
   },

   undoMove: function() {
      if(this.lastMove === undefined) {
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

   checkState: function() {
      this.checkPlacedCards();
      this.model.set('score', this.getScore());

      var locked = this.getLockedGaps();
      if(locked === 4) {
         if(this.model.get('round') < this.model.get('rounds')) {
            this.gameOverView = new GameOverView({
               model: this.model,
               closed: _.bind(this.newRound, this)
            });
         }
         else {
            console.log('game over!');
         }
      }
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

   getLockedGaps: function() {
      var locked = 0;
      _.each(this.deck.models, function(card) {
        if(card.get('value') === 1) {
           var index = this.deck.models.indexOf(card);
           if(index % 13 !== 0) {
              var previous = this.deck.models[index - 1].get('value');
              if(previous === 13 || previous === 1) {
                 locked++;
              }
           }
        }
      }, this);
      return locked;
   },

   checkPlacedCards: function() {
      var suit = null;
      for (var i = 0; i < this.deck.length; i++) {
         var card = this.deck.models[i];
         if (i % 13 === 0) {
            if (card.get('value') === 2) {
               this.setRoundPlaced(card);
               suit = card.get('suit');
            }
         }
         else if (card.get('suit') == suit && card.get('value') === ((i % 13) + 2)) {
            this.setRoundPlaced(card);
         }
         else {
            card.unset('roundPlaced');
            suit = null;
         }
      }
   },

   setRoundPlaced: function(card) {
      if (!card.has('roundPlaced')) {
         card.set('roundPlaced', this.model.get('round'));
      }
   },

   getScore: function() {
      var score = 0;
      var rounds = this.model.get('rounds');

      _.each(this.deck.models, function(card) {
         var value = card.get('value');
         var roundPlaced = card.get('roundPlaced') || 0;

         if (roundPlaced > 0) {
            if (value === 13) {
               score += (rounds - roundPlaced + 1) * 60;
            }
            if (value >= 10) {
               score += (rounds - roundPlaced + 1) * 40;
            }
            else {
               score += (rounds - roundPlaced + 1) * 20;
            }
         }
      });

      score -= (this.model.get('round') - 1) * 100;
      score -= this.model.get('moves') * 5;
      return score;
   }
});
