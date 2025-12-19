const cloudinary = require('../config/cloudinary');

const uploadToCloudinary = async (filePath) => {
    try {
        const uploadResult = await cloudinary.uploader.upload(filePath);
        return {
            imageURL : uploadResult.secure_url,
            publicId : uploadResult.public_id
        };
    } catch(error) {
        console.error('Error Occured while uploading Image to Cloudinary: ', error);
        throw new Error('Error Occured while uploading Image to Cloudinary');
    }
};

module.exports = uploadToCloudinary;