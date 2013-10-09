// Filename: main.js

// Require.js allows us to configure shortcut alias
// There usage will become more apparent further along in the tutorial.
require.config({
  paths: {
    jquery: '../../bower_components/jquery/jquery.min',
    underscore: '../../bower_components/underscore-amd/underscore-min',
    backbone: '../../bower_components/backbone-amd/backbone-min'
  }

});

require([

  // Load our app module and pass it to our definition function
  'app',
], function(App){
  // The "app" dependency is passed in as "App"
  App.initialize();
});