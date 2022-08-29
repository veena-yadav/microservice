
const asyncHandler = require('express-async-handler')
const Medicine=require('../models/medicineModel')
const controller={
    //GET ALL MEDICINES
    getMedicine:  asyncHandler(async (req, res) => {
      console.log(req.cookies.jwt)
        const items = await Medicine.find()
    
        res.status(200).json(items)
        
      }),  getMedicinebyvalue:  asyncHandler(async (req, res) => {
  
          const items = await Medicine.find({quantity:{$lt:80}})
      
          res.status(200).json(items)
          
        }),   addSample:  asyncHandler(async (req, res) => {
        const item = await Medicine.create({
            medicineName:req.body.medicineName,
            // manifactureDate:req.body.manifactureDate,
            // expiryDate:req.body.expiryDate,
            quantity:req.body.quantity
          })

        res.status(200).json(item)
      })
   
}
module.exports=controller; 

