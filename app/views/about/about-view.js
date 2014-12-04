var ModalView = require('views/modal/modal-view');

module.exports = ModalView.extend({
   initialize: function (options) {
      this.title = i18n.t('about.title');
      this.dismiss = i18n.t('about.dismiss');
      this.bodyTemplate = require('views/about/about');
      ModalView.prototype.initialize.call(this, arguments);
   }
});