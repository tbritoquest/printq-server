const express = require("express")
const cors = require("cors")

const app = express()

let corsOptions = {
    origin: "http://localhost:8081"
}

app.use(cors(corsOptions))

//parse requests of content-type - application/json
app.use(express.json())

//parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}))

//seeding
// const fs = require("fs")
// const seedQuery = fs.readFileSync("./app/db/seed.sql", {
//     encoding: "utf-8"
// })

// DATABASE
const db = require("./app/models")
db.sequelize.sync({force:true}).then(()=>{ // for dev purposes
    console.log("Drop and re-sync db.")
    // console.log("Running SQL seed....")
    // db.sequelize.query(seedQuery, err=> {
    //     if(err){
    //         throw err
    //     }
    // })
})


require("./app/routes/customer")(app)
require("./app/routes/order")(app)



//set port, listen for requests
const PORT = process.env.PORT || 8080
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})

