const Employee = require('../Model/Employee')
const Joi = require('joi');

///////// create movie ///////////////////
exports.postemployee = async (req,res,next)=>{
    //joi validate schema
        const schema = Joi.object({
            name: Joi.string().min(1).max(30).required(),
            photo: Joi.string().required(),
            price: Joi.string().required(),
            details: Joi.string().required(),
    })
    // joi validate input data
    var {error} = await schema.validate(req.body);
    if(error){
        return res.status(400).send({msg:error.details[0].message})
    }
    res.send('success')
    
    ////////////////// save data in mongodb using mongoose //////////////
    const employee = new Employee ({ 
        name: req.body.name,
        photo: req.body.photo,
        price: req.body.price,
        details: req.body.details, 
    })
    try{
    var response=await employee.save();  
    res.send(response) 
    } catch(err){
    res.status(400).send(err)
    }
}

///////////////// get movie //////////////////
exports.getemployee = async (req,res,next)=>{
    const response = await Employee.find();
    res.send(response);
}
 
////////// update theatre name & address ///////////////
exports.updateemployee = async (req,res,next)=>{
    const {employeeId} = req.params;   // object destructure
    const response = await Employee.findByIdAndUpdate(employeeId,{
        name: req.body.name,
        photo: req.body.photo,
        price: req.body.price,
        details: req.body.details,
    });
    res.send(response);  
}

////////// delete theatre ///////////////
exports.deleteemployee = async (req,res,next)=>{  
    const {employeeId} = req.params;   // object destructure
    const response = await Employee.findByIdAndRemove(employeeId)
    res.send(response);
}