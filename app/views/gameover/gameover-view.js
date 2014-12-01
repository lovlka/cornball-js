var ModalView = require('views/modal/modal-view');

module.exports = ModalView.extend({
   initialize: function (options) {
      if(this.model.get('round') < this.model.get('rounds')) {
         this.title = i18n.t('roundover.title', this.model.get('round'));
         this.bodyTemplate = require('views/gameover/roundover');
      }
      else {
         this.title = i18n.t('gameover.title');
         this.bodyTemplate = require('views/gameover/gameover');
      }
      ModalView.prototype.initialize.call(this, arguments);
   }
});