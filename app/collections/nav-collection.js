var Nav = require('models/nav');

module.exports = Chaplin.Collection.extend({
   model: Nav,

   initialize: function() {
      this.add(new Nav({ action: 'reshuffle', value: 'Blanda om' }));

      Chaplin.Collection.prototype.initialize.call(this, arguments);
   }
});
