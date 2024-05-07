import React,{useEffect,useState} from 'react'
import Header from '../Components/Header.jsx'
import SidePanel from '../Components/SidePanel.jsx'
import '../Styles/AddPatient.css'
import axios from 'axios'
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { Link } from 'react-router-dom';

const AddPatient = ({Side_panel,setSide_panel}) => {
  const [patients,setPatients] = useState([])
  const[name,setName] = useState('')
  const[address,setAddress] = useState('')
  const[diagnosis,setDiagnosis] = useState('')
  const[amount,setAmount] = useState('')

  const addPatient = () => {
    event.preventDefault();
    const data={
      name,
      address,
      diagnosis,
      amount
    }
    axios.post('https://hospital-website-pxe9.onrender.com/patient',data)
    .then(response => {
      console.log("saved");
    setName('');
    setAddress('');
    setDiagnosis('');
    setAmount('');
    fetchPatients();

    })
    .catch(error => {
      console.log(error);
    });
  }
  const fetchPatients = () => {
    axios.get('https://hospital-website-pxe9.onrender.com/patient')
      .then(response => {
        setPatients(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  
  };
  useEffect(() => {
    fetchPatients();
  }, []);

  const deletePatient = (id) => {
    axios.delete(`https://hospital-website-pxe9.onrender.com/patient/${id}`)
      .then(response => {
        console.log("deleted");
        fetchPatients();
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <>
        <Header Side_panel={Side_panel} setSide_panel={setSide_panel} />
        {Side_panel&&(<SidePanel />)}
        <div className='addpatient' style={{ left: Side_panel ? '260px' : '0' }}>
        <h1>Add Patients</h1>
        <div className='input'>
          <form action="">
            <label htmlFor="input">Name: </label>
            <input type="text" onChange={(event) => setName(event.target.value)} /> <br />
            <label htmlFor="input">Address: </label>
            <input type="text" onChange={(event) => setAddress(event.target.value)} /> <br />
            <label htmlFor="input">Diagnosis: </label>
            <input type="text" onChange={(event) => setDiagnosis(event.target.value)} /> <br />
            <label htmlFor="input">Amount: </label>
            <input type="number" onChange={(event) => setAmount(event.target.value)} /> <br />
            <button className="submit-button" onClick={addPatient}>Submit</button>
          </form>
        </div>
        <br />
        <div className="container"><h2>Patients Added: </h2>
          <div className="table-container">
          <br />
            <table className='table'>
              <thead>
                <tr>
                <th>Index</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Diagnosis</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient, index) => (
                  <tr key={patient._id}>
                    <td >{index + 1}</td>
                    <td>{patient.name}</td>
                    <td>{patient.address}</td>
                    <td>{patient.diagnosis}</td>
                    <td>{patient.amount}</td>
                    <td>
                      {new Date(patient.createdAt).toLocaleDateString('en-GB')}
                    </td>
                    <td>
                      {new Date(patient.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </td >
                    <td >
                      <div className="delete-button-container">
                      <Link onClick={()=>deletePatient(patient._id)}>
                                            <MdOutlineDelete className='delete-button' />
                                        </Link></div></td>
                    
                    
                  </tr>
                ))}
              </tbody>
            </table>
      </div>
        </div>
        
        </div>
        
    </>
  )
}

export default AddPatient