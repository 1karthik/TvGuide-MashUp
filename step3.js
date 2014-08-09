var async = require('async');
var http = require('http');
var request = require('request');
var urls =[
"http://indian-television-guide.appspot.com/indian_television_guide?channel=hbo&date=24062014", "http://indian-television-guide.appspot.com/indian_television_guide?channel=colors&date=24062014", "http://indian-television-guide.appspot.com/indian_television_guide?channel=maa-tv&date=24062014"
];

async.map(urls, function(url, callback) {
    request(url, function(err, response, body) {
      callback(err, JSON.parse(body));
    })
}, function(err, obj) {
     if(err) {
        return console.error(err);
    } 
console.log(obj);

     for (var i=0; i < obj[listOfShows].length; i++)  {
             sortbydate = obj.listOfShows[i].showTime  +  " - "  + obj.listOfShows[i+1].showTime + " ---->" + obj.listOfShows[i].showTitle;
console.log(sortbydate);
}

});
