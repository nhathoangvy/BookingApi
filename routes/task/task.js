    var Task = require('../../db/task.js');
    var Comments = require('../../db/comments.js');
    var User = require('../../db/user.js');
module.exports = function(router){
  router.get('/task/:id', (req, res) => {
    User.find().then((usr) => {
    Task.find().then((item) => {
      Comments.find().then((cm) => {
        var task = [];
        var comment = [];
        var users = [];
        var taskOff = [];
        var taskDone = [];
        item.forEach( (p) => {if(p._id == req.params.id){
          if(p.status == 'draft'){
            taskOff.push(p);
          }
          if(p.status == 'public'){
            task.push(p);
          }
          if(p.status == 'done'){
            taskDone.push(p);
          }
          ;}});
        cm.forEach( (c) => {if(c.idPage == req.params.id){comment.push(c);}});
        for(var i = 0 ; i < task.length; i++){
          var taskID = task[i].userID;
        }
        usr.forEach( (u) => {if(
          u._id == taskID
        ){
          users.push(u);
        }});

          res.render('single-task', { usr : users, user: req.user, comments : comment, tasks : task, taskOffs : taskOff, taskDones : taskDone});
        });
      });
    });
  });

  //jsonRes
  router.get('/task/api/:id', (req, res) => {
    User.find().then((usr) => {
    Task.find().then((item) => {
      Comments.find().then((cm) => {
        var task = [];
        var comment = [];
        var user = [];
        item.forEach( (p) => {if(p._id == req.params.id){task.push(p);}});
        cm.forEach( (c) => {if(c.idPage == req.params.id){comment.push(c);}});
        for(var i = 0 ; i < task.length; i++){
          var taskID = task[i].userID;
        }
        usr.forEach( (u) => {if(
          u._id == taskID
        ){
          user.push(u);
        }});
          res.json({ user, comment, task});
        });
      });
    });
  });

};
