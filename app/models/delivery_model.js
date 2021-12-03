'use strict';
let mongoose = require('mongoose');
const GUID = require('mongoose-guid')(mongoose);
let Schema = mongoose.Schema;


let delivery = new Schema({
    package_id:{
        type: Schema.Types.ObjectId,
        ref: 'Package',
        required: true
    },
    pickup_time:{
        type:Date
    },
    start_time: {
        type: Date
    },
    end_time: {
        type: Date
    },
    location: {
        lat: String,
        lng: String
    },
    status: {
        type: String,
        enum: ['open', 'picked-up', 'in-transit', 'delivered', 'failed'],
        default: 'open',
        required: true
    }
});


module.exports = mongoose.model('Delivery', delivery);

