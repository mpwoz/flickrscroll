

// Param should look like: { thumburl: <link to square image>, pageurl: <link to image page> }
function loadImage(param) {

  var img = $('<img />')
    .attr('src', param.thumburl)
    .load(function() {
      img.hide();

      // A link to the original image
      var div = $('<div />').attr('class', 'item');
      var link = $('<a />').attr('href', 'http://www.flickr.com' + param.pageurl);
      link.append(img);
      div.append(link);
      $('#images').append(div);

      img.fadeIn({
        duration:1000
      });
    });
}

var request_images = function(tags, page) {
  $.ajax({
    url: '/images/' + tags + '/' + page,
    method: 'GET',
    success: function(data) {
      for(var i=0; i<data.urls.length; i++) {
        loadImage(data.urls[i]);
      }


    }
  });
};


var load_image_pages = function(tag, startpage, numpages) {
  // Defaults
  startpage = startpage || 1;
  numpages = numpages || 7;

  for (var i=startpage; i<numpages; i++) {
    request_images(tag, i);
  }
};


// Document ready handler
$(function() {
  load_image_pages('California');

  $('#tag-form').submit( function( evt ) {
    evt.preventDefault();
    $('#images').html(""); // clear current images
    tag_text = $('#tag-text').val();
    load_image_pages(tag_text);
  });

});




