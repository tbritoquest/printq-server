const db = require('../models/index')
// const Job = db.Job
const Note = db.Note
const Op = db.Sequelize.Op

//Create a new note
exports.create = (req,res)=>{

    return Note.create({
        content: req.body.content,
        jobId: req.body.jobId
      }).then(()=>{
        res.sendStatus(200)
    })
    .catch(err =>{
        res.status(500).send(err.errors)
    })

}