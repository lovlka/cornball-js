var ModalView = require('views/modal/modal-view');
var StatisticsCollection = require('collections/statistics-collection');

module.exports = ModalView.extend({
   initialize: function (options) {
      this.title = i18n.t('statistics.title');
      this.dismiss = i18n.t('statistics.dismiss');
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
      this.statistics.remove(this.statistics.where({ name: 'gamesStarted' }));

      var gamesPlayed = 0;
      _.each(this.statistics.models, function(model) {
         gamesPlayed += model.get('value');
      });

      _.each(this.statistics.models, function(model) {
         var percentage = model.get('value') / gamesPlayed * 100;
         model.set('percentage', percentage.toFixed(2));
      });

      this.model.set('statistics', this.statistics);
      this.model.set('gamesPlayed', gamesPlayed);
      this.renderContent();
   }
});