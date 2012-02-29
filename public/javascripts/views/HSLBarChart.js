//Filename: PhotoGallery.js
define([
// These are path alias that we configured in our bootstrap
'jQuery',
// libs/jquery/jquery
'Underscore',
// libs/underscore/underscore
'Backbone',
// libs/backbone/backbone
'libs/d3/d3wrap'
],
function($, _, Backbone, d3) {
    var HSLBarChart = {


        render: function(selector, hues) {
            $(selector).empty();
            
            //TODO: use d3.nest?
            var huesNested = [];
            for(var i = 0;i < hues.length;i++){
              var hue = [];
              for(var bKey in hues[i]){
               hue.push({'h':i,'b':bKey,'count':hues[i][bKey]})
              }
              huesNested.push(hue);
            }
            
            var colWidth = 2,
            w = colWidth * 360,
            h = 360,
            x = d3.scale.linear().range([0, w]),
            y = d3.scale.linear().range([0, h]);
            var svg = d3.select(selector)
            .append("svg:svg")
            .attr("height", h)
            .attr("width", w)
            .attr("height", h + 20)
            .append("svg:g")
            .attr("transform", "translate(" + x(1) + "," + (h + 20) + ")scale(-1,-1)");

            var body = svg.append("svg:g")
            .attr("transform", "translate(0,0)");

            //d3.json("/json/hues.json", function(data) {
            //var stackData = d3.layout.stack()(hueData);
            var b0 = 0;
            var b1 = d3.max(huesNested,
            function(h) {
                var sum = d3.sum(h,
                function(b) {
                    return b.count;
                });
                //console.info('sum: ' + sum + ', hue: ' + h[0].h);
                return sum;
            });
            var h0 = 0,
                h1 = 359;

            x.domain([0, 360]);
            y.domain([0, b1]);
            var lastHue;
            var hue = 0;
            var bStart = 0;
            var huesElement = body.selectAll("g")
                        .data(huesNested)
                        .enter()
                        .append("svg:g")
                        .attr("transform",
                        function(d, i) {
                            //hue = i;
                            bStart = 0;
                            return "translate(" + x(359 - i) + ",0)";
                        }).selectAll("rect")
                        .data(function(d, i) {
                            bStart = 0;
                            return d;
                        })
                        .enter().append("svg:rect")
                        .attr("x", 0)
                        .attr("y",
                        function(d, i) {
                            var yPx = y(d.count);
                            if (d.h > lastHue)
                            {
                                bStart = 0;
                            }
                            yVal = bStart;
                            
                            bStart += yPx;
                            lastHue = d.h;
                            return yVal;
                        })
                        .attr("width", colWidth)
                        .attr("height",
                        function(d) {
                            var yPx = y(d.count);
                            return yPx;
                        })
                        .attr("fill",
                        function(d, i) {
                            hue = d.h
                            return d3.hsl(d.h, .75, d.b / 100);
                        });
                
            return this;
        }
    };
    
    return HSLBarChart;
  });