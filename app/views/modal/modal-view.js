module.exports = Chaplin.View.extend({
   noWrap: true,
   autoRender: true,
   container: 'body',
   containerMethod: 'append',

   optionNames: Chaplin.View.prototype.optionNames.concat(['title', 'bodyTemplate', 'closed']),

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
      this.renderContent();

      this.delegate('hidden.bs.modal', _.bind(this.hidden, this));
      this.$el.modal('show');
   },

   close: function() {
      this.$el.modal('hide');
   },

   hidden: function() {
      if(_.isFunction(this.closed)) {
         this.closed();
      }
      this.dispose();
   },

   showSpinner: function() {
      var options = { lines: 9, length: 6, width: 2, radius: 6, color: '#777' };
      var target = this.$('.modal-body').get(0);
      this.spinner = new Spinner(options).spin(target);
   },

   renderContent: function() {
      if(this.spinner !== undefined) {
         this.spinner.stop();
      }

      this.$('.modal-title').text(this.title);
      this.$('.modal-body').html(this.bodyTemplate(this.model.attributes));
   }
});