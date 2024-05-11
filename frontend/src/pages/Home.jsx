import React, { useState, useRef ,useEffect } from 'react';
import { MdAttachMoney  } from "react-icons/md";
import Header from '../Components/Header.jsx'
import SidePanel from '../Components/SidePanel.jsx'
import {Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { DateRangePicker } from 'rsuite';
import { addDays } from 'date-fns';
// import "rsuite/dist/rsuite.min.css";
// import "rsuite/dist/styles/rsuite-default.css";
import DatePicker from "react-multi-date-picker";
import '../Styles/Home.css'

const Home = ({Side_panel,setSide_panel}) => {

    function calculateIncome(patients) {

      return patients.reduce((total, patient) => total + patient.amount, 0);
    }
    
    function calculateExpenses(expenses) {
      return expenses.reduce((total, expense) => total + expense.amount, 0);
    }
    const [rangeDate, setRangeDate] = useState([new Date(), new Date()]); // [startDate, endDate
    const [startDate, setStartDate] = useState(new Date().toISOString().slice(0,10));
    const [endDate, setEndDate] = useState(new Date().toISOString().slice(0,10));  
    const [patients, setPatients] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [income, setIncome] = useState(0);
    const [expense, setExpense] = useState(0);
    const [profit, setProfit] = useState(0);


  const ExpenseCard = <>
  <div className="card">
    <div className="title">
        <span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" height="20" fill="currentColor" width="20">
                <path d="M1362 1185q0 153-99.5 263.5t-258.5 136.5v175q0 14-9 23t-23 9h-135q-13 0-22.5-9.5t-9.5-22.5v-175q-66-9-127.5-31t-101.5-44.5-74-48-46.5-37.5-17.5-18q-17-21-2-41l103-135q7-10 23-12 15-2 24 9l2 2q113 99 243 125 37 8 74 8 81 0 142.5-43t61.5-122q0-28-15-53t-33.5-42-58.5-37.5-66-32-80-32.5q-39-16-61.5-25t-61.5-26.5-62.5-31-56.5-35.5-53.5-42.5-43.5-49-35.5-58-21-66.5-8.5-78q0-138 98-242t255-134v-180q0-13 9.5-22.5t22.5-9.5h135q14 0 23 9t9 23v176q57 6 110.5 23t87 33.5 63.5 37.5 39 29 15 14q17 18 5 38l-81 146q-8 15-23 16-14 3-27-7-3-3-14.5-12t-39-26.5-58.5-32-74.5-26-85.5-11.5q-95 0-155 43t-60 111q0 26 8.5 48t29.5 41.5 39.5 33 56 31 60.5 27 70 27.5q53 20 81 31.5t76 35 75.5 42.5 62 50 53 63.5 31.5 76.5 13 94z">
                </path>
            </svg>
        </span>
        <p className="title-text">
            Expenses
        </p>
        <p className="percent">
           <svg width="20" height="20" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                <path d="M1408 1216q0 26-19 45t-45 19h-896q-26 0-45-19t-19-45 19-45l448-448q19-19 45-19t45 19l448 448q19 19 19 45z">
                </path>
            </svg> 20%
        </p>
    </div>
    <div className="data">
        <p>
        {expense.toLocaleString()}
        </p>
        
    </div>
</div>
  </>

const IncomeCard = <>
<div className="card">
  <div className="title">
      <span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" height="20" fill="currentColor" width="20">
              <path d="M1362 1185q0 153-99.5 263.5t-258.5 136.5v175q0 14-9 23t-23 9h-135q-13 0-22.5-9.5t-9.5-22.5v-175q-66-9-127.5-31t-101.5-44.5-74-48-46.5-37.5-17.5-18q-17-21-2-41l103-135q7-10 23-12 15-2 24 9l2 2q113 99 243 125 37 8 74 8 81 0 142.5-43t61.5-122q0-28-15-53t-33.5-42-58.5-37.5-66-32-80-32.5q-39-16-61.5-25t-61.5-26.5-62.5-31-56.5-35.5-53.5-42.5-43.5-49-35.5-58-21-66.5-8.5-78q0-138 98-242t255-134v-180q0-13 9.5-22.5t22.5-9.5h135q14 0 23 9t9 23v176q57 6 110.5 23t87 33.5 63.5 37.5 39 29 15 14q17 18 5 38l-81 146q-8 15-23 16-14 3-27-7-3-3-14.5-12t-39-26.5-58.5-32-74.5-26-85.5-11.5q-95 0-155 43t-60 111q0 26 8.5 48t29.5 41.5 39.5 33 56 31 60.5 27 70 27.5q53 20 81 31.5t76 35 75.5 42.5 62 50 53 63.5 31.5 76.5 13 94z">
              </path>
          </svg>
      </span>
      <p className="title-text">
          Income
      </p>
      <p className="percent">
         <svg width="20" height="20" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
              <path d="M1408 1216q0 26-19 45t-45 19h-896q-26 0-45-19t-19-45 19-45l448-448q19-19 45-19t45 19l448 448q19 19 19 45z">
              </path>
          </svg> 20%
      </p>
  </div>
  <div className="data">
      <p>
       {income.toLocaleString()}
      </p>
      

  </div>
</div>
</>

const ProfitCard = <>
<div className="card">
  <div className="title">
      <span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" height="20" fill="currentColor" width="20">
              <path d="M1362 1185q0 153-99.5 263.5t-258.5 136.5v175q0 14-9 23t-23 9h-135q-13 0-22.5-9.5t-9.5-22.5v-175q-66-9-127.5-31t-101.5-44.5-74-48-46.5-37.5-17.5-18q-17-21-2-41l103-135q7-10 23-12 15-2 24 9l2 2q113 99 243 125 37 8 74 8 81 0 142.5-43t61.5-122q0-28-15-53t-33.5-42-58.5-37.5-66-32-80-32.5q-39-16-61.5-25t-61.5-26.5-62.5-31-56.5-35.5-53.5-42.5-43.5-49-35.5-58-21-66.5-8.5-78q0-138 98-242t255-134v-180q0-13 9.5-22.5t22.5-9.5h135q14 0 23 9t9 23v176q57 6 110.5 23t87 33.5 63.5 37.5 39 29 15 14q17 18 5 38l-81 146q-8 15-23 16-14 3-27-7-3-3-14.5-12t-39-26.5-58.5-32-74.5-26-85.5-11.5q-95 0-155 43t-60 111q0 26 8.5 48t29.5 41.5 39.5 33 56 31 60.5 27 70 27.5q53 20 81 31.5t76 35 75.5 42.5 62 50 53 63.5 31.5 76.5 13 94z">
              </path>
          </svg>
      </span>
      <p className="title-text">
          Cash in Hand
      </p>
      <p className="percent">
         <svg width="20" height="20" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
              <path d="M1408 1216q0 26-19 45t-45 19h-896q-26 0-45-19t-19-45 19-45l448-448q19-19 45-19t45 19l448 448q19 19 19 45z">
              </path>
          </svg> 60%
      </p>
  </div>
  <div className="data">
      <p>
      {profit.toLocaleString()}
      </p>
      
  </div>
</div>
</>

useEffect(() => {
  // const start = new Date(startDate).setHours(0, 0, 0, 0);
  // const end = new Date(endDate).setHours(23, 59, 59, 999);
  const start = new Date(rangeDate[0]);
  start.setHours(0, 0, 0, 0);
  
  const end = new Date(rangeDate[1]);
  end.setHours(23, 59, 59, 999);

  const filteredPatients = patients.filter(patient => {
    const patientDate = new Date(patient.createdAt).setHours(0, 0, 0, 0);
    return patientDate >= start && patientDate <= end;
  });
  const sortedPatients = filteredPatients.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  const filteredExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.createdAt).setHours(0, 0, 0, 0);
    return expenseDate >= start && expenseDate <= end;
  });
  const sortedExpenses = filteredExpenses.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  setIncome(calculateIncome(sortedPatients));
  setExpense(calculateExpenses(sortedExpenses));
  setProfit(calculateIncome(sortedPatients) - calculateExpenses(sortedExpenses));
}, [patients, expenses, startDate, endDate, rangeDate]);


const fetchPatients = () => {
  const getPatientPromise = axios.get('https://hospital-website-pxe9.onrender.com/patient');
  toast.promise(
    getPatientPromise,
    {
      pending: 'Loading data...',
      success: 'Data Loaded successfully!',
      error: 'Failed to load Data',
    }
  )
  .then(response => {
    setPatients(response.data.data);
  })
  .catch(error => {
    console.error(error);
  });


};
useEffect(() => {
  fetchPatients();
}, [startDate, endDate]);

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
}, [startDate, endDate])


const predefinedRanges = [
  {
    label: 'Today',
    value: [new Date(), new Date()],
    placement: 'left'
  },
  {
    label: 'Yesterday',
    value: [addDays(new Date(), -1), addDays(new Date(), -1)],
    placement: 'left'
  },
  {
    label: 'Last 7 Days',
    value: [addDays(new Date(), -7), new Date()],
    placement: 'left'
  },
  {
    label: 'Last 30 Days',
    value: [addDays(new Date(), -30), new Date()],
    placement: 'left'
  }
];


  return (
    <>
        <Header Side_panel={Side_panel} setSide_panel={setSide_panel} />
        <SidePanel Side_panel={Side_panel} setSide_panel={setSide_panel}  />
        <div className='dashboard' style={{ left: Side_panel ? '0px' : '290px',
            width: Side_panel ? '100%' : 'calc(100% - 290px)'}}>
              <div className='home' >
            <h1 className='dashboard-title'>Dashboard:</h1>
              <br />
            <br />
            
          <div className='card-container'>
            <div className='card income'>{IncomeCard}</div>
            <div className='card expenses'>{ExpenseCard}</div>
            <div className='card net-profit'>{ProfitCard}</div>
          </div>

          </div>
          <div className='Date'>
          {/* <DateRangePicker showOneCalendar ranges={predefinedRanges} /> */}
          <DatePicker 
            value={rangeDate}
            onChange={setRangeDate}
            range
          />
          {/* <DateRangePicker format="dd.MM.yyyy" /> */}
          {/* <input
              type="date"
              value={startDate}
              onChange={event => {setStartDate(event.target.value)}}
            />

            <input
              type="date"
              value={endDate}
              onChange={event => {setEndDate(event.target.value)}}
            /> */}
            </div>
        </div>
        <ToastContainer
          position="bottom-center"
          autoClose={500}
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

export default Home