"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("payments", [
      {
        name: "Bank Transfer",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Cash on Delivery",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Debit",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
