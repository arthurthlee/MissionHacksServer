// Vancouver
// latitude: 49.154888,
//longitude: -123.08190,

var express = require("express");
var bodyParser = require("body-parser");
var routes = require("./routes/routes.js");
var app = express();
var warehouseLocations = [];
var stationLocations = [];

var latitudeLowerLimit = 49.154888 - 0.25;
var latitudeUpperLimit = 49.154888 + 0.25;
var longitudeLowerLimit = -123.08190 - 0.2;
var longitudeUpperLimit = -123.08190 + 0.2;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const Drone = require( './drone' );
const droneFleet = new Drone();

routes(app, droneFleet);

var server = app.listen(3000, function () {
    console.log("app running on port.", server.address().port);
    createStations();
    droneFleet.create( stationLocations[ 0 ] );
    createFactories();

    var t=setInterval(()=>{
        
        droneFleet.move( warehouseLocations[ 0 ], stationLocations[ 0 ] ) // TODO
        
    } ,1000);

});

function statusUpdate() {
    console.log("Drones Available: " + droneFleet.drones.filter(function (drone) {
        return drone.availability == "Available";
    }).length);
}

function createFactories() {
    var warehouseLocation = {
        lat: randomIntFromInterval(latitudeLowerLimit, latitudeUpperLimit),
        long: randomIntFromInterval(longitudeLowerLimit, longitudeUpperLimit),
        alt: Math.round(Math.random()*20)
    };
    warehouseLocations.push(warehouseLocation);
    console.log("Warehouses: " + JSON.stringify(warehouseLocations, null, 2));
}

function createStations() {
    var stationLocation = {
        lat: randomIntFromInterval(latitudeLowerLimit, latitudeUpperLimit),
        long: randomIntFromInterval(longitudeLowerLimit, longitudeUpperLimit),
        alt: Math.round(Math.random()*20)
    };
    stationLocations.push(stationLocation);
    console.log("Stations: " + JSON.stringify(stationLocations, null, 2));
}

function randomIntFromInterval(min,max)
{
    return Math.random()*(max-min+1)+min;
}
