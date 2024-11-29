const express = require('express')
const {MongoClient} = require('mongodb')
const cors = require('cors')
require('dotenv').config()
const {v4:uuidv4} = require('uuid')
const app = express()
app.use(express.json())
app.use(cors())


let client

// To Start the Server

const initializeDBAndServer = async () => {
    const dbUser = process.env.DB_USER
    const dbPassword = process.env.DB_PASSWORD
    const dbCluster = process.env.DB_CLUSTER
    const dbName = process.env.DB_NAME
    const uri = `mongodb+srv://${dbUser}:${dbPassword}@${dbCluster}/${dbName}?retryWrites=true&w=majority`;

    client = new MongoClient(uri)

    try{
        await client.connect()
        console.log('Connected to MongoDB...')

        const PORT = process.env.PORT || 3000

        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`)
        })
    }
    catch(e){
        console.log(`Error Connecting to MongoDB: ${e.message}`)
        process.exit(1)
    }
}

initializeDBAndServer()

// API - 1 Create new application 

app.post('/application', async(request, response) => {
    const {solicitorName, solicitorEmail, loanAmount, purchasePrice, isValuationFeePaid, isUkResident} = request.body
    const collection = client.db(process.env.DB_NAME).collection('loanApplications')

    try{
        const checkLTV = (loanAmount/purchasePrice)*100
        const checkEligibility = checkLTV < 60

        const getApplications = await collection.find().toArray()
        const checkLength = getApplications.length + 1

        let status
        let riskRating

        const timestamp = new Date().toISOString();

        if(checkEligibility === true && isValuationFeePaid === true && isUkResident === true){
            riskRating = "Medium"
            status = "Passed"
        }
        else{
            riskRating = "High"
            status = "Failed"
        }
        
        const applicationDetails = {
            applicationId: uuidv4(),
            applicationNum: checkLength,
            solicitorName: solicitorName,
            solicitorEmail: solicitorEmail,
            loanAmount: loanAmount,
            purchasePrice: purchasePrice,
            isValuationFeePaid: isValuationFeePaid === true ? "Yes": "No",
            isUkResident: isUkResident === true ? "Yes": "No",
            riskRating: riskRating,
            ltv: `${checkLTV}%`,
            ltvStatus: checkEligibility === true ? "Passed": "Failed",
            isValuationFeePaidStatus: isValuationFeePaid === true ? "Passed": "Failed",
            isUkResidentStatus: isUkResident === true ? "Passed": "Failed",
            status: status,
            createdAt: timestamp
        }
        
        await collection.insertOne(applicationDetails)
        response.status(201).send({message: "Application Created Successfully"})
    }
    catch(e){
        response.status(500).send({message: "Internal Server Error"})
    }
})


// API - 2 Get All Application Details

app.get('/applications', async(request, response) => {
    const collection = client.db(process.env.DB_NAME).collection('loanApplications')
    
    const getApplications = await collection.find().toArray()

    if(getApplications.length > 0){
        response.status(201).send(getApplications)
    }
    else{
        response.status(401).send({message: "No Application Details Available"})
    }
      
})


// API - 3 Get Application Details

app.get('/application/:applicationId', async(request, response) => {
    const {applicationId} = request.params
    try {
        const collection = client.db(process.env.DB_NAME).collection('loanApplications')
        if(applicationId !== undefined || applicationId !== ''){
            const getApplicationDetails = await collection.find({applicationId: applicationId}).toArray()

            if(getApplicationDetails.length === 1){
                response.status(201).send(getApplicationDetails)
            }
            else{
                response.status(401).send({message: "Invalid Application Details"})
            }
        }
        else{
            response.status(401).send({message: "Please Provide Correct Information"})
        }
        
    }
    catch(e){
        response.status(500).send({message: "Internal Server Error"})
    }    

})