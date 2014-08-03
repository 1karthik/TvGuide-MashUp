var http = require('http');
var channelName = "maa-tv";
var  date = "24062014";

var baseURL = 'http://indian-television-guide.appspot.com/indian_television_guide?';

var url = baseURL + "channel=" + channelName + "&date=" + date;

var MongoClient = require('mongodb').MongoClient
                        , format = require('util').format;

var _ = require('lodash-node');
var channelsByID = {};
var channelid;
MongoClient.connect("mongodb://localhost:27017/twpr", function(err, db) {
  if(err) { return console.dir(err); }
console.log("Connected to mongodb");
http.get(url, function(res) {
    var body = '';

    res.on('data', function(chunk) {
        body += chunk;
    });
    res.on('end', function() {
          var obj = JSON.parse(body)
db.collection("channelids").find({'channelname': channelName}, {'channelid': true, '_id':false}).toArray(function(err, results){
 channelid = results
console.log(channelid);
 });
    _.each(obj["listOfShows"], function (channels) {
    channelsByID[channelid + '-' + channels.showTitle] = {
       showname: channels["showTitle"],
       showdescription: channels.showDetails["Show Description"]
    };
});
console.log(channelsByID); 
db.collection('channeldescription').save(channelsByID, function(err, records) {
     if (err) throw err;
  console.log("record added");
});
});
}).on('error', function(e) {
      console.log("error: ", e);
});
});