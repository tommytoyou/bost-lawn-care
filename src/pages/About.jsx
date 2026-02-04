import { motion } from 'framer-motion';
import { FaClock, FaStar, FaHandsHelping } from 'react-icons/fa';
import { useContent } from '../context/ContentContext';

const valueIcons = {
  Reliability: FaClock,
  Quality: FaStar,
  Community: FaHandsHelping,
};

/**
 * About page with company story, service area, and core values.
 */
export default function About() {
  const { siteContent } = useContent();
  const { about } = siteContent;

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
          <h1 className="text-4xl sm:text-5xl font-bold text-dark mb-4">About Us</h1>
          <p className="text-accent font-semibold text-lg">Your Lawn, Our Pride</p>
        </motion.div>

        {/* Story Paragraphs */}
        <motion.div
          className="max-w-3xl mx-auto mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {about.paragraphs.map((paragraph, i) => (
            <p key={i} className="text-light-text text-lg leading-relaxed mb-6">
              {paragraph}
            </p>
          ))}
        </motion.div>

        {/* Service Area */}
        <motion.div
          className="bg-cream rounded-2xl p-8 sm:p-12 mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-dark text-center mb-8">Service Areas</h2>
          <p className="text-light-text text-center mb-8 max-w-2xl mx-auto">
            We proudly serve homeowners and businesses in the following Kansas communities:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {about.serviceArea.map((area) => (
              <span
                key={area}
                className="bg-white px-6 py-3 rounded-full text-base font-medium text-primary shadow-sm"
              >
                {area}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Our Values */}
        <div>
          <motion.h2
            className="text-3xl font-bold text-dark text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Our Values
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {about.values.map((value, index) => {
              const Icon = valueIcons[value.title] || FaStar;
              return (
                <motion.div
                  key={value.title}
                  className="text-center p-8"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                >
                  <div className="w-16 h-16 mx-auto mb-5 bg-green-50 rounded-full flex items-center justify-center">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-dark mb-3">{value.title}</h3>
                  <p className="text-light-text leading-relaxed">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
