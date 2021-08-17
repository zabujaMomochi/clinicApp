import axios from 'axios'
import React,{useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure()

function AddPatient() {
    const [patient, setPatient] = useState({})
    function handleSubmit(e) {
        e.preventDefault()
        axios.post("http://localhost:8080/clinicalservices/api/patients",patient) 
        .then(res => {
            
            toast("Patient added successfully",{autoClose:2000,position:toast.POSITION.BOTTOM_CENTER})
        })
    }
    return (
        <div>
            <h2>Create Patient</h2>
            <form>
                First Name: <input type="text" name="firstName" onChange={e => {patient.firstName = e.target.value}} /><br/>
                Last Name: <input type="text" name="lastName" onChange={e => {patient.lastName = e.target.value}} /><br/>
                Age: <input type="text" name="age" onChange={e => {patient.age = e.target.value}} />
                <button onClick={handleSubmit}>Confirm</button>
            </form>
            <Link to="/">Go Back</Link>
        </div>
    )
}

export default AddPatient