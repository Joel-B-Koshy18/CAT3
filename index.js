const express = require('express')
const app = express()
var cors = require('cors')
const bodyParser = require('body-parser')
const mysql = require('mysql')

const port = 3000
const hostname = 'localhost'

const db = "INFOSYS"
const tbl = "SPRING"

app.use(cors())

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));

var corsOptions = {
    origin: '*',
    methods: "GET",
    optionsSuccessStatus: 200 
}

// MySQl connection
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin",
    database: db
});

// Connect with MySql
connection.connect((err) => {
    if (err)
        throw (err)
    console.log("MySql Connected")
})



// routes
app.get('/', (req, res) => {
    // Display all data
    res.status(200)
    res.setHeader('Content-Type', 'application/json')
    connection.query("SELECT * from " + tbl, function (err, result) {
        if (err) throw err;
        console.log("Result: " + JSON.stringify(result));
        res.end(JSON.stringify(result))
    });
})

app.post('/new', (req,res) => {
    res.status(200)
    res.setHeader('Content-Type', 'application/json')
    // console.log(req.body)
    var resp = req.body
    console.log(resp['id'])
    connection.query("INSERT into " + tbl + " VALUES (" + resp['emp_id'] + ",\'" + resp['emp_name'] + "\',\'" + resp['emp_designation'] + "\',\'" + resp['emp_dep'] + "\'," + resp['emp_salary'] + ",\'" + resp['emp_location'] + "\')", function (err, result) {
        if (err) throw err;
        console.log("Result: " + JSON.stringify(result));
        res.end(JSON.stringify(result))
    });
})

app.post('/update', (req,res) => {
    res.status(200)
    res.setHeader('Content-Type', 'application/json')
    // console.log(req.body)
    var resp = req.body
    console.log(resp['emp_id'])
    connection.query("UPDATE " + tbl + " SET emp_name= \'" + resp['emp_name'] + "\', emp_designation=\'" + resp['emp_designation'] + "\',emp_dep=\'" + resp['emp_dep'] + "\',emp_salary=" + resp['emp_salary'] + ",emp_location=\'" + resp['emp_location'] + "\' where emp_id = " + resp['emp_id'], function (err, result) {
        if (err) throw err;
        console.log("Result: " + JSON.stringify(result));
        res.end(JSON.stringify(result))
    });
})

app.post('/search', (req, res) => {
    // Display all data
    res.status(200)
    res.setHeader('Content-Type', 'application/json')
    var getdep= req.body
    connection.query("SELECT * from " + tbl + " where emp_location = \'" + getdep['emp_location'] + "\'", function (err, result) {
        if (err) throw err;
        console.log("Result: " + JSON.stringify(result));
        res.end(JSON.stringify(result))
    });
})

app.post('/searchsal', (req, res) => {
    // Display all data
    res.status(200)
    res.setHeader('Content-Type', 'application/json')
    // var getsal= req.body
    connection.query("SELECT * from " + tbl + " where emp_salary > 120000", function (err, result) {
        if (err) throw err;
        console.log("Result: " + JSON.stringify(result));
        res.end(JSON.stringify(result))
    });
})

app.post('/delete', (req,res) => {
    res.status(200)
    res.setHeader('Content-Type', 'application/json')
    var delempid = req.body['delID']
    console.log(delempid)

    connection.query("DELETE from " + tbl + " where emp_id = " + delempid, function (err, result) {
        if (err) throw err;
        console.log("Result: " + JSON.stringify(result));
        res.end(JSON.stringify(result))
    });
})



// Http connection
app.listen(port, hostname, () => {
    console.log(`App listening at http://${hostname}:${port}`)
})