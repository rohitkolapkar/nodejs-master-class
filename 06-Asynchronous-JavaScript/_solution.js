async function abc(){
    try{
        const user= await getCustomer(1);
        console.log('Customer: ',user);
        if(user.isGold===true){
            const topMovies= await getTopMovies();
            console.log('Movies: ',topMovies);
            await sendEmail(user.email, topMovies);
            console.log('Email sent...');
            
        }
    }
    catch(err){
        console.log(err);
    }
};

abc();


function getCustomer(id) {
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve({ 
              id: 1, 
              name: 'Mosh Hamedani', 
              isGold: true, 
              email: 'email' 
            });
          }, 4000);
    })

  }

  function getTopMovies() {
      return new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve(['movie1', 'movie2']);
          }, 4000);
      })

  }

  function sendEmail(email, movies) {
      return new Promise((resolve,reject)=>{
        setTimeout(() => {
           resolve();
          }, 4000);
      })

  }