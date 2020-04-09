// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  app.get("/api/vendors", function(req, res) {
    db.User.findAll({
      where: {
        vendor: 1
      }
    }).then((data)=>{ 
      console.log(data)
    })
     // send array/object of all locations to pin on map
  })


  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      vendor: req.body.vendor
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });
  app.post("api/inventory", function(req, res) {
    db.Inventory.create({
      productName: req.body.product_name,
      price: req.body.price,
      onHand: req.body.onHand,
      forSale: req.body.forSale
    })
  })
  app.post("/api/storefronts", function(req, res) {
    db.Storefront.create({
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      paymentTypes: req.body.paymentTypes,
      time: req.body.time
    })
    .then(function() {
      res.status(201)
    })
    .catch(function(err) {
      res.status(401).json(err)
    })
  })

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

<<<<<<< Updated upstream
  app.post("/api/storefronts", function(req, res) {
    db.Storefront.create({
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      paymentTypes: req.body.paymentTypes,
      time: req.body.time
    }).then(function(results) {
      
      res.send(results)

    }).catch(function(err) {
      res.send(err)
    })
    
  })
=======
>>>>>>> Stashed changes
};
