const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const reqAccessTokenSentence = req.headers['authorization']; //returns 'bearer tokenstring', so need to splite with single space and access token at index 1

    const reqAccessToken = reqAccessTokenSentence && reqAccessTokenSentence.split(" ")[1];

    if (!reqAccessToken) {
        return res.status(401).json({
            success : false,
            message : "Access Denied. Please Login to Proceed."
        });
    }

    try {
        const decodedAccessToken = jwt.verify(reqAccessToken, process.env.JWT_SECRET_KEY);
        req.loggedInUserInfo = decodedAccessToken;
        next();

    } catch(error) {
        res.status(500).json({
            success : false,
            message : "Access Denied. Please Login to Proceed."
        });
    }
};

module.exports = authMiddleware;