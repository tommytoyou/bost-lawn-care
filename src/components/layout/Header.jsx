import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { GiGrass } from 'react-icons/gi';
import { HiMenu, HiX } from 'react-icons/hi';
import Button from '../ui/Button';

/**
 * Sticky header with logo, desktop nav links, mobile hamburger drawer, and Book Now CTA.
 */
export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);

  // Add shadow on scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  if (prevPathRef.current !== location.pathname) {
    prevPathRef.current = location.pathname;
    if (isMobileOpen) setIsMobileOpen(false);
  }

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/services', label: 'Services' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  const linkClasses = ({ isActive }) =>
    `text-base font-medium transition-colors duration-200 ${
      isActive ? 'text-primary' : 'text-dark hover:text-primary'
    }`;

  return (
    <header
      className={`sticky top-0 z-40 bg-white transition-shadow duration-300 ${
        isScrolled ? 'shadow-md' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <GiGrass className="w-8 h-8 text-primary" />
            <span className="text-xl sm:text-2xl font-bold text-primary">
              Bost Lawn Care
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} className={linkClasses} end={link.to === '/'}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Link to="/booking">
              <Button variant="accent" size="sm">Book Now</Button>
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden p-2 text-dark hover:text-primary transition-colors cursor-pointer"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <HiX className="w-7 h-7" /> : <HiMenu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-out Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/30 z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.nav
              className="fixed top-0 right-0 h-full w-72 bg-white shadow-xl z-50 lg:hidden flex flex-col"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              <div className="flex items-center justify-between p-4 border-b">
                <span className="text-lg font-bold text-primary">Menu</span>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="p-2 hover:text-primary transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <HiX className="w-6 h-6" />
                </button>
              </div>

              <div className="flex flex-col p-4 gap-2">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                        isActive ? 'bg-green-50 text-primary' : 'text-dark hover:bg-gray-50'
                      }`
                    }
                    end={link.to === '/'}
                  >
                    {link.label}
                  </NavLink>
                ))}

                <div className="mt-4 pt-4 border-t">
                  <Link to="/booking" className="block">
                    <Button variant="accent" className="w-full">Book Now</Button>
                  </Link>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
