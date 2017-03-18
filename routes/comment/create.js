var Comments = require('../../db/comments.js');
module.exports = (router) => {
  router.post('/cm', (req, res, next) => {
    var data = new Comments();
    data.userID = req.body.userID;
    data.content = req.body.content;
    data.idPage = req.body.page;
    data.created = new Date();
    data.save();
    res.redirect(req.get('referer'));
  });

  router.post('/ecm', (req, res, next) => {
    var id = req.body.id;
    Comments.findById(id, (e, o) => {
      if(e) return;
        o.content = req.body.content;
        o.save();
    });
    next();
  });
};
