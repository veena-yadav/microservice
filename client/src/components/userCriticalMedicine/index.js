import React, { useState, useEffect, useContext } from 'react'
import '../medicinelist/medicinelist.css'
import axios from 'axios'
import { UserContext } from '../../contextapi/usercontext'
import CriticalMedicineCard from './CriticalMedicineCard'
import { Grid, Typography } from '@mui/material'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserCriticalMedicine = () => {
  const [medicines, setMedicines] = useState([]);

  const { auth, admin, user } = useContext(UserContext);


  useEffect(() => {
    getMedicine()
  }, [medicines])
  const getMedicine = async () => {
    try {
      const data = await axios.get(`http://localhost:5000/user/getCriticalMedicines/${user.email}`)
      setMedicines(data.data)
    } catch (error) {
      console.log("error is " + error)
    }
  }
  const deleteMedicine = async (medName) => {
    console.log(`${medName} deleted`)
    try {
      const data = await axios.delete(`http://localhost:5000/user/removeCriticalMedicine/${user.email}/${medName}`)
      console.log(data)

    } catch (error) {
      console.log("error is " + error)
    }
    toast.success(`Medicine ${medName} is deleted`, { theme: "colored" })
    getMedicine()
  }
  return (
    <>
      <div style={{
        width: "100%",
        height: "100%",
        paddingTop: "70px",
        paddingLeft: "10px",
        paddingRight: "10px"

      }}>
        <center><Typography variant="h4" >View Critical Medicines</Typography></center>

        <Grid container spacing={{ xs: 2, md: 3 }} style={{ marginTop: '20px' }}>
          {medicines.map((med) => {
            return (
              <Grid item xs={12} sm={6} md={4} >
                <CriticalMedicineCard med={med} deleteMedicine={deleteMedicine} />
              </Grid>
            )
          })}

        </Grid>

      </div>
      <ToastContainer />
    </>
  )
}

export default UserCriticalMedicine