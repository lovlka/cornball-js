var ModalView = require('views/modal/modal-view');

module.exports = ModalView.extend({
   initialize: function (options) {
      this.title = "Statistik";
      this.bodyTemplate = require('views/statistics/statistics');
      ModalView.prototype.initialize.call(this, arguments);
   },

   render: function () {
      ModalView.prototype.render.call(this, arguments);
      this.loadStatistics();
   },

   loadStatistics: function() {
      this.showSpinner();
      $.ajax({
         dataType: 'json',
         url: '/api/statistics',
         success: _.bind(this.loadSuccess, this)
      });
   },

   loadSuccess: function(data) {
      this.model.set('statistics', new Chaplin.Collection(data));
      this.renderContent();
   }
});