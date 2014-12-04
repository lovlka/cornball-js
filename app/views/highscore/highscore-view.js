var ModalView = require('views/modal/modal-view');
var HighscoreCollection = require('collections/highscore-collection');

module.exports = ModalView.extend({
   initialize: function (options) {
      this.title = i18n.t('highscore.title');
      this.dismiss = i18n.t('highscore.dismiss');
      this.bodyTemplate = require('views/highscore/highscore');
      this.allTime = new HighscoreCollection();
      this.month = new HighscoreCollection();
      ModalView.prototype.initialize.call(this, arguments);
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
      this.month.startDate = moment().date(1).format('YYYY-MM-DD');
      this.month.fetch({
         success: _.bind(this.fetchSuccess, this)
      });
   },

   fetchSuccess: function() {
      this.model.set('allTime', this.allTime);
      this.model.set('month', this.month);
      this.renderContent();
   }
});