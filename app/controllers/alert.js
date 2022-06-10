const db = require('../models/index')
const Alert = db.Alert
const Op = db.Sequelize.Op

//Create a new alert
exports.create = (req,res)=>{
   
    return Alert.create({
        content: req.body.content
      }).then(()=>{
        res.sendStatus(200)
    })
    .catch(err =>{
        res.status(500).send(err.errors)
    })

   
}

exports.update = (req, res) => {
    const id = req.params.id

    // for (const property in req.body) {
    //     req.body[property] = req.body[property]
    // }

    Alert.update(req.body,{
        where: {id: id}
    })
        .then( num => {
            if(num == 1){
                res.sendStatus(200)
            }else{
                res.status(500).send(`Cannot update Alert with id:${id}`)
            }
        })
        .catch(err => {
            res.status(500).send(err.errors)
        })
}



exports.destroy = (req, res) => {
    const id = req.params.id

    Alert.destroy({
        where: {id: id}
    })
        .then( num => {
            if(num == 1){
                res.sendStatus(200)
            }else{
                res.status(500).send(`Cannot destroy Alert with id:${id}`)
            }
        })
        .catch(err => {
            res.status(500).send(err.errors)
        })
}