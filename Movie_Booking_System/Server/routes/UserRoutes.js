
const express = require('express');
const router = express.Router();
const userController = require('../Controller/UserController');
const auth = require('../ Middleware/auth');

router.post('/create',userController.create);
router.post('/login',userController.login);
router.get('/profile',auth.verifyToken,userController.profile);



module.exports = router;