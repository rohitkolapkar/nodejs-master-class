// this error.js is only for express - request processing pipeline 

//any error in the app itself will not be handled by this. 

const winston=require('winston');

module.exports=function(err,req,res,next){
    //log the exception
    winston.error(err.message,err);
    //error
    //warn
    //info
    //verbose
    //silly

    res.status(500).send('Something failed');
}