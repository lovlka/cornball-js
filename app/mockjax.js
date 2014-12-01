$(function () {

   $.mockjax({
       url: '/api/statistics',
       responseTime: 1000,
       responseText: [
          {name: 'gamesStarted', value: 128516},
          {name: 'gamesLost', value: 14637},
          {name: 'gamesWonRound1', value: 46},
          {name: 'gamesWonRound2', value: 216},
          {name: 'gamesWonRound3', value: 694},
          {name: 'gamesWonRound4', value: 1517},
          {name: 'gamesWonRound5', value: 2383}
       ]
   });

   $.mockjax({
       url: '/api/highscore',
       responseTime: 1000,
       responseText: {name: 'Victor', date: '2014-01-27', value: 6425}
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
