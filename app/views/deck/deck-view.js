var CardView = require('views/card/card-view');

module.exports = Chaplin.CollectionView.extend({
   noWrap: true,
   autoRender: true,
   itemView: CardView,
   listSelector: '#cards',
   container: '#main-region',

   initialize: function() {
      this.template = require('views/deck/deck');
      Chaplin.CollectionView.prototype.initialize.call(this, arguments);
   },

   getTemplateFunction: function() {
      return this.template;
   },

   getTemplateData: function() {
      return this.model.attributes;
   }
});