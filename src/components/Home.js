import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function RowCreator ({item}) {
    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.firstName}</td>
            <td>{item.lastName}</td>
            <td>{item.age}</td>
            <td><Link to={'patientDetails/' + item.id}>Add Data</Link></td>
            <td><Link to={'analyze/' + item.id}>Analyze</Link></td>
        </tr>
    )
}


function Home() {
    const [patientData, setPatientData] = useState([])
    useEffect(() => {
        axios.get("http://localhost:8080/clinicalservices/api/patients")
        .then(res => {
            setPatientData(res.data)
        })
    },[])
    return (
        <div>
            <h2>Patient: </h2>
            <table align="center">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Age</th>
                </tr>
                </thead>
                <tbody>
                    {patientData.map(patient => <RowCreator item ={patient} />)}
                </tbody>
            </table>
            <br />
            <Link to={'/addPatient'}>Register Patient</Link>
        </div>
    )
}

export default Home