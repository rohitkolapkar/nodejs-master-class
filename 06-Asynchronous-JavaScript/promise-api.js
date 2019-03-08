
// const p=Promise.resolve({id:1});
// p.then(user=>console.log('User : ',user));

// const p1=Promise.reject(new Error('reason for rejection..'));
// p1.catch(error=>console.log('Error : ',error));

const p1=new Promise((resolve)=>{
    setTimeout(()=>{
        console.log('Async Operation 1..');
        //reject(new Error('because somethng failed'));
        resolve(1);
    },2000);
})

const p2=new Promise((resolve)=>{
    setTimeout(()=>{
        console.log('Async Operation 2..');
        resolve(2);
    },2000);
})

// Promise.all([p1,p2])  //promise.all() also returns one promise
// .then(result=>console.log(result))
// .catch(err=>console.log('Error : ',err.message));

Promise.race([p1,p2])
.then(result=>console.log(result)) // race : result of first fufilled array
.catch(err=>console.log('Error : ',err.message));