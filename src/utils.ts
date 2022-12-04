import fetch from "node-fetch";
import * as dotenv from "dotenv";
dotenv.config();

export const getCoordinates = async (city: string) => {
	const response = await fetch(
		"https://api.api-ninjas.com/v1/city?name=" + city,
		{
			headers: {
				"X-Api-Key": process.env.CITY_API_KEY,
			},
		}
	);
	const data = await response.json();
	if (data.length === 0) {
		return { name: "not found", latitude: 0, longitude: 0 };
	} else {
		return {
			name: data[0].name,
			latitude: data[0].latitude,
			longitude: data[0].longitude,
		};
	}
};

export const queryRegex = (query: string) => {
	const stringPattern = /[a-z]+\s?[a-z]+-[a-z]+\s?[a-z]+$/i;
	return stringPattern.test(query);
};

export const capitaliseCity = (city: string) => {
	return city.charAt(0).toUpperCase() + city.slice(1);
};
