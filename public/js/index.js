

function loadImage(url) {

  var img = $('<img />')
    .attr('src', url)
    .load(function() {
      img.hide();
      var div = $('<div />').attr('class', 'item').append(img);
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

      /*

      */

    }
  });
};



// Document ready handler
$(function() {
  // Request 10 pages of images
  for (var i=1; i<50; i++) {
    request_images('California', i);
  }

  /*
  // Apply intelligent layout 
  $('#images').imagesLoaded(function() {
    $('#images').masonry({
      itemSelector: '.item',
      columnWidth: 260,
      isAnimated: true
    });
  });
  */

});



