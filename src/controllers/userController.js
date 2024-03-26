import jwt from "jsonwebtoken"
import User from "../models/user.js"
import { StatusCodes } from "http-status-codes"


export const addUser = async (req, res) => {
    try {
        const user = req.body
        const newUser = new User(req.body)
        await newUser.save()
        res.status(StatusCodes.OK).json({ message: "User registration done successfuly" })
    }
    catch (e) {
        res.status(StatusCodes.CONFLICT).json({ message: "An error has occured" })
    }
}

export const getUser = async (req, res) => {
    const id = req.params.id

    try {
        const data = await User.find({ _id: id })
        res.status(StatusCodes.OK).json({ data, message: "sucessful" })
    }
    catch (e) {
        res.status(StatusCodes.NOT_FOUND).json({ message: "Not found" })
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const data = await User.find()
        res.status(StatusCodes.OK).json({ data, message: "sucessful" })
    }
    catch (e) {
        res.status(StatusCodes.NOT_FOUND).json({ message: "Not found" })
    }
}

export const updateUser = async (req, res) => {
    try {
        const id = req.params.id
        await User.findByIdAndUpdate(id, req.body)
        res.status(StatusCodes.OK).json({ message: "User successfully updated" })
    }
    catch (e) {
        console.log(e)
        res.status(StatusCodes.NOT_FOUND).json({ message: "Failed to update" })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id
        await User.findByIdAndDelete(id)
        res.status(StatusCodes.OK).json({ message: "User successfully deleted" })
    }
    catch (e) {
        res.status(StatusCodes.NOT_FOUND).json({ message: "Failed to delete" })
    }
}

export const loginUser = async (req, res) => {

    const userDetailes = req.body

    const user = await User.findOne({ email: userDetailes.email })
    
    if (!user)
        res.status(StatusCodes.NOT_FOUND).send({ message: "User Not found! please register" })
    else if (user.password != userDetailes.password)
        res.status(StatusCodes.NOT_ACCEPTABLE).send({ message: "Wrong password! please enter correct password" })
    else {

        const secret = process.env.SECRET_KEY;
        const options = { expiresIn: '1h' };
        const token = jwt.sign({ userId: user._id }, secret, options);

        res.status(StatusCodes.OK).send({ message: "Login successfully", data: token })
    }


}


