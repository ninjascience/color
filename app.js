
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , url = require('url')
  , http = require('http');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  //app.use(express.compiler({ src: __dirname + '/public', enable: ['less'] }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});


// image proxy

app.get('/flickr_image/:image_url', function(request_from_client, response_to_client){
  //sys.puts("Starting proxy");
  var image_url = request_from_client.params.image_url;

  var image_host_name = url.parse(image_url).hostname
  var filename = url.parse(image_url).pathname.split("/").pop()

  var http_client = http.createClient(80, image_host_name);
  var image_get_request = http_client.request('GET', image_url, {"host": image_host_name});
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
});


// Routes

app.get('/', routes.index);
app.get('/dahlia', routes.dahlia);
app.get('/dahlia/search', routes.dahlia.search);

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
