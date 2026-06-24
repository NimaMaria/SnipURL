const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const catchAsync = require('../middleware/catchAsyncErrors');
const sendToken = require('../utils/sendToken');
const jwt = require('jsonwebtoken');
const { promisify } = require("util");


//signup
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


//login
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


// Protect Route
exports.protect = catchAsync(async (req, res, next) => {

  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } 
  else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token || token==='null') {
    return next(
      new ErrorHandler(
        "You are not logged in! Please log in to get access.",
        401
      )
    );
  }


  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);

if (!currentUser) {
  return next(
    new ErrorHandler(
      "User no longer exists. Please login again.",
      401
    )
  );
}

  if (currentUser.changedPasswordAfter(decoded.iat)) {

    return next(
      new ErrorHandler(
        "User recently changed password ! please log in again.",
        404
      )
    );
  }

  req.user = currentUser;

  next();
});


// Get profile
exports.getUserProfile = catchAsync(async (req, res, next) => {

  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });

});


// Update Password
exports.updatePassword = catchAsync(async (req, res, next) => {

  const { oldPassword, newPassword, newPasswordConfirm } = req.body;

  const user = await User.findById(req.user.id).select("+password");

  const isMatched = await user.correctPassword(oldPassword, user.password);

  if (!isMatched) {
    return next(new ErrorHandler("Old password is incorrect", 400));
  }

  user.password = newPassword;
  user.passwordConfirm = newPasswordConfirm;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Password updated successfully",
  });

});

//Update profile
exports.updateProfile = catchAsync(async (req, res, next) => {
  
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  const user = await User.findById(req.user.id);

  await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
  });

});


//forgot password
exports.forgotPassword = catchAsync(async(req,res,next) => {
    const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("There is no user with email address .", 404));
  }

  const resetToken = user.createPasswordResetToken();

  await user.save({ validateBeforeSave: false });

  try {

    const resetURL = `${process.env.FRONTEND_URL}/users/resetPassword/${resetToken}`;

    await new Email(user, resetURL).sendPasswordReset();

    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    });

  } catch (err) {

    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save({ validateBeforeSave: false });

    return next(
      new ErrorHandler(
        "There was an error sending the email, try again later!",
        500
      )
    );
  }

});


// Reset password
exports.resetPassword = catchAsync(async (req, res, next) => {
const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({

    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },

  });

  if (!user) {
    return next(new ErrorHandler("Token is invalid or has expired", 400));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;

  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  sendToken(user, 200, res);

});


// Logout
exports.logout = catchAsync(async(req,res,next) => {
    res.cookie('jwt', 'null' , {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });
    res.status(200).json({success: true,message: 'Logged out successfully' });
});