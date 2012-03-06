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
	  HSLBarChart.render('#chart',data,2);
	  
	})
  
  
  var photoSet = new PhotoSet();
  var processPhoto = function(photo){
    var canvas = $('#imageCanvas')[0];
  	var context = canvas.getContext("2d");
  	context.clearRect(0, 0, canvas.width, canvas.height);
      // load image from data url
      var imageObj = new Image();
      imageObj.onload = function(){
  		  context.clearRect(0, 0, canvas.width, canvas.height);
  		  context.drawImage(imageObj, 0, 0);
        $.getJSON('/json/hsl_'+photo.id+'.json', function success(data){
  			  console.log('cached hue data found');
  			  
          $('#imageCanvas').attr('height',imageObj.height).attr('width', imageObj.width);
          $('#colorModal').animate({width:imageObj.width+360+5,height:imageObj.height,duration:750});
    			context.drawImage(imageObj, 0, 0);
    			HSLBarChart.render('#smallChart',data,1);
    		}).error(function error(err){
    			console.log('no hue data cached on server');
    			var hues = photo.sampleHSL(canvas);
    			
    			var huesJSON = JSON.stringify(hues);
        	$.ajax({
        	  type: 'POST',
        	  url: '/hues/json',
        	  data: {'hues_json':huesJSON, 'photo_id':photo.id},
        	  success: function(success){
        	    
        		  console.log('posted data');
        		}
        	});
    			//HSLBarChart.render('#chart',hues);
    		});
      };

      imageObj.src = '/flickr_image/' + encodeURIComponent(photo.getPhotoUrl(""));
  }
  var clickHandler = function(photo){
    processPhoto(photo);
    
    $('#colorModal').modal({})
  };
  
  photoSet.bind('reset', function addPhoto(photos){
    photoArray = photos.toArray();
    
    photos.each(function(photo){
      var view = new PhotoThumb({'model':photo});
      view.clickHandler = clickHandler;
      var el = view.render().el;
      // el.addEventListener('click', function(event){
      //         var chart = HSLBarChart;
      //         chart.render($('#chart'), );
      //       });
      $('#photoGallery').append(el);
    });
    $('#prevNav').click(function prevClick(event) {
      console.log('click prev');
    });
    $('#nextNav').click(function nextClick(event) {
      console.log('click next');
    });
  });
  photoSet.url = '/json/dahlia_set_small.json';
  photoSet.fetch();
  return {};
});