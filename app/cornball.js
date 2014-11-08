var Application = require('application');

$(function () {
   require('mockjax');

   new Application({
         title: 'Cornball',
         controllerSuffix: '-controller',
         routes: require('routes')
      }
   );
});
