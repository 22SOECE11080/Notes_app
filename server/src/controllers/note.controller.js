const { createResponse, customErrorHandler } = require("../utils/helper");
const { Note } = require("../models"); // make sure Note model is imported
const { where } = require("sequelize");

const noteController = {
  postNote: async (req, res) => {
    const { title, content } = req.body;
    try {
      const user = req.user;
      if (!user) {
        return createResponse(res, false, 401, "Unauthorized");
      }
      const newNote = await Note.create({
        title,
        content,
        userId: user.id,
      });

      return createResponse(
        res,
        true,
        201,
        "NOTES_SUCCESSFULLY_REGISTER",
        newNote
      );
    } catch (error) {
      console.error("🔴 Error creating note:", error.message || error);
      return createResponse(res, false, 500, "Error creating note", {
        error: error.message,
      });
    }
  },
  getAllnotes: async (req, res) => {
    try {
      const getposts = await Note.findAll();
      if (!getposts) {
        return customErrorHandler(res, false, 404, "not get notes");
      }
      return createResponse(
        res,
        true,
        200,
        "All notes fetched successfully",
        getposts
      );
    } catch (error) {
      return customErrorHandler(res, false, 500, "Error getting posts");
    }
  },

  //get Note which user id is passed in params that all give note matched with useid
  getNote: async (req, res) => {
    const userid = req.params.id;
    try {
      const note = await Note.findAll({
        where: { userId: userid },
      });
      if (!note || note.length === 0) {
        return createResponse(res, false, 404, "Note not found");
      }
      return createResponse(res, true, 200, "Note fetched successfully", note);
    } catch (error) {
      return createResponse(res, false, 500, "Error fetching note", {
        error: error.message,
      });
    }
  },
  updateNote: async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
      const user = req.user;

      const note = await user.findone({ where: { id, userId: userid } });
      if (!note) {
        return createResponse(
          res,
          false,
          400,
          "Note not found or unauthorized"
        );
      }

      note.title = title || note.title;
      note.content = content || note.content;
      await note.save();

      return createResponse(res, true, 200, "Note updated successfully", note);
    } catch (error) {
      return createResponse(res, false, 500, "Error fetching note", {
        error: error.message,
      });
    }
  },

  deleteNote: async (req, res) => {
    const { id } = req.params;
    try {
      const user = req.user;

      const note = await user.findone({where:{id,userId:userid}});

      if(!note){
        return createResponse(
          res,
          false,
          400,
          "Note not found or unauthorized"
        );
      }

      note.destroy();

      return createResponse(res, true, 200, "Note deleted successfully");
    } catch (error) {
      return createResponse(res, false, 500, "Error deleting note", {
        error: error.message,
      });
    }
  },
};

module.exports = noteController;
