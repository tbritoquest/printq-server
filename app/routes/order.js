module.exports = app => {
    const orders = require("../controllers/orders.js")
    const router = require("express").Router()

    router.post("/", orders.create)
   

    app.use('/api/orders',router)
}