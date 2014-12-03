module.exports = Chaplin.Collection.extend({
   startDate: null,
   endDate: null,

   url: function() {
      if(this.startDate !== null && this.endDate !== null) {
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
