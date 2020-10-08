const express = require("express");
const bookControllers = require("./../controllers/bookControllers");

const router = express.Router();

router.get("/",bookControllers.getBooks);

module.exports = router