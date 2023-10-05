const router = require("express").Router();
const user = require("./../controllers/user.controller");

router.get("/", user.getAll);
router.get("/:id", user.get);

router.post("/", user.createUser);

router.put("/:id", user.updateUser);

router.delete("/:id", user.delete);
router.delete("/", user.deleteAll);

module.exports = router;