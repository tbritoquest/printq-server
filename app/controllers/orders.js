//Import db here
const { jobs } = require('../models/index')
const db = require('../models/index')
const Order = db.orders
const Job = db.jobs
const Op = db.Sequelize.Op

exports.create =  (req, res) => {
    let order = req.body
    let customerId = req.body.customerId
    let agentId = req.body.agentId 

    if(customerId  == null || agentId == null){
      res.status(500).send("Must include agentId and customerId.")
    }else{

      return Order.create({
        customerId,
        agentId
      })
        .then(order=>{
            let jobs =  assignIDToJobs(order.id, req.body.jobs)
            
            console.log("jobs: ", jobs)
            Job.bulkCreate(jobs).then(jobs=>{
              res.sendStatus(200)
            }).catch(err=>{
              res.status(500).send(err)
              console.log("ERROR: ", err)
            })
              
        }) 
        .catch(err=>{
          res.status(500).send(err)
          console.log(err)
        })
    }
  }

exports.find = (req,res) => {

    let query = {}

    Order.findAll(query)
    .then(data => {
        // let results = paginateResults(page,limit,data)
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving records."
        })
    })
    
    
}

function assignIDToJobs(orderId, jobs){
    for(let i=0;i<jobs.length;i++){
        jobs[i].orderId = orderId
    }
    console.log("Jobs: ",jobs)
    return jobs
}
 
exports.findAll = (req, res) => {

  Order.findAll({ where: ""})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Orders."
      })
    })
}



// exports.find = (req,res) => {
//   let page = req.query.page 
//   let limit = req.query.limit
//   let searchInput = req.query.search

//   let query = {}
//   if(searchInput){
//       query = {
//           where: {
//             [Op.or]: [
//               { firstName:  {
//                   [Op.like]: `${searchInput}%`
//                 }
              
//               },
//               { lastName:  {
//                   [Op.like]: `${searchInput}%`
//                 }
              
//               },
//               {
//                 email: {
//                   [Op.like]: `${searchInput}%`
//                 }
//               }
//             ]
//           }
//         }
//   }

//   Order.findAll(query)
//   .then(data => {
//       let results = paginateResults(page,limit,data)
//       res.send(results)
//   })
//   .catch(err => {
//       res.status(500).send({
//           message:
//           err.message || "Some error occurred while retrieving records."
//       })
//   })
  
  
// }






