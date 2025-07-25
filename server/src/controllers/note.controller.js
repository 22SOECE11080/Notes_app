const express = require("express");
const{ createResponse,customErrorHandler} =require("../utils/helper.js");
const noteController={
    postNote:async(res,req)=>{
        const {title,content}=req.body;
        try{
            const user = req.user; // From authMiddleware
            if (!user) {
                return res.status(401).json({ msg: "Unauthorized" });
            }

            const newNote = await Note.create({
                title,
                content,
                userId: user.id
            });

            return createResponse(res, 201, "Note created successfully", newNote);
        }
        catch (error) {
            return customErrorHandler(res,error, "Error creating note");
        }
    }
}
module.exports = noteController;