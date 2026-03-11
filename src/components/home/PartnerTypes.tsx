import React from 'react';
import { motion } from 'framer-motion';
import './PartnerTypes.css';
import relo1 from "@/assets/relo1.png";
import relo2 from "@/assets/relo2.png";


const partners = [
    {
        tag: 'Earn as a reloExpress delivery rider',
        title: 'Deliver packages and earn money',
        description:
            'Our growing network of businesses and individuals will send you plenty of delivery requests. When demand is high, you can earn even more.',
        cta: 'Register to deliver',
        image: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?auto=format&fit=crop&q=80&w=700',
        imageAlt: 'Delivery courier on motorcycle',
        imageLeft: true,
    },
    {
        tag: 'Become a reloExpress courier partner',
        title: 'Earn with every delivery',
        description:
            'You decide when and how often you deliver — weekdays, evenings, weekends, or just the occasional hour — it\'s up to you.',
        cta: 'Register as a courier',
        image: relo2,
        imageAlt: 'Courier delivering packages',
        imageLeft: false,
    },
    {
        tag: 'Increase earnings as a business',
        title: 'Increase your sales and reach new customers',
        description:
            'Millions of our users are ordering goods and packages from businesses and stores just like yours. Join and grow your reach.',
        cta: 'Register your business',
        image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=700',
        imageAlt: 'Business owner at counter',
        imageLeft: true,
    },
    {
        tag: 'Join reloExpress with your fleet',
        title: 'Grow your transport business',
        description:
            'As a fleet owner and reloExpress partner, you can manage your assets from one easy-to-use dashboard and grow your logistics business.',
        cta: 'Register your fleet',
        image: relo1,
        imageAlt: 'Fleet of delivery vehicles',
        imageLeft: false,
    },
];

const PartnerTypes: React.FC = () => {
    return (
        <section className="partner-earn">
            <div className="container">
                <div className="earn-header">
                    <h2>Earn money with reloExpress</h2>
                    <p>
                        Join thousands of partners across Nigeria that earn with reloExpress. For delivery riders,
                        couriers, businesses, and fleet owners looking for new ways to boost revenue.
                    </p>
                </div>

                <div className="zigzag-list">
                    {partners.map((partner, index) => (
                        <motion.div
                            key={index}
                            className={`zigzag-item ${partner.imageLeft ? 'image-left' : 'image-right'}`}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.05 }}
                        >
                            <div className="zigzag-image">
                                <img src={partner.image} alt={partner.imageAlt} loading="lazy" />
                            </div>
                            <div className="zigzag-text">
                                <span className="partner-tag">{partner.tag}</span>
                                <h3>{partner.title}</h3>
                                <p>{partner.description}</p>
                                <a href="#apply" className="zigzag-cta">{partner.cta}</a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PartnerTypes;
