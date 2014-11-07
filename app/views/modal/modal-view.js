module.exports = Chaplin.View.extend({
   noWrap: true,
   autoRender: true,
   container: 'body',
   containerMethod: 'append',

   optionNames: Chaplin.View.prototype.optionNames.concat(['title', 'bodyTemplate']),

   initialize: function(options) {
      this.template = require('views/modal/modal');
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

      this.$('.modal-title').text(this.title);
      this.$('.modal-body').html(this.bodyTemplate(this.model.attributes));

      this.delegate('hidden.bs.modal', this.dispose);
      this.$el.modal('show');
   }
});