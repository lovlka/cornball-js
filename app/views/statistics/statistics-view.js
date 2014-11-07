var ModalView = require('views/modal/modal-view');

module.exports = ModalView.extend({
   initialize: function (options) {
      this.title = "Statistik";
      this.bodyTemplate = require('views/statistics/statistics');
      ModalView.prototype.initialize.call(this, arguments);
   }
});