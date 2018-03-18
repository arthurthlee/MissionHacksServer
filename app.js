var express = require("express");
var bodyParser = require("body-parser");
var routes = require("./routes/routes.js");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

var drones = [];

var server = app.listen(3000, function () {
    console.log("app running on port.", server.address().port);
    createDrones();
    //var t=setInterval(statusUpdate,1000);

});

function createDrones() {
    var drone1 = ({
        availability: "Available",
    });
    var drone2 = ({
        availability: "Delivering"
    });
    drones.push(drone1);
    drones.push(drone2);
    console.log("Total Drones: " + drones.length);
}

function statusUpdate() {
    console.log("Drones Available: " + drones.filter(function (drone) {
        return drone.availability == "Available";
    }).length);
}