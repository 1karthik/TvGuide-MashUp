 var http = require('http');
//var channelName = "maa-tv";
var  date = "24062014";
var querystring = require('querystring');
var qs = querystring.stringfy({channelName: ['maa-tv', 'hbo']})
var baseURL = 'http://indian-television-guide.appspot.com/indian_television_guide?';

var url = baseURL + "channel=" + qs + "&date=" + date;

var MongoClient = require('mongodb').MongoClient
                        , format = require('util').format;

http.get(url, function(res) {
    var body = '';

    res.on('data', function(chunk) {
        body += chunk;
    });

    res.on('end', function() {
        var obj = JSON.parse(body)
        console.log("By date", obj.date);
         for (var i=0; i < obj['listOfShows'].length; i++)  {
             sortbydate = obj.listOfShows[i].showTime  +  " - "  + obj.listOfShows[i+1].showTime + " ---->" + obj.listOfShows[i].showTitle;
}
});
}).on('error', function(e) {
      console.log("error: ", e);
});
