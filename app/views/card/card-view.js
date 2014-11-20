var Move = require('models/move');

module.exports = Chaplin.View.extend({
   dragX: 0,
   dragY: 0,
   noWrap: true,
   autoRender: true,

   initialize: function() {
      this.template = require('views/card/card');
      Chaplin.View.prototype.initialize.call(this, arguments);

      this.listenTo(this.model, 'change:roundPlaced', this.setRoundPlaced, this);
      this.listenTo(this.model, 'change:positionY', this.setPositionY, this);
      this.listenTo(this.model, 'change:positionX', this.setPositionX, this);
   },

   getTemplateFunction: function() {
      return this.template;
   },

   getTemplateData: function() {
      return this.model.attributes;
   },

   setRoundPlaced: function() {
      this.$el.toggleClass('placed', this.model.has('roundPlaced'));
   },

   setPositionY: function() {
      this.$el.css({ top: this.model.get('positionY') + 'px' });
   },

   setPositionX: function() {
      this.$el.css({ left: this.model.get('positionX') + 'px' });
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
         })
         .on('doubletap', _.bind(this.doubleTap, this));
   },

   dragMove: function(event) {
      this.dragX += event.dx;
      this.dragY += event.dy;
      this.setPosition(event);
   },

   dragEnd: function(event) {
      if(event.dropzone !== undefined) {
         var gap = this.findGap();

         if(gap !== null) {
            this.publishEvent('card:move', new Move({
               from: this.model,
               to: gap
            }));
         }
      }
      this.dragReset(event);
   },

   dragReset: function(event) {
      this.dragX = 0;
      this.dragY = 0;
      this.setPosition(event);
   },

   setPosition: function(event) {
      event.target.style.webkitTransform = event.target.style.transform = 'translate(' + this.dragX + 'px, ' + this.dragY + 'px)';
   },

   doubleTap: function() {
      var gap = this.findGap();

      if(gap !== null) {
         this.publishEvent('card:move', new Move({
            from: this.model,
            to: gap
         }));
      }
      else {
         console.log('illegal double tap move!');
      }
   },

   findGap: function() {
      for (var i = 0; i < this.model.collection.length; i++) {
         var gap = this.model.collection.models[i];

         if(gap.get('value') === 1) {
            if(i % 13 === 0) {
               return gap;
            }
            var previous = this.model.collection.models[i - 1];
            if(previous.get('suit') === this.model.get('suit') && previous.get('value') === this.model.get('value') - 1) {
               return gap;
            }
         }
      }
      return null;
   }
});