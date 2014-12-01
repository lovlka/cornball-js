var NavView = require('views/nav/nav-view');
var NavCollection = require('collections/nav-collection');
var AboutView = require('views/about/about-view');
var StatisticsView = require('views/statistics/statistics-view');
var HighscoreView = require('views/highscore/highscore-view');
var ScoreView = require('views/nav/score-view');

module.exports = Chaplin.Controller.extend({
   initialize: function (options) {
      this.model = options.model;

      this.collection = new NavCollection([
         { action: 'newgame', icon: 'refresh' },
         { action: 'undo', icon: 'reply' },
         { action: 'highscore', icon: 'star' },
         { action: 'statistics', icon: 'pie-chart' },
         { action: 'about', icon: 'question' }
      ]);

      this.view = new NavView({
         model: this.model,
         collection: this.collection
      });

      this.scoreView = new ScoreView({ model: this.model });

      this.subscribeEvent('navigate', this.navigate);
      this.listenTo(this.model, 'change', this.propertyChanged);
   },

   navigate: function(action) {
      switch(action)
      {
         case 'newgame':
            this.publishEvent('game:new');
            break;

         case 'undo':
            this.publishEvent('game:undo');
            break;

         case 'highscore':
            this.highscoreView = new HighscoreView({ model: new Chaplin.Model() });
            break;

         case 'statistics':
            this.statisticsView = new StatisticsView({ model: new Chaplin.Model() });
            break;

         case 'about':
            this.aboutView = new AboutView({ model: new Chaplin.Model() });
            break;
      }
   },

   propertyChanged: function() {
      this.scoreView.render();
   }
});