
import express, { urlencoded } from "express";
import dotenv from "dotenv";
import { Rooms } from "./models/Rooms.models.js";
import { connectDB } from "./db/connectDB.js";
import cors from "cors";
import roomRouter from "./routes/room.routes.js";
import userRouter from "./routes/user.routes.js";
import sellerRouter from "./routes/seller.routes.js";

dotenv.config();

connectDB();


const app = express();


app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json())





app.use("/api/v1/room" , roomRouter);
app.use("/api/v1/user" , userRouter);
app.use("api/v1/seller" , sellerRouter); 





const port = process.env.PORT || 8000;
app.listen(port , () => {
    console.log(`listening on port 3000 ${port} ...`);
});