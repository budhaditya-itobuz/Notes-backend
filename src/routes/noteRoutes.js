import express from "express"
import { getNote, getAllNotes, addNote, updateNote, deleteNote, changeVisibility, searchNote, getLatest, showInVisible, showVisible, deleteInvisible } from "../controllers/notesController.js"

import { authorization } from "../middlewares/authorization.js"

const noteRouter = express.Router()

noteRouter.use(authorization)

noteRouter.get("/get-note/:id", getNote)
noteRouter.get("/get-all-notes", getAllNotes)
noteRouter.post("/add-note", addNote)
noteRouter.put('/update-note/:id', updateNote)
noteRouter.delete('/delete-note/:id', deleteNote)
noteRouter.put('/change-visibility/:id', changeVisibility)
noteRouter.get("/search-note", searchNote)
noteRouter.get("/get-latest", getLatest)
noteRouter.get("/show-visible", showVisible)
noteRouter.get("/show-invisible", showInVisible)
noteRouter.delete("/delete-invisible",deleteInvisible)





export default noteRouter