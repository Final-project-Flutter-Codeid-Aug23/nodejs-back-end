const { cart, product, productImage } = require("../models");

class CartController {
  static async getCarts(req, res) {
    try {
      const userData = req.body.userData;
      const carts = await cart.findAll({
        where: { userId: userData.id },
        include: { model: product, include: productImage },
      });
      res.status(200).send({ message: `Success Get Carts ${userData.username}`, data: carts });
    } catch (error) {
      res.status(500).send({ message: `Error Get Carts`, error });
    }
  }
  static async add(req, res) {
    try {
      const { userData, productId, productCount } = req.body;
      const productCart = await product.findByPk(+productId, { include: productImage });
      const existCart = await cart.findOne({where: {userId: userData.id, productId: +productId}});
      if(existCart){
        throw "This product is already in your carts"
      }
      const newCart = await cart.create({
        userId: userData.id,
        productId: +productId,
        productCount: +productCount,
      });
      res.status(200).send({ message: `Success Adding Cart`, data: { newCart, productCart } });
    } catch (error) {
      res.status(500).send({ message: `Error Adding Cart`, error });
    }
  }
  static async delete(req, res) {
    try {
      const id = req.params.id;
      const userData = req.body.userData;
      const selectedCart = await cart.findByPk(id, { include: product });
      if (!selectedCart) {
        throw `Cart id ${id} does not exist !`;
      }
      const deletedCart = await cart.destroy({ where: { id: +id, userId: +userData.id } });
      if(deletedCart) {
        res.status(200).send({ message: `Success Deleting Cart`, deletedData: selectedCart });
      }else{
        throw "Database not affected"
      }
    } catch (error) {
      res.status(500).send({ message: `Error Deleting Cart`, error });
    }
  }
  static async updateCount(req, res) {
    try {
      const id = +req.params.id;
      const { userData, productCount } = req.body;
      const oldCart = await cart.findByPk(id, { include: product });
      await cart.update(
        {
          productCount: +productCount,
        },
        { where: { id: id, userId: userData.id } }
      );
      const updatedCart = await cart.findByPk(id, { include: product });
      if (!oldCart || !updatedCart) {
        throw `Cart id ${id} does not exist !`;
      }
      res.status(200).send({ message: `Success Update Count Cart`, oldData: oldCart, updatedData: updatedCart });
    } catch (error) {
      res.status(500).send({ message: `Error Update Count Cart`, error });
    }
  }
}

module.exports = CartController;
