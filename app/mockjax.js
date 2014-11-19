$(function () {

   $.mockjax({
       url: '/api/statistics',
       responseTime: 1000,
       responseText: [{"Name":"GamesStarted","Value":128516},{"Name":"GamesLost","Value":14637},{"Name":"GamesWonRound1","Value":46},{"Name":"GamesWonRound2","Value":216},{"Name":"GamesWonRound3","Value":694},{"Name":"GamesWonRound4","Value":1517},{"Name":"GamesWonRound5","Value":2383}]
   });

   $.mockjax({
       url: '/api/highscores/1',
       responseTime: 1000,
       responseText: [
          {name: 'Victor', date: '2014-01-27', value: 6425}
       ]
   });

   $.mockjax({
      url: '/api/highscores/10',
      responseTime: 1000,
      responseText: [
         {name: 'Victor', date: '2014-01-27', value: 6425},
         {name: 'Victor', date: '2014-01-27', value: 6425},
         {name: 'Victor', date: '2014-01-27', value: 6425},
         {name: 'Victor', date: '2014-01-27', value: 6425},
         {name: 'Victor', date: '2014-01-27', value: 6425},
         {name: 'Victor', date: '2014-01-27', value: 6425},
         {name: 'Victor', date: '2014-01-27', value: 6425},
         {name: 'Victor', date: '2014-01-27', value: 6425},
         {name: 'Victor', date: '2014-01-27', value: 6425},
         {name: 'Victor', date: '2014-01-27', value: 6425}
      ]
   });

   $.mockjax({
      url: '/api/highscores/10/*',
      responseTime: 1000,
      responseText: [
         {name: 'Victor', date: '2014-01-27', value: 6425},
         {name: 'Victor', date: '2014-01-27', value: 6425},
         {name: 'Victor', date: '2014-01-27', value: 6425},
         {name: 'Victor', date: '2014-01-27', value: 6425},
         {name: 'Victor', date: '2014-01-27', value: 6425},
         {name: 'Victor', date: '2014-01-27', value: 6425},
         {name: 'Victor', date: '2014-01-27', value: 6425},
         {name: 'Victor', date: '2014-01-27', value: 6425},
         {name: 'Victor', date: '2014-01-27', value: 6425},
         {name: 'Victor', date: '2014-01-27', value: 6425}
      ]
   });
});
