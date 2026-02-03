import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GiGrassMushroom, GiGardeningShears, GiOakLeaf,
  GiFlowerPot, GiMapleLeaf, GiPlantSeed
} from 'react-icons/gi';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useContent } from '../context/ContentContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { validateEmail, validatePhone } from '../utils/helpers';

const iconMap = {
  GiGrassMushroom, GiGardeningShears, GiOakLeaf,
  GiFlowerPot, GiMapleLeaf, GiPlantSeed,
};

/**
 * Services page showing all 6 services in a responsive grid with animated cards,
 * plus an inquiry form at the bottom.
 */
export default function Services() {
  const { services } = useContent();
  const location = useLocation();
  const [inquiries, setInquiries] = useLocalStorage('bost_inquiries', []);
  const [showToast, setShowToast] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    serviceInterest: '',
    message: '',
  });
  const [errors, setErrors] = useState({});

  // Scroll to inquiry form when #inquiry hash is present
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!validateEmail(form.email)) newErrors.email = 'Please enter a valid email';
    if (!form.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!validatePhone(form.phone)) newErrors.phone = 'Please enter a valid phone number';
    if (!form.message.trim()) newErrors.message = 'Please tell us about your lawn care needs';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const inquiry = { ...form, timestamp: new Date().toISOString() };
    setInquiries([...inquiries, inquiry]);
    setForm({ name: '', email: '', phone: '', serviceInterest: '', message: '' });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  const scrollToInquiry = (serviceName) => {
    setForm((prev) => ({ ...prev, serviceInterest: serviceName }));
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
                    onClick={() => scrollToInquiry(service.name)}
                  >
                    Get a Quote
                  </Button>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Inquiry Form Section */}
        <motion.section
          id="inquiry"
          className="mt-20 scroll-mt-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-primary rounded-2xl p-8 sm:p-12 lg:p-16">
            <div className="max-w-2xl mx-auto text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Get Your Free Quote Today
              </h2>
              <p className="text-green-100 text-lg">
                Ready to transform your lawn? Fill out the form below and we&apos;ll get back to you
                within 24 hours with a personalized quote.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="max-w-xl mx-auto">
              <div className="bg-white rounded-xl p-6 sm:p-8 shadow-lg">
                <Input
                  label="Full Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  error={errors.name}
                  placeholder="John Doe"
                  required
                />
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  error={errors.email}
                  placeholder="john@example.com"
                  required
                />
                <Input
                  label="Phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  error={errors.phone}
                  placeholder="(785) 555-0123"
                  required
                />
                <Input
                  label="Service Interest"
                  name="serviceInterest"
                  type="select"
                  value={form.serviceInterest}
                  onChange={handleChange}
                >
                  <option value="">Select a service (optional)</option>
                  {services.map((s) => (
                    <option key={s.id} value={s.name}>{s.name}</option>
                  ))}
                </Input>
                <Input
                  label="Tell Us About Your Lawn"
                  name="message"
                  type="textarea"
                  value={form.message}
                  onChange={handleChange}
                  error={errors.message}
                  placeholder="Describe your property, current lawn condition, and what you're looking for..."
                  required
                />
                <Button type="submit" variant="accent" size="lg" className="w-full mt-2">
                  Request My Free Quote
                </Button>
              </div>
            </form>
          </div>
        </motion.section>
      </div>

      {/* Success Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            className="fixed bottom-6 right-6 bg-primary text-white px-6 py-4 rounded-lg shadow-xl z-50"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <p className="font-semibold">Inquiry Submitted!</p>
            <p className="text-sm text-green-100">We&apos;ll be in touch within 24 hours.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
