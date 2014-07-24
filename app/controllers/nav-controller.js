var NavView = require('views/nav/nav-view');
var NavCollection = require('collections/nav-collection');

module.exports = Chaplin.Controller.extend({
   initialize: function () {
      this.model = new Chaplin.Model({});
      this.collection = new NavCollection();

      this.view = new NavView({
         model: this.model,
         collection: this.collection
      });
   }
});