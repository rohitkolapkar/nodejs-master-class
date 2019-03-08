const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
.then(()=>console.log('Connected to MongoDB...'))
.catch(()=>console.error('could not connect..'));

const courseSchema=new mongoose.Schema({
    name: String,
    author: String, 
    tags: [ String ],
    date: Date, 
    isPublished: Boolean,
    price: Number

})

const Course=mongoose.model('course',courseSchema);

async function getCourses(){
    return await Course
    .find({isPublished:true})
    .sort({name:1})
    .select({name:1,author:1})
}

async function getCourses1(){
    return await Course
    //.find({isPublished:true,tags:{$in:['frontend','backend']}})
    .find({isPublished:true})
    .or([{tags:'frontend'},{tags:'backend'}])
    .sort({price:-1})
    .select({name:1,author:1})
}
async function getCourses2(){
    return await Course
    .find({isPublished:true})
    .or([  
        {price:{$gte:15}},
        {name:/.*by.*/i}
     ])
    .sort('-price')
    .select('name author price')
}

async function run() {
    const courses = await getCourses2();
    console.log(courses);
  }
  
run();