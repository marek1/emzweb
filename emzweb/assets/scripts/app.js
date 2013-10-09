// Filename: app.js
define([
  'jquery',
  'underscore',
  'backbone',
  'router', // Request router.js
], function($, _, Backbone, Router){
  var initialize = function(){
    var app_router = new Router;
    Backbone.history.start();
  }

  return {
    initialize: initialize
  };
});