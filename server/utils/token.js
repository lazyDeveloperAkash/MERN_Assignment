exports.token = (user, statusCode, res) => {
    const { accessToken, refreshToken } = user.getJWTTokens();

    const refreshTokenOptions = {
        expires: new Date(
            Date.now() + +process.env.REFRESH_TOKEN_EXPIRE.charAt(0) * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Only for HTTPS in production
        // sameSite: 'none',
    }

    const accessTokenOptions = {
        expires: new Date(
            Date.now() + +process.env.ACCESS_TOKEN_EXPIRE.substring(0,2) * 60 * 1000
        ),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Only for HTTPS in production
        // sameSite: 'none',
    }

    res.cookie("refreshToken", refreshToken, refreshTokenOptions);
    res.cookie("accessToken", accessToken, accessTokenOptions);
    res.status(statusCode).json({ user: user, success: true });
}