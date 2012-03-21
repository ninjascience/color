// Filename: models/flickr-photo.js
define([
  'Underscore',
  'Backbone',
  'libs/chroma/chroma'
], function(_, Backbone,chroma){
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
    
    sampleHSL: function(canvas, hues){
      if(!hues) {
        var hues = [];
      }
      var context = canvas.getContext("2d");
    	var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    	var data = imageData.data;
    	for (var h = 0; h < 360; h++)
    	{
    		if(!hues[h]){
    		  hues[h] = [];
    		}
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
    }
    
  });
  return FlickrPhoto;
});