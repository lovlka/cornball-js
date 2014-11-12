module.exports = Chaplin.View.extend({
   x: 0,
   y: 0,
   noWrap: true,
   autoRender: true,

   initialize: function() {
      this.template = require('views/card/card');
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
      var view = this;

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