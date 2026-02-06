import { motion } from 'framer-motion';

/**
 * Gallery page with coming soon message.
 */
export default function GalleryPage() {
  return (
    <div className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center py-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-xl mx-auto bg-cream rounded-2xl p-12 shadow-sm">
            <h1 className="text-4xl sm:text-5xl font-bold text-dark mb-6">Our Work</h1>
            <p className="text-xl text-light-text leading-relaxed">
              Gallery Coming Soon — Check back once the season starts for photos of our work!
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
