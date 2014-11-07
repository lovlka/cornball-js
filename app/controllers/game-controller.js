var CardCollection = require('collections/card-collection');
var DeckView = require('views/deck/deck-view');

module.exports = Chaplin.Controller.extend({
   show: function (params) {
      this.model = new Chaplin.Model({});

      this.deck = new CardCollection();
      this.deck.shuffle();

      this.view = new DeckView({
         model: this.model,
         collection: this.deck
      });

      this.subscribeEvent('game:new', _.bind(this.newGame, this));
      this.subscribeEvent('game:undo', _.bind(this.undoMode, this));
      this.subscribeEvent('card:move', _.bind(this.cardMoved, this));
   },

   newGame: function() {
      console.log('start a new game');
      this.deck.shuffle();
      this.view.render();
   },

   undoMode: function(schedule) {
      console.log('undo the last move');
   },

   cardMoved: function(schedule) {
      console.log('a card was moved');
   }
});
