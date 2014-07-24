module.exports = Chaplin.View.extend({
   noWrap: true,
   autoRender: true,

   initialize: function() {
      this.template = require('views/nav/nav-item');
      Chaplin.View.prototype.initialize.call(this, arguments);
   },

   getTemplateFunction: function() {
      return this.template;
   },

   getTemplateData: function() {
      return this.model.attributes;
   }
});