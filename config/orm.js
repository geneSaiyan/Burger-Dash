// Import MySQL connection.
var connection = require("../config/connection.js");

function printQuestionMarks(num) {
    var arr = [];
  
    for (var i = 0; i < num; i++) {
      arr.push("?");
    }
  
    return arr.toString();
  }

  // Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];
    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
      var value = ob[key];
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
        // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
        // e.g. {sleepy: true} => ["sleepy=true"]
        arr.push(key + "=" + value);
      }
    }
    // translate array of strings to a single comma-separated string
    return arr.toString();
  }

var orm = {
    selectAll: function(tableName, callback) {
        connection.query(`SELECT * FROM ${tableName};`, function(err, result) {
          if (err) {
            throw err;
          }
          callback(result);
        });
      },
      insertOne: function (tableName, cols, vals, callback) {
        var queryString = `INSERT INTO ${tableName} (${cols.toString()}) VALUES (${printQuestionMarks(vals.length)})`;
        console.log(queryString);
        connection.query(queryString, vals, function (err, result) {
            if (err) {
                throw err
            }
            callback(result);
        });
    },
    updateOne: function (tableName, objColVals, condition, callback) {
        var queryString = `UPDATE ${tableName} SET ${objToSql(objColVals)} WHERE ${condition}`
        console.log(queryString);
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err
            }
            callback(result);
        });
    },
    deleteOne: function(table, condition, cb) {
      var queryString = "DELETE FROM " + table;
      queryString += " WHERE ";
      queryString += condition;
  
      connection.query(queryString, function(err, result) {
        if (err) {
          throw err;
        }
  
        cb(result);
      });
    }

}

// Export the orm object for the model (burger.js).
module.exports = orm;
