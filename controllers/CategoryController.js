const { category, product, productImage } = require("../models");

class CategoryController {
  static async getCategories(req, res) {
    try {
      const categories = await category.findAll({
        include: [product],
        order: [["id", "ASC"]],
      });
      res.status(200).send({ message: `Success Get Categories`, data: categories });
    } catch (error) {
      res.status(500).send({ message: `Error Get Categories`, error });
    }
  }
  static async getCategoryById(req, res) {
    try {
      const id = +req.params.id;
      const categoryById = await category.findByPk(id, { include: [{ model: product, include: [productImage] }] });
      res.status(200).send({ message: `Success Get One Category`, data: categoryById });
    } catch (error) {
      res.status(500).send({ message: `Error Get One Category`, error });
    }
  }
  static async create(req, res) {
    try {
      const { name, baseColor, icon } = req.body;
      console.log(req.body);
      const newCategory = await category.create({
        name,
        baseColor,
        icon,
      });
      res.status(200).send({ message: `Success Create Category`, data: newCategory });
    } catch (error) {
      res.status(500).send({ message: `Error Create Category`, error });
    }
  }
  static async delete(req, res) {
    try {
      const id = +req.params.id;
      const deletedCategory = await category.findByPk(id);
      if (deletedCategory) {
        throw `Category id ${id} does not exist !`;
      }
      await category.destroy({ where: { id: id } });
      res.status(200).send({ message: `Success Delete Category`, deletedData: deletedCategory });
    } catch (error) {
      res.status(500).send({ message: `Error Delete Category`, error });
    }
  }
  static async update(req, res) {
    try {
      const id = +req.params.id;
      const { name, baseColor, icon } = req.body;
      const oldCategory = await category.findByPk(id);
      await category.update(
        {
          name,
          baseColor,
          icon,
        },
        { where: { id: id } }
      );
      const updatedCategory = await category.findByPk(id);
      if (!oldCategory || !updatedCategory) {
        throw `Category id ${id} does not exist !`;
      }
      res.status(200).send({ message: `Success Update Category`, oldData: oldCategory, updatedData: updatedCategory });
    } catch (error) {
      res.status(500).send({ message: `Error Update Category`, error });
    }
  }
}

module.exports = CategoryController;
