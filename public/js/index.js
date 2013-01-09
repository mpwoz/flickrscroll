

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

$.ajax({
  url: '/images',
  method: 'GET',
  success: function(data) {
    for(var i=0; i<data.urls.length; i++) {
      loadImage(data.urls[i]);
    }

    $('#images').masonry({
      itemSelector: '.item',
      columnWidth: 260,
      isAnimated: true
    });
  }
});



