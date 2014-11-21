var NavController = require('controllers/nav-controller');
var CardCollection = require('collections/card-collection');
var DeckView = require('views/deck/deck-view');
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
      this.subscribeEvent('card:move', _.bind(this.cardMoved, this));
      this.subscribeEvent('hint:find', _.bind(this.findCard, this));

      this.newGame();
   },

   newGame: function() {
      this.model.set(this.model.defaults);
      this.deck.shuffle();
      this.checkState();
   },

   undoMove: function() {
      if(this.lastMove === undefined) {
         return;
      }
      var move = new Move({
         from: this.lastMove.get('to'),
         to: this.lastMove.get('from')
      });
      this.cardMoved(move);
   },

   cardMoved: function(move) {
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
            console.log('round over!');
            this.model.set('round', this.model.get('round') + 1);
            this.deck.reShuffle();
         }
         else {
            console.log('game over!');
         }
      }
   },

   findCard: function(gap) {
      var index = this.deck.models.indexOf(gap);
      var previous = index > 0 ? this.deck.models[index - 1] : null;

      _.each(this.deck.models, function(card) {
         if(index % 13 === 0 && card.get('value') === 2) {
            card.trigger('hint:flash');
         }
         else if(index % 13 !== 0 && previous !== null && card.get('suit') == previous.get('suit') && card.get('value') == previous.get('value') + 1) {
            card.trigger('hint:flash');
         }
      }, this);
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
      console.log('card placed in round ' + this.model.get('round') + ': ' + card.get('suit') + card.get('value'));
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
