
/*
 * GET urls for images from flickr
 */


var jsdom = require('jsdom'),
request = require('request'),
url = require('url');


var scrape_urls = function(res) {
  request(
    { uri: 'http://www.flickr.com/creativecommons/by-2.0' }, // /tags/{tag} if searching by tag
    function(err, response, body){
      var self = this;
      self.items = [];
      if(err && response.statusCode !== 200){console.log('Request error.');}
      //Send the body param as the HTML code we will parse in jsdom
      //also tell jsdom to attach jQuery in the scripts and loaded from jQuery.com
      jsdom.env({
        html: body,
        scripts: ['http://code.jquery.com/jquery-1.6.min.js']
      }, 
      function(err, window){
        var $ = window.jQuery;
        console.log($('title').text());


        var result = [];
        var pics = $('p.StreamList img').
        each(function(index) {
          result.push( $(this).attr('src') );
        });
        console.log(result);


        res.json({urls: result});

        
      });
  });
};


exports.list = function(req, res){
  var urls = scrape_urls(res);

  /*
  res.json({ urls: urls
    [
    'http://farm9.staticflickr.com/8076/8363887136_ccb09d17c7_t.jpg',
    'http://farm9.staticflickr.com/8076/8363887136_ccb09d17c7_c.jpg',
    'http://farm9.staticflickr.com/8076/8363887136_ccb09d17c7_t.jpg',
    'http://farm9.staticflickr.com/8076/8363887136_ccb09d17c7_t.jpg'
    ] });
  */
};


