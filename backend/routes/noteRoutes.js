const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
  summarizeNote
} = require("../controllers/noteController");

router.post("/", protect, createNote);
router.get("/", protect, getNotes);
router.put("/:id", protect, updateNote);
router.delete("/:id", protect, deleteNote);
router.get("/:id/summary", protect, summarizeNote);

module.exports = router;