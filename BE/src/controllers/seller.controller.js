
import Sellers from "../models/Sellers.models.js" 
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import bcrypt from "bcrypt";
import zod from "zod";


/**    signup controller    */
export const signupUser =  async (req , res) => {

    try{
        console.log(req.body);
        const requiredBody = zod.object({
            firstName: zod.string().min(2).max(40),
            lastName: zod.string().min(2).max(40),
            userName: zod.string().min(2).max(40),
            email: zod.string().min(2).max(40).email(),
            password: zod.string().min(8).max(40),
            city: zod.string().min(2).max(40),
            state: zod.string().min(2).max(40),
            country: zod.string().min(2).max(40),
            area: zod.string().min(2).max(40),
            pincode: zod.string().min(2).max(40),
            contactNumber: zod.string().min(10).max(15)
        });
        // validate the incoming body using zod
        const parsedData = requiredBody.safeParse(req.body);
        console.log("parsed data : " , parsedData);

        if (! parsedData.success){
            res.status(404).json(new ApiError(404 , "Bad request..." , parsedData.error));
            return;
        }
    
        // hashed the password using bcrypt
        const hashedPassword = await bcrypt.hash(parsedData.data.password , parseInt(process.env.SALTROUNDS));
    
    
        // save the data in DB
        const seller = await Sellers.create({
            firstName: parsedData.data.firstName,
            lastName: parsedData.data.lastName,
            userName: parsedData.data.userName,
            email: parsedData.data.email,
            password: hashedPassword,
            city: parsedData.data.city,
            state: parsedData.data.state,
            country: parsedData.data.country,
            area: parsedData.data.area,
            pincode: parsedData.data.pincode,
            contactNumber: parsedData.data.contactNumber,
            likes: [],
            dislikes: [],
            saved : []
        });
        console.log("user is : " , user);
        const apiResponse = new ApiResponse(200, user , "signup successfully...");
        console.log(apiResponse);
        res.status(200).json(apiResponse);
    }catch (error){
        res.status(500).json(new ApiError(500, "something went wrong..." , error));
    }

}