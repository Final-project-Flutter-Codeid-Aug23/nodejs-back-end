"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("products", [
      {
        name: "LAGKAPTEN/ADILS",
        userId: 1,
        stock: 50,
        description:
          "Padu padankan pilihan permukaan meja dan kaki - atau pilih kombinasi yang siap pakai. Kuat dan ringan, dibuat dengan teknik yang menggunakan sedikit bahan mentah, mengurangi pengaruh negatif pada lingkungan.",
        price: 679000,
        unitSold: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "EKEDALEN",
        userId: 1,
        stock: 44,
        description:
          "Kursi sandaran berpalang coklat tua dengan bingkai kayu ini membuat ruang makan Anda terlihat terbaik. Sandaran yang tinggi dan melengkung serta dudukan yang empuk dengan penutup yang dapat dilepas/dicuci membuat suasana di sekitar meja menjadi nyaman.",
        price: 1125000,
        unitSold: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "HANSOLA",
        userId: 1,
        stock: 37,
        description:
          "Di kursi nyaman dari bambu yang dipernis bening dengan kursi kain berlapis ini, Anda akan berlama-lama mengobrol. Dan saat makan malam selesai, mudah didorong dengan rapi ke bawah meja untuk menghemat ruang lantai.",
        price: 995000,
        unitSold: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "KLEPPSTAD",
        userId: 1,
        stock: 67,
        description:
          "Bosan tersandung sepatu di koridor? Lemari sepatu yang luas dengan garis-garis yang bersih ini akan menjaga sepatu-sepatu tersebut agar tidak berantakan. Bagian dari seri KLEPPSTAD - item yang membantu menjaga lorong tetap teratur.",
        price: 1499000,
        unitSold: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "GLOSTAD",
        userId: 1,
        stock: 91,
        description:
          "Seharusnya mudah untuk mendapatkan sofa dan sofa GLOSTAD mudah dibeli, dibawa pulang, dirakit, dan ditinggali. Sehingga Anda dapat menikmati lebih banyak waktu dan ruang untuk berkumpul bersama teman dan keluarga serta melakukan hal-hal penting lainnya.",
        price: 1895000,
        unitSold: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("products", null, {});
  },
};
