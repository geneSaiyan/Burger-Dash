const orm = require("../config/orm.js");

var burger = {
    // Retrieve all burgers 
    selectAll: function (callback) {
        orm.selectAll("burgers", function (res) {
            callback(res);
        });
    },
    // Insert a new burger
    insertOne: function (cols, vals, callback) {
        orm.insertOne("burgers", cols, vals, function (res) {
            callback(res);
        });
    },
    // Update status of burger devoured column: true or false
    updateOne: function(objColVals, condition, callback) {
        orm.updateOne("burgers", objColVals, condition, function(res) {
          callback(res);
        });
      },
      // Delete a burger
      deleteOne: function(condition, cb) {
        orm.deleteOne("burgers", condition, function(res) {
          cb(res);
        });
      }
}

module.exports = burger;

