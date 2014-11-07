var ModalView = require('views/modal/modal-view');

module.exports = ModalView.extend({
   initialize: function (options) {
      this.title = "High score";
      this.bodyTemplate = require('views/highscore/highscore');
      ModalView.prototype.initialize.call(this, arguments);
   }
});