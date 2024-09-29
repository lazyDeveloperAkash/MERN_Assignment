const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middlewares/auth");
const { signup, signin, signout, loggedinUser, generateAccessToken } = require("../controllers/userController");

router.get('/', isAuthenticated, loggedinUser);
router.post('/signup', signup);
router.post('/signin', signin);
router.post('/signout', signout);
router.get('/access-token', generateAccessToken);

module.exports = router;