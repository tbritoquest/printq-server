module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("order", {
        specifications: {
            type: Sequelize.STRING
        }
    })

    return Order
}