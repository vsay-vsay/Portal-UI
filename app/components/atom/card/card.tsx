import { motion } from "framer-motion";

const CardWith3Value = ({ title, value, icon }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between"
    >
      <div>
        <h3 className="text-gray-500 text-sm">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <div className="text-blue-500 text-3xl">{icon}</div>
    </motion.div>
  );
};

export default CardWith3Value;