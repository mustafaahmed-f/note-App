// const router = require('express').Router();
import { Router } from 'express';
const router = Router()
// const notesController = require('./controller/notes')
import * as notesController from './controller/notes.js'


//Get all notes:
router.get('/' , notesController.getAllNotes)

//Get all notes with their owner 
router.get('/owner' , notesController.getNotesWithOweners)

//Get notes of a user
router.get('/:user_id' , notesController.getNotesOfUser)

//Search of notes
router.get('/search/:user_id/:title' , notesController.searchNotes)

//add note
router.post('/add' , notesController.addNotes)

//update note
router.put('/update' , notesController.updateNotes)

//delete note
router.delete('/delete/:user_id/:id' , notesController.deleteNote)

//get specific note 
router.get('/:user_id/:note_id' , notesController.getSpecificNote)

export default router