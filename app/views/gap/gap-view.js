module.exports = Chaplin.View.extend({
   noWrap: true,
   autoRender: true,

   initialize: function() {
      this.template = require('views/gap/gap');
      Chaplin.View.prototype.initialize.call(this, arguments);
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
      });
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
   }
});