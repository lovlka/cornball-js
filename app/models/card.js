module.exports = Chaplin.Model.extend({
   defaults: {
      roundPlaced: 0
   },

   initialize: function () {
      Chaplin.Model.prototype.initialize.call(this, arguments);
   }
});