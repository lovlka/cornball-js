var NavItemView = require('views/nav/nav-item-view');

module.exports = Chaplin.CollectionView.extend({
   noWrap: true,
   autoRender: true,
   itemView: NavItemView,
   listSelector: '#nav-list',
   container: '#nav-region',
   animationDuration: 0,

   initialize: function () {
      this.template = require('views/nav/nav');
      Chaplin.CollectionView.prototype.initialize.call(this, arguments);
   },

   getTemplateFunction: function () {
      return this.template;
   },

   getTemplateData: function () {
      return this.model.attributes;
   }
});