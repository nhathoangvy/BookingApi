    var Comments = require('../../db/comments.js');
module.exports = (router) => {

  //Facebook
  router.post('/edit-cm', (req, res) => {
    var id = req.body.id;
    Comments.findById(id, (e, o) => {
      if(e){return;}
      o.content = req.body.content;
      o.edited = new Date();
      o.save();
    });
    res.redirect(req.get('referer'));
  });


};
