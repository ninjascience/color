
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
  
  var set2011 = [];
  $.getJSON('/json/rhone/2011.json', function success(data){
	  set2011 = data;
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
	    var modalTemplate = $('#modalTemplate').html();
	    var modal = _.template(modalTemplate)({collectionId:photoSet.weekNumber});
	    $('#weekGalleries')
	      .append('<ul id="weekGallery_'+photoSet.weekNumber+'" class="thumbnails"/>')
	      .append(modal);
	    photoSet.map(function(photo) {
	      var view = new PhotoThumb({'model':photo});
        var el = view.render().el;
	      $('#weekGallery_'+photoSet.weekNumber).append(el);
	    });
	    
      $('#weekGallery_' + photoSet.weekNumber + ' #prevNav').click(function prevClick(event) {
        var index = photoSet.indexOf(photoSet.currentPhoto);
        if(index > 0) {
          var prevPhoto = photoSet.at(index-1);
          processPhoto();
        }
      });
      $('#weekGallery_' + photoSet.weekNumber + ' #nextNav').click(function nextClick(event) {
        var index = photoSet.indexOf(photoSet.currentPhoto);
        if(index < photoSet.length-1) {
          var nextPhoto = photoSet.at(index+1);
          processPhoto();
        }
      });
	  });
	  
	  
	})
	
	function clickHandler(photo) {
	  $('#sendButton').show();
	  for(var i in set2011)
	  {
	    if(set2011[i].id === photo.id){
	      set2011.splice(i,1);
	      $('#thumb_'+photo.id).parent().remove();
	      break;
	    }
	  }
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
	  return {week:weekInYear,year:year};
	}
});