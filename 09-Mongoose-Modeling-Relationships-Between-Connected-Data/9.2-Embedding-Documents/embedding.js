const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground2')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author:{
    type:authorSchema
  }
}));

async function createCourse(name, author) {
  const course = new Course({
    name, 
    author
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}
async function updateAuthor(courseId){
  //const course=await Course.findById(courseId);
  const course=await Course.findByIdAndUpdate({_id:courseId},{
    $set:{
      'author.name':'John Smith'
      //'author':'' => this will delete the embeded document
    }
  });
  //course.author.name='Mosh Hamidani';
  //course.save();
  
}

//createCourse('Node Course', new Author({ name: 'Mosh' }));
//updateAuthor('5c860b8c81b03317d4ef68aa');
//listCourses();