import React from 'react';
import { motion } from 'framer-motion';
import './PhotoCollage.css';

const photos = [
    {
        url: 'https://images.unsplash.com/photo-1582401817609-5a0e2a2b2d61?auto=format&fit=crop&q=80&w=600',
        alt: 'Delivery van on city street',
        size: 'wide',
    },
    {
        url: 'https://images.unsplash.com/photo-1609429019995-8c40f49535a5?auto=format&fit=crop&q=80&w=600',
        alt: 'Courier on smartphone checking order',
        size: 'normal',
    },
    {
        url: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=600',
        alt: 'Package delivery',
        size: 'normal',
    },
    {
        url: 'https://images.unsplash.com/photo-1617369120004-4848a0fb5a68?auto=format&fit=crop&q=80&w=600',
        alt: 'Motorcycle courier in city',
        size: 'normal',
    },
    {
        url: 'https://images.unsplash.com/photo-1638386648671-2e4e94bfc5e7?auto=format&fit=crop&q=80&w=600',
        alt: 'Logistics partner with packages',
        size: 'normal',
    },
    {
        url: 'https://images.unsplash.com/photo-1619545093044-adede6d8c70e?auto=format&fit=crop&q=80&w=600',
        alt: 'Food delivery courier',
        size: 'normal',
    },
    {
        url: 'https://images.unsplash.com/photo-1596778402054-5f4bfcea45b3?auto=format&fit=crop&q=80&w=800',
        alt: 'Delivery driver smiling',
        size: 'wide',
    },
];

const PhotoCollage: React.FC = () => {
    return (
        <section className="photo-collage">
            <div className="collage-grid">
                {photos.map((photo, index) => (
                    <motion.div
                        key={index}
                        className={`collage-item ${photo.size}`}
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.06 }}
                    >
                        <img src={photo.url} alt={photo.alt} loading="lazy" />
                        <div className="collage-overlay" />
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default PhotoCollage;
