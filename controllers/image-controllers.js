const cloudinary = require('../config/cloudinary');
const uploadToCloudinary = require('../helpers/image-helper');
const Image = require('../models/Image');
const fs = require('fs');

const imageUploadController = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success : false,
                message : 'Image File is required. Please upload an Image'
            });
        }

        const { imageURL, publicId } = await uploadToCloudinary(req.file.path);

        const newlyUploadedImage = new Image({
            imageURL,
            publicId,
            uploadedBy : req.loggedInUserInfo.userId
        });

        await newlyUploadedImage.save();

        fs.unlinkSync(req.file.path);

        res.status(201).json({
            success : true,
            message : "Image Uploaded Successfully",
            image : newlyUploadedImage
        });

    } catch(error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : "Something went wrong! Please try again"
        });
    }
};

const imageDeleteController = async (req, res) => {
    try {
        const getIdOfImageToBeDeleted = req.params.id;
        const getCurrentLoggedInUserId = req.loggedInUserInfo.userId;

        const imageDetails = await Image.findById(getIdOfImageToBeDeleted);

        if (!imageDetails) {
            return res.status(404).json({
                success : false,
                message : "Image not found"
            });
        }

        if (imageDetails.uploadedBy.toString() !== getCurrentLoggedInUserId) {
            return res.status(403).json({
                success : false,
                message : "You're not authorized to this image, because you haven't uploaded this"
            });
        }

        await cloudinary.uploader.destroy(imageDetails.publicId);

        const deletedImageDetails = await Image.findByIdAndDelete(getIdOfImageToBeDeleted);

        res.status(200).json({
            success : true, 
            message : "Image Deleted Successfully",
            deletedImageDetails
        });
    } catch(error) {
        console.log('Error Occured while deleting Image: ', error);
        res.status(500).json({
            success : false,
            message : "Something Went Wrong"
        });
    }
};

const fetchImagesController = async (req, res) => {
    try {
        const allImagesDetails = await Image.find().populate('uploadedBy');

        if (allImagesDetails.length === 0) {
            return res.status(200).json({
                success : true,
                message : "No Images to Fetch"
            });
        }

        res.status(200).json({
            success : true,
            message : "Images Fetched Successfully",
            imagesDetails : allImagesDetails
        });

    } catch(error) {
        console.log('Error Occured while fetching Image: ', error);
        res.status(500).json({
            success : false,
            message : "Something Went Wrong"
        });     
    }
};

module.exports = { 
    imageUploadController,
    imageDeleteController,
    fetchImagesController
}