var express = require('express')

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
  collection.find({current:{'$gt':0}}).sort({"current":-1}).toArray(function(err, result) {
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


MongoClient.connect(DB_CONN_STR, function(err, db) {
  //console.log("连接成功！");
  var ids = [{id:'1'},{id:'2'},{id:'3'},{id:'4'},{id:'5'},{id:'6'},{id:'14'},{id:'15'},{id:'26'}];
  var names = [
    {name:'骆书林',major:'自动化',start:'1',end:'10',current:''},
    {name:'陈树淘',major:'工商管理',start:'11',end:'20',current:''},
    {name:'吴允阳',major:'计算机科学与技术',start:'21',end:'30',current:''}
  ];
  names.forEach(function (names) {
    var count = 0;
    ids.forEach(function (ids) {
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
    });
  });
});

console.log('> Starting dev server...')


var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
