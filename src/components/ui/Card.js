import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const CardWrapper = styled(motion.div)`
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.05);
  padding: ${props => props.padding || '2.5rem 2rem'};
  transition: transform 0.3s, box-shadow 0.3s;
  position: relative;
  z-index: 1;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: ${props => 
      props.accentColor ? 
      `linear-gradient(to right, ${props.accentColor}, ${props.accentColorDark || props.accentColor})` : 
      `linear-gradient(to right, ${props.theme.colors.primaryLight}, ${props.theme.colors.primary})`};
    z-index: 1;
  }
  
  &:hover {
    transform: ${props => (props.hoverEffect ? 'translateY(-10px)' : 'none')};
    box-shadow: ${props => (props.hoverEffect ? '0 15px 40px rgba(0, 0, 0, 0.1)' : '0 5px 30px rgba(0, 0, 0, 0.05)')};
  }
`;

const Card = ({ 
  children, 
  padding, 
  accentColor, 
  accentColorDark, 
  hoverEffect = true,
  ...props 
}) => {
  return (
    <CardWrapper 
      padding={padding} 
      accentColor={accentColor} 
      accentColorDark={accentColorDark}
      hoverEffect={hoverEffect}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      {children}
    </CardWrapper>
  );
};

export default Card;