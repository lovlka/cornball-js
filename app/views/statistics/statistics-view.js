var ModalView = require('views/modal/modal-view');

module.exports = ModalView.extend({
   autoRender: false,

   initialize: function (options) {
      this.title = "Statistik";
      this.bodyTemplate = require('views/statistics/statistics');
      ModalView.prototype.initialize.call(this, arguments);

      $.ajax({
         dataType: 'json',
         url: '/api/statistics',
         success: _.bind(this.initializeSuccess, this)
      });
   },

   initializeSuccess: function(data) {
      var statistics = new Chaplin.Collection(data);
      this.model.set('statistics', statistics);
      this.render();
   }
});