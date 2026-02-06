import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { useContent } from '../context/ContentContext';

/**
 * Contact page with centered business info and contact details.
 */
export default function Contact() {
  const { siteContent } = useContent();
  const { business } = siteContent;

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
          <h1 className="text-4xl sm:text-5xl font-bold text-dark mb-4">Contact Us</h1>
          <p className="text-light-text text-lg max-w-2xl mx-auto">
            Have a question or ready to get started? Reach out and we&apos;ll get back to you promptly.
          </p>
        </motion.div>

        {/* Centered Business Info */}
        <motion.div
          className="max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-cream rounded-xl p-8">
            <h3 className="text-2xl font-bold text-dark mb-2">Get Your Free Quote Today!</h3>
            <p className="text-light-text mb-6">Contact us by phone, text, or email to discuss your lawn care needs.</p>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <FaPhone className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-dark">Phone/Text</p>
                  <p className="text-light-text text-lg">
                    {business.phone}
                  </p>
                  <p className="text-sm text-light-text mt-1">Call or text us anytime!</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <FaEnvelope className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-dark">Email</p>
                  <a href={`mailto:${business.email}`} className="text-light-text hover:text-primary transition-colors break-all">
                    {business.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <FaClock className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-dark">Hours</p>
                  <p className="text-light-text">Monday - Sunday: 7am - 7pm</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <FaMapMarkerAlt className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-dark">Service Areas</p>
                  <p className="text-light-text">Lawrence, KS</p>
                  <p className="text-light-text">Olathe, KS</p>
                  <p className="text-light-text">Lenexa, KS</p>
                  <p className="text-light-text">Shawnee, KS</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
