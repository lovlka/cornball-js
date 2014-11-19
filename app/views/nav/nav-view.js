var NavItemView = require('views/nav/nav-item-view');

module.exports = Chaplin.CollectionView.extend({
   noWrap: true,
   autoRender: true,
   itemView: NavItemView,
   listSelector: '#nav-list',
   container: '#nav-region',
   animationDuration: 0,

   initialize: function () {
      this.template = require('views/nav/nav');
      Chaplin.CollectionView.prototype.initialize.call(this, arguments);
   },

   getHighScore: function() {
      var options = { lines: 9, length: 4, width: 2, radius: 5, color: '#eee' };
      var target = this.$('#nav-highscore').get(0);
      this.spinner = new Spinner(options).spin(target);

      $.ajax({
         dataType: 'json',
         url: '/api/highscores/1',
         success: _.bind(this.highScoreSuccess, this)
      });
   },

   highScoreSuccess: function(data) {
      this.spinner.stop();
      this.$('#nav-highscore').text('Highscore: ' + data[0].value + ' (' + data[0].name + ' - ' + data[0].date + ')');
   },

   getTemplateFunction: function () {
      return this.template;
   },

   getTemplateData: function () {
      return this.model.attributes;
   },

   render: function () {
      Chaplin.CollectionView.prototype.render.call(this, arguments);
      this.getHighScore();
   }
});