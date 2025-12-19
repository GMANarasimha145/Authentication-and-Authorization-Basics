const adminPageController = async (req, res) => {
    return res.status(201).json({
        success : true, 
        message : "Welcome to Admin Page"
    });
};

module.exports = adminPageController;