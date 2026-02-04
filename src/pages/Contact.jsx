import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useContent } from '../context/ContentContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { validateEmail, validatePhone } from '../utils/helpers';

/**
 * Contact page with two-column layout: form on left, business info on right.
 * Form validates and saves submissions to localStorage, shows success toast.
 */
export default function Contact() {
  const { services, siteContent } = useContent();
  const { business } = siteContent;
  const [submissions, setSubmissions] = useLocalStorage('bost_contact_submissions', []);
  const [showToast, setShowToast] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    serviceInterest: '',
    message: '',
  });
  const [errors, setErrors] = useState({});

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
    if (!form.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const submission = { ...form, timestamp: new Date().toISOString() };
    setSubmissions([...submissions, submission]);
    setForm({ name: '', email: '', phone: '', serviceInterest: '', message: '' });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
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
          <h1 className="text-4xl sm:text-5xl font-bold text-dark mb-4">Contact Us</h1>
          <p className="text-light-text text-lg max-w-2xl mx-auto">
            Have a question or ready to get started? Reach out and we&apos;ll get back to you promptly.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-dark mb-6">Request a Free Quote</h2>
            <form onSubmit={handleSubmit} noValidate>
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
                label="Message"
                name="message"
                type="textarea"
                value={form.message}
                onChange={handleChange}
                error={errors.message}
                placeholder="Tell us about your lawn care needs..."
                required
              />
              <Button type="submit" variant="primary" size="lg" className="w-full mt-2">
                Send Message
              </Button>
            </form>
          </motion.div>

          {/* Right: Business Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
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
                    <a href={`tel:${business.phone}`} className="text-light-text hover:text-primary transition-colors text-lg">
                      {business.phone}
                    </a>
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
                    <p className="text-light-text">Monday - Saturday: 7am - 7pm</p>
                    <p className="text-light-text">Sunday: Closed</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <FaMapMarkerAlt className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-dark">Service Areas</p>
                    <p className="text-light-text">Lawrence, KS</p>
                    <p className="text-light-text">Olathe, KS</p>
                    <p className="text-light-text">Lenexa, KS</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
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
            <p className="font-semibold">Message Sent!</p>
            <p className="text-sm text-green-100">We&apos;ll get back to you soon.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
