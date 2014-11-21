var NavItemView = require('views/nav/nav-item-view');
var Highscore = require('models/highscore');

module.exports = Chaplin.CollectionView.extend({
   noWrap: true,
   autoRender: true,
   itemView: NavItemView,
   listSelector: '#nav-list',
   container: '#nav-region',
   animationDuration: 0,

   initialize: function () {
      this.highscore = new Highscore();
      this.template = require('views/nav/nav');
      Chaplin.CollectionView.prototype.initialize.call(this, arguments);
   },

   fetchHighscore: function() {
      var target = this.$('#nav-highscore').get(0);
      var options = { lines: 9, length: 4, width: 2, radius: 5, color: '#eee' };
      this.spinner = new Spinner(options).spin(target);
      this.highscore.fetch({
         success: _.bind(this.fetchSuccess, this)
      });
   },

   fetchSuccess: function() {
      this.spinner.stop();
      var date = moment(this.highscore.get('date'));
      this.$('#nav-highscore').text('Bäst i ' + date.format('MMMM') + ': ' + this.highscore.get('name') + ' (' + this.highscore.get('value') + ')');
   },

   getTemplateFunction: function () {
      return this.template;
   },

   getTemplateData: function () {
      return this.model.attributes;
   },

   render: function () {
      Chaplin.CollectionView.prototype.render.call(this, arguments);
      this.fetchHighscore();
   }
});