var Card = require('models/card');
var CardCollection = require('collections/card-collection');
var DeckView = require('views/deck/deck-view');

module.exports = Chaplin.Controller.extend({
   show: function (params) {
      this.model = new Chaplin.Model({});
      this.deck = new CardCollection();
      this.view = new DeckView({
         model: this.model,
         collection: this.deck
      });

      this.subscribeEvent('card:move', _.bind(this.moved, this));
   },

   moved: function(schedule) {
   }
});
