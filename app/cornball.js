var Application = require('application');

$(function () {
   require('mockjax');

   i18n.init({ fallbackLng: 'en', getAsync: false }, function(t) {
      $('title').text(t('main.title'));
      $('meta[name=author]').prop('content', t('main.author'));
      $('meta[name=description]').prop('content', t('main.description'));
   });

   Handlebars.registerHelper('lang', function(arg1, arg2) {
      var key = _.isString(arg2) ? arg1 + '.' + arg2 : arg1;
      return new Handlebars.SafeString(i18n.t(key));
   });

   new Application({
         title: 'Cornball',
         controllerSuffix: '-controller',
         routes: require('routes')
      }
   );
});
