var ModalView = require('views/modal/modal-view');
var HighscoreCollection = require('collections/highscore-collection');
var Highscore = require('models/highscore');

module.exports = ModalView.extend({
   initialize: function (options) {
      this.title = i18n.t('gamewin.title');
      this.bodyTemplate = require('views/gamewin/gamewin');
      this.highscores = new HighscoreCollection();
      ModalView.prototype.initialize.call(this, arguments);

      this.model.unset('highscores');
      this.model.unset('ishighscore');
   },

   events: {
      'submit form': 'postHighscore',
      'keyup input': 'enableSubmit'
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
      this.renderContent();
      this.enableSubmit();
      this.$('input[name="name"]').focus();
   },

   enableSubmit: function() {
      this.$('[type="submit"]').prop('disabled', this.$('input[name="name"]').val().length === 0);
   },

   postHighscore: function(event) {
      event.preventDefault();
      this.$('[type="submit"]').text(i18n.t('gamewin.posting')).prop('disabled', true);

      var highscore = new Highscore({
         name: this.$('input[name="name"]').val(),
         value: this.model.get('score')
      });
      highscore.save(highscore.attributes, {
         success: _.bind(this.close, this)
      });
   }
});