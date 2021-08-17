import axios from 'axios'
import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'


function TableCreator(props) {
    return (
        <div>
            <table>
                <tr>
                    <td><b>{props.item.componentName}</b></td>
                </tr>
                <tr>
                    <td>{props.item.componentName}</td>
                    <td>{props.item.componentValue}</td>
                    <td>{props.item.measuredDateTime}</td>
                </tr>
            </table>
        </div>
    )
}


function AnalyzeData() {
    const [data, setData] = useState({})
    const [clinicalData, setClinicalData] = useState([])
    const {patientId} = useParams()
    useEffect(() => {
        axios.get("http://localhost:8080/clinicalservices/api/patients/analyze/"+patientId)
        .then(res => {
            setData(res.data)
            setClinicalData(res.data.clinicalData)
        })
    },[])
    /*
    const clinicalData = data.clinicalData    (doubt)
    */
    return (
        <div>
            <h2>Patient Details: </h2>
            First Name: {data.firstName}<br/>
            Last Name: {data.lastName} <br/>
            Age: {data.age}<br/>
            {clinicalData.map(eachEntry => <TableCreator item={eachEntry} patientId={patientId} />)}
        </div>
    )
}

export default AnalyzeData