const Link = require("../models/link");
const ErrorHandler = require('../utils/errorHandler');
const catchAsync = require('../middleware/catchAsyncErrors');
const crypto = require("crypto");
const { url } = require("inspector");

const getPublicUrl = (req) => (
    process.env.PUBLIC_URL || `${req.protocol}://${req.get("host")}`
).replace(/\/+$/, "");

const generateShortUrl = () => {
    const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const digits = "0123456789";
    const characters = `${letters}${digits}`;
    const result = [
        letters[crypto.randomInt(letters.length)],
        digits[crypto.randomInt(digits.length)],
    ];

    while (result.length < 6) {
        result.push(characters[crypto.randomInt(characters.length)]);
    }

    for (let index = result.length - 1; index > 0; index -= 1) {
        const randomIndex = crypto.randomInt(index + 1);
        [result[index], result[randomIndex]] = [result[randomIndex], result[index]];
    }

    return result.join("");
};

exports.createShortUrl = catchAsync(async (req, res, next) => {
    const { originalUrl, customAlias } = req.body;

    if (!originalUrl) {
        return next(
            new ErrorHandler("Please provide a URL", 400)
        );
    }

    const isvalidUrl = (url) => {
        try {
            const parsedUrl = new URL(url);
            return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
        } catch (err) {
            return false;
        }
    };

    if( !isvalidUrl(originalUrl)) {
        return next(new ErrorHandler("Please provide valid URL", 400))
    }

    let shortUrl;

    // 1. If user gives custom alias
    if (customAlias) {
        // check if already exists
        const existing = await Link.findOne({ shortUrl: customAlias });

        if (existing) {
            return next(
                new ErrorHandler("Name already taken", 400)
            );
        }

        shortUrl = customAlias;
    } 
    // 2. If no custom alias → generate random
    else {
        do {
            shortUrl = generateShortUrl();
        } while (await Link.exists({ shortUrl }));
    }

    const link = await Link.create({
        originalUrl,
        shortUrl,
        userId: req.user.id
    });

    const fullUrl = `${getPublicUrl(req)}/${link.shortUrl}`;

    res.status(201).json({
        success: true,
        data: {
            ...link.toObject(),
            fullUrl,
        }
    });
});

exports.getMyLinks = catchAsync(async (req, res) => {
    const links = await Link.find({ userId: req.user.id }).sort({ createdAt: -1 });
    const totalClicks = links.reduce((total, link) => total + link.clicks, 0);
    const publicUrl = getPublicUrl(req);

    res.status(200).json({
        success: true,
        stats: {
            totalLinks: links.length,
            totalClicks,
            activeLinks: links.length,
        },
        links: links.map((link) => ({
            ...link.toObject(),
            fullUrl: `${publicUrl}/${link.shortUrl}`,
        })),
    });
});

exports.updateLink = catchAsync(async (req, res, next) => {
    const { originalUrl, customAlias } = req.body;
    const link = await Link.findOne({ _id: req.params.id, userId: req.user.id });

    if (!link) {
        return next(new ErrorHandler("Link not found", 404));
    }

    if (originalUrl !== undefined) {
        try {
            const parsedUrl = new URL(originalUrl.trim());
            if (!["http:", "https:"].includes(parsedUrl.protocol)) throw new Error();
            link.originalUrl = originalUrl.trim();
        } catch (error) {
            return next(new ErrorHandler("Please provide a valid URL", 400));
        }
    }

    if (customAlias !== undefined && customAlias.trim() !== link.shortUrl) {
        const alias = customAlias.trim();
        if (!alias) {
            return next(new ErrorHandler("Please provide a valid alias", 400));
        }

        const existing = await Link.findOne({ shortUrl: alias, _id: { $ne: link._id } });
        if (existing) {
            return next(new ErrorHandler("Name already taken", 400));
        }
        link.shortUrl = alias;
    }

    await link.save();
    res.status(200).json({
        success: true,
        data: {
            ...link.toObject(),
            fullUrl: `${getPublicUrl(req)}/${link.shortUrl}`,
        },
    });
});

exports.deleteLink = catchAsync(async (req, res, next) => {
    const link = await Link.findOneAndDelete({ _id: req.params.id, userId: req.user.id });

    if (!link) {
        return next(new ErrorHandler("Link not found", 404));
    }

    res.status(200).json({ success: true, message: "Link deleted successfully" });
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

