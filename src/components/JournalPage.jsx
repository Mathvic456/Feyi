import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { NotebookPen, Trash2, ArrowLeft } from "lucide-react";

export default function JournalPage({ onBack }) {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState("");

  // Load saved entries
  useEffect(() => {
    const savedEntries = localStorage.getItem("feyi-journal");
    if (savedEntries) setEntries(JSON.parse(savedEntries));
  }, []);

  // Save new entry
  const saveEntry = () => {
    if (!newEntry.trim()) return;
    const updatedEntries = [
      { id: Date.now(), text: newEntry, date: new Date().toLocaleDateString() },
      ...entries,
    ];
    setEntries(updatedEntries);
    localStorage.setItem("feyi-journal", JSON.stringify(updatedEntries));
    setNewEntry("");
  };

  // Delete entry
  const deleteEntry = (id) => {
    const updatedEntries = entries.filter((entry) => entry.id !== id);
    setEntries(updatedEntries);
    localStorage.setItem("feyi-journal", JSON.stringify(updatedEntries));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-6"
    >
      <div className="max-w-md mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-purple-700 mb-6"
        >
          <ArrowLeft size={18} /> Back
        </button>

        <h1 className="text-2xl font-bold text-purple-800 mb-4 flex items-center gap-2">
          <NotebookPen className="text-purple-600" size={24} /> Feyi's Journal
        </h1>

        {/* New Entry Form */}
        <div className="mb-8">
          <textarea
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
            placeholder="Write your thoughts..."
            className="w-full p-4 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 min-h-[120px]"
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={saveEntry}
            className="mt-2 bg-purple-600 text-white py-2 px-4 rounded-lg"
          >
            Save Entry
          </motion.button>
        </div>

        {/* Past Entries */}
        <div className="space-y-4">
          <h2 className="font-semibold text-gray-700">Past Entries:</h2>
          {entries.length === 0 ? (
            <p className="text-gray-500">No entries yet. Write something! 💖</p>
          ) : (
            entries.map((entry) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-4 rounded-lg shadow-sm border border-purple-100"
              >
                <div className="flex justify-between items-start">
                  <p className="whitespace-pre-line">{entry.text}</p>
                  <button
                    onClick={() => deleteEntry(entry.id)}
                    className="text-red-400 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">{entry.date}</p>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
}