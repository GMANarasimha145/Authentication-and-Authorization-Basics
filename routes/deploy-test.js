const express = require('express');
const router = express.Router();

router.get('/welcome', async(req, res)=>{
    res.status(200).json({
        success : true,
        message : "Hi This is Madhu, Welcome to Authentication and Authorization, this is basic deploy test without mongoDB Connection."
    });
});

module.exports = router;