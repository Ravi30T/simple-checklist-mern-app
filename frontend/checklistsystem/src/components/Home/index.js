import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { InfinitySpin } from 'react-loader-spinner'
import Navbar from '../Navbar'
import './index.css'

const Home = () => {
    const [showLoader, setLoaderStatus] = useState(true)
    const [showNoApplications, setNoApplicationsStatus] = useState(false)
    const [noApplicationsMsg, setNoApplicationsMessage] = useState('')
    const [applicationsData, setApplicationsData] = useState([])

    const getApplicationsData = async() => {
        setLoaderStatus(true)
        setNoApplicationsMessage('')
        setApplicationsData()
        setNoApplicationsStatus(false)
        
        const API_URL = `https://simple-checklist-backend.onrender.com/applications`
        const options = {
            method: "GET"
        }

        const response = await fetch(API_URL, options)
        const data = await response.json()
        
        if(response.ok === true){
            setLoaderStatus(false)
            setNoApplicationsStatus(false)
            setApplicationsData(data)
        }
        else{
            setLoaderStatus(false)
            setNoApplicationsMessage(data.message)
            setNoApplicationsStatus(true)
        }
    }

    useEffect(() => {
        getApplicationsData()
    }, [])

    return(
        <div>
            <Navbar />
            <div className='home-main-container'>
                {
                    showLoader ? 
                    <div className='loader-container'>
                        <span className="loader"> <InfinitySpin /> </span> 
                    </div> : showNoApplications ? 
                    
                    <p className='no-applications-msg'> {noApplicationsMsg} </p> : 
                    
                    <div className='applications-container'> 
                        <ul className='list-container'>
                            {
                                applicationsData.map(each => (
                                    <li key={each.applicationId} className='each-application-card'>
                                        <div className='application-details-view-btn-container'>
                                            <div className='application-id-date-container'>
                                                <p> <strong> Application Id: </strong> {each.applicationId} </p>
                                                <p> <strong> Date: </strong> {each.createdAt} </p>
                                                <p> <strong> Loan Amount: </strong> {each.loanAmount} </p>
                                                <p> <strong> Purchase Amount: </strong> {each.purchasePrice} </p>
                                                <p> <strong> LTV: </strong> {each.ltv} </p>
                                                <p>
                                                    <strong>Status:</strong>{' '}
                                                    <span
                                                        className={each.status.toLowerCase() === 'failed' ? 'status-failed' : each.status.toLowerCase() === 'passed' ? 'status-passed' : ''}
                                                    >
                                                        {each.status}
                                                    </span>
                                                </p>
                                            </div>

                                            <div className='application-details-btn-container'>
                                                <Link to={`/application-details/${each.applicationId}`}>
                                                    <button className='application-details-btn'> View </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                }
            </div>
        </div>
    )
}

export default Home