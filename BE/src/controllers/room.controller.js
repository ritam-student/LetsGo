import { findRoomDetails } from "../db/queryDB.js";
import { Rooms } from "../models/Rooms.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";



export const getAllRooms = async (req, res) => {
    try {
        const rooms = await Rooms.find({});
        res.status(200).json(new ApiResponse(200 , rooms[0] , "fetch done"));
    } catch (error) {
        console.error(error);
        res.status(500).send(new ApiError(400, "something wrong ...", error));
    }
}


// example of a middleware used controller
/**
const applyMiddleware = (middleware, handler) => {
    return async (req, res, next) => {
        await middleware(req, res, next);
        if (!res.headersSent) {
            await handler(req, res, next);
        }
    };
};

export const showRoomDetails = applyMiddleware(authenticate, async (req, res) => {
    const id = req.params;
    res.json(await findRoomDetails(id));
});
 */




// return the details of a single room
export const showRoomDetails = async (req, res) => {    // add authentication check for seller
    const id = req.params;
    res.json(await findRoomDetails(id));
} 