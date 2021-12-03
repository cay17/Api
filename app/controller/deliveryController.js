let mongoose = require('mongoose');
let Delivery = mongoose.model('Delivery');



exports.create = (req,res,next) => {
    Delivery.create(req.body)
        .then(delivery => {
            res.json(delivery);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send(err);
        });
};



exports.list = (req,res,next) => {
    Delivery.find()
        .then(deliveries => {
            res.json(deliveries);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send(err);
        });
}


exports.get = (req,res,next) => {
    const id = req.params.id
    Delivery.findById(id)
        .then(delivery => {
            res.json(delivery);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send(err);
        });
}


exports.update = (req,res,next) => {
    const id = req.params.id
    Package.findByIdAndUpdate({_id: id}, req.body, {new: true})
        .then(delivery => {
            res.json(delivery);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send(err);
        });
}

exports.delete = (req,res,next) => {
    const id = req.params.id
    Delivery.findByIdAndDelete(id)
        .then(delivery => {
            res.json(delivery);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send(err);
        });
}