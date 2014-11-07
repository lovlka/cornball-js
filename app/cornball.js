var Application = require('application');
var NavController = require('controllers/nav-controller');

$(function () {
   require('mockjax');

   new Application({
         title: 'Cornball',
         controllerSuffix: '-controller',
         routes: require('routes')
      }
   );

   new NavController();

});
