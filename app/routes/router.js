const express = require('express');
const router = express.Router();
let multer = require('multer');


let PackageController = require('../controller/packageController');
let DeliveryController = require('../controller/deliveryController');

//Packages routes
router.post('/package/',PackageController.create);
router.get('/package/',PackageController.list);
router.get('/package/:id',PackageController.get);
router.put('/package/:id',PackageController.update);
router.delete('/package/:id',PackageController.delete);




// Deliveries routes
router.post('/delivery/',DeliveryController.create);
router.get('/delivery/',DeliveryController.list);
router.get('/delivery/:id',DeliveryController.get);
router.put('/delivery/:id',DeliveryController.update);
router.delete('/delivery/:id',DeliveryController.delete);



module.exports = router;
