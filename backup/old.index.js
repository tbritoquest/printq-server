// Initialize Sequelize

const dbConfig = require("../config/db.config")

const Sequelize = require("sequelize")

const sequelize = new Sequelize(dbConfig.DB,dbConfig.USER,dbConfig.PASSWORD,{
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    // operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min:dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.customers = require("./customer.model")(sequelize,Sequelize)
db.orders = require("./order.model")(sequelize,Sequelize)
db.users = require("./user.model")(sequelize,Sequelize)
db.jobs = require("./job.model")(sequelize,Sequelize)


db.customers.hasMany(db.orders, {as: "orders"})
db.orders.belongsTo(db.customers,{
    foreignKey: "customerId",
    allowNull: false,
    as: "customer",
    validate:{
        notEmpty: true,
    },
})

db.orders.hasMany(db.jobs,{as: "jobs"})
db.jobs.belongsTo(db.orders, {
    foreignKey: "orderId",
    allowNull:false,
    as: "order",
    validate: {
        notEmpty: true
    }
})

module.exports = db