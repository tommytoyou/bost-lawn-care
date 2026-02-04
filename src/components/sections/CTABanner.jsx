import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope } from 'react-icons/fa';
import Button from '../ui/Button';
import { useContent } from '../../context/ContentContext';

/**
 * Call-to-action banner with phone number and booking button.
 */
export default function CTABanner() {
  const { siteContent } = useContent();
  const { business } = siteContent;

  return (
    <section className="py-16 lg:py-20 bg-primary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Get Your Free Quote Today!
        </motion.h2>

        <motion.p
          className="text-green-100 text-lg mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          Contact us by phone, text, or email to discuss your lawn care needs. Free quotes, no obligation.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="bg-white/10 backdrop-blur-sm border-2 border-white rounded-lg px-6 py-3">
            <p className="text-white font-semibold text-lg flex items-center gap-2">
              <FaPhone className="w-4 h-4" />
              Call or Text for a Free Quote: {business.phone}
            </p>
          </div>
          <Link to="/contact">
            <Button variant="outline" size="lg" className="!border-white !text-white hover:!bg-white hover:!text-primary gap-2">
              <FaEnvelope className="w-4 h-4" />
              Email Us
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
