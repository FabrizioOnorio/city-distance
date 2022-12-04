City Distance

Small server for calculating the distnace between 2 cities.

Description:

In order to get the distance you need to ping.

'/api/distance/?cities=cityOne-cityTwo'

it returns the names of the two cities and the distance between them in meters.

The server is built on Express using Typescript

Dependencies:

"express": main framework
"geolib": to calculate the distance.
"node-fetch": to fetch the coordinates for ninja api
"nodemon": to keep the server running


Installing

clone the repository and run `npm install`
run `npm run start` to run it locally
