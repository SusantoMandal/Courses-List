const express = require('express');
const router = express.Router();
const path = require('path');
const jsPath = path.join(__dirname, '..', 'model', 'dbService.js');
const dbService = require(jsPath);
const date = new Date();


/* GET ROUTES
 */
router.get('/',(req,res)=>{
    res.send('<h1>Course List</h1>');
});

router.get('/course',(req,res)=>{
    if(req.query.getAll == undefined)
        res.send(dbService.fetchData());
    else {
        let data = req.query.getAll;
        let gather = [];
        dbService.fetchData().forEach(element => {
            gather.push(element[data]);
        });
        res.send(gather);
    }
});

router.get('/course/:courseID',(req,res)=>{
    const present = dbService.fetchData().find(c => c.courseID == parseInt(req.params.courseID));
    if(!present) {
        return res.status(404).send(`COURSE ID ${req.params.courseID} is not present`);
    } 
    res.send(present);
})


/* POST ROUTES
 */
router.post('/course',(req,res)=>{
    const present = dbService.fetchData().find(c => c.courseID == parseInt(req.body.courseID));
    if(present) return res.status(404).send(`COURSE ID ${req.body.courseID} is already present`);

    const result = dbService.validationPost(req.body);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    req.body.createdAt = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}  ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    req.body.modifiedAt = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}  ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    dbService.fetchData().push(req.body)
    dbService.updateData(dbService.fetchData());
    res.send(`COURSE ID ${req.body.courseID} ADDED`);
});


/* PUT ROUTES
 */

router.put('/course/:courseID',(req,res)=>{
    const present = dbService.fetchData().find(c => c.courseID == parseInt(req.params.courseID));
    if(!present) return res.status('404').send(`CourseID ${req.params.courseID} is not present`);

    const result = dbService.validationPut(req.body);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    // present.courseID = (req.body.courseID===undefined) ? present.courseID : req.body.courseID;
    present.courseName = req.body.courseName;
    present.subject = req.body.subject;
    present.modifiedAt = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}  ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    dbService.updateData(dbService.fetchData());
    res.send(`COURSE ID ${present.courseID} UPDATED`);
});



/* DELETE ROUTES
 */

router.delete('/course/:courseID',(req,res)=>{
    const present = dbService.fetchData().find(c => c.courseID == parseInt(req.params.courseID));
    if(!present) return res.status('404').send(`CourseID ${req.params.courseID} is not present`);

    const index = dbService.fetchData().indexOf(present);
    dbService.fetchData().splice(index,1);
    dbService.updateData(dbService.fetchData());
    res.send(`COURSE ID ${req.params.courseID} DELETED`);
});

module.exports = router;