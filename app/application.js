module.exports = Chaplin.Application.extend({
   initDispatcher: function (options) {
      this.dispatcher = new Chaplin.Dispatcher(options);
   }
});
