// Filename: main.js

// Require.js allows us to configure shortcut alias
// There usage will become more apparent futher along in the tutorial.
require.config({
  paths: {
    jQuery: 'libs/jquery/jquery',
    Underscore: 'libs/underscore/underscore',
    Backbone: 'libs/backbone/backbone',
    Chroma: 'libs/chroma/chroma-min',
    d3: 'libs/d3/d3',
    order: 'libs/require/order-min'
  }

});

require([

  // Load our app module and pass it to our definition function
  'app',

  // Some plugins have to be loaded in order due to there non AMD compliance
  // Because these scripts are not "modules" they do not pass any values to the definition function below
  'order!libs/jquery/jquery-1.7.1-min',
  'order!libs/bootstrap/bootstrap.min',
  'order!libs/underscore/underscore-min',
  'order!libs/backbone/backbone-min'
], function(App){
  // The "app" dependency is passed in as "App"
  // Again, the other dependencies passed in are not "AMD" therefore don't pass a parameter to this function
  App.initialize();
});

