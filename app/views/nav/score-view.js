module.exports = Chaplin.View.extend({
   autoRender: true,
   el: '#nav-score',

   initialize: function (options) {
      this.template = require('views/nav/score');
      Chaplin.View.prototype.initialize.call(this, arguments);
   },

   getTemplateFunction: function () {
      return this.template;
   },

   getTemplateData: function () {
      return this.model.attributes;
   }
});