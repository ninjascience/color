var photos = {};
var photoArray = [];
var photoIndex = 0;
var allHues = [];
$(document).ready(function(){
	for (var h = 0; h < 360; h++)
	{
		allHues[h] = [];
		for(var b = 0; b < 100; b++)
		{
			allHues[h][b] = 0;
		}
	}
	$.getJSON('/json/dahlia_set.json', function(data){
		var stuff = "stuff";
		var items = [];
		$.each(data.photoset.photo, function(key, photo) {
			photos[photo.id] = photo;
			var url = '/flickr_image/'+getPhotoUrl(photo, "s");
			$('#dahliaThumbs').append('<li class="thumbnail" id="photo_' + photo.id + '"><a href="' + url + '" data-photoid="'+ photo.id +'"><img src="'+url+'" /></li>');    
			photoArray.push(photo);
		});
		//processPhoto(photoArray[photoIndex].id);
		/*var allHuesJSON = JSON.stringify(allHues);
		$.ajax({
		  type: 'POST',
		  url: '/hues/json',
		  data: {'hues_json':allHuesJSON, 'photo_id':'all_dahlias'},
		  success: function(success){
			console.log('posted data');
			}
		});
		drawChart(allHues,'all_hues');
		$(".thumbnail a").click(function(event){
			event.preventDefault();
			var photoId = $(this).data('photoid');
			processPhoto(photoId);
		});*/
	});
});

function processPhoto(photoId){
	var photo = photos[photoId];
	$('#chart').empty();
	var canvas = $('#imageCanvas')[0];
	var context = canvas.getContext("2d");
	context.clearRect(0, 0, canvas.width, canvas.height);
    // load image from data url
    var imageObj = new Image();
    imageObj.onload = function(){
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.drawImage(imageObj, 0, 0);
        $.getJSON('/json/'+photoId+'.json', function success(data){
			console.log('cached hue data found');
			drawChart(data, photoId);
			photoIndex++;
			processPhoto(photoArray[photoIndex].id);
		}).error(function error(err){
			console.log('no hue data cached on server');
			var hues = sampleColors(canvas, photoId);
			drawChart(hues, photoId);
		});
    };

    imageObj.src = '/flickr_image/' + getPhotoUrl(photo, "");	
}

function sampleColors(canvas, photoId){
	var context = canvas.getContext("2d");
	var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
	var data = imageData.data;
	var hues = [];
	for (var h = 0; h < 360; h++)
	{
		hues[h] = [];
		for(var b = 0; b < 100; b++)
		{
			hues[h][b] = 0;
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
			hues[hue][brightness]++;
			allHues[hue][brightness]++;
		}
		// i+3 is alpha (the fourth element)
	}
	//var encoded = JSON.stringify(hues);
	//$('#output').innerHTML(encoded);
	var huesJSON = JSON.stringify(hues);
	$.ajax({
	  type: 'POST',
	  url: '/hues/json',
	  data: {'hues_json':huesJSON, 'photo_id':photoId},
	  success: function(success){
		console.log('posted data');
		}
	});
	return hues;
	//drawChart(hues);
}

function getPhotoUrl(photo, size)
{
	//http://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}_[mstzb].jpg
	if(size != "")
	{
		size = "_" + size;
	}
	var url = 'http://farm' 
		+ photo.farm
		+ '.staticflickr.com/'
		+ photo.server
		+ '/'
		+ photo.id 
		+ '_'
		+ photo.secret
		+ size
		+ '.jpg';
	url = encodeURIComponent(url);
	return url;
}

function drawChart(hueData, photoId)
{
	$('#chart').empty();
	$('#chart').load('/svg/'+photoId+'.svg', function(response, status, xhr){
		if(status != "error")
		{
			return;
		}
		var colWidth = 1,
		    w=colWidth*360,
			h=360,
			x = d3.scale.linear().range([0,w]),
			y = d3.scale.linear().range([0,h ]);	
		var svg = d3.select("#chart")
					.append("svg:svg")			
					.attr("height", h)
		    		.attr("width", w )
		    		.attr("height", h + 20)
		  			.append("svg:g")
		  			.attr("transform","translate(" + x(1) + "," + (h+20) + ")scale(-1,-1)");

		var body = svg.append("svg:g")
			.attr("transform", "translate(0,0)");

		//d3.json("/json/hues.json", function(data) {
			//var stackData = d3.layout.stack()(hueData);

		        var b0 = 0,
		            b1 = d3.max(hueData, function(h){
		                    return d3.sum(h, function(b){
		                        return b;
		                    });
		                }),
		            h0 = 0,
		            h1 = 359;

			x.domain([0, 360]);
			y.domain([0, b1]);

			var hue = 0;
			var bStart = 0;	
			var hues = body.selectAll("g")
				.data(hueData)
				.enter()
				.append("svg:g")
				.attr("transform", function(d, i){
					//hue = i;
					bStart = 0;
					return "translate(" + x(359-i) + ",0)";
				}).selectAll("rect")
				.data(function(d, i){
					bStart = 0;
					return d;
				})
				.enter().append("svg:rect")
				.attr("x", 0)
				.attr("y", function(d,i){
					var yPx = y(d);
					yVal = bStart;
					bStart += y(d);

					if(i == 99)
					{
						bStart = 0;

					}
					//console.info(d, bStart);
					return yVal;
				})
				.attr("width", colWidth)
				.attr("height", function(d){
					var yPx = y(d);
					return yPx;
				})
				.attr("fill", function(d,i){
					if(i == 99)
					{
						hue+=1;
					}
					return d3.hsl(hue, .75, i/100);
				});
				var svg = $('#chart').html();
				$.ajax({
				  type: 'POST',
				  url: '/hues/svg',
				  data: {'hues_svg':svg, 'photo_id':photoId},
				  success: function(success){
					console.log('posted svg');
					}
				});
	});
	//});
}