module.exports = Chaplin.View.extend({
   noWrap: true,
   autoRender: true,

   initialize: function() {
      this.template = require('views/nav/nav-item');
      Chaplin.View.prototype.initialize.call(this, arguments);
   },

   events: {
      'click a' : 'navigate'
   },

   navigate: function(event) {
      this.publishEvent('navigate', this.model.get('action'));
      event.stopPropagation();
      event.preventDefault();
   },

   getTemplateFunction: function() {
      return this.template;
   },

   getTemplateData: function() {
      return this.model.attributes;
   }
});