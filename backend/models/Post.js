import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
    {
        title :{
            type: String,
            required : true
        },  
        image :[
            {
            type: String,
            }
        ], 
        desc :{
            type: String,
            required : true
        }, 
        author :{
              type: mongoose.Types.ObjectId,
              ref: "User",
              require: true
        },
        reviews :[
            {
              type: mongoose.Types.ObjectId,
              ref: "Review",
            },
        ],
        tour :{
              type: mongoose.Types.ObjectId,
              ref: "Tour",
        },
        likes: {
            type: Number,
        },
        comments :[
            {
                text: {
                    type: String,
                    required: true,
                },
                author: {
                    type: mongoose.Types.ObjectId,
                    ref: "User",
                    required: true,
                },
                createdAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
    },
    { timestamps: true }
)

export default mongoose.model('Post', PostSchema);

