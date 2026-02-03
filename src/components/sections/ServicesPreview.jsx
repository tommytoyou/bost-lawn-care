import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  GiGrassMushroom, GiGardeningShears, GiOakLeaf,
  GiFlowerPot, GiMapleLeaf, GiPlantSeed
} from 'react-icons/gi';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { useContent } from '../../context/ContentContext';

/* Map icon name strings from JSON to actual components */
const iconMap = {
  GiGrassMushroom: GiGrassMushroom,
  GiGardeningShears: GiGardeningShears,
  GiOakLeaf: GiOakLeaf,
  GiFlowerPot: GiFlowerPot,
  GiMapleLeaf: GiMapleLeaf,
  GiPlantSeed: GiPlantSeed,
};

/**
 * Shows 3 featured service cards on the home page with a link to full services.
 */
export default function ServicesPreview() {
  const { services } = useContent();
  const featured = services.slice(0, 3);

  return (
    <section className="py-16 lg:py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-dark mb-4">Our Services</h2>
          <p className="text-light-text max-w-2xl mx-auto">
            From weekly mowing to seasonal cleanups, we have everything your lawn needs to thrive.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((service, index) => {
            const IconComponent = iconMap[service.icon] || GiGrassMushroom;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <Card className="p-8 text-center h-full flex flex-col">
                  <div className="w-16 h-16 mx-auto mb-4 bg-green-50 rounded-full flex items-center justify-center">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-dark mb-2">{service.name}</h3>
                  <p className="text-accent font-semibold mb-3">{service.priceRange}</p>
                  <p className="text-light-text text-sm flex-grow">{service.description}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="text-center mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Link to="/services">
            <Button variant="primary" size="lg">View All Services</Button>
          </Link>
          <Link to="/services#inquiry">
            <Button variant="accent" size="lg">Get a Free Quote</Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
