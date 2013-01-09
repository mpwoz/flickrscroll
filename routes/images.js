
/*
 * GET urls for images from flickr
 */


var jsdom = require('jsdom'),
request = require('request'),
url = require('url');


var scrape_urls = function(params, res) {


  var uri = 'http://www.flickr.com/creativecommons/by-2.0';
  uri = uri + "/tags/" + params.tags;
  
  // E.g. /page3
  var suffix = "/page" + params.page;
  uri = uri + suffix;

  
  request(
    { uri: uri }, // /tags/{tag} if searching by tag
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


        var result = [];
        var pic_link = $('p.StreamList').
        each(function(index) {

          // Extract the link to the image's page
          var page_url = $(this).children('a').attr('href');

          // Extract the raw thumbnail location
          var src = $(this).find('img').attr('src');
          src = src.replace(/_t.jpg$/, '_q.jpg'); // get square size


          result.push( { thumburl: src, pageurl: page_url} );
        });


        res.json({urls: result});
      });
  });
};


// Get a list of urls of images
exports.list = function(req, res){

  // Default to page 1
  var page = req.params.page || "1";
  var tags = req.params.tags || "California";


  var urls = scrape_urls({page: page, tags: tags}, res);
};


