let mongoose = require('mongoose');
let Package = mongoose.model('Package');



exports.create = (req,res,next) => {
    Package.create(req.body)
        .then(package => {
            res.json(package);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send(err);
        });
};



exports.list = (req,res,next) => {
    Package.find()
        .then(packages => {
            res.json(packages);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send(err);
        });
}


exports.get = (req,res,next) => {
    const id = req.params.id
    Package.findById(id)
        .then(package => {
            res.json(package);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send(err);
        });
}


exports.update = (req,res,next) => {
    const id = req.params.id
    Package.findByIdAndUpdate({_id: id}, req.body, {new: true})
        .then(package => {
            res.json(package);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send(err);
        });
}

exports.delete = (req,res,next) => {
    const id = req.params.id
    Package.findByIdAndDelete(id)
        .then(package => {
            res.json(package);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send(err);
        });
}