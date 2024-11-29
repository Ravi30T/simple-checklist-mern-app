import { useState } from "react"

import Navbar from "../Navbar"
import './index.css'

const ApplicationForm = props => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [loanAmount, setLoanAmount] = useState()
    const [purchasePrice, setPurchasePrice] = useState()
    const [isFeePaid, setFeePaidStatus] = useState()
    const [isUKResident, setUKResidentStatus] = useState()

    const [showErrMsg, setErrMsgStatus] = useState(false)
    const [errMsg, setErrMsg] = useState("")

    const onSubmitForm = async (e) => {
        
        e.preventDefault()

        setErrMsgStatus(false)
        setErrMsg("")
        const {history} = props

        if(name !== undefined && email !== undefined && loanAmount !== undefined && purchasePrice !== undefined && isFeePaid !== undefined && isUKResident !== undefined){
            if(parseFloat(purchasePrice) !== 0 && parseFloat(loanAmount) !== 0){
                const applicationDetails = {
                    solicitorName: name,
                    solicitorEmail: email,
                    loanAmount: loanAmount,
                    purchasePrice: purchasePrice,
                    isValuationFeePaid: isFeePaid,
                    isUkResident: isUKResident
                }
                console.log(applicationDetails)

                const API_URL = `https://simple-checklist-backend.onrender.com/application`
                const options = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(applicationDetails)
                }

                const response = await fetch(API_URL, options)
                const data = await response.json()
                
                if(response.ok === true){
                    setName("")
                    setEmail("")
                    setLoanAmount()
                    setPurchasePrice()
                    setFeePaidStatus()
                    setUKResidentStatus()
                    alert(data.message)
                    history.replace('/')
                }
                else{
                    setName("")
                    setEmail("")
                    setLoanAmount()
                    setPurchasePrice()
                    setFeePaidStatus()
                    setUKResidentStatus()
                    alert(data.message)
                    history.replace('/')
                }
            }
            else{
                setErrMsg("Amount must be greater than zero")
                setErrMsgStatus(true)
            }
        }
        else{
            setErrMsg("All Fields are required")
            setErrMsgStatus(true)
        }
    }

    return (
        <div>
            <Navbar />
            <div className="application-form-main-container">
                <h1 className="application-form-heading"> Application Form </h1>
                <form className="form-container" onSubmit={onSubmitForm}>
                    <div className="each-label-input-container">
                        <label className="each-label" htmlFor="name"> Name </label>
                        <input type="text" id="name" placeholder="Enter your name" onChange={(e) => setName(e.target.value)} className="each-input" required/>
                    </div>

                    <div className="each-label-input-container">
                        <label className="each-label" htmlFor="email"> Email </label>
                        <input type="text" id="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} className="each-input" required />
                    </div>

                    <div className="each-label-input-container">
                        <label className="each-label" htmlFor="loan-amount"> Loan Amount </label>
                        <input type="number" id="loan-amount" placeholder="Enter your loan amount" onChange={(e) => setLoanAmount(e.target.value)} className="each-input" required />
                    </div>
                    
                    <div className="each-label-input-container">
                        <label className="each-label" htmlFor="purchase-amount"> Purchase Amount </label>
                        <input type="number" id="purchase-amount" placeholder="Enter your purchase amount" onChange={(e) => setPurchasePrice(e.target.value)} className="each-input" required/>
                    </div>

                    <div className="each-label-input-container">
                        <label className="each-label" > Valuation Fee Paid? </label>
                        <div className="yes-no-container">
                            <div className="yes-no-btn-container">
                                <input type="radio" id="valuation-fee-paid-yes" onChange={() => setFeePaidStatus(true)} name="paid-status" />
                                <label className="yes-no-label-name" htmlFor="valuation-fee-paid-yes"> Yes </label>
                            </div>

                            <div className="yes-no-btn-container">
                                <input type="radio" id="valuation-fee-paid-no" onChange={() => setFeePaidStatus(false)} name="paid-status" />
                                <label className="yes-no-label-val" htmlFor="valuation-fee-paid-no"> No </label>
                            </div>
                        </div>
                    </div>

                    <div className="each-label-input-container">
                        <label className="each-label"> Are you an UK Resident? </label>
                        <div className="yes-no-container">
                            <div className="yes-no-btn-container">
                                <input type="radio" id="uk-resident-yes" onChange={() => setUKResidentStatus(true)} name="purchase-amount" />
                                <label className="yes-no-label-val" htmlFor="uk-resident-yes"> Yes </label>
                            </div>

                            <div className="yes-no-btn-container">
                                <input type="radio" id="uk-resident-no" onChange={() => setUKResidentStatus(false)} name="purchase-amount" />
                                <label className="yes-no-label-val" htmlFor="uk-resident-no"> No </label>
                            </div>
                        </div>
                    </div>
                    {showErrMsg && <p className="err-msg"> {errMsg} </p>}
                    <div className="confirm-btn-container">
                        <button type="submit" className="confirm-btn"> Confirm </button>
                    </div>
                    
                </form>
            </div>

        </div>
    )
}

export default ApplicationForm
