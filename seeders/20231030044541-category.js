"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("categories", [
      {
        name: "Bed",
        baseColor: "",
        icon: "https://img.icons8.com/ios-filled/50/bed.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Chair",
        baseColor: "",
        icon: "https://img.icons8.com/ios-glyphs/30/chair.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Cabinet",
        baseColor: "",
        icon: "https://img.icons8.com/pastel-glyph/64/cabinet--v1.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Sofa",
        baseColor: "",
        icon: "https://img.icons8.com/ios-glyphs/30/sofa.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Table",
        baseColor: "",
        icon: "https://img.icons8.com/material-rounded/24/table.png",
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
