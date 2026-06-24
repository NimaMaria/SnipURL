const Link = require("../models/link");
const ErrorHandler = require('../utils/errorHandler');
const catchAsync = require('../middleware/catchAsyncErrors');
const crypto = require("crypto");

exports.createShortUrl = catchAsync(async (req,res,next) => {
    const {originalUrl} = req.body;

    if(!originalUrl) {
        return next(
            new ErrorHandler("Please provide a URL", 400)
        );
    }

    const shortUrl = crypto.randomBytes(4).toString("hex");

    const link = await Link.create({
        originalUrl,
        shortUrl,
        userId: req.user.id
    });

    res.status(200).json({
        success: true,
        data: link
    });
});


exports.redirectUrl = catchAsync(async (req, res,next) => {
  const { shortId } = req.params;

  const link = await Link.findOne({ shortUrl: shortId });

  if (!link) {
    return res.status(404).json({ message: "Link not found" });
  }

  link.clicks += 1;
  await link.save();

  return res.redirect(link.originalUrl);
});

