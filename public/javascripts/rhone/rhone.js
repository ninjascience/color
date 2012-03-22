
define([
  // These are path alias that we configured in our bootstrap
  'jQuery',     // lib/jquery/jquery
  'Underscore', // lib/underscore/underscore
  'Backbone',    // lib/backbone/backbone
  'libs/bootstrap/bootstrap',
  'models/FlickrPhoto',
  'models/PhotoSet',
  'views/PhotoThumb',
  'views/HSLBarChart',
], function($, _, Backbone, Bootstrap, FlickrPhoto, PhotoSet, PhotoThumb, HSLBarChart){
  $.getJSON('/json/rhone/2011.json', function success(data){
	  
	  var weeks = [];
	  
	  data.map(function(photo) {
	    
	    var photoDate = new Date(photo.datetaken);
	    var week = getWeek(photoDate);
	    if(weeks[week.week] === undefined) {
	      weeks[week.week] = new PhotoSet();
	      weeks[week.week].weekNumber = week.week;
	    }
	    weeks[week.week].add(new FlickrPhoto(photo));
	  });
	  
	  weeks.map(function(photoSet){
	    var gallery = $('#weekGalleries').append('<ul id="weekGallery_'+photoSet.weekNumber+'" class="thumbnails"/>');
	    $('#weekGallery_'+photoSet.weekNumber).append('<li class="chart"><canvas id="weekChart_'+ photoSet.weekNumber+'" class="weekChart" width="360" height="3620" /></li>');
	    photoSet.map(function(photo) {
	      var view = new PhotoThumb({'model':photo});
        //view.clickHandler = clickHandler;
        var el = view.render().el;
	      $('#weekGallery_'+photoSet.weekNumber).append(el);
	    });
	    $.getJSON('json/hsl_rhone_week_'+photoSet.weekNumber+'.json', function success(data){
			  console.log('cached hue data found');
        
    			HSLBarChart.render('#weekChart_'+photoSet.weekNumber, data, 1);
        
  		}).error(function error(err){
  			console.log('no hue data cached on server for week: ' + photoSet.weekNumber);
  			
      });
      $('#weekGallery_'+photoSet.weekNumber+' li').first().click(function(event){
        //var context = $('#weekChart_'+photo.collection.weekNumber)[0].getContext("2d");
      	//context.fillRect(0, 0, canvas.width, canvas.height);
			  photoSet.currentPhoto = photoSet.models[0];
			  process(photoSet.currentPhoto, []);
			});
	  });
	  
	})
	
	function process(photo, hues){
	  var canvas = $('#sampleCanvas')[0];
  	var context = canvas.getContext("2d");
  	context.clearRect(0, 0, canvas.width, canvas.height);
    // load image from data url
    var imageObj = new Image();
    imageObj.onload = function(){
		  context.clearRect(0, 0, canvas.width, canvas.height);
		  context.drawImage(imageObj, 0, 0);
      hues = photo.sampleHSL(canvas, hues);
      if(photo !== photo.collection.models[photo.collection.length-1]) {
        var nextPhotoIndex = photo.collection.models.indexOf(photo)+1;
        photo.collection.currentPhoto = photo.collection.models[nextPhotoIndex];
			  process(photo.collection.currentPhoto, hues);
      }
      else
      {
        var huesJSON = JSON.stringify(hues);
      	$.ajax({
      	  type: 'POST',
      	  url: '/hues/json',
      	  data: {'hues_json':huesJSON, 'photo_id':'rhone_week_'+photo.collection.weekNumber},
      	  success: function(success){
      	    
      		  console.log('posted data');
      		}
    		});
        HSLBarChart.render('#weekChart_'+photo.collection.weekNumber, hues, 1);
      }
    };

    imageObj.src = '/flickr_image/' + encodeURIComponent(photo.getPhotoUrl("s"));
	}
	
	function getWeek(date) {
	  var year = date.getFullYear();
	  var yearDate = new Date();
	  yearDate.setDate(1);
	  yearDate.setMonth(0);
	  yearDate.setYear(year);
	  var milliInYear = date.getTime() - yearDate.getTime();
	  var secsInYear = milliInYear/1000;
	  var minInYear = secsInYear/60;
	  var hourInYear = minInYear/60;
	  var dayInYear = hourInYear/24;
	  var weekInYear = Math.floor(dayInYear/7);
	  var weekDate = new Date((weekInYear*7*24*60*60*1000)+yearDate.getTime());
	  return {week:weekInYear,year:year,date:weekDate};
	}
});