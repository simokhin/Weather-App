import "./reset.css";
import "./styles.css";

const apiKey = "HNA9QJ44F2YK8BRZ4CW6SLAY2";

let city = `Moscow`;
let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/?unitGroup=metric&key=${apiKey}`;

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

async function dataProcessing() {
	const data = await weatherData(url);
	console.log(data);
}

