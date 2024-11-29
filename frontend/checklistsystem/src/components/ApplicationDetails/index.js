import { useState, useEffect, useCallback } from "react"
import { InfinitySpin } from 'react-loader-spinner'
import Navbar from "../Navbar"
import './index.css'

const ApplicationDetails = props =>  {
    const [showLoader, setLoaderStatus] = useState(true)
    const [applicationData, setapplicationData] = useState()

    const {history} = props

    const getApplicationDetails = async () => {
        const {match} = props
        const {params} = match
        const {id} = params

        const API_URL = `https://simple-checklist-backend.onrender.com/application/${id}`
        const options = {
            method: "GET"
        }

        const response = await fetch(API_URL, options)
        const data = await response.json()
        if(response.ok === true){
            setapplicationData(data)
            setLoaderStatus(false)
        }
        else{
            setLoaderStatus(false)
            history.replace("/")
        }
        
    }
    
    useEffect(() => {
        getApplicationDetails()
    }, [])

    return(
        <div>
            <Navbar />
            <h1> Application Details </h1>
            {
                showLoader ? 
                <div className='loader-container'>
                    <span className="loader"> <InfinitySpin /> </span> 
                </div> :
                applicationData.length === 1 && 
                    <div className="application-details-container">
                        <p><strong> Application Id: </strong> {applicationData[0].applicationId} </p>
                        <p><strong> Application Number: </strong> {applicationData[0].applicationNum} </p>
                        <p><strong> Solicitor Name: </strong> {applicationData[0].solicitorName} </p>
                        <p><strong> Solicitor Email: </strong> {applicationData[0].solicitorEmail} </p>
                        <p><strong> Loan Amount: </strong> {applicationData[0].loanAmount} </p>
                        <p><strong> Purchase Price: </strong> {applicationData[0].purchasePrice} </p>
                        <p>
                            <strong> Valuation Fee Paid: </strong>
                            <span className={`status ${applicationData[0].isValuationFeePaid.toLowerCase()}`}>
                                {applicationData[0].isValuationFeePaid}
                            </span>
                        </p>
                        <p>
                            <strong> UK Resident: </strong>
                            <span className={`status ${applicationData[0].isUkResident.toLowerCase()}`}>
                                {applicationData[0].isUkResident}
                            </span>
                        </p>
                        <p><strong> Risk Rating: </strong> {applicationData[0].riskRating} </p>
                        <p><strong> LTV: </strong> {applicationData[0].ltv} </p>
                        <p>
                            <strong> LTV Status: </strong>
                            <span className={`status ${applicationData[0].ltvStatus.toLowerCase()}`}>
                                {applicationData[0].ltvStatus}
                            </span>
                        </p>
                        <p>
                            <strong> Valuation Fee PaidStatus: </strong>
                            <span className={`status ${applicationData[0].status.toLowerCase()}`}> 
                                {applicationData[0].isValuationFeePaidStatus} 
                            </span>     
                        </p>
                        <p>
                            <strong> UK ResidentStatus: </strong> 
                            <span className={`status ${applicationData[0].status.toLowerCase()}`}>
                                {applicationData[0].isUkResidentStatus}
                            </span>
                        </p>
                        <p>
                            <strong> Status: </strong>
                            <span className={`status ${applicationData[0].status.toLowerCase()}`}>
                                {applicationData[0].status}
                            </span>
                        </p>
                        <p><strong> Created At: </strong> {applicationData[0].createdAt} </p>
                    </div> 
            }
        </div>
    )
}

export default ApplicationDetails