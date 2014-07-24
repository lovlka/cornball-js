var Card = require('models/card');

module.exports = Chaplin.Collection.extend({
   model: Card,

   initialize: function() {
      for (var suit = 1; suit <= 4; suit++) {
         for (var value = 1; value <= 13; value++) {
            this.add(new Card({
               suit: this._getSuit(suit),
               value: value
            }));
         }
      }
      Chaplin.Collection.prototype.initialize.call(this, arguments);
   },

   shuffle: function() {
      for (var index = this.length - 1; index >= 0; index--) {
         var random = Math.floor((Math.random() * index));
         this._swap(random, index);
      }
   },

   _swap: function(fromIndex, toIndex) {
      var temp = this.models[fromIndex];
      this.models[fromIndex] = this.models[toIndex];
      this.models[toIndex] = temp;
   },

   _getSuit: function(suit) {
      switch(suit) {
         case 1: return 'h';
         case 2: return 's';
         case 3: return 'd';
         case 4: return 'c';
      }
   }
});
