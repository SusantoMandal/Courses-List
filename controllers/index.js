/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const dbService = require('../model/dbService');

const router = express.Router();
const date = new Date();

/* GET ROUTES
 */

// const response = (resObj) => {
//   return {
//     statusCode: 200,
//     headers: {
//       'Access-Control-Allow-Origin': '*',
//     },
//     body: JSON.stringify(resObj),
//   };
// };
/* router.get('/course', (req, res) => {
  if (req.query.getAll === undefined) res.send(dbService.fetchData());
  else {
    const data = req.query.getAll;
    const gather = [];
    dbService.fetchData().forEach((element) => {
      gather.push(element[data]);
    });
    res.send(gather);
  }
  console.log('hello');
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      msg: 'Working',
    }),
  };
}); */

// router.get('/course/:courseID', (req, res) => {
//   const present = dbService.fetchData().find((c) => c.courseID === req.params.courseID);
//   if (!present) {
//     return res.status(404).send(`COURSE ID ${req.params.courseID} is not present`);
//   }
//   res.send(present);
//   return true;
// });

/* POST ROUTES
 */
/* router.post('/course', (req, res) => {
  const present = dbService.fetchData().find((c) => c.courseID === req.body.courseID);
  if (present) return res.status(404).send(`COURSE ID ${req.body.courseID} is already present`);

  const result = dbService.validationPost(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return true;
  }

  req.body.createdAt = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}  ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  req.body.modifiedAt = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}  ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  dbService.fetchData().push(req.body);
  dbService.updateData(dbService.fetchData());
  res.send(`COURSE ID ${req.body.courseID} ADDED`);
  return true;
}); */

/* PUT ROUTES
 */

/* router.put('/course/:courseID', (req, res) => {
  const present = dbService.fetchData().find((c) => c.courseID === req.params.courseID);
  if (!present) return res.status('404').send(`CourseID ${req.params.courseID} is not present`);

  const result = dbService.validationPut(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return true;
  }

  // present.courseID = (req.body.courseID===undefined) ? present.courseID : req.body.courseID;
  present.courseName = req.body.courseName;
  present.subject = req.body.subject;
  present.modifiedAt = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}  ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

  dbService.updateData(dbService.fetchData());
  res.send(`COURSE ID ${present.courseID} UPDATED`);
  return true;
}); */

/* DELETE ROUTES
 */

/* router.delete('/course/:courseID', (req, res) => {
  const present = dbService.fetchData().find((c) => c.courseID === req.params.courseID);
  if (!present) return res.status('404').send(`CourseID ${req.params.courseID} is not present`);

  const index = dbService.fetchData().indexOf(present);
  dbService.fetchData().splice(index, 1);
  dbService.updateData(dbService.fetchData());
  res.send(`COURSE ID ${req.params.courseID} DELETED`);
  return true;
}); */

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/course/index.html'));
});

router.get('/course', (req, res) => {
  res.send(dbService.fetchData());
});

router.post('/course', (req, res) => {
  const data = dbService.fetchData();
  if (data.length === 0) {
    req.body.courseID = '0';
  } else {
    const id = parseInt(data[data.length - 1].courseID, 10) + 1;
    req.body.courseID = `${id}`;
  }

  req.body.createdAt = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}  ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  req.body.modifiedAt = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}  ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  dbService.fetchData().push(req.body);
  dbService.updateData(dbService.fetchData());
  res.send({
    cID: req.body.courseID,
  });
});

router.put('/course/:courseID', (req, res) => {
  const present = dbService.fetchData().find((c) => c.courseID === req.params.courseID);
  present.courseName = req.body.courseName;
  present.subject = req.body.subject;
  present.modifiedAt = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}  ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  dbService.updateData(dbService.fetchData());
  res.send('Data updated');
});

router.delete('/course/:courseID', (req, res) => {
  const present = dbService.fetchData().find((c) => c.courseID === req.params.courseID);
  const index = dbService.fetchData().indexOf(present);
  dbService.fetchData().splice(index, 1);
  dbService.updateData(dbService.fetchData());
  res.send('Deleted successfully');
});

module.exports = router;
