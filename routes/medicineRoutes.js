const express=require("express")
const router=express.Router()
const{}=require("../controllers/userController")

const {protect}=require("../middleware/authMiddleware")
const{getMedicine,addSample,getMedicinebyvalue}=require("../controllers/medicineController")


router.get("/view",getMedicine)
router.get("/",getMedicinebyvalue)

router.post("/add",protect,addSample)



module.exports=router;