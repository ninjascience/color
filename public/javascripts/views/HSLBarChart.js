//Filename: PhotoGallery.js
define([
'jQuery',
'libs/d3/d3wrap'
],
function($, d3) {
    var HSLBarChart = {

        clear: function(selector) {
          var element = $(selector);
          
          var canvas = element[0];
          var context = canvas.getContext('2d');
      		context.clearRect(0, 0, canvas.width, canvas.height);
        },
        
        render: function(selector, hues) {
            var element = $(selector);
            
            this.clear(selector);
        		
            var canvas = element[0];
            var context = canvas.getContext('2d');
        		
            //TODO: use d3.nest?
            var huesNested = [];
            for(var i = 0;i < hues.length;i++){
              var hue = [];
              for(var bKey in hues[i]){
               hue.push({'h':i,'b':bKey,'count':hues[i][bKey]})
              }
              huesNested.push(hue);
            }
            var colWidth = element.width()/hues.length;
            var chartHeight = element.attr('height');
            
            var w = element.width(),
            x = d3.scale.linear().range([0, w]),
            y = d3.scale.linear().range([0, chartHeight]);
            

            var b0 = 0;
            var b1 = d3.max(huesNested,
            function(h) {
                var sum = d3.sum(h,
                function(b) {
                    return b.count;
                });
                return sum;
            });
            var h0 = 0,
                h1 = 359;

            x.domain([0, h1]);
            y.domain([0, b1]);
            var lastHue;
            var hue = 0;
            var bStart = 0;
            huesNested.map(function(col) {
              var bStart = 0;
              col.map(function(block) {
                var color = d3.hsl(block.h, .75, block.b / 100).toString();
                context.fillStyle = color;
                var xVal = block.h * colWidth;
                var height = Math.round(y(block.count));
                context.fillRect(xVal, chartHeight-bStart-height, colWidth, height);
                bStart += height;
              });
                
            });
            return this;
        }
    };
    
    return HSLBarChart;
  });