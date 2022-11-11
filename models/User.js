import mongoose from 'mongoose'

const UserSchema = mongoose.Schema({

    firstName:{
        type: String,
        required: true,
        min: 2
    },
    lastName:{
        type: String,
        required: true,
        min: 3
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    
    role:{
        type: String,
        default: 'client',
    },
}, {timestamps: true})



export default mongoose.model("User", UserSchema)