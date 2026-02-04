import { Link } from 'react-router-dom';
import { GiGrass } from 'react-icons/gi';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import { useContent } from '../../context/ContentContext';

/**
 * Three-column footer with company info, quick links, and contact details.
 * Dark green background with light text.
 */
export default function Footer() {
  const { siteContent } = useContent();
  const { business } = siteContent;

  const quickLinks = [
    { to: '/', label: 'Home' },
    { to: '/services', label: 'Services' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
    { to: '/services#inquiry', label: 'Get a Quote' },
  ];

  return (
    <footer className="bg-primary-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Column 1: Company Info */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <GiGrass className="w-7 h-7 text-accent" />
              <span className="text-xl font-bold text-white">{business.name}</span>
            </Link>
            <p className="text-accent font-medium mb-3">{business.tagline}</p>
            <p className="text-green-200 text-sm leading-relaxed">
              Proudly serving Lawrence, Olathe, and Lenexa, KS with professional lawn care services since 2020.
              We treat every yard like our own.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-green-200 hover:text-accent transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <div className="space-y-3 text-sm text-green-200">
              <p>
                <span className="font-semibold text-white">Phone/Text:</span>{' '}
                {business.phone}
              </p>
              <p>
                <span className="font-semibold text-white">Email:</span>{' '}
                {business.email}
              </p>
              <p>
                <span className="font-semibold text-white">Service Areas:</span>{' '}
                {business.serviceAreas}
              </p>
              <p>
                <span className="font-semibold text-white">Hours:</span>{' '}
                {business.hours}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-green-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-green-300">
            &copy; 2026 {business.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-green-300 hover:text-accent transition-colors" aria-label="Facebook">
              <FaFacebookF className="w-5 h-5" />
            </a>
            <a href="#" className="text-green-300 hover:text-accent transition-colors" aria-label="Instagram">
              <FaInstagram className="w-5 h-5" />
            </a>
            <a href="#" className="text-green-300 hover:text-accent transition-colors" aria-label="Twitter">
              <FaTwitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
