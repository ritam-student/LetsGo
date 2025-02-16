import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError";


export const sellerAuth = async (req , res , next) => {
    try{
        const token = req.headers.token;
        const response = jwt.verify(token , process.env.JWT_SECRET_SELLER);

        if (response){
            req._id = response._id;
            next();
        }else {
            res.sattus(401).json(new ApiError(401 , "Unauthorized access..."  ))
        }
    }catch(error){
        res.status(500).json(new ApiError(500 , "Internal error..."))
    }
}