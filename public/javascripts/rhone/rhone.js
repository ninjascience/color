
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
	    $('#weekGalleries').append('<ul id="weekGallery_'+photoSet.weekNumber+'" class="thumbnails"/>');
	    photoSet.map(function(photo) {
	      var view = new PhotoThumb({'model':photo});
        //view.clickHandler = clickHandler;
        var el = view.render().el;
	      $('#weekGallery_'+photoSet.weekNumber).append(el);
	    });
	  });
	  
	})
	
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
	  return {week:weekInYear,year:year};
	}
});