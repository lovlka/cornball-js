module.exports = Chaplin.View.extend({
   x: 0,
   y: 0,
   noWrap: true,
   autoRender: true,

   initialize: function() {
      this.template = require('views/card/card');
      Chaplin.View.prototype.initialize.call(this, arguments);

      this.listenTo(this.model, 'change', this.propertyChanged, this);
   },

   getTemplateFunction: function() {
      return this.template;
   },

   getTemplateData: function() {
      return this.model.attributes;
   },

   propertyChanged: function() {
     this.$el.toggleClass('placed', this.model.has('roundPlaced'));
   },

   render: function() {
      Chaplin.View.prototype.render.call(this, arguments);
      this.initDrag();
   },

   initDrag: function() {
      interact(this.el)
         .draggable({
            onmove: _.bind(this.dragMove, this),
            onend: _.bind(this.dragEnd, this)
         });
   },

   dragMove: function(event) {
      this.x += event.dx;
      this.y += event.dy;
      this.setPosition(event);
   },

   dragEnd: function(event) {
      this.dragReset(event);
      this.publishEvent('card:move', this);
   },

   dragReset: function(event) {
      this.x = 0;
      this.y = 0;
      this.setPosition(event);
   },

   setPosition: function(event) {
      event.target.style.webkitTransform = event.target.style.transform = 'translate(' + this.x + 'px, ' + this.y + 'px)';
   }
});