var path = require('path');
var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://rogxbdyihoayxu:YPG7eWfYF7Gm5faf3kxq4tyItv@ec2-54-235-76-206.compute-1.amazonaws.com:5432/d58pf83llrkc9r?ssl=true';


/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.sendFile(path.join(__dirname, '../views', 'index.html'));
});

/* Read */
/* GET items */
router.get('/api/v1/scores', function(req, res) {

    var results = [];

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {

      // Handle Errors
      if(err) {
        console.log(err);
        res.send("Error connecting to database " + err);
      }

      // create table here cause i don't know where else to create it
      // client.query('CREATE TABLE IF NOT EXISTS scores(id SERIAL PRIMARY KEY, name VARCHAR(40) not null, date DATE, total FLOAT, paid BOOLEAN)', function(err, result){
      //   done();
      //   if(err){
      //     console.error("error " + err);
      //     res.send("Error creating database " + err);
      //   }
      // });

      // SQL Query > Select Data
      var query = client.query("SELECT * FROM scores ORDER BY id ASC;");

      // Stream results back one row at a time
      query.on('row', function(row) {
          results.push(row);
      });

      // After all data is returned, close connection and return results
      query.on('end', function() {
          client.end();
          return res.json(results);
      });

  });

});


/* Create */
/* POST */
router.post('/api/v1/score', function(req, res){
  // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {

      var results = [];

      // Grab data from http request
      var data = {name: req.body.name, total: req.body.total, paid: false};

      // SQL Query > Insert Data
      client.query("INSERT INTO scores(name, date, total, paid) values($1, $2, $3, $4)", [data.name, new Date(), data.total, data.paid]);

      // SQL Query > Select Data
      var query = client.query("SELECT * FROM scores ORDER BY id ASC");

      // Stream results back one row at a time
      query.on('row', function(row) {
          results.push(row);
      });

      // After all data is returned, close connection and return results
      query.on('end', function() {
          client.end();
          return res.json(results);
      });

      // Handle Errors
      if(err) {
        console.log(err);
      }

  });
})

/* Update item */
/* Put */
router.put('/api/v1/scores/:score_id', function(req, res) {

    var results = [];

    // Grab data from the URL parameters
    var id = req.params.score_id;

    // Grab data from http request
    var data = { total: req.body.total, paid: req.body.paid };

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {

        // SQL Query > Update Data
        client.query("UPDATE scores SET total=($1), paid=($2) WHERE id=($3)", [data.total, data.paid, id]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM scores ORDER BY id ASC");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            client.end();
            return res.json(results);
        });

        // Handle Errors
        if(err) {
          console.log(err);
        }

    });

});

/* Delete */
router.delete('/api/v1/scores/:score_id', function(req, res){

  var results = [];

  var id = req.params.score_id;

  // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {

        // SQL Query > Delete Data
        client.query("DELETE FROM scores WHERE id=($1)", [id]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM scores ORDER BY id ASC");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            client.end();
            return res.json(results);
        });

        // Handle Errors
        if(err) {
          console.log(err);
        }

    });
})

module.exports = router;
