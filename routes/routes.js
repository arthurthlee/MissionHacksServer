var userOrders = [];
var droneLocations = [];
var currentOrderId = 0;

var appRouter = function (app) {
    app.get("/", function(req, res) {
      res.status(200).send("Welcome to our restful API");
    });

    app.get("/packageLocation/:orderId", function (req, res) {  
      console.log("Drone Locations : " + JSON.stringify(droneLocations, null, 2));
      console.log("Request orderId: " + req.params.orderId);
      var locationForOrder = droneLocations.filter(function(location) {
        
        return Number( location.userOrderId ) === Number( req.params.orderId );

      })[ 0 ];
      var orderInfo = userOrders.filter(function(order) {
        return Number(order.userOrderId) === Number(req.params.orderId);
      }) [0];

      console.log("Location for Order : " + JSON.stringify(locationForOrder));
      if (locationForOrder.lat == orderInfo.lat
        && locationForOrder.long == orderInfo.long
        && locationForOrder.alt == orderInfo.long) {
      res.status(200).json("PACKAGE ARRIVED");
        }
        else {
      res.status(200).json(locationForOrder);
        }
      if (orderInfo.lat > locationForOrder.lat) {
        locationForOrder.lat++;
      }
      else if (orderInfo.lat < locationForOrder.lat) {
        locationForOrder.lat--;
      }
      if (orderInfo.long > locationForOrder.long) {
        locationForOrder.long++;
      }
      else if (orderInfo.long < locationForOrder.long) {
        locationForOrder.long--;
      }
      if (orderInfo.alt > locationForOrder.alt) {
        locationForOrder.alt++;
      }
      else if (orderInfo.alt < locationForOrder.alt) {
        locationForOrder.alt--;
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
          userOrderId: orderId 
      });

       userOrders.push(userOrder);
       res.status(201).json(orderId);
      currentOrderId++;
       // Mock warehouse location data
       var data = {
        userOrderId: orderId, 
        lat: Math.round(Math.random()*100),
        long: Math.round(Math.random()*100),
        alt: Math.round(Math.random()*20)
      };
      droneLocations.push(data);
      console.log("Drone Locations" + JSON.stringify(droneLocations, null, 2));
      console.log("UserOrderLocations " + JSON.stringify(userOrders, null, 2));
       // Optimization logic to send out drone
  });
  }
  



  module.exports = appRouter;