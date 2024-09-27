import Payment from './components/payment';
import Registration from './components/registrationform';
import LoginForm from './components/registrationform/Login';
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import Navbar from './components/navbar';
import MedicineList from './components/medicinelist';
import Errorpage from './components/Errorpage';
import AdminForm from './components/adminlogin';
import AdminMedicineList from './components/adminmedicinelist';
import Orders from './components/orders';
import React,{useEffect, useState} from 'react'
import AdminReorders from './components/adminReorders';
import SampleComp from './components/samplecomp';
import AdminReorderedHistory from './components/reorderedMedicine.js';


function App() {
  const [usr,setUsr]=useState('')
  useEffect(()=>{
    setUsr(localStorage.getItem('user'))
  },[])
  return (
    <>

    <Router>
   
      <Navbar usr={usr}/>
      <Routes>
        <Route path='/'  element={<Registration/>}/>
        <Route path='/login'  element={<LoginForm/>}/>
        <Route path='/viewmedicine'  element={<MedicineList/>}/>
        <Route path='/orders'  element={<Orders/>}/>
        <Route path='/adminlogin'  element={<AdminForm/>}/>
         <Route path="/adminviewmedicine" element={<AdminMedicineList/>}/>
         <Route path="/adminReorders" element={<AdminReorders/>}/>
         <Route path="/payment" element={<Payment/>}/>
         <Route path="/getreorderedmedicine" element={<AdminReorderedHistory/>}/>
        <Route path='*' element={<Errorpage/>} />
      </Routes>
    </Router>
    </>
  );
}


export default App;