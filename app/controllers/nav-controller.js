var NavView = require('views/nav/nav-view');
var NavCollection = require('collections/nav-collection');

module.exports = Chaplin.Controller.extend({
   initialize: function () {
      this.model = new Chaplin.Model({});
      this.collection = new NavCollection([
         { action: 'newgame', text: 'Starta nytt spel', icon: 'refresh' },
         { action: 'undo', text: 'Ångra senaste drag', icon: 'backward' },
         { action: 'highscore', text: 'Visa topplista', icon: 'star' },
         { action: 'statistics', text: 'Visa statistik', icon: 'stats' },
         { action: 'about', text: 'Om Lantisen', icon: 'globe' }
      ]);

      this.view = new NavView({
         model: this.model,
         collection: this.collection
      });

      this.subscribeEvent('navigate', this.navigate);
   },

   navigate: function(action) {
      console.log('navigate', action);
   }
});