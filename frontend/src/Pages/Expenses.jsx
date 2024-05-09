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
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = expenses.slice(indexOfFirstItem, indexOfLastItem);

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
            {Side_panel&&(<SidePanel />)}
            <div className='addexpense' style={{ left: Side_panel ? '260px' : '0',
            width: Side_panel ? 'calc(100% - 260px)' : '100%' }}>
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
        <h2 >Expense History </h2>
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
                {expenses.map((expense, index) => (
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