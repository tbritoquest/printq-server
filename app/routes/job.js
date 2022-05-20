module.exports = app => {
    const jobs = require("../controllers/job.js")
    const router = require("express").Router()
    const db = require('../models/index')
    const Job = db.jobs

    router.get("/", jobs.find)
    router.get("/:id", jobs.findById)
    router.put("/:id",jobs.update)
    
    app.use('/api/jobs',router)
}
