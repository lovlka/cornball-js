var Application = require('application');

$(function () {
   i18n.init({ load: 'unspecific', fallbackLng: 'en', postProcess: 'sprintf', getAsync: false }, function(t) {
      $('title').text(t('main.title'));
      $('meta[name=author]').prop('content', t('main.author'));
      $('meta[name=description]').prop('content', t('main.description'));
   });

   Handlebars.registerHelper('lang', function(arg1, arg2) {
      var key = _.isString(arg2) ? arg1 + '.' + arg2 : arg1;
      return new Handlebars.SafeString(i18n.t(key));
   });

   Handlebars.registerHelper('date', function(date, format) {
      return moment(date).format(format);
   });

   $.ajaxSetup({
      beforeSend: function(jqXHR) {
         //this.url = 'http://localhost:51839' + this.url;
      }
   });

   new Application({
         title: 'Cornball',
         controllerSuffix: '-controller',
         routes: require('routes')
      }
   );
});
