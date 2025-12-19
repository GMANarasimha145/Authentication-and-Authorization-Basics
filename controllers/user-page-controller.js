const userPageController = async (req, res) => {
    return res.status(201).json({
        success : true, 
        message : "Welcome to User Page"
    });
};

module.exports = userPageController;