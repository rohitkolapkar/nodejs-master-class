const mongoose=require('mongoose');
const Joi=require('joi');

const customerSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50
    },
    isGold:{
        type:Boolean,
        default:false
    },
    phone:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50
    }

});

const Customer=mongoose.model('customer',customerSchema);

function validateCustomers(customer){
    const schema={
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(50).required(),
        isGold:Joi.boolean()
    }
    return Joi.validate(customer,schema);
}

exports.Customer=Customer;
exports.validateCustomers=validateCustomers;