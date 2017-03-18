var Task = require('../../db/task.js');
module.exports = (router) => {

  //facebook
  router.post('/upFB', (req, res, next) => {
      var tasks = new Task();
      tasks.purpose = req.body.purpose;
      tasks.priceMin = req.body.priceMin;
      tasks.priceMax = req.body.priceMax;
      tasks.local = req.body.local;
      tasks.property = req.body.property;
      tasks.author = req.body.author;
      tasks.reward = req.body.reward;
      tasks.userID = req.body.id;
      tasks.status = 'draft';
      tasks.created = new Date();
      tasks.save();
    var url = tasks._id.toString();

    //req.session.live = true;
    res.redirect('/task/'+ url);
  });


};
