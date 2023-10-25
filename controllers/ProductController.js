const { product, productImage, category, productCategory } = require("../models");

class ProductController {
  static async getProducts(req, res) {
    try {
      const products = await product.findAll({
        include: [productImage, category],
        order: [["name", "ASC"]],
      });
      res.status(200).send({ message: `Success Get Products`, data: products });
    } catch (error) {
      res.status(500).send({ message: `Error Get Products`, error });
    }
  }
  static async getOneProduct(req, res) {
    try {
      const id = +req.params.id;
      const productById = await product.findByPk(id, { include: [productImage, category] });
      res.status(200).send({ message: `Success Get One Product`, data: productById });
    } catch (error) {
      res.status(500).send({ message: `Success Get One Product`, error });
    }
  }
  static async create(req, res) {
    try {
      const { name, userId, description, stock, price, images, categories } = req.body;
      if (Array.isArray(images)) {
        let newProductImages = [];
        images.forEach((img) => {
          newProductImages.push({ productId: newProduct.id, url: img });
        });
        const productImages = await productImage.bulkCreate(newProductImages);
      } else {
        throw `images is not array! please input array of url`;
      }
      if (Array.isArray(categories)) {
        let newProductCategories = [];
        categories.forEach((catId) => {
          newProductCategories.push({ productId: newProduct.id, categoryId: +catId });
        });
        const productCategories = await productImage.bulkCreate(newProductCategories);
      } else {
        throw `categories is not array! please input array of category ids`;
      }
      const newProduct = await product.create({
        name,
        userId: +userId,
        description,
        stock: +stock,
        price: +price,
      });
      res.status(200).send({ message: `Success Create Product`, data: newProduct });
    } catch (error) {
      res.status(500).send({ message: `Error Create Product`, error });
    }
  }
  static async delete(req, res) {
    try {
      const id = +req.params.id;
      const deletedProduct = await product.findByPk(id, { include: [productImage, category] });
      await product.destroy({ where: { id: id } });
      await productImage.destroy({ where: { productId: id } });
      await productCategory.destroy({ where: { productId: id } });
      res.status(500).send({ message: `Success Delete Product`, deletedData: deletedProduct });
    } catch (error) {
      res.status(500).send({ message: `Error Delete Product`, error });
    }
  }
  static async update(req, res) {
    try {
      const id = +req.params.id;
      const { name, userId, description, stock, price, images, categories } = req.body;
      if (Array.isArray(images)) {
        let newProductImages = [];
        images.forEach((img) => {
          newProductImages.push({ productId: id, url: img });
        });
        const productImages = await productImage.bulkCreate(newProductImages);
      } else {
        throw `images is not array! please input array of urls`;
      }
      if (Array.isArray(categories)) {
        let newProductCategories = [];
        categories.forEach((catId) => {
          newProductCategories.push({ productId: id, categoryId: +catId });
        });
        const productCategories = await productCategory.bulkCreate(newProductCategories);
      } else {
        throw `categories is not array! please input array of category ids`;
      }
      await productImage.destroy({ where: { productId: id } });
      await productCategory.destroy({ where: { productId: id } });
      const oldProduct = await product.findByPk(id, { include: [productImage, category] });
      await product.update(
        {
          name,
          userId: +userId,
          description,
          stock: +stock,
          price: +price,
        },
        { where: { id: id } }
      );
      const updatedProduct = await product.findByPk(id, { include: [productImage, category] });
      res.status(200).send({ message: `Succes Update Product`, oldData: oldProduct, updatedData: updatedProduct });
    } catch (error) {
      res.status(500).send({ message: `Error Update Product`, error });
    }
  }
}

module.exports = ProductController;
