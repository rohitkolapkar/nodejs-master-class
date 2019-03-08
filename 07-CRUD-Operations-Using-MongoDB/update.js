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

async function updateCourse(id){
    //approach : query first
    //findbyid()
    //modify
    //save()
    const course=await Course.findById(id);
    if(!course) {
        return;
    }

    course.isPublished=true;
    course.author='Abhijeet Tedle';
    // course.set({
        //isPublished=true;
        //author='Rohit Kolapkar';
    // });

    const result=await course.save();
    console.log(result);

}

//updateCourse('5c820e09a1316e049cb14756');


//update
//findByIdAndUpdate

async function updateCourse1(id){
    const result = await Course.findByIdAndUpdate({_id:id},{
        $set: {
            author:'Rohit Kolapkar',
            isPublished:false
        }
    },{new:true});
    console.log(result);

}

updateCourse1('5c820e09a1316e049cb14756');
