var BaseView = require('views/card/base-view');

module.exports = BaseView.extend({
   initialize: function() {
      this.template = require('views/card/gap');
      BaseView.prototype.initialize.call(this, arguments);
   },

   render: function() {
      BaseView.prototype.render.call(this, arguments);
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