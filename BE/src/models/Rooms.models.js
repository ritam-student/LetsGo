import mongoose from "mongoose";
const Schema = mongoose.Schema;


const RoomSchema = new Schema({
    houseName: {
        type : String,
    } ,
    ownerName: {
        type: String,
        required: true,
    },
    description: {
        type : String,
    } ,
    roomsImageUrl : {
        type : String,      // link of the image
        required: true

    } ,
    address: {
        type : String,
        required : true
    } ,
    country: {
        type : String,
        required : true
    } ,
    city: {
        type : String,
        required : true
    } ,
    state: {
        type : String,
        required : true
    } ,
    area: {
        type : String,
        required : true
    } ,
    pincode: {
        type : String,
        required : true
    } ,

    price: {
        type : Number,
        required : true
    } ,
    type: {
        type: String,
        enum: ["Apartment", "Flat", "PG", "Hostel", "Villa", "Bungalow"],
        required: true
    },
    likes: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Users"
        }
    ],
    dislikes: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Users"
        }
    ],
    saved: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Users"
        }
    ],
    isAC: {
        type: Boolean,
        default: false,
        required: true
    },
    contact_number: {
        type : String,
        required : true
    } ,
    isSingleBed: {
        type : Boolean,
        required : true
    } ,
}, {
    timestamps: true
}
);

export const Rooms = mongoose.model("Rooms" , RoomSchema);