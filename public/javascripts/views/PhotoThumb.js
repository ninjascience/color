//Filename: PhotoGallery.js

define([
  // These are path alias that we configured in our bootstrap
  'jQuery',     // lib/jquery/jquery
  'Underscore', // lib/underscore/underscore
  'Backbone'    // lib/backbone/backbone
], function($, _, Backbone){
  var PhotoThumb = Backbone.View.extend({

    tagName: "li",
    className: "thumbnail",
    template: _.template($('#photo_thumb_template').html()),
    clickHandler: null,
    events: {
     'click': 'onClick'
    },
    
    initialize: function() {
      _.bindAll(this, 'render');
    },
    
    onClick: function(){
      if(this.clickHandler){
        this.clickHandler(this.model);
      }
    },
    
    render: function() {
      $(this.el).html(this.template({
        photoId: this.model.id,
        photoUrl: '/flickr_image/' + encodeURIComponent(this.model.getPhotoUrl("s"))
      }));
      return this;
    }

  });
  return PhotoThumb;
});