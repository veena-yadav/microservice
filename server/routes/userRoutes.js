const express = require("express")
const router = express.Router()

const { registerUser,foregtPass, loginUser, getme,resetPass, getAddress} = require("../../controllers/userController")

const { protect } = require("../../middleware/authMiddleware")

router.post("/", registerUser)

router.post("/login", loginUser)

router.get("/getme", protect, getme)

router.get("/forgetpassword/:email",foregtPass)

router.post("/resetpassword",resetPass)

router.get("/getaddress/:email",getAddress)

//router.post()
module.exports = router;