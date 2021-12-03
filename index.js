
var http = require('http');
var express = require('express');
var app = express();

var server = http.createServer(app);
var expressWs = require('express-ws')(app);

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.listen(3000)

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
});




// mongoose instance connection url connection
mongoose.Promise = global.Promise;
const dbConfig = require('./config/database.config.js');
// Connecting to the database 
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useCreateIndex:true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
require('./app/models/package_model');
require('./app/models/delivery_model');


const Delivery = mongoose.model('Delivery');










const routes = require('./app/routes/router');
app.get('/test',function(req,res){
    res.json({message:'Working Properly'});
});
app.use('/api',routes);




app.ws('/ws', function(ws, req) {
    ws.on('message', function(msg) {
      const message = JSON.parse(msg)
      if(message.event === 'status_changed') {
          const status = message.status
          const delivery_id = message.delivery_id
        let data = {
                        status: status
                    }
                    if(status === 'picked-up') {
                        data['picked-up'] = new Date()
                    } else if (status === 'in-transit') {
                        data['start_time'] = new Date()
                    } else if (status === 'delivered' || status === 'failed') {
                        data['end_time'] = new Date()
                    }
                    Delivery.findByIdAndUpdate({_id: delivery_id}, {
                        status: status
                    }, {new: true})
                        .then(delivery => {
                            const msgSend = {
                                event: 'delivery_updated',
                                delivery_object: delivery
                            }
                            ws.broadcast(JSON.stringify(msgSend))
                        })
                        .catch(err => {
                            console.error(err);
                            res.status(500).send(err);
                        });
      } else if (message.event === 'location_changed') {
          const location = message.location
        Delivery.findByIdAndUpdate({_id: delivery_id}, {
                        location: location
                    }, {new: true})
                        .then(delivery => {
                            const msgSend = {
                                event: 'delivery_updated',
                                delivery_object: delivery
                            }
                            ws.broadcast(JSON.stringify(msgSend))
                        })
                        .catch(err => {
                            console.error(err);
                            res.status(500).send(err);
                        });
      }
    });

    ws.broadcast = function broadcast(msg) {
        ws.clients.forEach(function each(client) {
            client.send(msg);
        });
     };
});







module.exports = app;
