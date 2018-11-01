var express = require('express');
var router = express.Router();
var request =require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('job.html', { root: 'public' });
});

router.get('/getjob',function(req,res,next){
    console.log("IN getTodo route");
    
    var url="https://jobs.search.gov/jobs/search.json?query=";
    url+= req.query['q'];
    url+="+jobs+in+";
    url+= req.query['e'];
    console.log(url);
    request(url).pipe(res);
    
});
router.get('getstate',function(req,res,next){
    console.log("In getstate route");
    
    var fs=require('fs');
    var myRe = new RegExp("^" + req.query.q);
     fs.readFile(__dirname + '/StatesLists.dat.txt',function(err,data) {
  if(err) throw err;
  var jsonresult = [];
  var states = data.toString().split("\n");
  for(var i = 0; i < states.length; i++) {
       var result = states[i].search(myRe);
      if(result != -1) {
          console.log(states[i]);
          jsonresult.push({state:states[i]});
          
      }
  }
  res.status(200).json(jsonresult);
});
console.log(myRe);
});

module.exports = router;
