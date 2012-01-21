var photos = {};

$(document).ready(function(){
	
	$.getJSON('/json/dahlia_set.json', function(data){
		var stuff = "stuff";
		var items = [];
		$.each(data.photoset.photo, function(key, photo) {
			photos[photo.id] = photo;
			var url = '/flickr_image/'+getPhotoUrl(photo, "s");
			$('#dahliaThumbs').append('<li class="thumbnail" id="photo_' + photo.id + '"><a href="' + url + '" data-photoid="'+ photo.id +'"><img src="'+url+'" /></li>');    
			
		});
		$(".thumbnail a").click(function(event){
			event.preventDefault();
			var photoId = $(this).data('photoid');
			var photo = photos[photoId];
			var canvas = $('#imageCanvas')[0];
		    var context = canvas.getContext("2d");

		    // load image from data url
		    var imageObj = new Image();
		    imageObj.onload = function(){
		        context.clearRect(0, 0, canvas.width, canvas.height);
				context.drawImage(this, 0, 0);
				var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
				var data = imageData.data;

				// to quickly iterate over all pixels, use a for loop like this
				for (var i = 0; i < data.length; i += 4) {
					var red = data[i]; // red
					var green = data[i + 1]; // green
					var blue = data[i + 2]; // blue
					// i+3 is alpha (the fourth element)
				}
		    };

		    imageObj.src = '/flickr_image/' + getPhotoUrl(photo, "z");
		});
	});
});

function getPhotoUrl(photo, size)
{
	//http://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}_[mstzb].jpg
	var url = 'http://farm' 
		+ photo.farm
		+ '.staticflickr.com/'
		+ photo.server
		+ '/'
		+ photo.id 
		+ '_'
		+ photo.secret
		+ '_'
		+ size
		+ '.jpg';
	url = encodeURIComponent(url);
	return url;
}