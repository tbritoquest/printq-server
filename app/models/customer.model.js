module.exports = (sequelize, Sequelize) => {
    const Customer = sequelize.define("customer", {
        firstName: {
            type: Sequelize.STRING
        },
        lastName: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        
    })


    return Customer
}