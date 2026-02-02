import { useState } from 'react';
import { motion } from 'framer-motion';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import LoadingSpinner from '../components/ui/LoadingSpinner';

/* Initialize Stripe with placeholder test key */
const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_test_TYooMQauvdEDq54NiTphI7jx'
);

/** CardElement custom styling */
const cardStyle = {
  style: {
    base: {
      fontSize: '16px',
      fontFamily: 'Inter, sans-serif',
      color: '#1F2937',
      '::placeholder': { color: '#6B7280' },
    },
    invalid: { color: '#EF4444' },
  },
};

/**
 * Payment form using Stripe CardElement.
 * Handles amount input, card entry, loading states, and success/error messages.
 */
function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const numAmount = parseFloat(amount);
    if (!numAmount || numAmount <= 0) {
      setErrorMsg('Please enter a valid amount');
      setStatus('error');
      return;
    }

    setLoading(true);
    setStatus(null);
    setErrorMsg('');

    try {
      // In production, you would create a PaymentIntent on your server.
      // This simulates the client-side flow for demonstration purposes.
      const { error } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      });

      if (error) {
        setErrorMsg(error.message);
        setStatus('error');
      } else {
        setStatus('success');
        setAmount('');
        elements.getElement(CardElement).clear();
      }
    } catch {
      setErrorMsg('An unexpected error occurred. Please try again.');
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Payment Amount"
        name="amount"
        type="number"
        value={amount}
        onChange={(e) => { setAmount(e.target.value); setStatus(null); }}
        placeholder="0.00"
        required
      />

      <div>
        <label className="block text-sm font-semibold text-dark mb-1">
          Card Details <span className="text-red-500">*</span>
        </label>
        <div className="border border-gray-300 rounded-lg p-4 focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent transition-all">
          <CardElement options={cardStyle} />
        </div>
      </div>

      {status === 'success' && (
        <motion.div
          className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Payment method created successfully! In production, this would complete the charge.
        </motion.div>
      )}

      {status === 'error' && (
        <motion.div
          className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {errorMsg}
        </motion.div>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={!stripe || loading}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <LoadingSpinner size="sm" /> Processing...
          </span>
        ) : (
          `Pay ${amount ? `$${parseFloat(amount).toFixed(2)}` : 'Now'}`
        )}
      </Button>
    </form>
  );
}

/**
 * Invoice lookup section with mock invoice data.
 */
function InvoiceLookup() {
  const [invoiceId, setInvoiceId] = useState('');
  const [invoice, setInvoice] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const mockInvoices = {
    'INV-001': { id: 'INV-001', customer: 'Sarah Mitchell', amount: 75, service: 'Lawn Mowing', date: '2026-01-15', status: 'Paid' },
    'INV-002': { id: 'INV-002', customer: 'James Thompson', amount: 150, service: 'Fall Cleanup', date: '2026-01-20', status: 'Pending' },
    'INV-003': { id: 'INV-003', customer: 'Maria Garcia', amount: 45, service: 'Edging & Trimming', date: '2026-01-25', status: 'Pending' },
  };

  const handleLookup = (e) => {
    e.preventDefault();
    const found = mockInvoices[invoiceId.toUpperCase()];
    if (found) {
      setInvoice(found);
      setNotFound(false);
    } else {
      setInvoice(null);
      setNotFound(true);
    }
  };

  return (
    <div>
      <form onSubmit={handleLookup} className="flex gap-3">
        <Input
          name="invoiceId"
          value={invoiceId}
          onChange={(e) => { setInvoiceId(e.target.value); setNotFound(false); }}
          placeholder="e.g. INV-001"
          className="flex-grow !mb-0"
        />
        <Button type="submit" variant="primary" className="flex-shrink-0">
          Look Up
        </Button>
      </form>

      {notFound && (
        <p className="mt-4 text-red-500 text-sm">No invoice found with that ID. Try INV-001, INV-002, or INV-003.</p>
      )}

      {invoice && (
        <motion.div
          className="mt-6 bg-cream rounded-lg p-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-dark text-lg">{invoice.id}</h4>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              invoice.status === 'Paid'
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {invoice.status}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-light-text">Customer</p>
              <p className="font-medium text-dark">{invoice.customer}</p>
            </div>
            <div>
              <p className="text-light-text">Service</p>
              <p className="font-medium text-dark">{invoice.service}</p>
            </div>
            <div>
              <p className="text-light-text">Amount</p>
              <p className="font-medium text-dark">${invoice.amount.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-light-text">Date</p>
              <p className="font-medium text-dark">{invoice.date}</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

/**
 * Payments page with Stripe payment form and invoice lookup section.
 */
export default function Payments() {
  return (
    <div className="py-16 lg:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-dark mb-4">Payments</h1>
          <p className="text-light-text text-lg max-w-2xl mx-auto">
            Securely pay for your lawn care services online or look up an existing invoice.
          </p>
        </motion.div>

        <div className="space-y-12">
          {/* Payment Form */}
          <motion.div
            className="bg-white rounded-xl shadow-md p-6 sm:p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-2xl font-bold text-dark mb-6">Make a Payment</h2>
            <Elements stripe={stripePromise}>
              <PaymentForm />
            </Elements>
          </motion.div>

          {/* Invoice Lookup */}
          <motion.div
            className="bg-white rounded-xl shadow-md p-6 sm:p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-dark mb-6">Invoice Lookup</h2>
            <p className="text-light-text mb-4">Enter your invoice ID to view details and payment status.</p>
            <InvoiceLookup />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
