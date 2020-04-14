// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");


module.exports = function (app) {
  app.get("/api/vendors", function (req, res) {
    db.User.findAll({
      where: {
        vendor: 1
      }
    }).then((data) => {
      console.log(data)
    })
    // send array/object of all locations to pin on map
  })


  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function (req, res) {
    // console.log(req.body.vendor)
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      vendor: req.body.vendor
    })
      .then(function () {
        res.redirect(307, "/api/login");
      })
      .catch(function (err) {
        // console.log(err)
        res.status(401).json(err);
      });
  });
  app.post("/api/inventory/", function (req, res) {
    db.Inventory.create({
      productName: req.body.productName,
      onHand: req.body.onHand,
      price: req.body.price,
      UserId: req.user.id
    }).then(function () {
      res.json(req.body)
    }).catch(function (err) {
      res.status(404).json(err)
    })

  });
  app.get("/api/inventory/:id", function (req, res) {
    db.Inventory.findAll({
      where:
        { UserId: req.params.id}
    }).then(function (data) {
      res.json(data)
    })
  })

  app.post("/api/storefronts/", function (req, res) {


    db.Storefront.create({
      name: req.body.name,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      address: req.body.address,
      paymentTypes: req.body.paymentTypes,
      time: req.body.time,
      UserId: req.user.id
    })
      .then(function () {
        res.status(201)
        res.json(req.body)
      })
      .catch(function (err) {
        res.status(401).json(err)
      })

  })

  app.get("/api/storefronts/", function (req, res) {
    db.Storefront.findAll({}).then(function (data) {
      return res.json(data)
    }).catch(function (err) {
      res.status(404).json(err)
    })
  });



  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function (req, res) {
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

};
