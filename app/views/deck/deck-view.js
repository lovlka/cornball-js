var CardView = require('views/card/card-view');
var GapView = require('views/gap/gap-view');

module.exports = Chaplin.CollectionView.extend({
   noWrap: true,
   autoRender: true,
   container: '#main-region',
   animationDuration: 0,

   initialize: function() {
      this.template = require('views/deck/deck');
      Chaplin.CollectionView.prototype.initialize.call(this, arguments);
   },

   initItemView: function(model) {
      if(model.get('value') === 1) {
         return new GapView({model: model});
      }
      return new CardView({model: model});
   },

   getTemplateFunction: function() {
      return this.template;
   },

   getTemplateData: function() {
      return this.model.attributes;
   }
});