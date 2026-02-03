import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
             ref:"User",
             required:true,
        },

        personalInfo:{
            fullname:String,
            email:String,
            phone:Number
        },

        summary:String,
        
        skill:[String],

        education:[
            {
            degree:String,
            institution:String,
            year: String
            }
        ],

        experience:[
            {
                role:String,
                company:String,
                duration:String,
                description:String
            }
        ],

        aiSuggestions:String,

    },
    {
        timestamps:true
    }
);

export default mongoose.model("Resume",resumeSchema);