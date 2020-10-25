var express = require('express')
var router = express.Router();
const { check, validationResult } = require("express-validator")
const {signout, signup, signin} = require("../controllers/auth")



router.post("/signup", [
    check("name", "User name must be minimum 3 character").isLength({min : 3}),
    check("email", "provide valid EMAIL").isEmail(),
    check("password", "Password must contain at least 5 character").isLength({min : 5}),
],signup);

router.post("/signin", [
    check("email", " EMAIL required").isEmail(),
    check("password", "Password required").isLength({min : 5}),
],signin);



router.get("/signout",signout);

router.get("/testroute",)

module.exports = router;