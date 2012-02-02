// Filename: models/flickr-photo.js
define([
  'Underscore',
  'Backbone'
], function(_, Backbone){
  var FlickrPhoto = Backbone.Model.extend({
    

    initialize: function(){
      var hues = [];
      for (var h = 0; h < 360; h++){
        hues[h] = [];
        for(var b = 0; b < 100; b++){
          hues[h][b] = 0;
        }
      }
      this.set({'hues':hues});
    },
  });
  return FlickrPhoto;
});