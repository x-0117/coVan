const express = require('express');
const router = express.Router();

const adminController = require("../controllers/Admin");

router.post('/admin',adminController.admin);
router.post('/f1nduser',adminController.findUser);
router.post('/otp',adminController.otp);
router.post('/vaccinated',adminController.vaccinated);

module.exports = router;