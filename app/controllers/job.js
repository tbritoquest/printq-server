const db = require('../models/index')
const Job = db.Job
const Note = db.Note
const Op = db.Sequelize.Op


exports.find = (req,res) => {
    let searchInput = req.query.search
    let query = {}
    if(searchInput){
        query = {
            where: {
              [Op.or]: [
                { name:  {
                    [Op.like]: `${searchInput}%`
                  }
                
                },
                { orderId:  {
                    [Op.like]: `${parseInt(searchInput)}%`
                  }
                
                }
              ]
            }
          }
    }


    const results = {}

    Job.findAll(query)
    .then(data => {
        results.results = data
        res.send(results)
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving records."
        })
    })
}


// Find one Job given id
exports.findById = (req,res) => {

    const id = req.params.id
    Job.findByPk(id,{include: [Note]})
        .then(data => {
            if(data)
                res.send(data)
            else
                res.status(500).send("Not found")
        })
        .catch(err => {
            res.status(500).send(err.errors)
        })
        
}

// Update a Job given id
exports.update = (req, res) => {
  const id = req.params.id

  for (const property in req.body) {
      req.body[property] = req.body[property].toLowerCase()
  }

  Job.update(req.body,{
      where: {id: id}
  })
      .then( num => {
          if(num == 1){
              res.sendStatus(200)
          }else{
              res.status(500).send(`Cannot update Job with id:${id}`)
          }
      })
      .catch(err => {
          res.status(500).send(err.errors)
      })
}