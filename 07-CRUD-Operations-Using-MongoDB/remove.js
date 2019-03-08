const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/playground')
.then(()=>console.log('Connected to MongoDB...'))
.catch(()=>console.error('could not connect..'));

const courseSchema=new mongoose.Schema({
    name: String,
    author: String, 
    tags: [ String ],
    date: Date, 
    isPublished: Boolean,
    price: Number

});

const Course=mongoose.model('course',courseSchema);

async function removeCourse(id){
    const result=await Course.deleteOne({_id:id});
    console.log(result);

}
removeCourse('5c820e09a1316e049cb14756');