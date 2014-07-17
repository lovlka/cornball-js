var Application = require('application');
var Navigation = require('navigation');
var routes = require('routes');

$(function () {
   new Application({
         title: 'Cornball',
         controllerSuffix: '-controller',
         routes: routes
      }
   );

   new Navigation();

});
