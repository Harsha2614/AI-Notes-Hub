const Note = require("../models/Note");
const summarizeText = require("../utils/aiHelper");
const createNote = async (req, res) => {
  try {
    const { title, content, category } = req.body;

    const note = await Note.create({
      title,
      content,
      category,
      userId: req.user
    });

    res.status(201).json({
      message: "Note created successfully",
      note
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({
      userId: req.user
    });

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const updateNote = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      userId: req.user
    });

    if (!note) {
      return res.status(404).json({
        message: "Note not found"
      });
    }

    note.title = req.body.title || note.title;
    note.content = req.body.content || note.content;
    note.category = req.body.category || note.category;

    const updatedNote = await note.save();

    res.status(200).json({
      message: "Note updated successfully",
      updatedNote
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      userId: req.user
    });

    if (!note) {
      return res.status(404).json({
        message: "Note not found"
      });
    }

    await note.deleteOne();

    res.status(200).json({
      message: "Note deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const summarizeNote = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      userId: req.user
    });

    if (!note) {
      return res.status(404).json({
        message: "Note not found"
      });
    }

    const summary = await summarizeText(
      note.content
    );

    res.status(200).json({
      summary
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
  summarizeNote
};
