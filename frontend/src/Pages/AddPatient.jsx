import React,{useEffect,useState} from 'react'
import Header from '../Components/Header.jsx'
import SidePanel from '../Components/SidePanel.jsx'
import '../Styles/AddPatient.css'
import axios from 'axios'
import { MdOutlineAddBox, MdOutlineDelete,MdOutlineRefresh  } from "react-icons/md";
import { Link } from 'react-router-dom';
import {Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddPatient = ({Side_panel,setSide_panel}) => {
  const [patients,setPatients] = useState([])
  const[name,setName] = useState('')
  const[address,setAddress] = useState('')
  const[diagnosis,setDiagnosis] = useState('')
  const[amount,setAmount] = useState('')
  const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage, setItemsPerPage] = useState(10);
const [searchTerm, setSearchTerm] = useState('');


const handleSearchChange = (event) => {
  setSearchTerm(event.target.value);
};

const filteredPatients = patients.filter(patient =>
  Object.values(patient).some(value =>
    value.toString().toLowerCase().includes(searchTerm.toLowerCase())
  )
);
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = filteredPatients.slice(indexOfFirstItem, indexOfLastItem);

const handleItemsChange = (event) => {
  setItemsPerPage(Number(event.target.value));
  setCurrentPage(1); // Reset current page to 1 when items per page changes
};


  const addPatient = (event) => {
    event.preventDefault();
    if (!name || !address || !diagnosis || !amount) {
      toast.error('Please fill all the fields.');
      return;
    }

    const data={
      name,
      address,
      diagnosis,
      amount
    }
    const addPatientPromise = axios.post('https://hospital-website-pxe9.onrender.com/patient', data);
  toast.promise(
    addPatientPromise,
    {
      pending: 'Adding patient...',
      success: 'Patient added successfully!',
      error: 'An error occurred while adding the patient.'
    }
  );

  addPatientPromise.then(() => {
    // clear the input fields
    setName('');
    setAddress('');
    setDiagnosis('');
    setAmount('');
    fetchPatients();
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
    const deletePatientPromise = axios.delete(`https://hospital-website-pxe9.onrender.com/patient/${id}`);
  
    toast.promise(
      deletePatientPromise,
      {
        pending: 'Deleting patient...',
        success: 'Patient deleted successfully!',
        error: 'An error occurred while deleting the patient.'
      }
    );

    deletePatientPromise.then(() => {
      fetchPatients();
    }).catch((error) => {
      console.error(error);
    });
  };
 
  return (
    <>
        <Header Side_panel={Side_panel} setSide_panel={setSide_panel} />
        <SidePanel Side_panel={Side_panel} setSide_panel={setSide_panel}/>
        <div className='addpatient' style={{ left: Side_panel ? '0px' : '290px',
            width: Side_panel ? '100%' : 'calc(100% - 290px)'
          }}>
        <h1>Add Patients</h1>
        <div className='input'>
          <form action="" onSubmit={(event) => addPatient(event)}>
            <label htmlFor="name">Name: </label>
            <input id='name' type="text" value={name} onChange={(event) => {setName(event.target.value);}} required autoComplete='true'/> <br />
            <label htmlFor="address">Address: </label>
            <input id='address'  type="text" value={address} onChange={(event) => setAddress(event.target.value)}required autoComplete='true'/> <br />
            <label htmlFor="diagnosis">Diagnosis: </label>
            <input id='diagnosis'  type="text" value={diagnosis} onChange={(event) => setDiagnosis(event.target.value)}required autoComplete='true'/> <br />
            <label htmlFor="amount">Amount: </label>
            <input  id='amount' type="number" value={amount} onChange={(event) => setAmount(event.target.value)}required autoComplete='true' min={0}/> <br />
            <button className="submit-button" type='submit' ><b>Submit</b></button>
          </form>
        </div>
        <br />
        <div className="container">
          
          <div className="table-container">

          
          <br />
          <div className="header-container">
              <div className='show-entries'>
              <label>Show entries: 
                <select value={itemsPerPage} onChange={handleItemsChange}>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                  <option value="100">100</option>

                </select>
              </label>
            </div>
            <h2 >Patients History </h2>
              <div className='page-button'>
                 <div className="group">
          <svg className="icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
          <input placeholder="Search" type="search" className="input-search" value={searchTerm} onChange={(event)=>{setSearchTerm(event.target.value);handleSearchChange}}/>
        </div>
            </div>
          </div>
        
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
                {currentItems.map((patient, index) => (
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
        <ToastContainer
          position="bottom-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
          theme="light"
          transition={Slide}
          />
    </>
  )
}

export default AddPatient