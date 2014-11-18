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

      $.ajax({
         dataType: 'json',
         url: '/api/highscores/1',
         success: _.bind(this.highscoreSuccess, this)
      });
   },

   highscoreSuccess: function(data) {
      this.$('#nav-highscore').text('Highscore: ' + data[0].value + ' (' + data[0].name + ' - ' + data[0].date + ')');
   },

   getTemplateFunction: function () {
      return this.template;
   },

   getTemplateData: function () {
      return this.model.attributes;
   }
});