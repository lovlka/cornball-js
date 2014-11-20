var ModalView = require('views/modal/modal-view');
var StatisticsCollection = require('collections/statistics-collection');

module.exports = ModalView.extend({
   initialize: function (options) {
      this.title = "Statistik";
      this.bodyTemplate = require('views/statistics/statistics');
      this.statistics = new StatisticsCollection();
      ModalView.prototype.initialize.call(this, arguments);
   },

   render: function () {
      ModalView.prototype.render.call(this, arguments);
      this.fetchStatistics();
   },

   fetchStatistics: function() {
      this.showSpinner();
      this.statistics.fetch({
         success: _.bind(this.fetchSuccess, this)
      });
   },

   fetchSuccess: function() {
      this.model.set('statistics', this.statistics);
      this.renderContent();
   }
});