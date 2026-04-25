import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Search,
  Sparkles,
  Trash2,
  Pencil,
  LogOut,
  NotebookPen,
  FolderOpen,
  Brain,
} from "lucide-react";
import API from "../api/axios";

export default function Dashboard() {
  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [summaries, setSummaries] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
  });

  const fetchNotes = async () => {
    try {
      const res = await API.get("/notes");
      setNotes(res.data);
      setFilteredNotes(res.data);
    } catch {
      alert("Failed to fetch notes");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    const result = notes.filter(
      (note) =>
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.category?.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredNotes(result);
  }, [search, notes]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await API.put(`/notes/${editingId}`, formData);
      } else {
        await API.post("/notes", formData);
      }

      setFormData({
        title: "",
        content: "",
        category: "",
      });

      setEditingId(null);
      fetchNotes();
    } catch {
      alert("Operation failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/notes/${id}`);
      fetchNotes();
    } catch {
      alert("Delete failed");
    }
  };

  const handleEdit = (note) => {
    setFormData({
      title: note.title,
      content: note.content,
      category: note.category,
    });

    setEditingId(note._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSummary = async (id) => {
    try {
      const res = await API.get(`/notes/${id}/summary`);
      setSummaries((prev) => ({
        ...prev,
        [id]: res.data.summary,
      }));
    } catch {
      alert("AI Summary failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-sm border p-6 md:p-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-sm text-gray-500">Welcome back</p>
              <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
                <Brain className="w-8 h-8" />
                AI Notes Hub
              </h1>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl border hover:shadow-md transition"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="lg:col-span-1 bg-white rounded-3xl shadow-sm border p-6 space-y-4"
          >
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <NotebookPen className="w-5 h-5" />
              {editingId ? "Update Note" : "Create Note"}
            </h2>

            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border rounded-2xl p-3 outline-none"
              required
            />

            <textarea
              name="content"
              placeholder="Write your note here..."
              rows="6"
              value={formData.content}
              onChange={handleChange}
              className="w-full border rounded-2xl p-3 outline-none"
              required
            />

            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border rounded-2xl p-3 outline-none"
            />

            <button className="w-full py-3 rounded-2xl font-medium bg-black text-white hover:opacity-90 transition">
              {editingId ? "Save Changes" : "Create Note"}
            </button>
          </motion.form>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl shadow-sm border p-4 flex items-center gap-3">
              <Search className="w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search notes by title or category..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full outline-none"
              />
            </div>

            <div className="grid gap-5">
              {filteredNotes.map((note) => (
                <motion.div
                  key={note._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-3xl shadow-sm border p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold">{note.title}</h3>
                      <p className="text-gray-600 mt-2">{note.content}</p>
                      <p className="text-sm text-gray-500 mt-3 flex items-center gap-2">
                        <FolderOpen className="w-4 h-4" />
                        {note.category || "General"}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 mt-6">
                    <button
                      onClick={() => handleEdit(note)}
                      className="px-4 py-2 rounded-2xl border flex items-center gap-2"
                    >
                      <Pencil className="w-4 h-4" />
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(note._id)}
                      className="px-4 py-2 rounded-2xl border flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>

                    <button
                      onClick={() => handleSummary(note._id)}
                      className="px-4 py-2 rounded-2xl bg-black text-white flex items-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      Summarize with AI
                    </button>
                  </div>

                  {summaries[note._id] && (
                    <div className="mt-6 p-5 rounded-2xl bg-slate-50 border">
                      <h4 className="font-semibold mb-2">AI Summary</h4>
                      <p className="text-gray-700">{summaries[note._id]}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
