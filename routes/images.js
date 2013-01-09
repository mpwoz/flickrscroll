
/*
 * GET urls for images from flickr
 */

exports.list = function(req, res){
  res.send('images', { urls: 
    [
    'http://farm9.staticflickr.com/8076/8363887136_ccb09d17c7_t.jpg',
    'http://farm9.staticflickr.com/8076/8363887136_ccb09d17c7_c.jpg',
    'http://farm9.staticflickr.com/8076/8363887136_ccb09d17c7_t.jpg',
    'http://farm9.staticflickr.com/8076/8363887136_ccb09d17c7_t.jpg'
    ] });
};
