var express = require('express');
var schedule = require('node-schedule');
var fse = require('fs-extra');
var http = require('http');



// default port where dev server listens for incoming traffic
var port = 8081

var app = express()

// serve pure static assets
app.use('/',express.static('../dist'))

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/crmdb1';


var selectData = function(collection, callback) {
  //查询数据
  collection.find().sort({"current":-1}).toArray(function(err, result) {
    if(err)
    {
      console.log('Error:'+ err);
      return;
    }
    callback(result);
  });
}
var insertData = function(collection, data, callback) {
  //插入数据
  collection.insert(data, function(err, result) {
    if(err)
    {
      console.log('Error:'+ err);
      return;
    }
    callback(result);
  });
}
var deleteData = function(collection, callback) {
  //删除数据
  collection.remove(function(err, result) {
    if(err)
    {
      console.log('Error:'+ err);
      return;
    }
    callback(result);
  });
}
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/getNamelist', function (req, res) {
  MongoClient.connect(DB_CONN_STR, function(err, db) {
    var tb1 = db.collection('tb1');
    selectData(tb1, function(result) {
      console.log(result);
      res.send({list:result})
      db.close();
    });
  });
})
http.request=(function(_request){
  return function(options,callback){
    var timeout=options['timeout'],
      timeoutEventId;
    var req=_request(options,function(res){
      res.on('end',function(){
        clearTimeout(timeoutEventId);
        console.log('response end...');
      });

      res.on('close',function(){
        clearTimeout(timeoutEventId);
        console.log('response close...');
      });

      res.on('abort',function(){
        console.log('abort...');
      });

      callback(res);
    });

    //超时
    req.on('timeout',function(){
      req.res && req.res.abort();
      req.abort();
    });

    //如果存在超时
    timeout && (timeoutEventId=setTimeout(function(){
      req.emit('timeout',{message:'have been timeout...'});
    },timeout));
    return req;
  };

})(http.request)
var getRank = function () {
  var options = {
    host: 's.jlxmt.cn',
    port: 80,
    method: 'GET',
    path: '/cgi-bin/merchant/get.html',
    timeout:5000
  };
  var req = http.request(options, function (res) {
    res.setEncoding('utf8');
    res.on('data', function (idGroup){
      idGroup = JSON.parse(idGroup);
      MongoClient.connect(DB_CONN_STR, function(err, db) {
        var names = fse.readJsonSync('./name.json').name;
        names.forEach(function (names) {
          var count = 0;
          idGroup.forEach(function (ids) {
            if((parseInt(ids.id) >= parseInt(names.start)) && (parseInt(ids.id) <= parseInt(names.end))){
              count++;
            }
          })
          names.current = count;
        })
        var tb1 = db.collection('tb1');
        deleteData(tb1, function(result) {
          //console.log(result);
          insertData(tb1, names, function(result) {
            console.log(result);
            db.close();
            console.log("获取数据" + new Date());
          });
        });
      });
    });
  })
  req.on('error',function(e){
    console.log("error got :"+e.message);
  }).on('timeout',function(e){
    console.log('timeout got :'+e.message);
  });
  req.end();
}
getRank();
var j = schedule.scheduleJob('*/30 * * * *', getRank);


console.log('> Starting dev server...')


var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
