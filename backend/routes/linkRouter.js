const express = require("express");
const linkController = require("../controllers/linkController");
const { protect } = require("../controllers/authController");

const router = express.Router();

router.post("/shorten", protect, linkController.createShortUrl);
router.get("/my-links", protect, linkController.getMyLinks);
router.patch("/:id", protect, linkController.updateLink);
router.delete("/:id", protect, linkController.deleteLink);
router.get("/:shortId", linkController.redirectUrl);

module.exports = router;