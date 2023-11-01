"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("categories", [
      {
        name: "Bed",
        baseColor: "",
        icon: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Chair",
        baseColor: "",
        icon: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Cabinet",
        baseColor: "",
        icon: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Sofa",
        baseColor: "",
        icon: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Table",
        baseColor: "",
        icon: "",
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
