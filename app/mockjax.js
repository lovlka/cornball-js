var serviceData = require('mock-data/service-data');

$(function () {

   $.mockjax({
       url: '/api/services',
       responseTime: 100,
       responseText: serviceData
   });

});
