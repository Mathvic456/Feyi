import { useEffect, useState } from 'react';
import { Lock, Unlock, Trash2, Download } from 'lucide-react';
import MoodChart from './MoodChart';

export default function AdminView({ onClose }) {
  const [password, setPassword] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [data, setData] = useState({
    rants: [],
    journal: [],
    mood: []
  });

  useEffect(() => {
    if (unlocked) {
      setData({
        rants: JSON.parse(localStorage.getItem('feyi-rants') || '[]'),
        journal: JSON.parse(localStorage.getItem('feyi-journal') || '[]'),
        mood: JSON.parse(localStorage.getItem('feyi-mood-data') || '[]')
      });
    }
  }, [unlocked]);

  const handleUnlock = () => {
    // In production, use proper password hashing!
    if (password === 'Victor123') {
      setUnlocked(true);
    }
  };

  const clearData = (type) => {
    if (confirm(`Permanently delete all ${type} entries?`)) {
      localStorage.removeItem(`feyi-${type}`);
      setData(prev => ({ ...prev, [type]: [] }));
    }
  };

  const exportData = (type) => {
    const blob = new Blob([JSON.stringify(data[type], null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `feyi-${type}-${new Date().toISOString()}.json`;
    a.click();
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg max-w-4xl mx-auto shadow-inner">
      {!unlocked ? (
        <div className="text-center p-8">
          <Lock className="mx-auto mb-4 text-gray-400" size={32} />
          <h3 className="text-lg font-medium mb-4">Admin Authentication</h3>
          <div className="flex justify-center gap-2">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="p-2 border rounded focus:ring-2 focus:ring-purple-300"
              onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
            />
            <button
              onClick={handleUnlock}
              className="bg-purple-600 text-white p-2 rounded hover:bg-purple-700 transition-colors"
            >
              Unlock
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center border-b pb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Unlock className="text-green-500" size={20} /> Admin Dashboard
            </h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              ✕ Close
            </button>
          </div>

          <MoodChart data={data.mood} />

          <div className="grid md:grid-cols-2 gap-6">
            {['rants', 'journal'].map((type) => (
              <div key={type} className="bg-white p-4 rounded-lg shadow border">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold capitalize">
                    {type} ({data[type].length})
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => exportData(type)}
                      className="text-xs flex items-center gap-1 text-blue-500 hover:text-blue-700"
                      title="Export"
                    >
                      <Download size={14} />
                    </button>
                    <button
                      onClick={() => clearData(type)}
                      className="text-xs flex items-center gap-1 text-red-500 hover:text-red-700"
                      title="Clear All"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <div className="max-h-60 overflow-y-auto pr-2 space-y-3">
                  {data[type].length === 0 ? (
                    <p className="text-gray-400 italic text-sm">No {type} entries found</p>
                  ) : (
                    data[type].map((entry) => (
                      <div key={entry.id} className="border-b pb-2 last:border-0">
                        <p className="whitespace-pre-line text-sm">{entry.text}</p>
                        <p className="text-xs text-gray-500 mt-1">{entry.date}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}