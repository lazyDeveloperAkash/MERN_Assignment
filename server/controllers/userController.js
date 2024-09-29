const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const userModel = require("../database/models/userModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { token } = require("../utils/token");
const JWT = require('jsonwebtoken');

exports.loggedinUser = catchAsyncErrors(async (req, res, next) => {
    const user = await userModel.findById(req.id);
    res.status(200).json({ user })
})

exports.signup = catchAsyncErrors(async (req, res, next) => {
    const user = await new userModel(req.body).save();
    token(user, 201, res);
});

exports.signin = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await userModel
        .findOne({ email: email })
        .select("+password");

    if (!user) {
        return next(
            new ErrorHandler(
                "User not found with this email address!"
            )
        );
    }
    const isMatch = user.comparePassword(password);
    if (!isMatch) return next(new ErrorHandler("Wrong Password", 500));
    token(user, 200, res);
});

exports.signout = catchAsyncErrors(async (req, res, next) => {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.status(200).json({ message: "Successfully Singout!" });
});

exports.generateAccessToken = catchAsyncErrors(async (req, res, next) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) return next(new ErrorHandler("Please login to access the resource", 401));

    const { id } = JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    if (!id) return next(new ErrorHandler("invalid refresh token", 401));

    const newAccessToken = JWT.sign(
        { id: id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRE }
    );

    res.cookie('accessToken', newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        expires: new Date(
            Date.now() + +process.env.ACCESS_TOKEN_EXPIRE.substring(0,2) * 60 * 1000
        ),
    }).status(200);
});