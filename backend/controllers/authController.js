const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const catchAsync = require('../middleware/catchAsyncErrors');
const sendToken = require('../utils/sendToken');


exports.signup = catchAsync(async(req,res,next) => {
    const { name, email, password, confirmPassword} = req.body;

    const user = await User.create({
        name,
        email,
        password,
        confirmPassword
    });
    sendToken(user, 200, res);
});

exports.login = catchAsync(async(req,res,next) => {
    const { email, password } = req.body;

    // Check if email and password are entered
    if (!email || !password) {
        return next(new ErrorHandler("Please enter email and password", 400));
    }

    // Find user in the database
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    // Check if password is correct
    const isPasswordMatched = await user.correctPassword(password, user.password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    sendToken(user, 200, res);
});

exports.logout = catchAsync(async(req,res,next) => {

});

exports.forgotPassword = catchAsync(async(req,res,next) => {

});