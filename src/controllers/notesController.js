import Note from "../models/notes.js"
import { StatusCodes } from "http-status-codes"


export const addNote = async (req, res) => {
    const { userId } = req

    try {
        const note = req.body
        const newNote = new Note({ ...req.body, userId })
        await newNote.save()
        res.status(StatusCodes.OK).json({ message: "Note added Successfully" })
    }
    catch (e) {
        res.status(StatusCodes.CONFLICT).json({ message: "An error has occured" })
    }
}

export const getNote = async (req, res) => {
    const { userId } = req

    try {
        const data = await Note.find({ _id: id, userId })
        res.status(StatusCodes.OK).json({ data, message: "sucessful" })
    }
    catch (e) {
        res.status(StatusCodes.NOT_FOUND).json({ message: "Not found" })
    }
}


export const getAllNotes = async (req, res) => {
    const { userId } = req
    try {
        const data = await Note.find({ userId })
        res.status(StatusCodes.OK).json({ data, message: "sucessful" })
    }
    catch (e) {
        res.status(StatusCodes.NOT_FOUND).json({ message: "Not found" })
    }
}

export const updateNote = async (req, res) => {
    const { userId } = req

    try {
        const id = req.params.id
        await Note.findOneAndUpdate({ _id: id, userId }, req.body)
        res.status(StatusCodes.OK).json({ message: "successfully updated" })
    }
    catch (e) {
        console.log(e)
        res.status(StatusCodes.NOT_FOUND).json({ message: "Failed to update" })
    }
}

export const deleteNote = async (req, res) => {
    const { userId } = req

    try {
        const id = req.params.id
        await Note.findOneAndDelete({ _id: id, userId })
        res.status(StatusCodes.OK).json({ message: "successfully deleted" })
    }
    catch (e) {
        res.status(StatusCodes.NOT_FOUND).json({ message: "Failed to delete" })
    }
}

export const changeVisibility = async (req, res) => {
    const { userId } = req

    try {
        const id = req.params.id
        const state = req.query.state

        if (!state)
            res.status(StatusCodes.BAD_REQUEST).send({ message: "please mention state" })
        else {
            const note = await Note.findOne({ _id: id, userId })

            if (String(note.isVisible) === state) {
                console.log('eee')
                res.status(StatusCodes.OK).send({ message: `Visibility is already ${state}` })
            }
            else {
                await Note.findOneAndUpdate({ _id: id, userId }, { isVisible: state })

                res.status(StatusCodes.OK).json({ message: "successfully Updated" })
            }
        }

    }
    catch (e) {
        res.status(StatusCodes.NOT_FOUND).json({ message: "Failed to Update", error: e.message })
    }
}

export const searchNote = async (req, res) => {
    const { userId } = req
    try {
        const search = req.query.search
        const data = await Note.find({ userId, title: { $regex: search } })
        res.status(StatusCodes.OK).json({ message: "Search successful", data })
    }
    catch (e) {
        res.status(StatusCodes.NOT_FOUND).json({ message: "Failed to search", error: e.message })
    }
}

export const getLatest = async (req, res) => {
    const { userId } = req
    try {
        const data = await Note.find({ userId }).sort({ updaupdatedAt: "desc" })
        res.status(StatusCodes.OK).json({ data, message: "sucessful" })
    }
    catch (e) {
        res.status(StatusCodes.NOT_FOUND).json({ message: "Not found" })
    }
}

export const showVisible = async (req, res) => {
    const { userId } = req
    try {
        const data = await Note.find({ userId, isVisible: true })
        res.status(StatusCodes.OK).json({ message: "Visible notes found", data })
    }
    catch (e) {
        res.status(StatusCodes.NOT_FOUND).json({ message: "Not found", error: e.message })
    }
}

export const showInVisible = async (req, res) => {
    const { userId } = req
    try {
        const data = await Note.find({ userId, isVisible: false })
        res.status(StatusCodes.OK).json({ message: "Invisible notes found", data })
    }
    catch (e) {
        res.status(StatusCodes.NOT_FOUND).json({ message: "Not found", error: e.message })
    }
}

export const deleteInvisible = async (req, res) => {
    const { userId } =req

    try {
        const data = await Note.deleteMany({ userId, isVisible: false })
        res.status(StatusCodes.ACCEPTED).json({ message: "Invisible notes deleted successfully`", data })
    }
    catch (e) {
        res.status(StatusCodes.CONFLICT).json({ message: "Unable to Delete", error: e.message })
    }
}

