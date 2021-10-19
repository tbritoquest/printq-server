'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        Job.belongsTo(models.Order, {
          foreignKey: 'orderId',
          onDelete: 'CASCADE'
        })
    }
  };
  Job.init({
    printSpecs: DataTypes.JSON,
    notes: DataTypes.TEXT,
    sampleDate: DataTypes.STRING,
    status: DataTypes.STRING,
    orderId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Job',
  });
  return Job;
};