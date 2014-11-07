var ModalView = require('views/modal/modal-view');

module.exports = ModalView.extend({
   initialize: function (options) {
      this.title = "Om Lantisen";
      this.bodyTemplate = require('views/about/about');
      ModalView.prototype.initialize.call(this, arguments);
   }
});