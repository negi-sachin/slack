var request=require('request');

request('http://quotes.rest/qod.json?category=students', function (err, response,data) {
    if(err){
      console.log('error:', error);
    } else {
    // var data=JSON.parse(data);
    

      console.log(JSON.parse(JSON.parse(data).contents).quote);
    }});