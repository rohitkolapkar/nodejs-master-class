const http=require('http');

/*const server=http.createServer();
server.listen(3000);

// Registering an event listener
server.on('connection',(socket)=>{
    console.log('New Connection');
})

console.log('listening on port 3000...');
*/
//=-=--=-=-=-=-=-=-=-=-=-=-=-=

const server=http.createServer((req,res)=>{
    if(req.url==='/'){
        res.write("Hello : '/'");
        res.end();
    }
    if(req.url==='/api/courses'){
        res.write("Hello : '/api/courses'");
        res.write(JSON.stringify([1,2,3]));
        res.end();
    }
});
server.listen(3000);

console.log('listening on port 3000...');