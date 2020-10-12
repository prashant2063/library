const express = require("express");
const authorize = require("./authorize");
const bookControllers = require("./../controllers/bookControllers");
const router = express.Router();

router.get("/get", authorize("user","admin"), bookControllers.getBooks);
router.delete("/delete", authorize("admin"), bookControllers.deleteBook);
router.put("/update", authorize("admin"), bookControllers.updateBook);
router.post("/add", authorize("admin"), bookControllers.addBook);

module.exports = router