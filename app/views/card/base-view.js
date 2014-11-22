module.exports = Chaplin.View.extend({
   noWrap: true,
   autoRender: true,

   initialize: function() {
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
   }
});