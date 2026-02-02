import { useState } from 'react';
import { motion } from 'framer-motion';
import { useContent } from '../../context/ContentContext';
import Modal from '../ui/Modal';

/**
 * Gallery preview grid with lightbox. Used as a section on Home and standalone on Gallery page.
 */
export default function GallerySection({ limit, showFilters = false }) {
  const { gallery } = useContent();
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'Mowing', 'Cleanups', 'Transformations'];

  const filteredImages = activeFilter === 'All'
    ? gallery
    : gallery.filter((img) => img.category === activeFilter);

  const displayImages = limit ? filteredImages.slice(0, limit) : filteredImages;

  return (
    <>
      {showFilters && (
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2 rounded-full font-medium text-sm transition-colors cursor-pointer ${
                activeFilter === cat
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-dark hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {displayImages.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="cursor-pointer group"
            onClick={() => setSelectedImage(image)}
          >
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <img
                src={image.imageUrl}
                alt={image.caption}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-end">
                <div className="w-full p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-sm font-medium">{image.caption}</p>
                  <span className="text-green-200 text-xs">{image.category}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <Modal isOpen={!!selectedImage} onClose={() => setSelectedImage(null)}>
        {selectedImage && (
          <img
            src={selectedImage.imageUrl}
            alt={selectedImage.caption}
            className="w-full h-auto rounded-lg"
          />
        )}
      </Modal>
    </>
  );
}
