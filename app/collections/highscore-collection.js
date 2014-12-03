module.exports = Chaplin.Collection.extend({
   url: function() {
      if(_.isString(this.startDate) && _.isString(this.endDate)) {
         return 'api/highscores/' + this.startDate + '/' + this.endDate;
      }
      return '/api/highscores';
   },

   isHighscore: function(score) {
      if(this.length < 10) {
         return true;
      }
      var highscore = false;
      _.each(this.models, function(model) {
         if(score > model.get('value')) {
            highscore = true;
         }
      });
      return highscore;
   }
});
