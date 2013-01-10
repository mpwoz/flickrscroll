


(function indexPage() {

  var request_images = function(tags, page, numPages, successCallback) {
    $.ajax({
      url: '/images/' + tags + '/' + page + '/' + numPages,
      method: 'GET',
      success: function(data) {
      
        var items = $(data).filter('div.item');
        var imgs = items.find('img');

        imgs.load(function() {
          $(this).hide();
          // A link to the original image
          $('#images').append($(this).parent().parent());
          $(this).fadeIn({
            duration:1000
          });
        });

        successCallback();

      }
    });
  };




  var pageLoader = function(tag, start, step) {

    return {
      // Load the next set of images up and append them
      load: function(successCallback) {
        //for (var i = start; i < start + step; i++) {
          request_images(tag, start, step, successCallback);
        //}
        start += step;
      },
      

      // Change tag and reset counter
      reset: function(newTag) {
        tag = newTag;
        start = 1;
        $('#images').html(""); // clear current images
      }
    };

  }('Wisconsin', 1, 5);


  var setWaypoint = function(loadItems) {
    var $footer = $('#main-container');


    return function() {
      $footer.waypoint(function() {
        console.log('waypoint Triggered!');
        $footer.waypoint('destroy');
        loadItems(setWaypoint);
      },
      {
        offset: function() {
          var windowHeight = $(window).height();
          var ofst = 100;
          return -$(this).height() + windowHeight + ofst;
        }
      });
    };
  }(pageLoader.load);



  // Document ready handler
  $(function() {
    pageLoader.load(setWaypoint);

    $('#tag-form').submit( function( evt ) {
      evt.preventDefault();
      tag_text = $('#tag-text').val();
      pageLoader.reset(tag_text);
      pageLoader.load(setWaypoint);
    });

  }); // document ready
})(); // indexPage() function



