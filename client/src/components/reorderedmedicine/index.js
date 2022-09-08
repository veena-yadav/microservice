import React, { useState,useEffect } from 'react'
import '../medicinelist/medicinelist.css'
import axios from 'axios'


const AdminReorderedHistory = () => {
  const [medicines,setMedicines]=useState([]);

  useEffect(() => {
    getMedicine()
  }, [])
  const getMedicine=async()=>{
    // setLoading(true)
    try {
      const data= await axios.get('http://localhost:5000/api/admin/getreorderedmedicine')
      console.log(data)
      setMedicines(data.data)
    } catch (error) {
      console.log("error in reorder "+error)
    }
    // setLoading(false)
  }
 
 
  return (
    <div>
     
    <div className='medicineTableDiv'>
    <table className='medicineTable'>
    <thead>
      <tr>
        <th>  Name </th>
        <th>Price</th>
        <th> Quantity</th>
        <th>Total Price</th>
        <th>Order time</th>
        
      </tr>
    </thead>
    <tbody>
      {medicines.map((med)=>{
        return(
          <tr key={Math.random()}>
          <th> {med.itemName} </th>
          <td>{med.price} </td>
          <td> {med.quantity} </td>
          <td>{med.price*med.quantity}</td>
          <td> {med.createdAt} </td>
            
        </tr>
        )
      })}
     
    </tbody>
  </table>
  </div>
 
  </div>
  )
}

export default AdminReorderedHistory