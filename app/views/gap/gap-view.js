module.exports = Chaplin.View.extend({
   noWrap: true,
   autoRender: true,

   initialize: function() {
      this.template = require('views/gap/gap');
      Chaplin.View.prototype.initialize.call(this, arguments);

      this.listenTo(this.model, 'change:position', this.setPosition, this);
   },

   setPosition: function() {
      var index = this.model.collection.indexOf(this.model);
      var width = 72 + 10;//this.$el.outerWidth(true);
      var height = 97 + 10;//this.$el.outerHeight(true);
      var row = Math.floor(index / 13);
      var column = index - (row * 13);
      var positionY = row * height;
      var positionX = column * width;
      this.$el.css({ top: positionY + 'px', left: positionX + 'px' });
   },

   getTemplateFunction: function() {
      return this.template;
   },

   getTemplateData: function() {
      return this.model.attributes;
   },

   render: function() {
      Chaplin.View.prototype.render.call(this, arguments);
      this.setPosition();
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
      this.publishEvent('card:dropped', this.model);
      this.unhighlightGap(event);
   },

   tap: function(event) {
      this.publishEvent('card:find', this.model);
   }
});