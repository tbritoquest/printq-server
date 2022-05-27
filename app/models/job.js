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
        }),
        Job.hasMany(models.Note, {
          foreignKey: 'jobId',
        })
    }
  };
  Job.init({
    printSpecs: {
      type: DataTypes.JSON,
      allowNull: false
    },
    sampleDate: {
      type:DataTypes.STRING,
      allowNull: false
    },
    dueDate: {
      type:DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "new order"
    },
    orderId: DataTypes.INTEGER,
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Job',
  });
  return Job;
};