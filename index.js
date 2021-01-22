const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require('./model/user')
const bcrypt = require('bcrypt')
require('dotenv').config()
const jwt= require('jsonwebtoken')

const JWT_SECRET='dfhsdjcv&%%&*bhbbnjsmdajsnjcnj'
// process.env.MESSAGE_STYLE='uppercase'
//console.log(process.env.MONGO_URL);
//const url='MONGO_URL'
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

app.use(bodyParser.json())

app.use('/', express.static(path.resolve(__dirname, 'public')))


app.post('/api/login',async (req,res)=>{
    
    const {user,pass} =req.body
    const username= await User.findOne({user}).lean()
    // console.log(username);
    if(!username){
        return res.json({status:'error',error:'invalis entries'})
    }

    if(await bcrypt.compare(pass,username.pass)){ 

        const token  = jwt.sign({
            id:username.id,
            user:username.user
         },
         JWT_SECRET)
        return res.json({status:'ok',data:token})
    }

    res.json({status:'error',error:'invalid entry'})
})


app.post('/api/register', async (req, res) => {
    console.log(req.body);
    const { user, pass: plainPass } = req.body

    if(!user || typeof user !== 'string'){
        return res.json({status:'error',error:'Invalid username'})
    }

    const pass = await bcrypt.hash(plainPass, 10);

    try {
        const respons = await User.create({
            user, pass
        })
        res.json({ status: 'ok' })
        console.log(respons);
    }
    catch (error) {
        console.log(error);
        return res.json({ status: 'error' })
    }


})

const port = process.env.PORT
app.listen(port, () => {
    //console.log(process.env.PORT);
    console.log('listening on port 5000')
})



// app.get('/',(req,res)=>{
//     res.send('hello world............')
// })

// app.get('/home',(req,res)=>{
//     res.sendFile(path.resolve(__dirname,'public/index.html'))
// })