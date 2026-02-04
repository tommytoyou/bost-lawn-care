import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPhone } from 'react-icons/fa';
import Header from './Header';
import Footer from './Footer';
import { useContent } from '../../context/ContentContext';

/**
 * Main layout wrapper with header, animated page content, and footer.
 * Scrolls to top on route changes.
 */
export default function Layout({ children }) {
  const { pathname } = useLocation();
  const { siteContent } = useContent();
  const { business } = siteContent;

  // Scroll to top on navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <motion.main
        key={pathname}
        className="flex-grow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.main>
      <Footer />

      {/* Sticky Mobile Quote Button */}
      <Link to="/contact">
        <motion.div
          className="fixed bottom-6 right-6 bg-accent text-white px-6 py-4 rounded-full shadow-2xl flex items-center gap-2 font-semibold hover:bg-yellow-500 transition-all z-50 lg:hidden"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, duration: 0.3, type: 'spring' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaPhone className="w-4 h-4" />
          Free Quote
        </motion.div>
      </Link>
    </div>
  );
}
