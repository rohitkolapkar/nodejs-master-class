const Joi=require('joi');
const mongoose=require('mongoose');

const genreSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50
    }
});

const Genre=mongoose.model('genre',genreSchema);



function validateGenres(genres){
    const schema={
        name: Joi.string().min(5).required()
    }
    return Joi.validate(genres,schema);
}

exports.Genre=Genre;
exports.validateGenres=validateGenres;
exports.genreSchema=genreSchema;