import { motion } from "framer-motion";

export default function MoodOption({ title, icon, onClick }) {
  return (
    <motion.button
      whileHover={{ 
        scale: 1.03,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="w-full bg-white p-4 rounded-lg shadow-md flex items-center gap-4 hover:bg-opacity-90 transition-all"
    >
      <div className="p-2 rounded-full bg-opacity-20 bg-current">
        {icon}
      </div>
      <span className="font-medium text-gray-800 text-left flex-1">{title}</span>
      <div className="text-gray-400">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
    </motion.button>
  );
}