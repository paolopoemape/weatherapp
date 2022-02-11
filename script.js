

document.getElementById("weatherSubmit").addEventListener("click", function(event) {
  document.getElementById("Maincard").style.visibility = "visible";


  event.preventDefault();
  const value = document.getElementById("weatherInput").value;
  if (value === "")
    return;
  console.log(value);


  const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=03bc435cffd94a581457681de1e59b07";
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      let results = "";
      results += '<h2>Today\'s weather in ' + json.name + "</h2>";
      for (let i=0; i < json.weather.length; i++) {
	results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
      }
      results += '<h2>' + json.main.temp + " &deg;F</h2>"
      results += "<p>"
      for (let i=0; i < json.weather.length; i++) {
	results += json.weather[i].description
	if (i !== json.weather.length - 1)
	  results += ", "
      }
      results += "</p>";
      document.getElementById("weatherResults").innerHTML = results;

        });
  const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=f29a3e063272f8aeede645b21fe092fd";
  fetch(url2)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      let forecast = "";
      const card = document.createElement("div");
      card.classList = 'card'
      const container = document.createElement("div");
      container.classList = 'container'
      const outsidecontainer = document.createElement("div");
      outsidecontainer.classList = 'outsidecontainer'
      // Set the required alignment
      const divflex = document.createElement("div");


      // for(let i = 0; i < json.list.length; i++)
      // { forecast += "<div class=\"container{i}\">";
      for (let i=0; i < json.list.length; i++) {
        forecast += "<div class=\"divflex\">";

        forecast += "<div class=\"card\"> <div class=\"container\">";
        forecast +=  "<h2>" + moment(json.list[i].dt_txt).format('MMMM Do YYYY, h:mm:ss a') + "</h2>";
        forecast += "<p>Temperature: " + json.list[i].main.temp + "</p>";
        forecast += '<img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>';
        forecast +=  "</div class=\"card\"> </div class=\"container\">"
        forecast += "</div class=\"divflex\">";
       }
       // forectas += ""
     // }

       console.log(json);
       document.getElementById("weatherResults").style.visibility = "visible";
       document.getElementById("forecastResults").innerHTML = forecast;


         });

});
