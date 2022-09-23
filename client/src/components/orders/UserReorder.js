import React, { useState, useEffect, useContext } from 'react'
import '../medicinelist/medicinelist.css'
import axios from 'axios'
import { UserContext } from '../../contextapi/usercontext'
import MedicineCard from './MedicineCard'
import { Grid, Typography } from '@mui/material'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserReorder = () => {
  const [medicines, setMedicines] = useState([]);

  const { auth, admin, user } = useContext(UserContext);


  useEffect(() => {
    getMedicine()
  }, [medicines])
  const getMedicine = async () => {
    try {
      const data = await axios.post('http://localhost:5000/user/getReodersByEmail', {
        email: user.email
      })
      setMedicines(data.data)
    } catch (error) {
      console.log("error is " + error)
    }
  }
  const deleteMedicine = async (medName) => {
    console.log(`${medName} deleted`)
    console.log(typeof (user.email))
    console.log(medName)
    try {
      const data = await axios.delete(`http://localhost:5000/user/cancelAnReorder/${user.email}/${medName}`)
      console.log(data)

    } catch (error) {
      console.log("error is " + error)
      toast.error(`Server disconnected.Try Again`, { theme: "colored" })
      return
    }
    toast.success(`Medicine Deleted Successfully`, { theme: "colored" })
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
        <center><Typography variant="h4" >View My Reorders</Typography></center>

        <Grid container spacing={{ xs: 2, md: 3 }}>
          {medicines.map((med) => {
            return (
              <Grid item xs={12} sm={6} md={4} >
                <MedicineCard med={med} deleteMedicine={deleteMedicine} />
              </Grid>
            )
          })}

        </Grid>

      </div>
      <ToastContainer />
    </>
  )
}

export default UserReorder