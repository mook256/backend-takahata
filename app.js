const express = require('express')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const mysql = require('mysql2/promise')
const bcrypt = require('bcryptjs')
const cors = require('cors')

//import controlers
const authMiddleware = require('./middlewares/authMiddleware')
const loginController = require('./controllers/loginController')
const typeRepairController = require('./controllers/typeRepairController')
const resourceShowController = require('./controllers/resourceShowController')
const IT_ServiceController = require('./controllers/IT_ServiceController')
const IT_Repair_TableController = require('./controllers/IT_Repair_TableController')
const IT_Repair_statusController = require('./controllers/IT_Repair_statusController')
const Level_ServiceController= require('./controllers/Level_ServiceController')
const IT_Service_AdminDetailController= require('./controllers/IT_Service_AdminDetailController')
const IT_Request_SubmitController= require('./controllers/IT_Request_SubmitController')
const IT_Request_StatusController = require('./controllers/IT_Request_StatusController')
const IT_Request_TableController = require ('./controllers/IT_Request_TableController')
const IT_Request_AdminDetailController = require ('./controllers/IT_Request_AdminDetailController')
const IT_Request_ApprovalController = require ('./controllers/IT_Request_ApprovalController')
const IT_Request_ManagerDetailController = require ('./controllers/IT_Request_ManagerDetailController')

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials : true
};

const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(cors(corsOptions));

global.conn = null
global.num1 = 1
global.num2 = 1
// init db
const initDB = async () => {
    conn = await mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASS,
        database: process.env.MYSQL_NAME
    })
}
// controller
app.post('/api/login', loginController)
//app.get('/api/get/typeRepair', authMiddleware, typeRepairController)
app.get('/api/get/typeRepair', typeRepairController)
app.post('/api/get/resource', resourceShowController)
app.post('/api/IT_Service_data', IT_ServiceController)
app.post('/api/IT_Repair_data_table', IT_Repair_TableController)
app.post('/api/IT_Repair_status_choice', IT_Repair_statusController)
app.post('/api/Level_ServiceController', Level_ServiceController)
app.post('/api/save_admin_note', IT_Service_AdminDetailController)
app.post('/api/IT_Request_Submit', IT_Request_SubmitController)
app.post('/api/IT_Request_StatusController',IT_Request_StatusController)
app.post('/api/IT_Request_TableController',IT_Request_TableController)
app.post('/api/IT_Request_AdminDetailController',IT_Request_AdminDetailController)
app.post('/api/IT_Request_ApprovalController',IT_Request_ApprovalController)
app.post('/api/IT_Request_ManagerDetailController',IT_Request_ManagerDetailController)
///api/IT_Request_Submit



// main
app.listen(process.env.PORT, async () => {
    await initDB()
    console.log('Server started on port ' + process.env.PORT)
})