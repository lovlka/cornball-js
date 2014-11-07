module.exports = Chaplin.View.extend({
   noWrap: true,
   autoRender: true,
   container: 'body',
   containerMethod: 'append',

   initialize: function (options) {
      this.template = require('views/about/about');
      Chaplin.View.prototype.initialize.call(this, arguments);
   },

   getTemplateFunction: function() {
      return this.template;
   },

   getTemplateData: function () {
      return this.model.attributes;
   },

   render: function() {
      Chaplin.View.prototype.render.call(this, arguments);
      this.delegate('hidden.bs.modal', this.dispose);
      this.$el.modal('show');
   }
});