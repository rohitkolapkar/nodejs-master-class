/*
console.log('Before');
const user = getUser(1);
console.log(user) // this will return 'undefined'
//to deal with this we have three paterns
//1.callbacks
//2.Promises
//3.Async/await

console.log('After');

function getUser(id){
    setTimeout(()=>{
        console.log('Reading a user from database...');
        return {id:id,githubUsername:'rohitkolapkar'};
    },2000);
    return 1;
}

*/

//1. Call backs - Asynchronous

/*console.log('Before');
getUser(1, function(user){
    console.log('User',user);
    getRepositories(user.githubUsername,function(repo){
        console.log('Repo : ',repo);
        getCommits(repo,(commits)=>{

            //Callback Hell
            
        });
    
    });
});
console.log('After');*/

 //Solution for Callback Hell problem

 console.log('Before');
 getUser(1, getRepositories);
 console.log('After');

 function getRepositories(user){
    getRepositories(user.githubUsername,getCommits);
 }

 function getCommits(repos){
    getCommits(repo, displayCommits);
 }
 function displayCommits(commits){
    console.log(commits);
}



//synchronous version of above code
/*console.log('Before');
const user=getUser(1);
const repos=getRepositories(user.githubUsername);
const commits=getCommits(repos[0]);
console.log('After');
*/




function getUser(id,callback){
    setTimeout(()=>{
        console.log('Reading a user from database...');
        callback({id:id,githubUsername:'rohitkolapkar'});
        
    },3000);
    
    
}

function getRepositories(username,callback){
    setTimeout(()=>{
        console.log('getting repositories');
        callback(['repo1','repo2','repo3']);
    },2000);
}