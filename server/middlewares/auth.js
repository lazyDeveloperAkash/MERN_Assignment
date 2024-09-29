const JWT = require("jsonwebtoken");
const ErrorHandler = require("../utils/ErrorHandler");
const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");

exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const { refreshToken, accessToken } = req.cookies;
    // console.log(req.cookies)

    if (!accessToken) {
        return res.status(401).json({ message: 'Unauthorized: No access token!' });
    }

    // Verify access token
    // console.log("first")
    JWT.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return new ErrorHandler("access token not available!", 401);
        if (!refreshToken) return new ErrorHandler("Please Login to access the resourse!", 401);

        JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, userFromRefresh) => {
            if (err) return res.status(403).json({ message: 'Invalid refresh token' });
            req.id = userFromRefresh.id;
        })
    })
    next();
})