const express = require("express");
// Importing Connection
const db = require("../db");
// Connecting to database

// Importing Router From Express
const router = express.Router();

// ROUTE:1 admin-login
router.post("/admin-login", (req, res) => {
  let sql = `SELECT * FROM admin WHERE admin_email = '${req.body.email}' AND admin_password = '${req.body.password}'`;
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(200).json({
        status: false,
        res: "Make sure server is connected, Something Went Wrong",
        data: null,
      });
    }
    if (result.length > 0) {
      return res.status(200).json({
        status: true,
        res: "Data Fetched Successfully",
        data: result,
      });
    }
    return res.status(200).json({
      status: false,
      res: "Invalid Credentials",
      data: null,
    });
  });
});

// ROUTE:2 signUp
router.post("/signup", (req, res) => {
  const user = {
    user_name: req.body.user_name,
    user_email: req.body.user_email,
    user_contact: req.body.user_contact,
    user_password: req.body.user_password,
  };
  let checkSql = `SELECT * FROM  users WHERE user_email = '${req.body.user_email}' OR user_contact = '${req.body.user_contact}'`;
  db.query(checkSql, (err, result) => {
    if (err) {
      return res.status(200).json({
        status: false,
        res: "Something went wrong while checking duplication of error",
        data: null,
      });
    }
    if (result.length > 0) {
      return res.status(200).json({
        status: false,
        res: "User with this email or contact already exists",
        data: null,
      });
    }
    let sql = "INSERT INTO users SET ?";
    db.query(sql, user, (err, result) => {
      if (err) {
        return res.status(200).json({
          status: false,
          res: "Make sure server is connected, Something Went Wrong",
          data: null,
        });
      }
      if (result.affectedRows > 0) {
        return res.status(200).json({
          status: true,
          res: "Registered Successfully",
          data: null,
        });
      }
      return res.status(200).json({
        status: false,
        res: "Something Went Wrong",
        data: null,
      });
    });
  });
});

// ROUTE:3 fetchingusers
router.get("/fetch-users", (req,res)=>{
     let sql  = "SELECT * FROM users";
     db.query(sql, (err,result)=>{
      if(err){
        return res.status(200).json({
          status: false,
          res: "Something went wrong while checking duplication of error",
          data: null,
        });
      }
      return res.status(200).json({
        status: true,
        res: "Users Fetched",
        data: result,
      });
     })
})

module.exports = router;
