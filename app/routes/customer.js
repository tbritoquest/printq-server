module.exports = app => {
    const customers = require("../controllers/customer.js")
    const router = require("express").Router()
    
    const {paginatedResults} = require("./middleware")
    const db = require('../models/index')
    const Customer = db.customers

    router.post("/", customers.create)
    router.put("/:id", customers.update)
    router.get("/:id", customers.findById)
    router.post("/search", customers.findByEmail)
    // router.get("/", paginatedResults(Customer),customers.findAll)
    router.get("/", customers.find)
    // router.post("/searchAll", customers.searchAll)

    
    app.use('/api/customers',router)
}
