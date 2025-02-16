import { Router } from "express";
import { getAllRooms, showRoomDetails } from "../controllers/room.controller.js";

const roomRouter = Router();


roomRouter.route("/").get(getAllRooms);
roomRouter.route("/:id").get(showRoomDetails);




export default roomRouter;