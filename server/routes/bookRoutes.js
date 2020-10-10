const express = require("express");
const bookControllers = require("./../controllers/bookControllers");
const router = express.Router();

router.get("/get", bookControllers.getBooks);
router.delete("/delete", bookControllers.deleteBook);
router.put("/update", bookControllers.updateBook);
router.post("/add", bookControllers.addBook);

module.exports = router