var Application = Chaplin.Application.extend({
   initDispatcher: function (options) {
      console.log('Application.initDispatcher');

      this.dispatcher = new Chaplin.Dispatcher(options);
   }
});

module.exports = Application;
