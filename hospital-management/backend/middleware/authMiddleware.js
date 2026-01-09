import jwt from "jsonwebtoken";
import User from "../models/user";

const authMiddleware =async (req,res,next)=>{
    try{
        let token;
        if(
            req.headers.authrization
        )
    }
}