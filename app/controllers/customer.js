//Import db here
const db = require('../models/index')
const Customer = db.customers
const Op = db.Sequelize.Op

//Create a new customer
exports.create = (req,res)=>{

    // Validate request

    //create basic customer
    const customer = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address
    }

    //Save customer in db
    Customer.create(customer)
        .then(data => {
            res.send(data)
        }).catch(err=> {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Customer."
            })
        })
}


// Update a Customer by the id in the request
exports.update = (req, res) => {
    res.json({message: "update customer"})
}

// Find a single Customer with given id
exports.findOne = (req,res) => {
    const id = req.params.id

    res.json({message: "Get customer"})
}



