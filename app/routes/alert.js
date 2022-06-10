module.exports = app => {
    const alerts = require("../controllers/alert.js")
    const router = require("express").Router()
    const db = require('../models/index')
    // const Alert = db.alerts

    router.post("/",alerts.create)
    // router.get("/", alerts.find)
    // router.get("/:id", alerts.findById)
    router.put("/:id",alerts.update)
    router.delete("/:id",alerts.destroy)

    app.use('/api/alerts',router)
}
