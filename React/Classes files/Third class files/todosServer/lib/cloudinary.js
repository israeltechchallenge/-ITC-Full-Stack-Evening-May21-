var cloudinary = require('cloudinary').v2

cloudinary.config({
 cloud_name: 'de39dayep',
 api_key: '247846782783168',
 api_secret: 'BYdQxHlWlie84xIcS1q9vK6tvyQ'
});


function uploadToCloudinary(filePath) {
 return new Promise((resolve, reject) => {
   cloudinary.uploader.upload(filePath, function (error, result) {
     if (error) reject(error);
     else resolve(result)
   });
 })
}

exports.uploadToCloudinary = uploadToCloudinary;
