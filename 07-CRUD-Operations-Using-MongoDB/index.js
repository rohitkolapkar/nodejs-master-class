const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/playground')
.then(()=>console.log('Connected to MongoDB...'))
.catch(()=>console.error('could not connect..'));

//Schema Types
// String
// Number
// Date
// Buffer
// Boolean
// ObjectID
// Array

const courseSchema=new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: {type: Date,default:Date.now},
    isPublished:Boolean

});

const Course=mongoose.model('course',courseSchema);

async function createCourse(){

    const course=new Course({
        name:'Angular Course',
        author:'Mosh',
        tags: ['angular','frontendend'],
        isPublished:true
    
    });
    
    const result=await course.save();
    console.log(result);
}

//createCourse();

//to get all the documents in the collectiions

async function getCourses(){
    const courses=await Course.find();
    console.log(courses);
}
getCourses();


//to get documents satisfying particular condition in the collectiions
async function getCoursesWithConditions(){
    const pageNumber =2;
    const pageSize=10;

    const courses=await Course
    .find({author:'Mosh',isPublished:false})
    .skip((pageNumber-1)*pageSize)
    .limit(pageSize)
    .sort({name:1})
    .select({name:1,tags:1});
    //.count();
    console.log(courses);
}

getCoursesWithConditions();

//.find({price: {$gt: 10, $gte:10}})
//.find({price:{$in:[10,20,30]}})
//.find({$or:[{author:'Mosh'},{isPublished:false}]})


    // //starts with Mosh
    // .find({author:/^Mosh/})
    // //ends with Hamidani
    // .find({ author: /Hamedani&/i})
    // //contains Mosh
    // .find({ author: /.*Mosh.*/})