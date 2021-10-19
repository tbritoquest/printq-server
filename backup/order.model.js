module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("order", {
        agentId: {
            type: Sequelize.INTEGER,
            validate:{
                notEmpty: true,
            }
        }
    })

    return Order
}