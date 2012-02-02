// Filename: collections/projects
define([
  'Underscore',
  'Backbone',
  'models/FlickrPhoto'
], function(_, Backbone, FlickrPhoto){
  var FlickrPhotoSet = Backbone.Collection.extend({
    model: FlickrPhoto
  });
  // You don't usually return a collection instantiated
  return new FlickrPhotoSet;
});