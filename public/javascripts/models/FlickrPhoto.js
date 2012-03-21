// Filename: models/flickr-photo.js
define([
  'jQuery',
  'Underscore',
  'Backbone',
  'libs/chroma/chroma',
  'views/HSLBarChart',
], function($, _, Backbone, chroma, HSLBarChart){
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
    
    getPhotoUrl: function (size)
    {
    	//http://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}_[mstzb].jpg
    	if(size != "")
    	{
    		size = "_" + size;
    	}
    	var url = 'http://farm' 
    		+ this.get('farm')
    		+ '.staticflickr.com/'
    		+ this.get('server')
    		+ '/'
    		+ this.id 
    		+ '_'
    		+ this.get('secret')
    		+ size
    		+ '.jpg';
    	return url;
    }, 
    
    sampleHSL: function(canvas){
      var hues = [];
      var context = canvas.getContext("2d");
    	var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    	var data = imageData.data;
    	for (var h = 0; h < 360; h++)
    	{
    		hues[h] = [];
    	}
    	// to quickly iterate over all pixels, use a for loop like this
    	for (var i = 0; i < data.length; i += 4) {
    		var red = data[i]; // red
    		var green = data[i + 1]; // green
    		var blue = data[i + 2]; // blue
    		var col = chroma.rgb(red, green, blue);
    		var hsl = col.hsl();
    		var hue = Math.floor(hsl[0]);
    		if(! isNaN(hue))
    		{
    			var brightness = Math.floor(hsl[2] * 100);
    			if(hues[hue][brightness] == undefined)
    			{
    			  hues[hue][brightness] = 0;
    			}
    			hues[hue][brightness]++;
    		}
    	}
    	
    	return hues;
    },
    
    processPhoto: function(){
      this.collection.currentPhoto = this;
      var canvas = $('#modal_'+this.collection.weekNumber+' .imageCanvas')[0];
    	var context = canvas.getContext("2d");
    	var self = this;
    	context.clearRect(0, 0, canvas.width, canvas.height);
        // load image from data url
        var imageObj = new Image();
        imageObj.onload = function(){
    		  context.clearRect(0, 0, canvas.width, canvas.height);
    		  $('#modal_'+self.collection.weekNumber+' .imageCanvas').hide();
  			  HSLBarChart.clear('#modal_'+self.collection.weekNumber+' .smallChart');
    		  context.drawImage(imageObj, 0, 0);
          $.getJSON('/json/hsl_'+self.id+'.json', function success(data){
    			  console.log('cached hue data found');
            $('#modal_'+self.collection.weekNumber+' .imageCanvas').attr('height',imageObj.height).attr('width', imageObj.width);
            $('#modal_'+self.collection.weekNumber+' .colorModal').animate({width:imageObj.width+360+5,height:imageObj.height,duration:750}, function complete(){
      			  context.drawImage(imageObj, 0, 0);
      			  $('#modal_'+self.collection.weekNumber+' .imageCanvas').show();
        			HSLBarChart.render('#modal_'+self.collection.weekNumber+' .smallChart',data,1);
            });
      		}).error(function error(err){
      			console.log('no hue data cached on server');
      			var hues = self.sampleHSL(canvas);

      			var huesJSON = JSON.stringify(hues);
          	$.ajax({
          	  type: 'POST',
          	  url: '/hues/json',
          	  data: {'hues_json':huesJSON, 'photo_id':self.id},
          	  success: function(success){

          		  console.log('posted data');
          		}
          	});
      			$('#modal_'+self.collection.weekNumber+' .imageCanvas').attr('height',imageObj.height).attr('width', imageObj.width);
            $('#modal_'+self.collection.weekNumber+' .colorModal').animate({width:imageObj.width+360+5,height:imageObj.height,duration:750}, function complete(){
      			  context.drawImage(imageObj, 0, 0);
      			  $('#modal_'+self.collection.weekNumber+' .imageCanvas').show();
        			HSLBarChart.render('#modal_'+self.collection.weekNumber+' .smallChart',data,1);
            });
      		});
        };

        imageObj.src = '/flickr_image/' + encodeURIComponent(this.getPhotoUrl(""));
    }
    
  });
  return FlickrPhoto;
});