const drones = [];

module.exports = {

    move

};

function move() {
    drones.forEach(function(drone) {
        if (drone.availability == "In Transit to Warehouse") {
            if (factoryLocations[0].lat > drone.lat) {
                drone.lat++;
              }
              else if (factoryLocations[0].lat < drone.lat) {
                drone.lat--;
              }
              if (factoryLocations[0].long > drone.long) {
                drone.long++;
              }
              else if (factoryLocations[0].long < drone.long) {
                drone.long--;
              }
              if (factoryLocations[0].alt > drone.alt) {
                drone.alt++;
              }
              else if (factoryLocations[0].alt < drone.alt) {
                drone.alt--;
              }
              if (factoryLocations[0].lat == drone.lat
                && factoryLocations[0].long == drone.long
                && factoryLocations[0].alt == drone.long) {
                    drone.availability = "In Transit to Consumer"
                }
        }
        else if (drone.availability == "In Transit to Consumer") {
            if (drone.order.lat > drone.lat) {
                drone.lat++;
              }
              else if (drone.order.lat < drone.lat) {
                drone.lat--;
              }
              if (drone.order.long > drone.long) {
                drone.long++;
              }
              else if (drone.order.long < drone.long) {
                drone.long--;
              }
              if (drone.order.alt > drone.alt) {
                drone.alt++;
              }
              else if (drone.order.alt < drone.alt) {
                drone.alt--;
              }
              if (drone.order.lat == drone.lat
                && drone.order.long == drone.long
                && drone.order.alt == drone.long) {
                    drone.availability = "Returning to Station"
                }
        }
        else if (drone.availability == "Returning to Station") {
            if (stationLocations.lat > drone.lat) {
                drone.lat++;
              }
              else if (stationLocations.lat < drone.lat) {
                drone.lat--;
              }
              if (stationLocations.long > drone.long) {
                drone.long++;
              }
              else if (stationLocations.long < drone.long) {
                drone.long--;
              }
              if (stationLocations.alt > drone.alt) {
                drone.alt++;
              }
              else if (stationLocations.alt < drone.alt) {
                drone.alt--;
              }
              if (stationLocations.lat == drone.lat
                && stationLocations.long == drone.long
                && stationLocations.alt == drone.long) {
                    drone.availability = "Available";
                    drone.order = null;
                }
        }
      });
}