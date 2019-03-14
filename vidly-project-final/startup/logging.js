require('express-async-errors');
const winston=require('winston');
require('winston-mongodb');

module.exports=function(){

    //for errors in sync code 
    /*process.on('uncaughtException',(ex)=>{
        winston.error(ex.message,ex);
        process.exit(1);
    });*/
    //======OR=====

    winston.handleExceptions(
        new winston.transports.File({ filename:'uncaughtExceptions.log'}),
        new winston.transports.MongoDB({
            db:'mongodb://localhost/vidly',
            level:'debug'
        })
    )

    //for errors in async code
    /*process.on('unhandledRejection',(ex)=>{
        // console.log('We got an unhandled rejection');
        winston.error(ex.message,ex);
        process.exit(1);
    });*/

    //=====OR=====
    process.on('unhandledRejection',(ex)=>{
        throw ex;
    });

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

    //Sync
    //throw new Error('Something failed during startup');

    //Async
    //  const p=Promise.reject(new Error('Something failed miserable'));
    //  p.then(()=>console.log('Done')); //p.catch is not here
}