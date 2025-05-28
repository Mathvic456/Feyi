import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Smile, Heart, MessageSquare, NotebookPen, Phone, PartyPopper,
  Droplet, Briefcase, Star, Key, Mic
} from "lucide-react";
import MoodOption from "./MoodOption";
import JournalPage from "./JournalPage";
import RantPage from "./RantPage";
import Modal from "./Modal";
import AdminView from "./AdminView";
import confetti from "canvas-confetti";

// Data
const loveNotes = [
  "You light up every room! ✨",
  "I'm so lucky to have you. 💖",
  "You're my favorite person. 🌎"
];

const periodAffirmations = [
  "Your feelings are valid. This too shall pass. 💖",
  "You're strong, even on tough days. Be gentle with yourself. 🌸",
  "Victor loves you exactly as you are—hormones and all! 😘"
];

const careerAffirmations = [
  "You're brilliant and capable. Success is yours! 🚀",
  "Every challenge is a chance to grow. You've got this! 💪",
  "Victor believes in you—now go conquer the world! 🌎"
];

export default function MainPage() {
  const [showJournal, setShowJournal] = useState(false);
  const [showRant, setShowRant] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [moodRating, setMoodRating] = useState(false);

  const showMessage = (messages) => {
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    setModalContent(randomMessage);
    setIsModalOpen(true);
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 }
    });
    showMessage(["You deserve celebration! 🎉"]);
  };

  const trackMood = (rating) => {
    const newEntry = {
      score: rating,
      date: new Date().toISOString()
    };
    const moodData = JSON.parse(localStorage.getItem('feyi-mood-data') || '[]');
    localStorage.setItem('feyi-mood-data', JSON.stringify([...moodData, newEntry]));
    showMessage(['Mood recorded! Thank you for sharing 💖']);
  };

  const options = [
    {
      id: 1,
      title: "Feeling Sad?",
      icon: <Smile className="text-pink-500" size={24} />,
      onClick: () => showMessage(["Cheer up, Feyi! You're amazing! 🌟"])
    },
    {
      id: 2,
      title: "What Victor Thinks",
      icon: <Heart className="text-red-500" size={24} />,
      onClick: () => showMessage(["Victor thinks you're perfect! ❤️"])
    },
    {
      id: 3,
      title: "Surprise Message!",
      icon: <MessageSquare className="text-blue-500" size={24} />,
      onClick: () => showMessage(loveNotes)
    },
    {
      id: 4,
      title: "Private Journal",
      icon: <NotebookPen className="text-indigo-500" size={24} />,
      onClick: () => setShowJournal(true)
    },
    {
      id: 5,
      title: "Emergency! Call Victor!",
      icon: <Phone className="text-green-500" size={24} />,
      onClick: () => window.open("tel:+1234567890")
    },
    {
      id: 6,
      title: "Confetti Boost!",
      icon: <PartyPopper className="text-yellow-500" size={24} />,
      onClick: triggerConfetti
    },
    {
      id: 7,
      title: "On Your Period Mood Swings?",
      icon: <Droplet className="text-red-300" size={24} />,
      onClick: () => showMessage(periodAffirmations)
    },
    {
      id: 8,
      title: "Career Boosts!",
      icon: <Briefcase className="text-blue-500" size={24} />,
      onClick: () => showMessage(careerAffirmations)
    },
    {
      id: 9,
      title: "Wanna Rant to Victor?",
      icon: <Mic className="text-orange-500" size={24} />,
      onClick: () => setShowRant(true)
    },
    {
      id: 10,
      title: "Track My Mood",
      icon: <Star className="text-yellow-500" size={24} />,
      onClick: () => setMoodRating(true)
    },
    {
      id: 11,
      title: "Admin View (Victor Only)",
      icon: <Key className="text-gray-500" size={24} />,
      onClick: () => setShowAdmin(true)
    }
  ];

  return (
    <>
      {showJournal ? (
        <JournalPage onBack={() => setShowJournal(false)} />
      ) : showRant ? (
        <RantPage onBack={() => setShowRant(false)} />
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 p-6"
        >
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold text-purple-700 mb-8 text-center">
              Welcome, Feyi! 💖
            </h1>
            <div className="space-y-4">
              {options.map((option) => (
                <MoodOption
                  key={option.id}
                  title={option.title}
                  icon={option.icon}
                  onClick={option.onClick}
                />
              ))}
            </div>
          </div>

          {/* Message Modal */}
          <Modal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)}
          >
            <div className="text-center p-4">
              <p className="text-lg font-medium text-purple-800">
                {modalContent}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsModalOpen(false)}
                className="mt-4 bg-purple-600 text-white py-2 px-6 rounded-lg"
              >
                Close
              </motion.button>
            </div>
          </Modal>

          {/* Mood Rating Modal */}
          {moodRating && (
            <Modal isOpen={true} onClose={() => setMoodRating(false)}>
              <div className="text-center p-4">
                <h3 className="font-bold mb-4">How are you feeling today?</h3>
                <div className="flex justify-center gap-2 my-4">
                  {[1, 2, 3, 4, 5].map(num => (
                    <button
                      key={num}
                      onClick={() => {
                        trackMood(num);
                        setMoodRating(false);
                      }}
                      className="text-4xl hover:scale-125 transition-transform"
                    >
                      {['😢', '😞', '😐', '😊', '🤩'][num-1]}
                    </button>
                  ))}
                </div>
              </div>
            </Modal>
          )}

          {/* Admin View Modal */}
          {showAdmin && (
            <Modal isOpen={true} onClose={() => setShowAdmin(false)}>
              <AdminView onClose={() => setShowAdmin(false)} />
            </Modal>
          )}
        </motion.div>
      )}
    </>
  );
}