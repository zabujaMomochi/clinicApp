import axios from 'axios'
import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure()

function CollectClinicals() {
    const [patient, setPatient] = useState({})
    const {patientId} = useParams()
    useEffect(() => {
        axios.get("http://localhost:8080/clinicalservices/api/patients/"+patientId)
        .then(res => {
            setPatient(res.data)
        })
    },[])
    function handleSubmit(e) {
        e.preventDefault()
        patient.patientId = patientId
        axios.post("http://localhost:8080/clinicalservices/api/clinicals",patient) 
        .then(res => {
            toast("Patient Data Saved Successfully",{autoClose:3000,position:toast.POSITION.BOTTOM_CENTER})
        })
    }
    return (
        <div>
            <h2>Patient Details: </h2>
            First Name: {patient.firstName}<br/>
            Last Name: {patient.lastName}<br/>
            Age: {patient.age}<br/>
            <h2>Clinical Data: </h2>
            <form>
                Clinical Entry Type <select onChange={e => {patient.componentName = e.target.value}}>
                    <option>Select One</option>
                    <option value="bp">Blood Pressure(Sys/Dys)</option>
                    <option value="hw">Height/Weight</option>
                    <option value="heartRate">Heart Rate</option>
                </select>
                Value: <input type="text" name="componentValue" onChange={e => {patient.componentValue = e.target.value}} />
                <button onClick={handleSubmit} >Confirm</button>
            </form>
        </div>
    )
}

export default CollectClinicals