'use strict';
let mongoose = require('mongoose');
const GUID = require('mongoose-guid')(mongoose);
let Schema = mongoose.Schema;


let packageSchema = new Schema({
    active_delivery_id:{
        type: Schema.Types.ObjectId,
        ref: 'Delivery'
    },
    description: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    width: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    depth: {
        type: Number,
        required: true
    },
    from_name: {
        type: String,
        required: true
    },
    from_address: {
        type: String,
        required: true
    },
    from_location: {
        lat: Number,
        lng: Number
    },
    to_name: {
        type: String,
        required: true
    },
    to_address: {
        type: String,
        required: true
    },
    to_location: {
        lat: Number,
        lng: Number
    }
});


module.exports = mongoose.model('Package', packageSchema);

