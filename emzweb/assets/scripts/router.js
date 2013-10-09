// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes
      'frontend': 'frontendAction',
     

      // Default
      '': 'defaultAction'
    },
    
    defaultAction : function(){
    	console.log('home');
    },
    
    frontendAction : function(){
    	console.log('frontend');
    }
    
  });
  
  return AppRouter;
});