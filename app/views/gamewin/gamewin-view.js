var ModalView = require('views/modal/modal-view');
var HighscoreCollection = require('collections/highscore-collection');

module.exports = ModalView.extend({
   initialize: function (options) {
      this.title = "Grattis!";
      this.bodyTemplate = require('views/gamewin/gamewin');
      this.highscores = new HighscoreCollection();
      ModalView.prototype.initialize.call(this, arguments);

      this.model.unset('highscores');
      this.model.unset('ishighscore');
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
      this.model.set('ishighscore', this.highscores.isHighscore(this.model.get('score')));
      console.log('redering!', this.model);
      this.renderContent();
   }
});