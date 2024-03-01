const ProductC = require("../controllers/product-controller")
const {ownerAuthMiddleware, userAuthMiddleware} = require("../moddlewares/auth")
const router = require("express").Router();


router.post("/", ownerAuthMiddleware, ProductC.createProduct);
router.delete("/:id", ownerAuthMiddleware, ProductC.deleteProduct);
router.put("/:id", ownerAuthMiddleware, ProductC.updateProduct);
router.get("/:id", userAuthMiddleware, ProductC.getProductById);
router.get("/", userAuthMiddleware, ProductC.getProducts);

module.exports = router;