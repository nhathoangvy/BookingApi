var Post = require('../db/post.js');
var isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated())
      return next();
      res.redirect('/');
    }
module.exports = function(router){
  router.get('/jsonfilter', isLoggedIn, (req, res) => {
      var key = req.query.key;
      Post.find({property: {'$regex': key, $options: 'i'}}).then((post) => {
        var filter = [];
      post.forEach( (i) => {
        if(i.userID == req.user._id){
            filter.push(i);
        }
      });
    res.json({ filter });
      });
    });
};
