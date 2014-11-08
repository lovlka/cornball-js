var NavController = require('controllers/nav-controller');
var CardCollection = require('collections/card-collection');
var DeckView = require('views/deck/deck-view');
var GameModel = require('models/game');

module.exports = Chaplin.Controller.extend({
   show: function (params) {
      this.model = new GameModel();
      this.nav = new NavController({ model: this.model });

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
      this.model = new GameModel();
      this.deck.shuffle();
      this.view.render();
   },

   undoMode: function() {
      console.log('undo the last move');
   },

   cardMoved: function() {
      console.log('a card was moved');
      this.model.set('moves', this.model.get('moves') + 1);
   }
});
