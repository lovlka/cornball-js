var BaseView = require('views/card/base-view');
var Move = require('models/move');

module.exports = BaseView.extend({
   dragX: 0,
   dragY: 0,

   initialize: function() {
      this.template = require('views/card/card');
      BaseView.prototype.initialize.call(this, arguments);

      this.listenTo(this.model, 'change:roundPlaced', this.setRoundPlaced, this);
      this.listenTo(this.model, 'flash:error', this.flashError, this);
      this.listenTo(this.model, 'flash:hint', this.flashHint, this);
   },

   setRoundPlaced: function() {
      this.$el.toggleClass('placed', this.model.has('roundPlaced'));
   },

   render: function() {
      BaseView.prototype.render.call(this, arguments);
      this.initDrag();
   },

   initDrag: function() {
      interact(this.el)
         .draggable({
            onstart: _.bind(this.dragStart, this),
            onmove: _.bind(this.dragMove, this),
            onend: _.bind(this.dragEnd, this)
         })
         .on('doubletap', _.bind(this.doubleTap, this));
   },

   dragStart: function(event) {
      this.publishEvent('card:dragged', this.model);
      this.$el.css('z-index', 10);
   },

   dragMove: function(event) {
      this.dragX += event.dx;
      this.dragY += event.dy;
      this.setDragPosition(event);
   },

   dragEnd: function(event) {
      if(event.dropzone === undefined) {
         this.publishEvent('card:dragged', null);
      }
      this.dragReset(event);
   },

   dragReset: function(event) {
      this.dragX = 0;
      this.dragY = 0;
      this.setDragPosition(event);
      this.$el.css('z-index', 1);
   },

   setDragPosition: function(event) {
      event.target.style.webkitTransform = event.target.style.transform = 'translate(' + this.dragX + 'px, ' + this.dragY + 'px)';
   },

   doubleTap: function() {
      this.publishEvent('card:move', this.model);
   },

   flashError: function() {
      var element = this.$el;
      setTimeout(function() { element.addClass('error'); }, 0);
      setTimeout(function() { element.removeClass('error'); }, 100);
      setTimeout(function() { element.addClass('error'); }, 200);
      setTimeout(function() { element.removeClass('error'); }, 300);
   },

   flashHint: function() {
      var element = this.$el;
      setTimeout(function() { element.addClass('hint'); }, 0);
      setTimeout(function() { element.removeClass('hint'); }, 100);
      setTimeout(function() { element.addClass('hint'); }, 200);
      setTimeout(function() { element.removeClass('hint'); }, 1000);
   }
});