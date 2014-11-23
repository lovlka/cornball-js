var ModalView = require('views/modal/modal-view');

module.exports = ModalView.extend({
   initialize: function (options) {
      this.title = "Grattis!";
      this.bodyTemplate = require('views/gamewin/gamewin');
      ModalView.prototype.initialize.call(this, arguments);
   }
});