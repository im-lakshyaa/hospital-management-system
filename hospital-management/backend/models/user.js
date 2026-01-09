import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"],
        trim:true
    },

    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
        lowercase:true
    },

    password:{
        type:String,
        required:[true,"Password is required"],
        minlength:8,
        select:false
    },

    role:{
        type:String,
        enum:["admin","doctor","patient"],
        default:"patient"
    },
    isActive: {
      type: Boolean,
      default: true
    }


},
{
    timestamps:true
});

//hashing a password
userSchema.pre("save",async function () {
    if(!this.isModified("password"))return ;

    this.password = await bcrypt.hash(this.password,10);
});
//compare password 
userSchema.methods.matchPassword=async function (entredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);    
}    

const User=mongoose.model("User",userSchema);

export default User;