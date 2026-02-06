import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  GiGrassMushroom, GiOakLeaf, GiFlowerPot, GiMapleLeaf, GiPlantSeed, GiWaterDrop
} from 'react-icons/gi';
import { FaLeaf, FaHome, FaPhone, FaEnvelope, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useContent } from '../context/ContentContext';

const iconMap = {
  GiGrassMushroom, GiOakLeaf, GiFlowerPot, GiMapleLeaf, GiPlantSeed, GiWaterDrop,
  FaLeaf, FaHome
};

/**
 * Services page showing all 6 services in a responsive grid with animated cards,
 * plus contact info section at the bottom.
 */
export default function Services() {
  const { services, siteContent } = useContent();
  const { business } = siteContent;
  const location = useLocation();

  // Scroll to contact section when #inquiry hash is present
  useEffect(() => {
    if (location.hash === '#inquiry') {
      const element = document.getElementById('inquiry');
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  const scrollToContact = () => {
    const element = document.getElementById('inquiry');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
          <h1 className="text-4xl sm:text-5xl font-bold text-dark mb-4">Our Services</h1>
          <p className="text-light-text text-lg max-w-2xl mx-auto">
            Professional lawn care solutions tailored to your property. Choose the services
            that fit your needs, or let us build a custom plan.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon] || GiGrassMushroom;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-8 h-full flex flex-col">
                  <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mb-5">
                    <IconComponent className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-dark mb-2">{service.name}</h3>
                  <p className="text-light-text text-sm leading-relaxed flex-grow mb-6">
                    {service.description}
                  </p>
                  <Button
                    variant="primary"
                    className="w-full"
                    onClick={scrollToContact}
                  >
                    Get a Quote
                  </Button>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Contact Info Section */}
        <motion.section
          id="inquiry"
          className="mt-20 scroll-mt-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-primary rounded-2xl p-8 sm:p-12 lg:p-16">
            <div className="max-w-xl mx-auto">
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-dark mb-2">Get Your Free Quote Today!</h2>
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
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
