// Importing mysql to project
const mysql = require('mysql');


// Crearting Connection to mysql

    const db = mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"",
        database:"soft49"
    });
    db.connect((err)=>{
        if(err){
            throw err;
        }
       
    });


module.exports = db;

