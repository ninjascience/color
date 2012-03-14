
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , url = require('url')
  , fs = require('fs')
  , path = require('path')
  , http = require('http');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.compiler({ src: __dirname + '/public', enable: ['less'] }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
  app.get('/dahlia/process', routes.dahlia.process);
});


// Routes

app.get('/', routes.index);
app.get('/dahlia', routes.dahlia);
app.get('/rhone', routes.rhone);


// image proxy

app.get('/flickr_image/:image_url', function(request_from_client, response_to_client){
  //sys.puts("Starting proxy");
  var image_url = request_from_client.params.image_url;
  var pathname = url.parse(image_url).pathname;
  var filename = pathname.split("/").pop();

	var http_client;
	var image_get_request;
  var image_host_name;
  var port;
  var localPath = __dirname + "/public/images/cache/"+filename;
  console.log('looking for ' + localPath);
  path.exists(localPath, function(exists) { 
    if (exists) { 
      console.log('cache exists for: ' + filename);
      getFile(localPath, response_to_client);
    } else { 
      console.log('no cache for: ' + filename);
  		image_host_name = url.parse(image_url).hostname;
  		port = 80;
  		http_client = http.createClient(port, image_host_name);
    	image_get_request = http_client.request('GET', pathname, {"host": image_host_name, "port":port});
    	  image_get_request.addListener('response', function(proxy_response){
    		var current_byte_index = 0;
    		var response_content_length = parseInt(proxy_response.header("Content-Length"));
    		var response_body = new Buffer(response_content_length);

    		proxy_response.setEncoding('binary');
    		proxy_response.addListener('data', function(chunk){
    		  response_body.write(chunk, current_byte_index, "binary");
    		  current_byte_index += chunk.length;
    		});
    		proxy_response.addListener('end', function(){
    		  response_to_client.contentType(filename);
    		  response_to_client.send(response_body);
    		});
    	});
  	  image_get_request.end();
    } 
    
  });
});

function getFile(localPath, res) { 
  console.log('load file: ' + localPath);
  // read the file in and return it, or return a 500 if it can't be read 
  fs.readFile(localPath, function(err, contents) { 
    if (!err) { 
      // use defaults instead of res.writeHead() 
      res.end(contents); 
    } else { 
      res.writeHead(500); res.end();
    }
  });
}



app.post('/hues/json', function(request_from_client, response_to_client){
	var hues = request_from_client.body.hues_json;
	var photo_id = request_from_client.body.photo_id;
	var stream = fs.createWriteStream('public/json/hsl_'+photo_id+".json");
	stream.once('open', function(fd) {
	  stream.write(hues);
	});
	response_to_client.send('');
});


app.post('/hues/svg', function(request_from_client, response_to_client){
	var svg = request_from_client.body.hues_svg;
	var photo_id = request_from_client.body.photo_id;
	var stream = fs.createWriteStream('public/svg/'+photo_id+".svg");
	stream.once('open', function(fd) {
	  stream.write(svg);
	});
	response_to_client.send('');
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
