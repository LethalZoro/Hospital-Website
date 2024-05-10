import React,{useEffect,useState} from 'react'
import Header from '../Components/Header.jsx'
import SidePanel from '../Components/SidePanel.jsx'
import '../Styles/Expenses.css'
import axios from 'axios'
import { MdOutlineAddBox, MdOutlineDelete,MdOutlineRefresh  } from "react-icons/md";
import { Link } from 'react-router-dom';
import {Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Expenses = ({Side_panel,setSide_panel}) => {
  const [expenses,setExpenses] = useState([]);
  const[type,setType] = useState('')
  const[amount,setAmount] = useState('')
  const[note,setNote] = useState('')
  const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage, setItemsPerPage] = useState(5);
const [searchTerm, setSearchTerm] = useState('');


const handleSearchChange = (event) => {
  setSearchTerm(event.target.value);
};
// const prevPage = () => {
//   setCurrentPage(prevPageNumber => prevPageNumber - 1);
// };
const filteredExpenses = expenses.filter(expense =>
  Object.values(expense).some(value =>
    value.toString().toLowerCase().includes(searchTerm.toLowerCase())
  )
);
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = filteredExpenses.slice(indexOfFirstItem, indexOfLastItem);

const handleItemsChange = (event) => {
  setItemsPerPage(Number(event.target.value));
  setCurrentPage(1); // Reset current page to 1 when items per page changes
};



const addExpense = (event) => {
  event.preventDefault();
  if (!type || !amount ) {
    toast.error('Please fill all the fields.');
    return;
  }
  const data={type,amount,note}
  const addExpensePromise = axios.post('https://hospital-website-pxe9.onrender.com/expense', data);
  toast.promise(
    addExpensePromise,
    {
      pending: 'Adding the expense...',
      success: 'Expense added successfully!',
      error: 'An error occurred while adding the expense.'
    }
  );
  addExpensePromise.then(() => {
    // clear the input fields
    setType('');
    setAmount('');
    setNote('');
    fetchExpenses();
  });
  }
  const fetchExpenses = () => {
    axios.get('https://hospital-website-pxe9.onrender.com/expense')
    .then(response => {
      setExpenses(response.data.data);
    }).catch(error => {
      console.error(error);
      toast.error('An error occurred while fetching the expenses.');
    });
  }
  useEffect(() => {
    fetchExpenses();
  }, [])

  const deleteExpense = (id) => {
    const deleteExpensePromise = axios.delete(`https://hospital-website-pxe9.onrender.com/expense/${id}`);
    toast.promise(
      deleteExpensePromise,
      {
        pending: 'Deleting the expense...',
        success: 'Expense deleted successfully!',
        error: 'An error occurred while deleting the expense.'
      }
    );
    deleteExpensePromise.then(() => {
      fetchExpenses();
    }).catch((error) => {
      console.error(error);
    });
  };


  return (
    <>
            <Header Side_panel={Side_panel} setSide_panel={setSide_panel} />
            <SidePanel Side_panel={Side_panel} setSide_panel={setSide_panel}/>
            <div className='addexpense' style={{ left: Side_panel ? '0px' : '290px',
            width: Side_panel ? '100%' : 'calc(100% - 290px)'}}>
            <h1>Add Expense</h1>
            <div className='input'>
          <form action="" onSubmit={(event) => addExpense(event)}>
            <label htmlFor="type">Type: </label>
            <input id='type' type="text" value={type} onChange={(event) => {setType(event.target.value);}} required autoComplete='true'/> <br />
            
            <label htmlFor="note">Note: </label>
            <input id='note'  type="text" value={note} onChange={(event) => setNote(event.target.value)} autoComplete='true'/> <br />
            
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
            <h2 >Expense History </h2>
            {/* <div className='page-button'>
                <button className="pagination-button" onClick={prevPage} disabled={currentPage === 1}>Previous</button>
                <button className="pagination-button" onClick={nextPage} disabled={currentPage === Math.ceil(patients.length / itemsPerPage)}>Next</button>
              </div> */}
              <div className='page-button'>
                {/* <label htmlFor="Search">Search:  </label>
          <input type="text" placeholder="Search..." value={searchTerm} onChange={(event)=>{setSearchTerm(event.target.value);handleSearchChange}} /> */}
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
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Note</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((expense, index) => (
                  <tr key={expense._id}>
                    <td >{index + 1}</td>
                    <td>{expense.type}</td>
                    <td>{expense.amount}</td>
                    <td>{expense.note}</td>
                    <td>
                      {new Date(expense.createdAt).toLocaleDateString('en-GB')}
                    </td>
                    <td>
                      {new Date(expense.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </td >
                    <td >
                      <div className="delete-button-container">
                      <Link onClick={()=>deleteExpense(expense._id)}>
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

export default Expenses