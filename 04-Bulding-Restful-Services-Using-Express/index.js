const Joi = require('joi');
const express=require('express');
const app=express();


app.use(express.json());

const courses=[
    {id:1,name:'course1'},
    {id:2,name:'course2'},
    {id:3,name:'course3'}
];
/*
app.get();
app.post();
app.delete();
app.put();
*/
//--------------HTTP : GET -----------------------//
app.get('/',(req,res)=>{
    res.send('Hello World');

});
app.get('/api/courses',(req,res)=>{
    res.send(courses);
});
// /api/courses/1
app.get('/api/courses/:id',(req, res)=>{
    const course=courses.find(c=>c.id===parseInt(req.params.id));
    if(!course){
        res.status(404).send('Course with the given ID was not found');
        return;
    }
    else res.send(course);
});

app.get('/api/courses/:year/:month',(req,res)=>{
   // res.send(req.params);
    res.send(req.query);
});

//------------------HTTP : POST --------------------//

app.post('/api/courses',(req,res)=>{

   

    /* //This is manual logic to handle error 

    if(!req.body.name || req.body.name.length<3){
        res.status(404).send('Name is required and should be minimum 3 characters');
        return;
    }*/

    //handling error by using Joi

   /* const schema={
        name: Joi.string().min(3).required()
    }
    const result = Joi.validate(req.body,schema);
     //console.log(result); 

    if(result.error){
        res.status(400).send(result.error.details[0].message);
    }
    */
   const {error} =validateCourse(req.body);
   if(error){
    res.status(400).send(error.details[0].message);
    return;
   }

    
    const course={
        id: courses.length+1,
        name: req.body.name

    };
    courses.push(course);
    res.send(course);


});

//------------------HTTP : PUT --------------------//

app.put('/api/courses/:id',(req,res)=>{
    //Look up for the course
    //if not existing. return 404
    const course=courses.find(c=>c.id===parseInt(req.params.id));
    if(!course) {
        res.status(404).send('Course with the given ID was not found');
        return;
    }
    //validate
    //if invalid, return 400 - bad request
    const result=validateCourse(req.body);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    //update the course
    //Return the updated course
    course.name=req.body.name;
    res.send(course);
});

//------------------HTTP : DELETE --------------------//
app.delete('/api/courses/:id',(req,res)=>{

    //Look up for the course
    //if not existing. return 404
    const course=courses.find(c=>c.id===parseInt(req.params.id));
    if(!course){
        res.status(404).send('Course with the given ID was not found');
        return;
    }

    //delete
    const index=courses.indexOf(course);
    courses.splice(index,1);

    //return the same course
    res.send(course);

});



function validateCourse(course){
    const schema={
        name: Joi.string().min(3).required()
    }
    return Joi.validate(course,schema);

}


//environment variable : PORT
const port=process.env.PORT || 5000;
app.listen(port,()=>console.log(`Listening on port : ${port}`));