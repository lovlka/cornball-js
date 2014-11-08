module.exports = Chaplin.View.extend({
   noWrap: true,
   autoRender: true,

   initialize: function() {
      this.template = require('views/card/card');
      Chaplin.View.prototype.initialize.call(this, arguments);
   },

   getTemplateFunction: function() {
      return this.template;
   },

   getTemplateData: function() {
      return this.model.attributes;
   },

   render: function() {
      Chaplin.View.prototype.render.call(this, arguments);
      var view = this;
      this.$el.draggable({
         revert: true,
         stop: function() {
            view.publishEvent('card:move', view);
         }
      });
   }
});