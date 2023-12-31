import mongoose from "mongoose";

const { Schema } = mongoose;


const userSchema = new Schema({
    name:{
        type: String,
        trim: true,
        required: true
    },
    email:{
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        min: 6,
        max: 64
    },
    picture:{
        type: String,
        default: "/avatar.png"
    },
    role:{
        type: [String],
        default: ["Subscriber"],
        enum: ["Subscriber", "Instructor", "Admin"]
    },
    paystack_account_id: "",

    paystack_seller: {},

    paystackSession: {},
    
    passwordResetCode: {
        data: String,
        default: ""
       }
}, 

{timestamps: true}
);

export default mongoose.model('User', userSchema); 