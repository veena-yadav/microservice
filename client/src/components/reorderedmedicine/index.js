import React, { useState,useEffect } from 'react'
import '../medicinelist/medicinelist.css'
import axios from 'axios'
import { BarChart, Bar, CartesianGrid, XAxis, YAxis,Label } from 'recharts';



const AdminReorderedHistory = () => {
  var ar=[];
  var arr2=[];

  const [medicines,setMedicines]=useState([]);
  

  useEffect(() => {
    getMedicine()
  },)
  


  
  const getMedicine=async()=>{

    // setLoading(true)
    try {
      const data= await axios.get('http://localhost:5000/api/admin/getreorderedmedicine')
    
     let sz=data.data.length;
 
      // for(let i=0;i<sz;i++)
      // {
        
      //   ar.push({name:data.data[i].itemName,count:data.data[i].count1})
      // }
     
     // console.log(ar)
      setMedicines(data.data)
    } catch (error) {
      console.log("error in reorder "+error)
    }
    // setLoading(false)
  }



  return (
    <div>
  <center style={{paddingTop:"120px"}}>
<h1 style={{color:"#0064D2"}}>Reordered Medicines</h1>
<BarChart width={700} height={500}  data={ar} style={{top:"50%"}}>
  <Bar dataKey="count" fill="#0064D2" name='count' />
  <CartesianGrid stroke="#ccc" />
<XAxis  dataKey="name" /> 
  <YAxis label={{ value: 'count of medicines ', angle: -90, position: 'insideLeft' }}/>
</BarChart><p>Medicine Name</p></center>
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
        ar.push({name:med.itemName,count:med.count1})
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