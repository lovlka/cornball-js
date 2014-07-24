var Nav = require('models/nav');

module.exports = Chaplin.Collection.extend({
   model: Nav,

   initialize: function() {
      Chaplin.Collection.prototype.initialize.call(this, arguments);
   }
});
