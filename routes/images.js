
/*
 * GET urls for images from flickr
 */


var jsdom = require('jsdom'),
request = require('request'),
url = require('url');


// Scrape a single page
var scrape_page = function(uri, page, success) {
  
  console.log("scraping page " + page);

  // E.g. /page3
  var suffix = "/page" + page;
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


        var result = "";
        var pic_link = $('p.StreamList').
        each(function(index) {

          // Extract the link to the image's page
          var page_url = 'http://www.flickr.com' + $(this).children('a').attr('href');

          // Extract the raw thumbnail location
          var src = $(this).find('img').attr('src');
          src = src.replace(/_t.jpg$/, '_q.jpg'); // get square size

          result +=
            '<div class="item"><a href="' +
            page_url +
            '"><img src="' +
            src +
            '"></a></div>'
          ;


        });

        // Callback with all the data
        success(result);
      });
  });
};

function aggregate_results(total, res) {

  
  var result = "";
  var completed_count = 0;

  return function(partial_result) {
    completed_count++;
    result += partial_result;

    console.log('success! scraped ' + completed_count + ' of ' + total);

    if(completed_count == total) {
      res.send( result );
    }
  };
}

// Scrape a range of pages
var scrape_pages = function(params, res) {

  var page = parseInt(params.page, 10),
      numPages = parseInt(params.numPages, 10),
      tags = params.tags;


  var uri = 'http://www.flickr.com/creativecommons/by-2.0';
  uri = uri + "/tags/" + tags;

  handler = aggregate_results(numPages, res);


  for (var i=page; i<page + numPages; i++) {
    scrape_page(uri, i, handler);
  }

};


// Get a list of urls of images
exports.list = function(req, res){

  // Default to page 1
  var page = req.params.page || "1";
  var numPages = req.params.numPages || "3";
  var tags = req.params.tags || "California";

  console.log("scraping with params: ");
  console.log("    page: " + page);
  console.log("    num: " + numPages);
  console.log("    tags: " + tags);

  scrape_pages({
    page: page, 
    numPages: numPages, 
    tags: tags
  }, res);
};


