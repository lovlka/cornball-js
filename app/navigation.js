var mediator = Chaplin.mediator;

var NavigationView = Chaplin.View.extend({
   initialize: function () {
      this.template = require('views/nav/nav-items');
   },

   getTemplateFunction: function () {
      return this.template;
   },

   getTemplateData: function () {
      return {
         items: [
            {viewId: 'calendar', viewName: 'Kalender'}
         ]
      };
   }
});

var Navigation = Chaplin.Controller.extend({
   view: {},

   initialize: function () {
      console.log('Navigation.initialize');
      mediator.subscribe('dispatcher:dispatch', _.bind(this._route, this));

      this.view = new NavigationView({
         el: '#main-navigation',
         autoRender: true,
         autoAttach: true
      });
   },


   _route: function (currentController, params, route, options) {
      this.view.$("li.active").removeClass('active');
      this.view.$("li[data-view-name='" + route.controller + "']").addClass('active');
   }
});

module.exports = Navigation;
