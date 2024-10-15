import "./reset.css";
import "./styles.css";

navigator.geolocation.getCurrentPosition((position) => {
	let latitude = position.coords.latitude;
	let longtitude = position.coords.longitude;
	fetch(
		`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longtitude}&apiKey=ffd1e9a0c32e402594fdd39617ed56df`
	)
		.then((response) => {
			return response.json();
		})
		.then((response) => {
			return response.features[0].properties.address_line1;
		})
		.then((response) => {
			let city = response;
			let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longtitude}/?unitGroup=metric&key=${apiKey}`;
			dataProcessing(url, city);
		});
});

const apiKey = "HNA9QJ44F2YK8BRZ4CW6SLAY2";

const searchField = document.querySelector("#search");

searchField.addEventListener("keydown", (event) => {
	if (event.key === "Enter") {
    event.preventDefault();
    let city = searchField.value;
    let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/?unitGroup=metric&key=${apiKey}`;

    dataProcessing(url)
  }
  else {
    return
  }
});

searchField.addEventListener("change", (event) => {
	event.preventDefault();

	let city = searchField.value;
	let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/?unitGroup=metric&key=${apiKey}`;

	dataProcessing(url);
	return city;
});

async function weatherData(url) {
	try {
		const response = await fetch(url, { mode: "cors" });
		const weatherData = await response.json();
		return weatherData;
	} catch (err) {
		console.log(err);
		return;
	}
	return weatherData;
}

async function dataProcessing(url, city) {
	console.log(city);
	const data = await weatherData(url);

	const grid = document.querySelector(".grid");
	grid.classList.remove("none");

	const ccity = document.querySelector("#city");
	if (city === undefined) {
		ccity.textContent = data.resolvedAddress;
	} else {
		ccity.textContent = city;
	}

	const cloudCover = document.querySelector("#cloudcover");
	cloudCover.textContent = data.currentConditions.cloudcover + "%";

	const currentTemp = document.querySelector("#temp");
	currentTemp.textContent = data.currentConditions.temp + "C";

	const feelsLike = document.querySelector("#feelslike");
	feelsLike.textContent = data.currentConditions.feelslike + "C";

	const windSpeed = document.querySelector("#windspeed");
	windSpeed.textContent = data.currentConditions.windspeed + " м/с";

	const humidity = document.querySelector("#humidity");
	humidity.textContent = data.currentConditions.humidity + "%";

	const precip = document.querySelector("#precip");
	precip.textContent = data.currentConditions.precipprob + "%";

	const week = document.querySelector(".week");
	//week.textContent = data.days[0].temp + "C";

	console.log(data);
}
