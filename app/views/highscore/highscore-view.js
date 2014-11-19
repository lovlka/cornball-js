var ModalView = require('views/modal/modal-view');

module.exports = ModalView.extend({
   initialize: function (options) {
      this.title = "Topplista";
      this.bodyTemplate = require('views/highscore/highscore');
      ModalView.prototype.initialize.call(this, arguments);
   },

   render: function () {
      ModalView.prototype.render.call(this, arguments);
      this.loadHighScore();
   },

   loadHighScore: function() {
      this.showSpinner();
      $.ajax({
         dataType: 'json',
         url: '/api/highscores/10',
         success: _.bind(this.loadSuccess, this)
      });
   },

   loadSuccess: function(data) {
      this.model.set('highscores', new Chaplin.Collection(data));
      this.renderContent();
   }
});