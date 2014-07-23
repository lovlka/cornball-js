var Card = require('models/card');

module.exports = Chaplin.Collection.extend({
   model: Card,

   initialize: function() {
      for (var suit = 1; suit <= 4; suit++) {
         for (var value = 1; value <= 13; value++) {
            this.add(new Card({
               suit: this.getSuit(suit),
               value: value
            }));
         }
      }
      Chaplin.Collection.prototype.initialize.call(this, arguments);
   },

   getSuit: function(suit) {
      switch(suit) {
         case 1: return 'h';
         case 2: return 's';
         case 3: return 'd';
         case 4: return 'c';
      }
   }
});
