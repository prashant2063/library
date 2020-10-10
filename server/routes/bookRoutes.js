const express = require("express");
const bookControllers = require("./../controllers/bookControllers");
const router = express.Router();

router.get("/", bookControllers.getBooks);
router.delete("/deleteBook", bookControllers.deleteBook);

module.exports = router