const express = require("express");
const linkController = require("../controllers/linkController");
const { protect } = require("../controllers/authController");

const router = express.Router();

router.post("/shorten", protect, linkController.createShortUrl);
router.get("/:shortId", linkController.redirectUrl);

module.exports = router;