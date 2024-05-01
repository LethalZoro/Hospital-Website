import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'

export const ShowPatient = () => {
  const [patient,setPatient] = useState({})
  const [loading,setLoading] = useState(false)
  const {id} = useParams()

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/patient/${id}`)
    .then(response => {
      setPatient(response.data);
      setLoading(false);
    })
    .catch(error => {
      console.log(error);
      setLoading(false);
    });
  },[]);

  return (
    <div className='p-4'>
      <BackButton/>
      {loading ? <Spinner/> : (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Id:</span> <span>{patient._id}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Name:</span> <span>{patient.name}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Address:</span> <span>{patient.address}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Diagnosis:</span> <span>{patient.diagnosis}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Amount:</span> <span>{patient.amount}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Create Time:</span> <span>{new Date(patient.createdAt).toString()}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Last Updated Time:</span> <span>{new Date(patient.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  )
}
export default ShowPatient
