var express = require('express');
var app = express();
var hdb = require('hdb');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

// Conexion con HCP
var client = hdb.createClient({
  host     : 'localhost',
  port     : 30015,
  user     : 'S0016562034',
  password : 'Peter33!'
});

client.on('error', function (err) {
  console.error('Network connection error', err);
});

app.get('/gettweets', function(request, response) {
	client.connect(function (err) {
      if (err) {
        return console.error('Connect error', err);
      }
    });
	client.exec('select * from TWEETS2', function (err, rows) {
        client.end();
        if (err) {
            return console.error('Execute error:', err);
        }
        //console.log('Results:', rows);
        response.send(rows);
    });
});

// listen on port
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


