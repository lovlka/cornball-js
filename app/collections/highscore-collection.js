module.exports = Chaplin.Collection.extend({
   url: '/api/highscores/10',

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
