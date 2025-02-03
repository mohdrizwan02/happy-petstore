import {v2 as cloudinary} from "cloudinary";

import fs from "fs";    



const uploadOnCloudinary = async (filePath)=>{

  cloudinary.config({
      cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
      api_key:process.env.CLOUDINARY_API_KEY,
      api_secret:process.env.CLOUDINARY_API_SECRET,
  })
 
    try{
        if(!filePath){
            return null
        }
        const response = await cloudinary.uploader.upload(filePath,{
            resource_type:"auto",
        })
        console.log("file uploaded successfully",response.url)
        fs.unlinkSync(filePath)
        return response
    }
    catch(error){
        console.log("upload failed",error)
        fs.unlinkSync(filePath)
        return null
    }
}


export {
    uploadOnCloudinary
}
