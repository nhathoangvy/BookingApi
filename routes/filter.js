    var Task = require('../db/task.js');
module.exports = (router) => {
  router.post('/s', (req, res) =>{
    var status = req.body.status;
    var purpose = req.body.purpose;
    var priceM = req.body.priceM;
    var priceMa = req.body.priceMa;
    var properties = req.body.property;
    var local = req.body.local;
    res.redirect('/filter?status=' + status + '&purpose=' + purpose + '&properties=' + properties + '&local=' + local +'&priceM=' + priceM +'&priceMa=' + priceMa);
  });

  router.get('/filter', (req, res) => {
    var status = req.query.status;
    var purpose = req.query.purpose;
    var priceM = req.query.priceM;
    var priceMa = req.query.priceMa;
    var properties = req.query.properties;
    var local = req.query.local;
Task.find(
     {$and:[
           {status:{"$in":[status]}},
           {purpose:{"$in":[purpose]}},
           {priceMin:{"$in":[priceM]}},
           {priceMax:{"$in":[priceMa]}},
           {property : {'$in': [properties]}},
           {local : {'$in': [local]}}
       ]}
   ).then((task) => {
        res.render('filter', {tasks : task});
  });
});

};
