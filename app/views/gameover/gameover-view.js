var ModalView = require('views/modal/modal-view');

module.exports = ModalView.extend({
   initialize: function (options) {
      this.title = i18n.t('gameover.title');
      this.bodyTemplate = require('views/gameover/gameover');
      ModalView.prototype.initialize.call(this, arguments);
   }
});