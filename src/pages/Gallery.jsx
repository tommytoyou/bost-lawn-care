import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import GallerySection from '../components/sections/Gallery';
import { useContent } from '../context/ContentContext';

/**
 * Standalone before/after slider component for the gallery page.
 */
function BeforeAfterSlider({ beforeImage, afterImage, caption }) {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pos = ((clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.max(0, Math.min(100, pos)));
  }, []);

  return (
    <div className="space-y-2">
      <div
        ref={containerRef}
        className="relative w-full aspect-[4/3] rounded-lg overflow-hidden cursor-col-resize select-none shadow-md"
        onMouseDown={() => { isDragging.current = true; }}
        onMouseUp={() => { isDragging.current = false; }}
        onMouseLeave={() => { isDragging.current = false; }}
        onMouseMove={(e) => { if (isDragging.current) handleMove(e.clientX); }}
        onTouchMove={(e) => { handleMove(e.touches[0].clientX); }}
        onTouchEnd={() => { isDragging.current = false; }}
      >
        <img src={afterImage} alt="After" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPos}%` }}>
          <img
            src={beforeImage}
            alt="Before"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ width: containerRef.current ? containerRef.current.offsetWidth : '100%' }}
            draggable={false}
          />
        </div>
        <div className="absolute top-0 bottom-0 w-0.5 bg-white" style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
              <path d="M7 4L3 10L7 16" stroke="#2D5A27" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13 4L17 10L13 16" stroke="#2D5A27" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <div className="absolute top-3 left-3 bg-black/60 text-white text-xs font-semibold px-2 py-1 rounded-full">Before</div>
        <div className="absolute top-3 right-3 bg-primary/80 text-white text-xs font-semibold px-2 py-1 rounded-full">After</div>
      </div>
      {caption && <p className="text-sm text-light-text text-center">{caption}</p>}
    </div>
  );
}

/**
 * Gallery page with category filters, image grid with lightbox, and before/after comparisons.
 */
export default function GalleryPage() {
  const { gallery } = useContent();
  const transformations = gallery.filter((img) => img.beforeImage);

  return (
    <div className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-dark mb-4">Our Work</h1>
          <p className="text-light-text text-lg max-w-2xl mx-auto">
            Browse our portfolio of lawn transformations, mowing results, and seasonal cleanups across Lawrence.
          </p>
        </motion.div>

        {/* Filterable Image Grid */}
        <GallerySection showFilters />

        {/* Before/After Comparison Section */}
        {transformations.length > 0 && (
          <div className="mt-20">
            <motion.h2
              className="text-3xl font-bold text-dark text-center mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Before &amp; After Transformations
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {transformations.map((img, index) => (
                <motion.div
                  key={img.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <BeforeAfterSlider
                    beforeImage={img.beforeImage}
                    afterImage={img.imageUrl}
                    caption={img.caption}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
