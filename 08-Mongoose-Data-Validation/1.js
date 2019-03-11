const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/playground')
.then(()=>console.log('Connected to MongoDB...'))
.catch(()=>console.error('could not connect..'));

const courseSchema=new mongoose.Schema({
    name: {
        type: String,
        required:true,
        minlength:5,
        maxlength:255,
        //match: /pattern/
    }, //validator 

    category:{
        type: String,
        required: true,
        enum:['web','mobile','network'],//validator
        lowercase:true, // convert to lowercase
        //uppercase:true, //convert to uppercase
        trim:true //remove padding from input

    },

    author: String, 

    tags: {
        type: Array,
        //CUSTOME VALIDATOR
        // validate:{
        //     validator: function(v){
        //         //return v.length>0;
        //         return v && v.length>0;

        //     },
        //     message:'A course should have atleast one tag'
        // } 
        
        // ASYNC VALIDATOR
        validate:{
            isAsync:true,
            validator:function(v,callback){
                setTimeout(()=>{
                    //do some async work... read value from file system or database
                    const result=v && v.length>0;
                    callback(result);
                },3000);
            },
            message: 'A course should have atleast one tag'
        }
    },

    date: Date, 
    isPublished: Boolean,

    price: {
        type: Number,
        required: function() {return this.isPublished;}, //validator function
        min:10,
        max:200,
        get:v=>Math.round(v),
        set:v=>Math.round(v)
    }

});

const Course=mongoose.model('course',courseSchema);


async function createCourse(){

    const course=new Course({
        name:'Python Course',
        category:'   WEB    ',
        author:'Mosh',
        tags: ['python','web-framework'],
        isPublished:true,
        price:10
    
    });
    
    try{ 
        const result=await course.save();
        console.log(result);
    }
    catch(ex){
        //console.log(ex.message);
        for(field in ex.errors)
            console.log(ex.errors[field].message);
    }

}
//createCourse();


async function getCoursesWithConditions(){
    

    const courses=await Course
    .find({_id:'5c85e46133ab8815e0bb2ee2'});
    console.log(courses[0].price);
}

getCoursesWithConditions();