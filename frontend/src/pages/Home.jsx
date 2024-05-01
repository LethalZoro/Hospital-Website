import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

export const Home = () => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        axios
            .get("http://localhost:5555/patient")
            .then((response) => {
                setPatients(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="p-4">
            <div className="felx justify-between items-center">
                <h1 className="text-3xl my-8">Patients List</h1>
                <Link to="/patient/create">
                    <MdOutlineAddBox className="text-sky-800 text-4xl" />
                    Add Patient
                </Link>
            </div>
            {loading ? (
                <Spinner />
            ) : (
                <table className="w-full border-separate border-spacing-2">
                    <thead>
                        <tr>
                            <th className="border border-slate-600 rounded-md">No</th>
                            <th className="border border-slate-600 rounded-md">Name</th>
                            <th className="border border-slate-600 rounded-md">Address</th>
                            <th className="border border-slate-600 rounded-md">Diagnosis</th>
                            <th className="border border-slate-600 rounded-md">Amount</th>
                        </tr>
                    </thead>

                    <tbody>
                        {patients.map((patient, index) => (
                            <tr key={patient._id} className="h-8">
                                <td className="border border-slate-700 rounded-md text-center">
                                    {index + 1}
                                </td>
                                <td className="border border-slate-700 rounded-md text-center">
                                    {patient.name}
                                </td>
                                <td className="border border-slate-700 rounded-md text-center">
                                    {patient.address}
                                </td>
                                <td className="border border-slate-700 rounded-md text-center">
                                    {patient.diagnosis}
                                </td>
                                <td className="border border-slate-700 rounded-md text-center">
                                    {patient.amount}
                                </td>
                                <td className="border border-slate-700 rounded-md text-center">
                                    <div className="flex justify-center gap-x-4">
                                        <Link to={`/patient/details/${patient._id}`}>
                                            <BsInfoCircle className="text-2xl text-green-800" />
                                        </Link>
                                        <Link to={`/patient/edit/${patient._id}`}>
                                            <AiOutlineEdit className="text-2xl text-yellow-600" />
                                        </Link>
                                        <Link to={`/patient/delete/${patient._id}`}>
                                            <MdOutlineDelete className="text-2xl text-red-600" />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Home;
