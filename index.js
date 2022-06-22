// server creation

//import express

const express = require('express')

//import jsonwebtoken

const jwt = require('jsonwebtoken')

//import dataService
const dataService = require('./services/data.service')

// create server application using express

const app = express()


//parse JSON data

app.use(express.json())

//application specific middleware
const appMiddleware = (req,res,next)=>{
    console.log("Application specific middleware");
    next()
}

//use middleware in app
app.use(appMiddleware)

//Bank server

const jwtMiddleware = (req,res,next)=>{
    //fetch token
try { token = req.headers['x-access-token']
    //verify token
    const data = jwt.verify(token,'supersecretkey12345')
    console.log(data);
    next() 
 }
    catch{
        res.status(401).json({
            status:false,
            statusCode:401,
            message:'Please Log In'
        })

    }


}

//register API
app.post('/register',(req,res)=>{
//register resolving
// console.log(req.body);
    const result = dataService.register(req.body.username,req.body.acno,req.body.password)
    res.status(result.statusCode).json(result)

})
//login API
app.post('/login',(req,res)=>{
    //register resolving
    // console.log(req.body);
        const result = dataService.login(req.body.acno,req.body.pswd)
        res.status(result.statusCode).json(result)
    
    })

//deposit API
app.post('/deposit',jwtMiddleware, (req,res)=>{
    //register resolving
    // console.log(req.body);
        const result = dataService.deposit(req.body.acno,req.body.password,req.body.amt)
        res.status(result.statusCode).json(result)
    
    })
    
//withdraw API
app.post('/withdraw',jwtMiddleware, (req,res)=>{
    //register resolving
    // console.log(req.body);
        const result = dataService.withdraw(req.body.acno,req.body.password,req.body.amt)
        res.status(result.statusCode).json(result)
    
    }) 

//transaction API
app.post('/transaction',jwtMiddleware, (req,res)=>{
    //register resolving
    // console.log(req.body);
        const result = dataService.getTransaction(req.body.acno)
        res.status(result.statusCode).json(result)
    
    })    

//user request resolving


//GET REQUEST--fetch or read data
app.get('/',(req,res)=>{
    res.send("GET Request")
})

//POST REQUEST--to create data
app.post('/',(req,res)=>{
    res.send("POST Request")
})

//PUT REQUEST-- to modify entire data
app.put('/',(req,res)=>{
    res.send("PUT Request")
})

//PATCH REQUEST- to  modify partially
app.patch('/',(req,res)=>{
    res.send("PATCH Request")
})

//DELETE REQUEST- to delete data
app.delete('/',(req,res)=>{
    res.send("DELETE Request")
})






//set up the port number to the server  app

app.listen(3000,()=>{
    console.log("server started at 3000");
})




