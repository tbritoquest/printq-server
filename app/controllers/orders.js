//Import db here
const db = require('../models/index')
const Order = db.orders
const Op = db.Sequelize.Op

exports.create = (req, res) => {
    let order = req.body
    let customerId = req.body.customerId

    if(customerId  == null){
      res.status(500).send("customer id must be an integer")
    }else{

      return Order.create({
        specifications: order.specifications,
        notes: order.notes,
        customerId: customerId,
        sampleDate: order.sampleDate
      })
        .then(order => {
          res.sendStatus(200)
        })
        .catch((err) => {
          res.status(500).send(err.errors)
        })

    }
  }