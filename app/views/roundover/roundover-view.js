var ModalView = require('views/modal/modal-view');

module.exports = ModalView.extend({
   initialize: function (options) {
      this.title = i18n.t('roundover.title', this.model.get('round'));
      this.bodyTemplate = require('views/roundover/roundover');
      ModalView.prototype.initialize.call(this, arguments);
   }
});