"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("productCategories", [
      {
        productId: 1,
        categoryId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 2,
        categoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 3,
        categoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 4,
        categoryId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 5,
        categoryId: 4,
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
