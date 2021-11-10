//Import db here
const db = require('../models/index')
const { paginatedResults } = require('../routes/middleware')
const Customer = db.Customer
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
                res.send(data)
            }
            else
                res.status(500).send("Not found")
            
        }).catch(err => {
            res.status(500).send(err.errors)
        })
}

exports.findAll = (req, res) => {
    res.send(res.paginatedResults)
}

exports.find = (req,res) => {
    let page = req.query.page 
    let limit = req.query.limit
    let searchInput = req.query.search

    let query = {}
    if(searchInput){
        query = {
            where: {
              [Op.or]: [
                { firstName:  {
                    [Op.like]: `${searchInput}%`
                  }
                
                },
                { lastName:  {
                    [Op.like]: `${searchInput}%`
                  }
                
                },
                {
                  email: {
                    [Op.like]: `${searchInput}%`
                  }
                }
              ]
            }
          }
    }

    Customer.findAll(query)
    .then(data => {
        let results = paginateResults(page,limit,data)
        res.send(results)
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving records."
        })
    })
    
    
}


function paginateResults(page,limit,data){
    page = parseInt(page)
    limit = parseInt(limit)
    let startIndex = (page-1)*limit
    let endIndex = page*limit

    const results = {}

    results.results = data.slice(startIndex,endIndex)

    if(endIndex< data.length){
        results.next ={
            page: page+1,
            limit
        }
    }

    if(startIndex>0){
        results.previous = {
            page: page-1,
            limit
        }
    }

    results.numOfPages = Math.ceil(data.length/limit)
    return results
}






