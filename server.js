const express = require("express")
const cors = require("cors")

const app = express()

let corsOptions = {
    origin: "*"
}

app.use(cors(corsOptions))

//parse requests of content-type - application/json
app.use(express.json())

//parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}))

// DATABASE
const db = require("./app/models")

const env = process.env.NODE_ENV || 'development';
db.sequelize.sync({force: (env=='development')}).then(()=>{ // for dev purposes
    console.log("Drop and re-sync db.")
})


require("./app/routes/customer")(app)
require("./app/routes/order")(app)
require("./app/routes/job")(app)
require("./app/routes/note")(app)
require("./app/routes/alert")(app)

const PORT = process.env.PORT || 8080
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})

