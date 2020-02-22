var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");

// Routes Section

// Retrieve all burgers
router.get("/", function (req, res) {
  burger.selectAll(function (data) {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

// Insert a new burger
router.post("/api/burgers", function (req, res) {
  burger.insertOne(["burger_name", "devoured"], [req.body.burger_name, req.body.devoured], function (result) {
    // Retrieve ID of the inserted burger
    res.json({ id: result.insertId });
  });
});

// Update devour status to equal true
router.put("/api/burgers/:id", function (req, res) {
  var whereCondition = "id = " + req.params.id;
  burger.updateOne({ devoured: req.body.devoured }, whereCondition, function (result) {
    if (result.changedRows === 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Delete a burger from burgers table
router.delete("/api/burgers/:id", function(req, res) {
  var whereCondition = "id = " + req.params.id;

  burger.deleteOne(whereCondition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Export routes for server.js to use.
module.exports = router;