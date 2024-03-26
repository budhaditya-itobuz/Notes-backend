import mongoose from "mongoose"


const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true,
    },
    isVisible: {
        type: Boolean,
        required: true,
        default:true
    },
    userId: {
        type: String,
        required: true
    }
},
    { timestamps: true }
);

const Note = mongoose.model('notes', noteSchema)
export default Note