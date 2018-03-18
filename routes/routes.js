var userOrders = [];
var locations = [];
var currentOrderId = 0;

var appRouter = function (app) {
    app.get("/", function(req, res) {
      res.status(200).send("Welcome to our restful API");
    });

    app.get("/packageLocation/:orderId", function (req, res) {  
      console.log("Locations : " + JSON.stringify(locations, null, 2));
      console.log("Request orderId: " + req.params.orderId);
      var locationForOrder = locations.filter(function(location) {
        
        return Number( location.userOrderId ) === Number( req.params.orderId );

      })[ 0 ];

      console.log("Location for Order : " + locationForOrder);
      if (locationForOrder.lat == req.params.lat
        && locationForOrder.long == req.params.long
        && locationForOrder.alt == req.params.long) {
      res.status(200).json("PACKAGE ARRIVED");
        }
        else {
      res.status(200).json(locationForOrder);
        }
      if (locationForOrder.lat < req.params.lat) {
        locationForOrder.lat++;
      }
      else {
        locationForOrder.lat--;
      }
      if (locationForOrder.long < req.params.lat) {
        locationForOrder.long++;
      }
      else {
        locationForOrder.long--;
      }
      if (locationForOrder.alt <req.params.lat) {
        locationForOrder.alt++;
      }
      else {
        locationForOrder.alt--;
      }
    });

    app.post("/placeOrder", function (req, res) {
      var userOrder = ({
          lat: req.body.lat,
          long: req.body.long,
          alt: req.body.alt,
          userId: req.body.userId,
          productId: req.body.productId,
          timeOfOrder: req.body.timeOfOrder
      });
      var orderId = currentOrderId;
       userOrders.push(userOrder);
       res.status(201).json(orderId);
      currentOrderId++;
       // Mock location data
       var data = {
        userOrderId: orderId, 
        lat: Math.round(Math.random()*100),
        long: Math.round(Math.random()*100),
        alt: Math.round(Math.random()*20)
      };
      locations.push(data);
      console.log(locations);
      console.log(userOrders);
       // Optimization logic to send out drone
  });
  }
  



  module.exports = appRouter;