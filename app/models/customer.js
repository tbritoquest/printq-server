'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.hasMany(models.Order, {
        foreignKey: 'customerId',
      })
    }
  };
  Customer.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true
    },
    lastName: {
      type: DataTypes.STRING,
      isEmail: true,
      allowNull: false,
      notEmpty: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true
    }
  }, {
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};