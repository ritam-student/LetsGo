import mongoose from "mongoose";
const Schema = mongoose.Schema;


const SellerSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        userName: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        area: {
            type: String,
            required: true
        },
        pincode: {
            type: String,
            required: true
        },
        contactNumber: {
            type: String,
            required: true
        },
        rooms: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Rooms"
            }
        ]
    }, 
    {
        timestamps: true
    }
);


export const Sellers = mongoose.model("Sellers" , SellerSchema);