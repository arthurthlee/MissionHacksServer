var userOrders = [];
var currentOrderId = 0;

var appRouter = function (app, droneFleet) {
    app.get("/", function(req, res) {
      res.status(200).send("Welcome to our restful API");
    });

    app.get("/packageLocation/:orderId", function (req, res) {  
      //console.log("Drone : " + JSON.stringify(droneFleet.drones, null, 2));
      //console.log("Request orderId: " + req.params.orderId);
      var orderInfo = userOrders.filter(function(order) {
        return Number(order.userOrderId) === Number(req.params.orderId);
      }) [0];

      var orderExists = true;

      var droneLocation = droneFleet.drones.filter(function(drone) {
        if (drone.order == null) {
          res.status(200).json("PACKAGE ARRIVED");
          orderExists = false;
          return;
        }
        return Number( drone.order.userOrderId ) === Number( req.params.orderId );
      })[ 0 ];

      if (!orderExists) {
        return
      }

      //console.log("Drone Location : " + JSON.stringify(droneLocation));
      if (droneLocation.lat == orderInfo.lat
        && droneLocation.long == orderInfo.long
        && droneLocation.alt == orderInfo.long) {
      res.status(200).json("PACKAGE ARRIVED");
        }
        else {
      res.status(200).json(droneLocation);
        }
    });

    app.post("/placeOrder", function (req, res) {
      var orderId = currentOrderId;
      var userOrder = ({
          lat: req.body.lat,
          long: req.body.long,
          alt: req.body.alt,
          userId: req.body.userId,
          productId: req.body.productId,
          timeOfOrder: req.body.timeOfOrder,
          userOrderId: orderId,
      });

       userOrders.push(userOrder);
       res.status(201).json(orderId);
      currentOrderId++;
      var availableDrone = droneFleet.findAvailable();
      availableDrone.availability = "In Transit to Warehouse";
      availableDrone.order = userOrder;
      //console.log("Drones after order" + JSON.stringify(droneFleet.drones, null, 2));
      //console.log("UserOrderLocations " + JSON.stringify(userOrders, null, 2));
       // Optimization logic to send out drone
  });
  }
  



  module.exports = appRouter;