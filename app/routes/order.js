module.exports = app => {
    const orders = require("../controllers/orders.js")
    const router = require("express").Router()

    router.post("/", orders.create)
    // router.get("/",orders.findAll)
    router.get("/", orders.find)

    app.use('/api/orders',router)
}