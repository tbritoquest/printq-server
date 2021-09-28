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
            Job.bulkCreate(jobs).then(jobs=>{
              res.sendStatus(200)
            }).catch(err=>{
              res.status(500).send(err)
            })
              
        }) 
        .catch(err=>{
          res.status(500).send(err)
          console.log(err)
        })
    }
  }


function assignIDToJobs(orderId, jobs){
    for(let i=0;i<jobs.length;i++){
        jobs[i].orderId = orderId
    }
    console.log("Jobs: ",jobs)
    return jobs
}
 

  // return Order.create({
  //   specifications: order.specifications,
  //   notes: order.notes,
  //   customerId: customerId,
  //   sampleDate: order.sampleDate
  // })
  //   .then(order => {
  //     res.sendStatus(200)
  //   })
  //   .catch((err) => {
  //     res.status(500).send(err.errors)
  //   })



