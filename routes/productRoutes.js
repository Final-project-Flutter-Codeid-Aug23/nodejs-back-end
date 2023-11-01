const productRoute = require("express").Router();
const ProductController = require("../controllers/ProductController.js");
const { isAdmin, isLogin } = require("../middlewares/auth");

productRoute.get("/", isLogin, ProductController.getProducts);
productRoute.get("/:id", isLogin, ProductController.getProductById);
productRoute.post("/create", isLogin, isAdmin, ProductController.create);
productRoute.delete("/delete/:id", isLogin, isAdmin, ProductController.delete);
productRoute.put("/update/:id", isLogin, isAdmin, ProductController.update);

module.exports = productRoute;
