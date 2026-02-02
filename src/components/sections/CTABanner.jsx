import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPhone } from 'react-icons/fa';
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
          Ready for a Beautiful Lawn?
        </motion.h2>

        <motion.p
          className="text-green-100 text-lg mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          Get started today with a free estimate. We&apos;re just a phone call or click away.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <a href={`tel:${business.phone}`}>
            <Button variant="accent" size="lg" className="gap-2">
              <FaPhone className="w-4 h-4" />
              {business.phone}
            </Button>
          </a>
          <Link to="/booking">
            <Button variant="outline" size="lg" className="!border-white !text-white hover:!bg-white hover:!text-primary">
              Book Online
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
