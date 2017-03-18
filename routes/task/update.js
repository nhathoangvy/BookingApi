var Task = require('../../db/task.js');
module.exports = (router) => {


  //Facebook
  router.post('/editTask', (req, res, next) => {
    var id = req.body.id;
    Task.findById(id, (e, o) => {
      if(e){return;}
      o.purpose = req.body.purpose;
      o.priceMin = req.body.priceMin;
      o.priceMax = req.body.priceMax;
      o.local = req.body.local;
      o.property = req.body.property;
      o.status = req.body.status;
      o.edited = new Date();
      o.save();
    });
    res.redirect(req.get('referer'));
  });


};
