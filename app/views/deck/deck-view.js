var CardView = require('views/card/card-view');
var GapView = require('views/gap/gap-view');

module.exports = Chaplin.CollectionView.extend({
   noWrap: true,
   autoRender: true,
   container: '#main-region',
   containerMethod: 'html',
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

   setPositions: function() {
      var views = this.getItemViews();
      var firstView = _.values(views)[0];
      var width = firstView.$el.outerWidth(true);
      var height = firstView.$el.outerHeight(true);

      console.log('set positions using...', height, width);

      for (var row = 1; row <= 4; row++) {
         for (var column = 1; column <= 13; column++) {
            var card = this.collection.models[((row - 1) * 13) + column - 1];

            var x = (column - 1) * width;
            var y = (row - 1) * height;

            card.set('positionX', x);
            card.set('positionY', y);
         }
      }
   },

   render: function() {
      Chaplin.CollectionView.prototype.render.call(this, arguments);
      setTimeout(_.bind(this.setPositions, this), 500);
   },

   getTemplateFunction: function() {
      return this.template;
   },

   getTemplateData: function() {
      return this.model.attributes;
   }
});