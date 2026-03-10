import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './CityTools.css';

const toolTabs = [
    {
        id: 'e-scooters',
        label: 'E-scooters',
        title: 'E-scooters',
        description: 'E-scooter use is transforming urban environments by reducing CO2 emissions, congestion, and pollution.\n\nAs the largest European scooter operator, we’re focused on delivering safe and sustainable micromobility operations.\n\nScooters complement public transport and help riders go about their daily tasks in a more sustainable way.\n\nIn many major European cities more than 30% of Bolt scooter trips begin and end within 100 metres of a public transport stop.',
        image: 'https://images.unsplash.com/photo-1611242320536-f12d3541249b?auto=format&fit=crop&q=80&w=700'
    },
    {
        id: 'e-bikes',
        label: 'E-bikes',
        title: 'E-bikes',
        description: 'Our e-bikes are designed to be a safe and sustainable alternative to private cars for short-to-medium distance trips.\n\nWith integrated GPS and smart features, they provide a reliable way to navigate the city while staying active.',
        image: 'https://images.unsplash.com/photo-1593138461425-31c7edc149de?auto=format&fit=crop&q=80&w=700'
    },
    {
        id: 'car-sharing',
        label: 'Car sharing',
        title: 'Car sharing',
        description: 'Bolt Drive offers high-quality car rental without the hassle of ownership. Rent a car for minutes, hours, or days directly from the app.',
        image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=700'
    },
    {
        id: 'multimodal',
        label: 'Multimodal travel',
        title: 'Multimodal travel',
        description: 'Seamlessly switch between different modes of transport in a single app. Plan your journey and find the best way to get around.',
        image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=700'
    },
    {
        id: 'walking',
        label: 'Walking',
        title: 'Walking',
        description: 'We encourage walking for the shortest trips. Our app provides safe walking routes and integrates with public transport for longer journeys.',
        image: 'https://images.unsplash.com/photo-1551855018-cd5d9ad8c01a?auto=format&fit=crop&q=80&w=700'
    },
    {
        id: 'charging',
        label: 'Charging docks',
        title: 'Charging docks',
        description: 'Our extensive network of charging docks ensures that our electric fleet is always ready when you need it.',
        image: 'https://images.unsplash.com/photo-1563911892437-1feda0179e1b?auto=format&fit=crop&q=80&w=700'
    }
];

const CityTools: React.FC = () => {
    const [activeTab, setActiveTab] = useState(toolTabs[0]);

    return (
        <section className="city-tools">
            <div className="container">
                <div className="tools-header">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Tools to reshape city transport
                    </motion.h2>

                    <div className="tab-list">
                        {toolTabs.map((tab) => (
                            <button
                                key={tab.id}
                                className={`tab-btn ${activeTab.id === tab.id ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="tools-content-wrap">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab.id}
                            className="tool-display"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.4 }}
                        >
                            <div className="tool-image">
                                <img src={activeTab.image} alt={activeTab.title} />
                            </div>
                            <div className="tool-info">
                                <h3>{activeTab.title}</h3>
                                {activeTab.description.split('\n\n').map((para, i) => (
                                    <p key={i}>{para}</p>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default CityTools;
