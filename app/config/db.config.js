// Configure MySQL db & Sequelize

module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "1234567890",
    DB: "printq_test_db",
    dialect: "mysql",
    pool: {
        max: 5,
        min:0,
        acquire: 30000,
        idle: 10000
    }
}