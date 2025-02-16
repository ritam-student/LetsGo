import { Rooms } from "../models/Rooms.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";





// return the details of a single room
export async function findRoomDetails(id){
    try{
        const data = await Rooms.findById(id);
        return new ApiResponse(200, data, "successfull");
    }catch(error){
        return new ApiError(500 , "failed to get data" , error);
    }
    
}



// create a new room with provided details
export async function createRoom(houseName = "", ownerName, description = "", roomsImageUrl, address, country,
    city, state, area, pincode, price, type, likes = [] , dislikes = [] , saved = [], isAC, contact_number, isSingleBed 
 ){
    try{
        const res =  await Rooms.create({
            houseName,
            ownerName, 
            description, 
            roomsImageUrl, 
            address, 
            country,
            city, 
            state, 
            area, 
            pincode, 
            price, 
            type, 
            likes, 
            dislikes, 
            saved, 
            isAC, 
            contact_number, 
            isSingleBed
        });
        return new ApiResponse(200, res , "successfull");
    
    }catch(error){
        return new ApiError(500 , "failed to create room" , error);
    }
    
}

