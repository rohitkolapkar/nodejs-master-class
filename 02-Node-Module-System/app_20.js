const EventEmitter=require('events');

const Logger=require('./logger_20');
const logger=new Logger();

//Registering an listener
logger.on('messageLogged',(arg)=>{ //e //earg //emitarg
    console.log("Listener Called : ", arg);
});

logger.log('message');