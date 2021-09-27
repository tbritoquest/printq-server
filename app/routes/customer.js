module.exports = app => {
    const customers = require("../controllers/customer.js")
    const router = require("express").Router()

    router.post("/", customers.create)
    router.put("/:id", customers.update)
    router.get("/:id", customers.findById)
    router.post("/search", customers.findByEmail)

    app.use('/api/customers',router)
}