const mongoose=require('mongoose');
const customers=require('./routes/customers');
const genres=require('./routes/genres');
const home=require('./routes/home');
const express=require('express');
const app=express();

mongoose.connect('mongodb://localhost/vidly')
.then(()=>console.log('Connectd to MongoDB..'))
.catch(()=>console.log('Failed to connect with database'));


app.use(express.json());
app.use('/api/genres',genres);
app.use('/api/customers',customers);
app.use('/',home);


const port=process.env.PORT || 3000;
app.listen(port,()=>console.log(`Server is listening on port: ${port}`));
