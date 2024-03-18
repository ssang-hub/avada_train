const Router = require("koa-router");
const productHandlers = require("../handlers/products/productHandlers");
const middleWare = require("../middleware/productInputMiddleware");
// Prefix all routes with /products
const router = new Router({
  prefix: "/api",
});

// Routes will go here
router.get("/products", productHandlers.getProducts);
router.get("/products/:id", productHandlers.getProduct);
router.post(
  "/products",
  middleWare.createProductMiddleware,
  productHandlers.save
);
router.put(
  "/products/:id",
  middleWare.updateMiddleWare,
  productHandlers.update
);
router.delete("/products/:id", productHandlers.deleteProduct);

module.exports = router;
