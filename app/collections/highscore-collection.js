module.exports = Chaplin.Collection.extend({
   url: function() {
      return '/api/highscores'
         + (_.isString(this.startDate) ? '/' + this.startDate : '')
         + (_.isString(this.endDate) ? '/' + this.endDate : '');
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
