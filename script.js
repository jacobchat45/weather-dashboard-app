let apiKey = "63cf64acbdffa25cbaeb2a529ad13de3";

let inputCity = document.querySelector("#search-input")
let button = document.querySelector("#search-button");
let inputResult;
// this gets the value of what's submitted inside the form and then calls the getWeather function
  button.addEventListener("click", function(event){
    event.preventDefault();
   inputResult = inputCity.value;
    getWeather(); 
    
  }
    
  )
// this gets the actual weather from the getWeather function which returned long/latitude
function grabWeather(lat, lon){
  let srcLink = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
     $.ajax({
      url: srcLink,
      method: "GET"
     }).then(function(response){
        //  console.log(response);
       let forecastObjects = response.list;
       filterForecastObjects(forecastObjects);


     });
}
// this filters through our response and gets midday results for each 5 day forecast
function filterForecastObjects(arrayOfObjects){
  // takes our objects array and cycles through its length
  for(let i = 0; i < arrayOfObjects.length; i++){
    // assigns a usuable variable to each iteration of the array of objs
    const forecastObject = arrayOfObjects[i];
    console.log(forecastObject);
    let forecastTemp = forecastObject.main.temp - 273.15;
    console.log(forecastTemp);
    // using moment
    let forecastMoment = moment(forecastObject.dt_txt);
    let forecastDateTime = forecastMoment.format("hA");
    if(forecastDateTime === "12PM"){
      // only get midday for each remaining 5 day forecast
          renderForecastCard(forecastMoment);
         
    }


  }
}

let forecastHold = document.querySelector("#forecast");
// this renders the 5 day forecast, appending the contents
function renderForecastCard(momentObject){
  
       let formatDate = momentObject.format("ddd");
       const createDay = document.createElement("div");
       createDay.innerHTML = formatDate;
       createDay.setAttribute("class", "col-lg-9");
       forecastHold.prepend(createDay);
       // need temp, wind and humidity as a percentage
       const createTemp = document.createElement("div");
         
       // create div with text as date
       // append to forecastHold

}
// this gets the long/lat of what the user submits inside the page's form
function getWeather() {
    let srcLink = "http://api.openweathermap.org/geo/1.0/direct?q=" + inputResult + " &appid=" + apiKey;
    $.ajax({
      url: srcLink,
      method: "GET"
    }).then(function(response) {
     console.log(response);
     grabWeather(response[0].lat, response[0].lon);
    });
  };

  // to-do:
  // finish the code to append the 5 day forecast
  // make the code to append the current day's forecast
  // use local storage to create buttons which brings up the current/report
  // use a function to do this?
  // would need to use the values stored inside the storage to create the report
  