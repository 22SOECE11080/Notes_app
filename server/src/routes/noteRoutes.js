const express = require("express");
const router = express.Router();
const  notecontroller = require('../controllers/note.controller.js');
const authMiddleware = require("../middleware/authMiddleware.js");

// /**
//  * @route GET - /api/notes/createNote
//  * @group create-note
//  * @desc Create a new note 
//  */

router.post("/createNote",authMiddleware,notecontroller.postNote);

// /**
//  * @route GET - /api/notes/getAllNotes
//  * @group get-all-notes
//  * @desc Get all notes for the authenticated user
//  */


router.get("/getAllNotes",notecontroller.getAllnotes);

// /**
//  * @route GET - /api/notes/getNote/:id
//  * @group get-note
//  * @desc Get a specific note by ID
//  */

router.get("/getNote/:id",authMiddleware,notecontroller.getNote);


module.exports = router;