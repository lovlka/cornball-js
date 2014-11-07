var NavView = require('views/nav/nav-view');
var NavCollection = require('collections/nav-collection');
var AboutView = require('views/about/about-view');
var StatisticsView = require('views/statistics/statistics-view');
var HighscoreView = require('views/highscore/highscore-view');

module.exports = Chaplin.Controller.extend({
   initialize: function () {
      this.model = new Chaplin.Model({});
      this.collection = new NavCollection([
         { action: 'newgame', text: 'Starta nytt spel', icon: 'refresh' },
         { action: 'undo', text: 'Ångra senaste drag', icon: 'reply' },
         { action: 'highscore', text: 'Visa topplista', icon: 'star' },
         { action: 'statistics', text: 'Visa statistik', icon: 'pie-chart' },
         { action: 'about', text: 'Om Lantisen', icon: 'question' }
      ]);

      this.view = new NavView({
         model: this.model,
         collection: this.collection
      });

      this.subscribeEvent('navigate', this.navigate);
   },

   navigate: function(action) {
      console.log('navigate', action);

      switch(action)
      {
         case 'about':
            this.showAbout();
            break;
         case 'statistics':
            this.showStatistics();
            break;
         case 'highscore':
            this.showHighscore();
            break;
      }
   },

   showAbout: function() {
      this.aboutView = new AboutView({ model: this.model });
   },

   showStatistics: function() {
      this.statisticsView = new StatisticsView({ model: this.model });
   },

   showHighscore: function() {
      this.highscoreView = new HighscoreView({ model: this.model });
   }
});