module.exports = (sequelize, Sequelize) => {
    const Customer = sequelize.define("customer", {
        firstName: {
            type: Sequelize.STRING,
            validate:{
                notEmpty: true,
            },
        },
        lastName: {
            type: Sequelize.STRING,
            validate:{
                notEmpty: true,
            },
        },
        address: {
            type: Sequelize.STRING,
            validate:{
                notEmpty: true,
            },
        },
        email: {
            type: Sequelize.STRING,
            validate:{
                notEmpty: true,
                isEmail: true, 
            },
            unique:true
        },
        
    })


    return Customer
}