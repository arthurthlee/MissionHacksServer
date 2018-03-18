var userOrder = [];
var locations = [];
var currentOrderId = 0;

var appRouter = function (app) {
    app.get("/", function(req, res) {
      res.status(200).send("Welcome to our restful API");
    });

    app.get("/packageLocation", function (req, res) {  
      var locationForOrder = locations.filter(function(location) {location.orderId == req.data.orderId})[0];
      data = locationForOrder;
      res.status(201).send(data);
      locationForOrder.lat++;
      locationForOrder.long++;
      locationForOrder.alt++;
    });

    app.get("/placeOrder", function (req, res) {
      var userOrder = ({
          lat: req.body.lat,
          long: req.body.long,
          alt: req.body.alt,
          userId: req.body.userId,
          productId: req.body.productId,
          timeOfOrder: req.body.timeOfOrder
      });
      var orderId = currentOrderId;
       userOrder.push(req.data);
       res.status(201).send(orderId);
      currentOrderId++;
       // Mock location data
       var data = ({
        userOrder: orderId, 
        lat: Math.random()*100,
        long: Math.random()*100,
        alt: Math.random()*20
      });
      locations.push(data);
       // Optimization logic to send out drone
  });
  }
  



  module.exports = appRouter;