const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');
var cors = require('cors')
const port = 3001;

app.use(bodyparser.json());
app.use(cors());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,DELETE,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'clinicdb',
    multipleStatements: true
});

app.get('/', (req, res) => res.send('Welcome to our API'));

mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB has been connected!');
    else
        console.log('DB connection compromised! \n Error:' + JSON.stringify(err, undefined, 2));
});

app.listen(port, () => console.log(`running express on port ${port} `));

//get all patients 
app.get('/patients', (req, res) => {
    mysqlConnection.query('SELECT * FROM patient', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//get a patient
app.get('/patients/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM patient WHERE patID = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//delete a patient
app.delete('/patients/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM patient WHERE patID = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted Successfully');
        else
            console.log(err);
    })
});

//insert a patient
app.post('/patients', (req, res) => {
    let pat = req.body;
    pat.patID = 0;
    console.log('body' + req.body);
    var sql = "SET @patID = ?; SET @fullName = ?; SET @address = ?; SET @sex = ?; SET @reason = ?; \
    CALL patientAddEdit(@patID, @fullName,@address,@sex,@reason);";
    mysqlConnection.query(sql, [pat.patID, pat.fullName, pat.address, pat.sex, pat.reason], (err, rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if (element.constructor == Array)
                    res.send(element);
            });
        else
            console.log(err);
    })
});

//update a patient
app.put('/patients', (req, res) => {
    let pat = req.body;
    console.log(pat);
    var sql = "UPDATE patient SET fullName=?, address=?, sex=?, reason=? WHERE patID=?";
    mysqlConnection.query(sql, [pat.fullName, pat.address, pat.sex, pat.reason, pat.patID], (err, rows, fields) => {
        if (!err)
            res.send(pat);
        else
            console.log(err);
    })
});