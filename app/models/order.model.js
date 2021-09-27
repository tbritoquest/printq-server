module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("order", {
        specifications: {
            type: Sequelize.STRING,
            validate:{
                notEmpty: true,
            },
        },
        notes: {
            type: Sequelize.TEXT,
        },
        sampleDate: {
            type: Sequelize.STRING,
            validate:{
                notEmpty: true,
            },
        },
    })

    return Order
}