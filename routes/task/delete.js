var Task = require('../../db/task.js');
module.exports = (router) => {

//Facebook
router.post('/del-task', (req, res) => {
  var id = req.body.id;
  Task.findByIdAndRemove(id).exec();
  res.redirect('/user');
  });
};
