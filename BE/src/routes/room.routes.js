import { Router } from "express";
import {  getAllApartment, getAllHostels, getAllMess, getAllPG, getAllRooms, newRoom, searchedRoomsFromAll, searchedRoomsFromApartment, searchedRoomsFromHostels, searchedRoomsFromMess, searchedRoomsFromPg, showRoomDetails } from "../controllers/room.controller.js";
import { userAuth } from "../middlewares/userAuth.js";
import { sellerAuth } from "../middlewares/sellerAuth.js";

const roomRouter = Router();


roomRouter.route("/").get(getAllRooms);
roomRouter.route("/hostel").get(getAllHostels);
roomRouter.route("/pg").get(getAllPG);
roomRouter.route("/apartment").get(getAllApartment);
roomRouter.route("/mess").get(getAllMess);
roomRouter.route("/roomdetails/:id").get(userAuth , showRoomDetails);
roomRouter.route('/newroom').post(sellerAuth , newRoom);
roomRouter.route('/searchFromAll').get(searchedRoomsFromAll);
roomRouter.route('/searchFromHostel').get(searchedRoomsFromHostels);
roomRouter.route('/searchFromMess').get(searchedRoomsFromMess);
roomRouter.route('/searchFromPg').get(searchedRoomsFromPg);
roomRouter.route('/searchFromApartment').get(searchedRoomsFromApartment);




export default roomRouter;