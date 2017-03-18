var Comments = require('../../db/comments.js');
module.exports = (router) => {

//Facebook
router.post('/del-cm', (req, res) => {
  var id = req.body.id;
  Comments.findByIdAndRemove(id).exec();
  res.redirect(req.get('referer'));
  });
};
