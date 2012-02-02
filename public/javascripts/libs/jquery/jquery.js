// Filename: libs/jquery/jquery.js

define([
// Load the original jQuery source file
  'order!libs/jquery/jquery-1.7.1-min'
], function(){
  // Tell Require.js that this module returns a reference to jQuery
  return $;
});