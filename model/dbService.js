const path = require('path');
const jsonPath = path.join(__dirname, '..', 'util', 'course.json');
const utilData = require(jsonPath);
const fs = require('fs');
const Joi = require('joi');

function getData(){
    return utilData;
};

function writeData(data){
    
    fs.writeFile(jsonPath,JSON.stringify(data),(error,body)=>{
        if(error)
            console.log(error);
    });
}

function validPost(data) {
    const schema = {
        courseID: Joi.string().regex(/^[0-9]+$/).required(),
        courseName: Joi.string().min(4).required(),
        subject: Joi.string().min(4).required()
    };
    return Joi.validate(data, schema);
}

function validPut(data) {
    const schema = {
        courseName: Joi.string().required(),
        subject: Joi.string().required()
    };
    return Joi.validate(data, schema);
}

module.exports = {
    fetchData : getData,
    updateData : writeData,
    validationPost : validPost,
    validationPut : validPut
};

