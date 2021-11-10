const db = require('../models/index')
const Job = db.Job
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