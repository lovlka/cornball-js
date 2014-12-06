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
      this._triggerChange();
   },

   reShuffle: function() {
      var index;
      var shuffle = [];
      for (index = 0; index < this.length; index++) {
         if (!this.models[index].has('roundPlaced')) {
            shuffle.push(index);
         }
      }
      for (index = shuffle.length - 1; index >= 0; index--) {
         var random = Math.floor((Math.random() * index));
         this._swap(shuffle[random], shuffle[index]);
      }
      this._triggerChange();
   },

   swap: function(from, to) {
      var fromIndex = this.models.indexOf(from);
      var toIndex = this.models.indexOf(to);
      this._swap(fromIndex, toIndex);

      from.trigger('change:position');
      to.trigger('change:position');
   },

   _triggerChange: function() {
      _.each(this.models, function(model) {
         model.trigger('change:position');
      });
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
