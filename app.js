var express = require("express");
var bodyParser = require("body-parser");
var routes = require("./routes/routes.js");
var app = express();
var warehouseLocations = [];
var stationLocations = [];

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
    var factoryLocation = {
        lat: Math.round(Math.random()*100),
        long: Math.round(Math.random()*100),
        alt: Math.round(Math.random()*20)
    };
    warehouseLocations.push(factoryLocation);
    console.log("Warehouses: " + JSON.stringify(warehouseLocations, null, 2));
}

function createStations() {
    var stationLocation = {
        lat: Math.round(Math.random()*100),
        long: Math.round(Math.random()*100),
        alt: Math.round(Math.random()*20)
    };
    stationLocations.push(stationLocation);
    console.log("Stations: " + JSON.stringify(stationLocations, null, 2));
}


