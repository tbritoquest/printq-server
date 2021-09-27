//Import db here
const db = require('../models/index')
const Customer = db.customers
const Order = db.orders
const User = db.users
const Op = db.Sequelize.Op

//Create a new customer
exports.create = (req,res)=>{
    
    const data = {
        firstName: req.body.firstName.toLowerCase(),
        lastName: req.body.lastName.toLowerCase(),
        address: req.body.address.toLowerCase(),
        email:req.body.email.toLowerCase()
    }

    return Customer.create(data)
        .then(()=>{
            res.sendStatus(200)
        })
        .catch(err =>{
            res.status(500).send(err.errors)
        })
}


// Update a Customer given id
exports.update = (req, res) => {
    const id = req.params.id

    for (const property in req.body) {
        req.body[property] = req.body[property].toLowerCase()
    }

    Customer.update(req.body,{
        where: {id: id}
    })
        .then( num => {
            if(num == 1){
                res.sendStatus(200)
            }else{
                res.status(500).send(`Cannot update Customer with id:${id}`)
            }
        })
        .catch(err => {
            res.status(500).send(err.errors)
        })
}

// Find one customer given id
exports.findById = (req,res) => {
    const id = req.params.id
    Customer.findByPk(id)
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

exports.findByEmail = (req,res) => {
    const email = req.body.email.toLowerCase()

    Customer.findOne({ where: { email: email } })
        .then(data => {
            if(data){
                console.log(data)
                res.send(data)
            }
            else
                res.status(500).send("Not found")
            
        }).catch(err => {
            res.status(500).send(err.errors)
        })
}






