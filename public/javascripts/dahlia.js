//Filename: dahlia.js

define([
  // These are path alias that we configured in our bootstrap
  'jQuery',     // lib/jquery/jquery
  'Underscore', // lib/underscore/underscore
  'Backbone',    // lib/backbone/backbone
  'libs/bootstrap/bootstrap',
  'models/PhotoSet',
  'views/PhotoThumb',
  'views/HSLBarChart',
], function($, _, Backbone, Bootstrap, PhotoSet, PhotoThumb, HSLBarChart){
  $.getJSON('/json/hsl_dahlias.json', function success(data){
	  HSLBarChart.render('#allDahliasChart',data);
	  
	})
  
  var photoSet = new PhotoSet();
  
  photoSet.bind('reset', function addPhoto(photos){
    photoArray = photos.toArray();
    
    photos.each(function(photo){
      var view = new PhotoThumb({'model':photo});
      var el = view.render().el;
      $('#photoGallery').append(el);
    });
    $('#prevNav').click(function prevClick(event) {
      var index = photoSet.indexOf(photoSet.currentPhoto);
      if(index > 0) {
        var prevPhoto = photoSet.at(index-1);
        processPhoto();
      }
    });
    $('#nextNav').click(function nextClick(event) {
      var index = photoSet.indexOf(photoSet.currentPhoto);
      if(index < photoSet.length-1) {
        var nextPhoto = photoSet.at(index+1);
        processPhoto();
      }
    });
  });
  photoSet.url = '/json/dahlia_set.json';
  photoSet.fetch();
  return {};
});