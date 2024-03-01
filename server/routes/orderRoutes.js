const OrderC = require("../controllers/order-controller")
const {ownerAuthMiddleware, userAuthMiddleware} = require("../moddlewares/auth")
const router = require("express").Router();


router.post("/", userAuthMiddleware, OrderC.createOrder);
router.delete("/:id", ownerAuthMiddleware, OrderC.deleteOrder);
router.put("/:id", ownerAuthMiddleware, OrderC.updateOrder);
router.get("/getmyorders", userAuthMiddleware, OrderC.getOrdersOfUsers);
router.get("/:id", userAuthMiddleware, OrderC.getOrderById);
router.get("/", ownerAuthMiddleware, OrderC.getAllOrders);

module.exports = router;