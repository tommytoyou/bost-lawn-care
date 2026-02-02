import { motion } from 'framer-motion';

/**
 * Reusable card component with hover lift animation.
 */
export default function Card({ children, className = '', hover = true, ...props }) {
  return (
    <motion.div
      className={`bg-white rounded-xl shadow-md overflow-hidden ${className}`}
      whileHover={hover ? { y: -4, boxShadow: '0 12px 24px rgba(0,0,0,0.12)' } : {}}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
