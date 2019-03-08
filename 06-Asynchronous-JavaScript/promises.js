const p=new Promise((resolve,reject)=>{
    //kick off some async work
    //...
    setTimeout(()=>{
        resolve(1); //Pending=> resolved,fulfilled
        reject(new Error('message')); // pending => rejected

    },2000);
  
});
p
.catch(err=>console.log('Error : ',err.message))
.then(result=>console.log('Result',result));

