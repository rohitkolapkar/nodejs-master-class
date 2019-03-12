require('express-async-errors');
const winston=require('winston');
require('winston-mongodb');
const error=require('./middleware/error');
const config=require('config');
const Joi = require('joi');
Joi.objectId=require('joi-objectid')(Joi);
const mongoose=require('mongoose');
const customers=require('./routes/customers');
const genres=require('./routes/genres');
const movies=require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const home=require('./routes/home');
const express=require('express');
const app=express();

winston.add(winston.transports.File,{filename:'logfile.log'});
winston.add(winston.transports.MongoDB,{
    db:'mongodb://localhost/vidly',
    level:'debug'
    //error
    //warn
    //info
    //verbose
    //silly
});

if(!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR:jwtPrivateKey is not defined.');
    process.exit(1);
}

mongoose.connect('mongodb://localhost/vidly')
.then(()=>console.log('Connectd to MongoDB..'))
.catch(()=>console.log('Failed to connect with database'));


app.use(express.json());
app.use('/api/genres',genres);
app.use('/api/customers',customers);
app.use('/api/movies',movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/',home);


// app.use(function(err,req,res,next){
//     //log the exception
//     res.status(500).send('Something failed');
// })

app.use(error);


const port=process.env.PORT || 3000;
app.listen(port,()=>console.log(`Server is listening on port: ${port}`));
