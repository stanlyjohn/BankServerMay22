//import jsonwebtoken
const jwt = require('jsonwebtoken')

//import db.js
const db = require('./db')


//database
// db = {
//   1000:{"acno":1000,"username":"neer","password":1000,"balance":5000,transaction:[]},
//   1001:{"acno":1001,"username":"lysha","password":1001,"balance":5000,transaction:[]},
//   1002:{"acno":1002,"username":"vipin","password":1002,"balance":5000,transaction:[]}

// }

//register
const register = (username, acno, password) => {

  //asynchronous
  return db.User.findOne({
    acno
  }).then(user => {
    console.log(user);
    // res.send("success")
    if (user) {
      return {
        status: false,
        message: "Already Registred....Please Login..!! ",
        statusCode: 401
      }
    }

    else {
      //insert in db
      const newUser = new db.User({
        acno,
        username,
        password,
        balance: 0,
        transaction: []

      })
      newUser.save()
      return {
        status: true,
        message: "Registred Successfully",
        statusCode: 200

      }
    }
  })
}


//login asynchronous
const login = (acno, pswd) => {

  return db.User.findOne({
    acno,
    password:pswd
  }).then(user=>{
    if(user){
      currentUser = user.username
      currentAcno = acno
      //token generation
      token = jwt.sign({
        //store account number inside token
        currentAcno: acno

      }, 'supersecretkey12345')

      return {
        status: true,
        message: "Login Successfull",
        statusCode: 200,
        currentUser,
        currentAcno,
        token

      }

    }
    else{
      return {
        status: false,
        message: "Invalid Account Number or Password!!",
        statusCode: 401
  
      }
    }
  })
}

//deposit - asynchronous

const deposit = (acno, password, amt) => {

  var amount = parseInt(amt)

  return db.User.findOne({
    acno,
    password
  }).then(user=>{
    if(user){
      user.balance += amount
      user.transaction.push({
        type: "CREDIT",
        amount: amount
      })
      user.save()
      return {
        status: true,
        message: amount + "deposited Successfully balance is :" + user.balance,
        statusCode: 200

      }

    }
    else{
      return {
        status: false,
        message: "Invalid Account Number or Password!!",
        statusCode: 401
  
      }

    }

  })

}

//withdraw

const withdraw = (acno, password, amt) => {
  var amount = parseInt(amt)
  return db.User.findOne({
    acno,
    password
  }).then(user=>{
    if(user){
      if(user.balance>amount){
        user.balance -= amount
        user.transaction.push({
          type: "CREDIT",
          amount: amount
        })
        user.save()
        return {
          status: true,
          message: amount + "debited Successfully balance is :" + user.balance,
          statusCode: 200
  
        }

      }
      else{
        return {
          status: false,
          message: " Insufficinet Balance...!!!",
          statusCode: 401
    
        }

      }


    }
    else{
      return {
        status: false,
        message: "Invalid Account Number or Password!!",
        statusCode: 401
  
      }

    }

  })
}

//transaction
const getTransaction = (acno) => {
  return db.User.findOne({
    acno
  }).then(user=>{
    if(user){
      return {
        status: true,
        statusCode: 200,
        transaction: user.transaction
  
      }

    }
    else{
      return {
        status: false,
        message: "User does not Exist....!!",
        statusCode: 401
  
      }

    }
  })
}




//export

module.exports = {
  register,
  login,
  deposit,
  withdraw,
  getTransaction
}