const { Signup, Login, getUser, pingUser } = require("../controllers/user-controller");
const {ownerAuthMiddleware, userAuthMiddleware} = require("../moddlewares/auth")
const router = require("express").Router();

router.post("/signup", Signup);
router.post('/login', Login);

router.get('/:id', ownerAuthMiddleware, getUser);
router.get('/', userAuthMiddleware, pingUser);

module.exports = router;