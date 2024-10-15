import "./reset.css";
import "./styles.css";

const apiKey = "HNA9QJ44F2YK8BRZ4CW6SLAY2";

const searchField = document.querySelector("#search");
searchField.addEventListener("change", (event) => {
  event.preventDefault();
  let city = searchField.value;
  let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/?unitGroup=metric&key=${apiKey}`;
  


  dataProcessing(url);
  return city;
})





async function weatherData(url) {
	try {
		const response = await fetch(url, { mode: "cors" });
		const weatherData = await response.json();
		return weatherData;
	} catch (err) {
		console.log(err);
	}
	return weatherData;
}

async function dataProcessing(url) {
	const data = await weatherData(url);

  const grid = document.querySelector(".grid");
  grid.classList.remove("none");

  const city = document.querySelector("#city");
  city.textContent = data.resolvedAddress;

  const cloudCover = document.querySelector("#cloudcover");
  cloudCover.textContent = data.currentConditions.cloudcover + "%";

  const currentTemp = document.querySelector("#temp");
  currentTemp.textContent = data.currentConditions.temp + "C";

  const feelsLike = document.querySelector("#feelslike");
  feelsLike.textContent = data.currentConditions.feelslike + "C";

  const windSpeed = document.querySelector("#windspeed");
  windSpeed.textContent = data.currentConditions.windspeed + " м/с";

  const humidity = document.querySelector("#humidity");
  humidity.textContent = data.currentConditions.humidity + "%"

  const precip = document.querySelector("#precip");
  precip.textContent = data.currentConditions.precipprob + "%";

  const week = document.querySelector(".week");
  //week.textContent = data.days[0].temp + "C";

	console.log(data);
}



