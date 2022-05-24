module.exports = app =>{
    const notes = require("../controllers/note.js")
    const router = require("express").Router()
    const db = require('../models/index')
    const Note = db.notes

    router.post("/", notes.create)
    
    app.use('/api/notes',router)
}
