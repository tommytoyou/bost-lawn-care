import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  GiGrassMushroom, GiGardeningShears, GiOakLeaf,
  GiFlowerPot, GiMapleLeaf, GiPlantSeed
} from 'react-icons/gi';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useContent } from '../context/ContentContext';

const iconMap = {
  GiGrassMushroom, GiGardeningShears, GiOakLeaf,
  GiFlowerPot, GiMapleLeaf, GiPlantSeed,
};

/**
 * Services page showing all 6 services in a responsive grid with animated cards.
 */
export default function Services() {
  const { services } = useContent();

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
                  <p className="text-accent font-semibold text-lg mb-3">{service.priceRange}</p>
                  <p className="text-light-text text-sm leading-relaxed flex-grow mb-6">
                    {service.description}
                  </p>
                  <Link to={`/booking?service=${service.id}`}>
                    <Button variant="primary" className="w-full">Book This Service</Button>
                  </Link>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
