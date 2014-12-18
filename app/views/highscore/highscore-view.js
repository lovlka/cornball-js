var ModalView = require('views/modal/modal-view');
var HighscoreCollection = require('collections/highscore-collection');

module.exports = ModalView.extend({
   initialize: function (options) {
      this.title = i18n.t('highscore.title');
      this.dismiss = i18n.t('highscore.dismiss');
      this.bodyTemplate = require('views/highscore/highscore');
      this.allTime = new HighscoreCollection();
      this.month = new HighscoreCollection();
      this.currentMonth = moment().date(1);
      ModalView.prototype.initialize.call(this, arguments);
   },

   events: {
      'click .js-prev': 'previousMonth',
      'click .js-next': 'nextMonth'
   },

   previousMonth: function (e) {
      e.preventDefault();
      this.currentMonth.subtract(1, 'months');
      this.showSpinner();
      this.fetchMonth();
   },

   nextMonth: function (e) {
      e.preventDefault();
      this.currentMonth.add(1, 'months');
      this.showSpinner();
      this.fetchMonth();
   },

   render: function () {
      ModalView.prototype.render.call(this, arguments);
      this.fetchHighScore();
   },

   fetchHighScore: function() {
      this.showSpinner();
      this.allTime.fetch({
         success: _.bind(this.fetchMonth, this)
      });
   },

   fetchMonth: function() {
      this.month.startDate = this.currentMonth.format('YYYY-MM-DD');
      this.month.endDate = this.currentMonth.clone().add('months', 1).date(0).format('YYYY-MM-DD');
      this.month.fetch({
         success: _.bind(this.fetchSuccess, this)
      });
   },

   fetchSuccess: function() {
      this.model.set('monthHeader', i18n.t('highscore.month', this.currentMonth.format('MMMM YYYY')));
      this.model.set('allTime', this.allTime);
      this.model.set('month', this.month);
      this.renderContent();
   }
});