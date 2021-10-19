'use strict';

const { query } = require('express');
const {Customer,Order,Job} = require('../models')
const faker = require('faker')
const numOfCustomers = 100


let dateObj = new Date()
let currDate = `${dateObj.getFullYear()}-${dateObj.getMonth()}-${dateObj.getDay()}`

const customersArr = [...Array(numOfCustomers)].map((customer) => (
  {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    address: faker.address.streetAddress(),
    phone: faker.phone.phoneNumber(),
    createdAt: faker.date.between('2020-02-01', '2020-10-15'),
    updatedAt: new Date()
  }
))


module.exports = {
  up: async (queryInterface, Sequelize) => {
    //create customers
    await queryInterface.bulkInsert('Customers',customersArr,{ returning: true })
    
    let customers = await Customer.findAll({})
  
    // Create orders
    for(let i=0;i<customers.length;i++){
      await Order.create({
        customerId: customers[i].id,
        createdAt: faker.date.between('2021-01-01', currDate)
      })
    }

    // Create jobs
    let orders = await Order.findAll({})
    
    for(let i=0;i<orders.length;i++){
        let numOfJobs = Math.floor(Math.random() * 3)+1
        for(let x=0;x<numOfJobs;x++){
          await Job.create({
            orderId: orders[i].id,
            status: "new"
          })
        }
    }
    // for(let i=0;i< numOfCustomers;i++){
    //   orders.push({
    //       customerId: i,
    //       createdAt: new Date(),
    //       updatedAt: new Date()
    //   })
    // }

    // let ordersResults = await queryInterface.bulkInsert('Orders',orders)
    // console.log("results: ",ordersResults)
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
