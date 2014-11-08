$(function () {

   $.mockjax({
       url: '/api/statistics',
       responseTime: 100,
       responseText: [{"Name":"GamesStarted","Value":128516},{"Name":"GamesLost","Value":14637},{"Name":"GamesWonRound1","Value":46},{"Name":"GamesWonRound2","Value":216},{"Name":"GamesWonRound3","Value":694},{"Name":"GamesWonRound4","Value":1517},{"Name":"GamesWonRound5","Value":2383}]
   });

});
