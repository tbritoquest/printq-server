module.exports = app => {
    const customers = require("../controllers/customer.js")
    const router = require("express").Router()

    router.post("/", customers.create)
    router.get("/:id", customers.findOne)

    app.use('/api/customers',router)
}