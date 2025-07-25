const express = require("express");
const router = express.Router();
const  notecontroller = require('../controllers/note.controller.js');

// /**
//  * @route GET - /api/createNote
//  * @group whatsapp-messages
//  * @desc Get message by ID
//  */

router.post("/createNote",notecontroller.postNote);


module.exports = router;