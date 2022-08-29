const mongoose = require('mongoose')

const medicineSchema = mongoose.Schema(
  {
  
    medicineName: {
      type: String,
      required: true
    },
    // manifactureDate:{
    //     type: Date,
    //     // required: true
    // },
    // expiryDate:{
    //     type: Date,
    //     // required: false
    // },
    quantity:{
        type: Number,
        required: true
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Medicine', medicineSchema)