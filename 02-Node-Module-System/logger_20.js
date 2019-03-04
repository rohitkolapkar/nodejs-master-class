const EventEmitter=require('events');

class Logger extends EventEmitter{

    log(message){

        console.log(message);
    
        //Raise an event
        this.emit('messageLogged',{url:'udemy.com',name:'Rohit'});
    }

}


module.exports=Logger;