var request = require('request');
var keys = "281bdea417ce98779d90dd851051205f"
var fs = require("fs");



params = process.argv.slice(2);

function checkWeather (){
  
  var weatherApi = "http://api.openweathermap.org/data/2.5/weather?zip="
  var query = params[0];
  var jsonEnd = ",us&appid=281bdea417ce98779d90dd851051205f";
  request(weatherApi+query+jsonEnd, function (error, response, body) {
    //if (!error && response.statusCode == 200) {
      var data = JSON.parse(body)
      var ktemp = data.main.temp;
      var ftemp = (ktemp - 273.15) * 1.8 + 32;  
    // };
    if (ftemp < 45){
      movieCall("Notebook");
    } else if((ftemp > 45) && (ftemp < 60)){
      movieCall("Norwegian Ninja");
    }else{
      movieCall("The Terminator");
    }
    console.log(ftemp);
  });
}

checkWeather();


function movieCall () {
  var omdbApi = 'http://www.omdbapi.com/?t=';
  var query = params[1];
  var jsonEnd = '&y=&plot=short&r=json&tomatoes=true';
  
  request(omdbApi+query+jsonEnd, function (error, response, body) {
    if (!error && response.statusCode == 200) {

      debugger;
      var movieResults = "Title: "+ JSON.parse(body)["Title"]+ "\r\n" +
                         "Year: "+ JSON.parse(body)["Year"]+ "\r\n" +
                         "IMDB Rating: "+ JSON.parse(body)["imdbRating"]+ "\r\n" +
                         "Country: "+ JSON.parse(body)["Country"]+ "\r\n" +
                         "Language: "+ JSON.parse(body)["Language"]+ "\r\n" +
                         "Plot: "+ JSON.parse(body)["Plot"]+ "\r\n" +
                         "Actors: "+ JSON.parse(body)["Actors"]+ "\r\n" +
                         "Rotten Tomatoes Rating: "+ JSON.parse(body)["tomatoRating"];
      console.log(movieResults);
      fs.appendFile("log.txt", movieResults + "\r\n" + "\r\n" , function(err) {
        if(err) {
          return console.log(err);
        }
      });
    }
  });
}

movieCall();