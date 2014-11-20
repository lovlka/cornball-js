module.exports = Chaplin.View.extend({
   noWrap: true,
   autoRender: true,

   initialize: function() {
      this.template = require('views/gap/gap');
      Chaplin.View.prototype.initialize.call(this, arguments);

      this.listenTo(this.model, 'change:positionY', this.setPositionY, this);
      this.listenTo(this.model, 'change:positionX', this.setPositionX, this);
   },

   setPositionY: function() {
      this.$el.css({ top: this.model.get('positionY') + 'px' });
   },

   setPositionX: function() {
      this.$el.css({ left: this.model.get('positionX') + 'px' });
   },

   getTemplateFunction: function() {
      return this.template;
   },

   getTemplateData: function() {
      return this.model.attributes;
   },

   render: function() {
      Chaplin.View.prototype.render.call(this, arguments);
      this.initDrop();
   },

   initDrop: function() {
      interact(this.el).dropzone({
         overlap: 0.1,
         dragenter: _.bind(this.highlightGap, this),
         dragleave: _.bind(this.unhighlightGap, this),
         drop: _.bind(this.cardDrop, this)
      })
      .on('tap', _.bind(this.tap, this));
   },

   highlightGap: function(event) {
      this.$el.addClass('highlight');
   },

   unhighlightGap: function(event) {
      this.$el.removeClass('highlight');
   },

   cardDrop: function(event) {
      console.log('dropped in a drag zone!');
      this.unhighlightGap(event);
   },

   tap: function(event) {
      this.publishEvent('card:findGap', this.model);
   }
});