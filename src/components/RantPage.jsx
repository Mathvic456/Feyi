import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Trash2, ArrowLeft } from "lucide-react";

export default function RantPage({ onBack }) {
  const [rants, setRants] = useState([]);
  const [newRant, setNewRant] = useState("");

  // Load saved rants
  useEffect(() => {
    const savedRants = localStorage.getItem("feyi-rants");
    if (savedRants) setRants(JSON.parse(savedRants));
  }, []);

  // Save new rant
  const saveRant = () => {
    if (!newRant.trim()) return;
    const updatedRants = [
      { 
        id: Date.now(), 
        text: newRant, 
        date: new Date().toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      },
      ...rants,
    ];
    setRants(updatedRants);
    localStorage.setItem("feyi-rants", JSON.stringify(updatedRants));
    setNewRant("");
  };

  // Delete rant
  const deleteRant = (id) => {
    const updatedRants = rants.filter((rant) => rant.id !== id);
    setRants(updatedRants);
    localStorage.setItem("feyi-rants", JSON.stringify(updatedRants));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 p-6"
    >
      <div className="max-w-md mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-orange-700 mb-6 hover:text-orange-800 transition-colors"
        >
          <ArrowLeft size={18} /> Back to Main
        </button>

        <h1 className="text-2xl font-bold text-orange-800 mb-4 flex items-center gap-2">
          <MessageSquare className="text-orange-600" size={24} /> Vent to Victor
        </h1>

        <div className="mb-8">
          <textarea
            value={newRant}
            onChange={(e) => setNewRant(e.target.value)}
            placeholder="Type whatever's bothering you... Victor will see this later!"
            className="w-full p-4 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 min-h-[120px] placeholder-orange-300"
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={saveRant}
            className="mt-2 bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg transition-colors"
          >
            Save Rant
          </motion.button>
        </div>

        <div className="space-y-4">
          <h2 className="font-semibold text-gray-700">Your Rant History:</h2>
          {rants.length === 0 ? (
            <p className="text-gray-500 italic">No rants yet. Let it out! 💢</p>
          ) : (
            rants.map((rant) => (
              <motion.div
                key={rant.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-4 rounded-lg shadow-sm border border-orange-100 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start gap-2">
                  <p className="whitespace-pre-line flex-1">{rant.text}</p>
                  <button
                    onClick={() => deleteRant(rant.id)}
                    className="text-red-400 hover:text-red-600 transition-colors"
                    aria-label="Delete rant"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">{rant.date}</p>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
}