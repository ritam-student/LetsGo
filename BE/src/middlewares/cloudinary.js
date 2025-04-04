import { v2 as cloudinary } from 'cloudinary';
import { ApiError } from '../utils/ApiError.js';



export const uploadImage = async (req , res, next) => {
    console.log('inside image uploader...');

    try {

        console.log(req.formData());
        const formData = req.formData();
        console.log("form data " , formData);
        const files = formData.get("file");
        console.log("files : " , files);

        if(!files){
            res.json(402).json(new ApiError(402 , "images does not exists..."));
        }

        /**
        const bytes = await files.arrayBuffer();
        const buffer = Buffer.from(bytes);

        await new Promise((resolve , reject) => {
            cloudinary.uploader.upload_stream(
                {folder : "LetsGO"}
            )
        })
         */

    
        // Upload each file to Cloudinary
        for (const file of files) {
            console.log(file);
          const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ 
                folder: "uploads" ,
                crop: "fill" ,
                gravity: "auto",
                width: "500",
                height: "500",
                radius: "max",
                fetch_format: "auto",
                quality: "auto",
            }, (error, result) => {
              if (error) reject(error);
              else {resolve(result); console.log("result is : " , result);}
            }).end(file.buffer);
          });
    
          imageUrls.push(result.secure_url);
          console.log(imageUrls);
        }
    
        req.imagesUrl = imageUrls;
        next();
    } catch (error) {
        res.status(500).json(new ApiError(500 , "upload failed..." , error));
    }





};