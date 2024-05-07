import { useState } from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './Pages/Home'
import AddPatient from './Pages/AddPatient'
import Expenses from './Pages/Expenses'
import Search from './Pages/Search'

import './Styles/App.css'
function App() {
const [Side_panel, setSide_panel] = useState(false);

const block=<Routes>
            <Route path='/' element={<Home Side_panel={Side_panel} setSide_panel={setSide_panel}/>}></Route>
            <Route path='/expenses' element={<Expenses Side_panel={Side_panel} setSide_panel={setSide_panel}/>}></Route>
            <Route path='/patient/add' element={<AddPatient Side_panel={Side_panel} setSide_panel={setSide_panel}/>}></Route>
            <Route path='/patient/search' element={<Search Side_panel={Side_panel} setSide_panel={setSide_panel}/>}></Route>
            </Routes>

return (
  block
)
}

export default App
