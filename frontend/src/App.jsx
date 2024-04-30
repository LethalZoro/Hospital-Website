import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import ShowPatients from './pages/ShowPatients'
import EditPatient from './pages/EditPatient'
import  CreatePatient  from './pages/CreatePatient'
import DeletePatient from './pages/DeletePatient'



export const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/patient/create' element={<CreatePatient/>}/>
      <Route path='/patient/details/:id' element={<ShowPatients/>}/>
      <Route path='/patient/edit/:id' element={<EditPatient/>}/>
      <Route path='/patient/delete/:id' element={<DeletePatient/>}/>
    </Routes>
  )
}

export default App