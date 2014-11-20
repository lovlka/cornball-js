var ModalView = require('views/modal/modal-view');
var HighscoreCollection = require('collections/highscore-collection');

module.exports = ModalView.extend({
   initialize: function (options) {
      this.title = "Topplista";
      this.bodyTemplate = require('views/highscore/highscore');
      this.highscores = new HighscoreCollection();
      ModalView.prototype.initialize.call(this, arguments);
   },

   render: function () {
      ModalView.prototype.render.call(this, arguments);
      this.fetchHighScore();
   },

   fetchHighScore: function() {
      this.showSpinner();
      this.highscores.fetch({
         success: _.bind(this.fetchSuccess, this)
      });
   },

   fetchSuccess: function() {
      this.model.set('highscores', this.highscores);
      this.renderContent();
   }
});