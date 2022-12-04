<h1>City Distance</h1>

Small server for calculating the distance between 2 cities.

<h2>Description:</h2>

In order to get the distance you need to ping.

'/api/distance/?cities=cityOne-cityTwo'

it returns the names of the two cities and the distance between them in meters.

The server is built on Express using Typescript

<h2>Dependencies:</h2>


"express": main framework
"geolib": to calculate the distance.
"node-fetch": to fetch the coordinates for ninja api
"nodemon": to keep the server running

<h2>Installing:</h2>
Installing

clone the repository and run `npm install`
run `npm run start` to run it locally
