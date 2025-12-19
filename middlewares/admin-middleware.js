
const adminMiddleware = (req, res, next) => {
    const loggedInUserRole = req.loggedInUserInfo.role;

    if (loggedInUserRole !== 'admin') {
        return res.status(403).json({
            success : false,
            message : "Access Denied! Admin Rights Required."
        });
    }
    next();
};

module.exports = adminMiddleware;