import express, { Request } from "express";
import { getCoordinates, ICities, queryRegex, capitaliseCity } from "./utils";
import { getDistance } from "geolib";

const app = express();
const port = process.env.PORT || 8080;

app.get(
	"/api/distance/",
	async (req: Request<unknown, unknown, unknown, ICities>, res) => {
		try {
			const citiesSearch = req.query.cities;
			if (!citiesSearch) {
				res.status(400).json({
					message:
						"Bad request, 'cities' is missing in the quiery. Check the read-me file for instructions.",
				});
			} else {
				const requestRegexMatching = queryRegex(citiesSearch);
				if (requestRegexMatching) {
					const citiesArray = citiesSearch.split("-");
					const cityOne = capitaliseCity(citiesArray[0]);
					const cityTwo = capitaliseCity(citiesArray[1]);

					const dataCityOne = await getCoordinates(cityOne);
					const dataCityTwo = await getCoordinates(cityTwo);
					if (
						dataCityOne.name !== "not found" &&
						dataCityTwo.name !== "not found"
					) {
						const distance = getDistance(dataCityOne, dataCityTwo);
						const response = {
							cityOne: dataCityOne.name,
							cityTwo: dataCityTwo.name,
							distance,
						};
						res.send(response);
					} else {
						const response = {
							cityOne,
							cityTwo,
							message:
								"One of the two cities is either misspelled or does not exist",
						};
						res.status(400).json(response);
					}
				} else {
					res.status(400).json({
						message:
							"Bad request, in the query two cities names need to be present and be separated from '-'. Check the read-me file for more infos.",
					});
				}
			}
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	}
);

app.listen(port, () => {
	// tslint:disable-next-line:no-console
	console.log(`server started at http://localhost:${port}`);
});
