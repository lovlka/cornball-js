var ModalView = require('views/modal/modal-view');

module.exports = ModalView.extend({
   initialize: function (options) {
      if(this.model.get('round') < this.model.get('rounds')) {
         this.title = "Slut på omgång " + this.model.get('round');
         this.bodyTemplate = require('views/gameover/roundover');
      }
      else {
         this.title = "Spelet slut!";
         this.bodyTemplate = require('views/gameover/gameover');
      }
      ModalView.prototype.initialize.call(this, arguments);
   }
});