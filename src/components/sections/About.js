// About.js
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import Button from '../ui/Button';
import "../../styles/GlobalStyles.css";

const AboutSection = styled.section`
  background-color: ${props => props.theme.colors.light};
  padding: 4rem 1rem;
`;

const AboutContainer = styled.div`
  max-width: 960px;
  margin: 0 auto;
  text-align: center;
`;

const AboutTitle = styled.h3`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.primary};
`;

const AboutDescription = styled.p`
  margin-bottom: 2rem;
  font-size: 1.1rem;
  color: ${props => props.theme.colors.gray};
`;

const AboutPoints = styled.div`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
`;

const AboutPoint = styled.div`
  display: flex;
  align-items: flex-start;
  font-size: 1rem;
  color: ${props => props.theme.colors.dark};
`;

const AboutPointIcon = styled.div`
  min-width: 24px;
  height: 24px;
  background-color: rgba(99, 102, 241, 0.1);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => props.theme.colors.primary};
  margin-right: 1rem;
  margin-top: 0.2rem;
`;

const About = () => {
  return (
    <AboutSection id="about">
      <AboutContainer>
        <SectionHeader
          title="About the Hackathon"
          subtitle="Discover what makes our Summer Open Hackathon a unique and exciting experience for all participants."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <AboutTitle>A Global Coding Adventure</AboutTitle>
          <AboutDescription>
            The Summer Open Hackathon is a virtual event bringing together coders, designers, and problem-solvers from around the world. For 36 hours, participants will collaborate to create innovative solutions to real-world challenges.
          </AboutDescription>

          <AboutPoints>
            <AboutPoint>
              <AboutPointIcon>✓</AboutPointIcon>
              <p>Collaborate with talented individuals across the globe</p>
            </AboutPoint>
            <AboutPoint>
              <AboutPointIcon>✓</AboutPointIcon>
              <p>Access to industry experts and mentors throughout the event</p>
            </AboutPoint>
            <AboutPoint>
              <AboutPointIcon>✓</AboutPointIcon>
              <p>Build solutions that address meaningful challenges</p>
            </AboutPoint>
            <AboutPoint>
              <AboutPointIcon>✓</AboutPointIcon>
              <p>Showcase your skills and win exciting prizes</p>
            </AboutPoint>
          </AboutPoints>

          {/* <Button href="/register" variant="primary" className="register-button">Join the Challenge</Button> */}
        </motion.div>
      </AboutContainer>
    </AboutSection>
  );
};

export default About;