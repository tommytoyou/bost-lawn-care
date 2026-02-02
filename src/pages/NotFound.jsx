import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';

/**
 * Friendly 404 page with a lawn-themed message and link back to home.
 */
export default function NotFound() {
  return (
    <div className="py-16 lg:py-24 min-h-[60vh] flex items-center justify-center">
      <motion.div
        className="text-center px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-8xl mb-6 block" role="img" aria-label="Grass">🌿</span>
        <h1 className="text-5xl sm:text-6xl font-bold text-dark mb-4">404</h1>
        <h2 className="text-2xl sm:text-3xl font-bold text-dark mb-3">Page Not Found</h2>
        <p className="text-light-text text-lg mb-8 max-w-md mx-auto">
          Looks like this page may have been mowed over. Let&apos;s get you back to greener pastures.
        </p>
        <Link to="/">
          <Button variant="primary" size="lg">Back to Home</Button>
        </Link>
      </motion.div>
    </div>
  );
}
