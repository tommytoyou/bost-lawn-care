import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheck, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useContent } from '../context/ContentContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { generateReferenceNumber, validateEmail, validatePhone, formatDate } from '../utils/helpers';

/**
 * Compute initial selected services from URL search params.
 */
function getInitialServices(searchParams, services) {
  const serviceId = searchParams.get('service');
  if (serviceId) {
    const id = parseInt(serviceId, 10);
    if (services.find((s) => s.id === id)) return [id];
  }
  return [];
}

/**
 * Multi-step booking form wizard.
 * Step 1: Select services
 * Step 2: Property details (address, lawn size)
 * Step 3: Contact info (name, email, phone, date, notes)
 * Step 4: Review and submit
 */
export default function Booking() {
  const { services } = useContent();
  const [searchParams] = useSearchParams();
  const [bookings, setBookings] = useLocalStorage('bost_bookings', []);

  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState('');
  const [errors, setErrors] = useState({});

  // Form state — pre-select service from URL param
  const [selectedServices, setSelectedServices] = useState(
    () => getInitialServices(searchParams, services)
  );
  const [property, setProperty] = useState({ address: '', lawnSize: '' });
  const [contact, setContact] = useState({
    name: '', email: '', phone: '', preferredDate: '', notes: ''
  });

  const toggleService = (id) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const validateStep = () => {
    const newErrors = {};
    if (step === 1 && selectedServices.length === 0) {
      newErrors.services = 'Please select at least one service';
    }
    if (step === 2) {
      if (!property.address.trim()) newErrors.address = 'Address is required';
      if (!property.lawnSize) newErrors.lawnSize = 'Please select lawn size';
    }
    if (step === 3) {
      if (!contact.name.trim()) newErrors.name = 'Name is required';
      if (!contact.email.trim()) newErrors.email = 'Email is required';
      else if (!validateEmail(contact.email)) newErrors.email = 'Invalid email address';
      if (!contact.phone.trim()) newErrors.phone = 'Phone number is required';
      else if (!validatePhone(contact.phone)) newErrors.phone = 'Invalid phone number';
      if (!contact.preferredDate) newErrors.preferredDate = 'Please select a preferred date';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) setStep((s) => Math.min(s + 1, 4));
  };
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = () => {
    const ref = generateReferenceNumber();
    const booking = {
      referenceNumber: ref,
      services: selectedServices.map((id) => services.find((s) => s.id === id)?.name),
      property,
      contact,
      timestamp: new Date().toISOString(),
    };
    setBookings([...bookings, booking]);
    setReferenceNumber(ref);
    setSubmitted(true);
  };

  const lawnSizes = ['Small (under 2,000 sq ft)', 'Medium (2,000 - 5,000 sq ft)', 'Large (5,000 - 10,000 sq ft)', 'Extra Large (over 10,000 sq ft)'];

  const stepLabels = ['Services', 'Property', 'Contact', 'Review'];

  if (submitted) {
    return (
      <div className="py-16 lg:py-24">
        <motion.div
          className="max-w-lg mx-auto px-4 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
            <FaCheck className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-dark mb-4">Booking Confirmed!</h1>
          <p className="text-light-text mb-6">
            Thank you for choosing Bost Lawn Care. We&apos;ll be in touch shortly to confirm your appointment.
          </p>
          <div className="bg-cream rounded-xl p-6 mb-8">
            <p className="text-sm text-light-text mb-1">Reference Number</p>
            <p className="text-2xl font-bold text-primary">{referenceNumber}</p>
          </div>
          <Button variant="primary" onClick={() => { setSubmitted(false); setStep(1); setSelectedServices([]); setProperty({ address: '', lawnSize: '' }); setContact({ name: '', email: '', phone: '', preferredDate: '', notes: '' }); }}>
            Book Another Service
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="py-16 lg:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-dark mb-4">Book a Service</h1>
          <p className="text-light-text text-lg">Complete the steps below to schedule your service.</p>
        </motion.div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-12">
          {stepLabels.map((label, i) => (
            <div key={label} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold transition-colors ${
                i + 1 <= step ? 'bg-primary text-white' : 'bg-gray-200 text-light-text'
              }`}>
                {i + 1 < step ? <FaCheck className="w-4 h-4" /> : i + 1}
              </div>
              <span className={`hidden sm:block ml-2 text-sm font-medium ${
                i + 1 <= step ? 'text-primary' : 'text-light-text'
              }`}>
                {label}
              </span>
              {i < stepLabels.length - 1 && (
                <div className={`w-8 sm:w-16 h-0.5 mx-2 ${
                  i + 1 < step ? 'bg-primary' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-md p-6 sm:p-8"
          >
            {/* Step 1: Service Selection */}
            {step === 1 && (
              <div>
                <h2 className="text-2xl font-bold text-dark mb-6">Select Services</h2>
                {errors.services && (
                  <p className="text-red-500 text-sm mb-4">{errors.services}</p>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {services.map((service) => (
                    <label
                      key={service.id}
                      className={`flex items-start gap-4 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                        selectedServices.includes(service.id)
                          ? 'border-primary bg-green-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedServices.includes(service.id)}
                        onChange={() => toggleService(service.id)}
                        className="mt-1 w-5 h-5 accent-primary cursor-pointer"
                      />
                      <div>
                        <p className="font-semibold text-dark">{service.name}</p>
                        <p className="text-sm text-accent font-medium">{service.priceRange}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Property Details */}
            {step === 2 && (
              <div>
                <h2 className="text-2xl font-bold text-dark mb-6">Property Details</h2>
                <Input
                  label="Property Address"
                  name="address"
                  value={property.address}
                  onChange={(e) => setProperty((p) => ({ ...p, address: e.target.value }))}
                  error={errors.address}
                  placeholder="123 Main Street, Lawrence, KS"
                  required
                />
                <Input
                  label="Lawn Size"
                  name="lawnSize"
                  type="select"
                  value={property.lawnSize}
                  onChange={(e) => setProperty((p) => ({ ...p, lawnSize: e.target.value }))}
                  error={errors.lawnSize}
                  required
                >
                  <option value="">Select lawn size</option>
                  {lawnSizes.map((size) => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </Input>
              </div>
            )}

            {/* Step 3: Contact Information */}
            {step === 3 && (
              <div>
                <h2 className="text-2xl font-bold text-dark mb-6">Contact Information</h2>
                <Input
                  label="Full Name"
                  name="name"
                  value={contact.name}
                  onChange={(e) => setContact((c) => ({ ...c, name: e.target.value }))}
                  error={errors.name}
                  placeholder="John Doe"
                  required
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={contact.email}
                    onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))}
                    error={errors.email}
                    placeholder="john@example.com"
                    required
                  />
                  <Input
                    label="Phone"
                    name="phone"
                    type="tel"
                    value={contact.phone}
                    onChange={(e) => setContact((c) => ({ ...c, phone: e.target.value }))}
                    error={errors.phone}
                    placeholder="(785) 555-0123"
                    required
                  />
                </div>
                <Input
                  label="Preferred Date"
                  name="preferredDate"
                  type="date"
                  value={contact.preferredDate}
                  onChange={(e) => setContact((c) => ({ ...c, preferredDate: e.target.value }))}
                  error={errors.preferredDate}
                  required
                />
                <Input
                  label="Additional Notes"
                  name="notes"
                  type="textarea"
                  value={contact.notes}
                  onChange={(e) => setContact((c) => ({ ...c, notes: e.target.value }))}
                  placeholder="Any special instructions or details about your property..."
                />
              </div>
            )}

            {/* Step 4: Review */}
            {step === 4 && (
              <div>
                <h2 className="text-2xl font-bold text-dark mb-6">Review Your Booking</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-dark mb-2">Selected Services</h3>
                    <ul className="list-disc list-inside text-light-text space-y-1">
                      {selectedServices.map((id) => {
                        const s = services.find((srv) => srv.id === id);
                        return s ? <li key={id}>{s.name} ({s.priceRange})</li> : null;
                      })}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark mb-2">Property</h3>
                    <p className="text-light-text">{property.address}</p>
                    <p className="text-light-text">{property.lawnSize}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark mb-2">Contact</h3>
                    <p className="text-light-text">{contact.name}</p>
                    <p className="text-light-text">{contact.email} &middot; {contact.phone}</p>
                    <p className="text-light-text">Preferred Date: {formatDate(contact.preferredDate)}</p>
                    {contact.notes && (
                      <p className="text-light-text mt-1">Notes: {contact.notes}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          {step > 1 ? (
            <Button variant="ghost" onClick={prevStep} className="gap-2">
              <FaArrowLeft className="w-4 h-4" /> Back
            </Button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <Button variant="primary" onClick={nextStep} className="gap-2">
              Next <FaArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button variant="accent" size="lg" onClick={handleSubmit}>
              Confirm Booking
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
