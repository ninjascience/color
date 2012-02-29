// Filename: collections/projects
define([
  'jQuery',
  'Underscore',
  'Backbone',
  'models/FlickrPhoto'
], function($, _, Backbone, FlickrPhoto){
  var PhotoSet = Backbone.Collection.extend({
    model: FlickrPhoto,
    parse: function(response) {
      var photos = [];
      $.each(response.photoset.photo, function(key, photo) {
        var photo = new FlickrPhoto(photo);
        photos.push(photo);
      });
      return photos;
    } 
  });
  
  return PhotoSet;
});