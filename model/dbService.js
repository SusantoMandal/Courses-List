/* eslint-disable no-console */
const path = require('path');
const Joi = require('joi');
const fs = require('fs');
const utilData = require('../util/course.json');

const jsonPath = path.join(__dirname, '..', 'util', 'course.json');

function getData() {
  return utilData;
}

function writeData(data) {
  fs.writeFile(jsonPath, JSON.stringify(data), (error) => {
    if (error) {
      console.log(error);
    }
  });
}

function validPost(data) {
  const schema = {
    courseID: Joi.string().regex(/^[0-9]+$/).required(),
    courseName: Joi.string().min(4).required(),
    subject: Joi.string().min(4).required(),
  };
  return Joi.validate(data, schema);
}

function validPut(data) {
  const schema = {
    courseName: Joi.string().required(),
    subject: Joi.string().required(),
  };
  return Joi.validate(data, schema);
}

module.exports = {
  fetchData: getData,
  updateData: writeData,
  validationPost: validPost,
  validationPut: validPut,
};
