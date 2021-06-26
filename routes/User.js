const express = require('express');
const router = express.Router();

const userController = require("../controllers/User");

router.post('/login',userController.login);
router.post('/register',userController.register);
router.post('/mainPage',userController.mainPage);
router.post('/getDate',userController.getDate);
router.post('/getOtp',userController.otp);
router.post('/status',userController.status);

module.exports = router;