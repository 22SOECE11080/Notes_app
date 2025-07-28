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


router.get("/getAllNotes",authMiddleware,notecontroller.getAllnotes);

// /**
//  * @route GET - /api/notes/getNote/:id
//  * @group get-note
//  * @desc Get a specific note by ID
//  */

router.get("/getNote/:id",authMiddleware,notecontroller.getNote);

// /**
//  * @route PUT - /api/notes/update/:id
//  * @group put-note
//  * @update the notes based pon the id
//  */
router.put("/update/:id", authMiddleware, notecontroller.updateNote);

// /**
//  * @route DELTE - /api/notes/delete/:id
//  * @group delete-note
//  * @delete notes based on the id
//  */
router.delete("/delete/:id", authMiddleware, notecontroller.deleteNote);

module.exports = router;