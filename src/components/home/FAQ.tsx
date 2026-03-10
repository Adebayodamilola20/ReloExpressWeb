import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import './FAQ.css';

const faqs = [
    {
        question: 'Can I drive with reloExpress in my city?',
        answer: 'reloExpress is currently operating in major cities like Lagos, Abuja, and Port Harcourt. We are constantly expanding to new locations across Nigeria.'
    },
    {
        question: 'How do I register to drive with reloExpress?',
        answer: 'You can register online by filling out the application form on our website or through the partner app. We’ll guide you through the document submission and verification process.'
    },
    {
        question: 'Do I need a car to drive with reloExpress?',
        answer: 'No, we accept various vehicle types including motorcycles (bikes), cars, and delivery vans. If you don’t have a vehicle, we can connect you with fleet partners who offer rentals.'
    },
    {
        question: 'Do I need a smartphone to drive?',
        answer: 'Yes, you need a smartphone (Android or iOS) to run the reloExpress Partner app, accept delivery requests, and navigate to customers.'
    },
    {
        question: 'Is driving with reloExpress a good side hustle?',
        answer: 'Absolutely! Many of our partners use reloExpress as a flexible way to earn extra income alongside their main job or studies. You set your own hours.'
    },
    {
        question: 'How do I get paid for driving with reloExpress?',
        answer: 'Earnings are calculated automatically and paid out weekly directly to your registered bank account. You can track your daily and weekly earnings in the app.'
    }
];

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`faq-item ${isOpen ? 'open' : ''}`}>
            <button className="faq-question" onClick={() => setIsOpen(!isOpen)}>
                <span>{question}</span>
                <ChevronDown size={20} className="faq-chevron" />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="faq-answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="faq-answer-content">{answer}</div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FAQ: React.FC = () => {
    return (
        <section id="faq" className="faq">
            <div className="container">
                <div className="section-header">
                    <h2>Frequently asked <span>questions</span></h2>
                    <p>Everything you need to know about becoming a reloExpress partner.</p>
                </div>

                <div className="faq-list">
                    {faqs.map((faq, index) => (
                        <FAQItem key={index} question={faq.question} answer={faq.answer} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
