var pg = require('pg');
var connectionString = 'postgres://rogxbdyihoayxu:YPG7eWfYF7Gm5faf3kxq4tyItv@ec2-54-235-76-206.compute-1.amazonaws.com:5432/d58pf83llrkc9r';

var client = new pg.Client(connectionString);
client.ssl = true;
client.port = 5432;
client.connect();
var query = client.query('CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)', function(err, result){
  console.log('done');
  console.log(err); 
  client.end();
});
