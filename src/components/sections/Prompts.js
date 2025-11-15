// Prompts.js
import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import Button from '../ui/Button';
import { promptsData } from '../../data/prompts';
import "../../styles/sections/Prompts.css";

const Prompts = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    return (
        <section className="prompts-section" id="prompts">
            <div className="prompts-container">
                <SectionHeader
                    title="Challenge Prompts"
                    subtitle="Choose from four realistic challenges designed to test your skills and creativity. Released at 6:00 AM CST on June 28th, 2025!"
                />

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <div className="prompts-grid">
                        {promptsData.map((prompt, index) => (
                            <motion.div
                                key={prompt.id}
                                className="prompt-card"
                                variants={cardVariants}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="prompt-header">
                                    <div className="prompt-title-container">
                                        <h3 className="prompt-title">{prompt.title}</h3>
                                    </div>
                                    <span className="difficulty-badge">
                                        {prompt.difficulty}
                                    </span>
                                </div>

                                <p className="prompt-description">
                                    {prompt.description}
                                </p>

                                <div className="prompt-actions">
                                    <a
                                        href={prompt.driveLink}
                                        className="view-button"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ pointerEvents: prompt.driveLink.includes('PLACEHOLDER') ? 'none' : 'auto' }}
                                    >
                                        Drive Link
                                    </a>
                                </div>

                                {/* Coming Soon Overlay for placeholder links */}
                                {prompt.driveLink.includes('PLACEHOLDER') && (
                                    <div className="coming-soon-overlay">
                                        <div className="coming-soon-text">
                                            Coming Soon!<br />
                                            <span className="coming-soon-subtext">
                                                
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Prompts;