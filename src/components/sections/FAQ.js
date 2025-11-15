import React, { useState } from 'react';
import '../../styles/sections/FAQ.css';
import SectionHeader from '../ui/SectionHeader';
import { faqsData } from '../../data/faqs';
import { FaPlus, FaMinus } from 'react-icons/fa';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  
  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  
  return (
    <section id="faq" className="faq-section">
      <div className="container">
        <SectionHeader 
          title="Frequently Asked Questions" 
          subtitle="Find answers to common questions about our hackathon."
        />
        
        <div className="faqs-container">
          {faqsData.map((faq, index) => (
            <div className="faq-item" key={index}>
              <div className="faq-question" onClick={() => toggleFAQ(index)}>
                <span>{faq.question}</span>
                <span>
                  {activeIndex === index ? <FaMinus /> : <FaPlus />}
                </span>
              </div>
              <div className={`faq-answer ${activeIndex === index ? 'active' : ''}`}>
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;