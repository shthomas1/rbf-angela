import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Item = styled(motion.div)`
  position: relative;
  margin-bottom: 4rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const Content = styled.div`
  position: relative;
  width: calc(50% - 50px);
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  transition: transform 0.3s, box-shadow 0.3s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  }
  
  ${props => props.isOdd ? `
    margin-left: auto;
  ` : ''}
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: calc(100% - 60px);
    margin-left: 60px !important;
  }
`;

const Dot = styled.div`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 30px;
  background: linear-gradient(135deg, ${props => props.theme.colors.primaryLight}, ${props => props.theme.colors.primary});
  border-radius: 50%;
  z-index: 2;
  box-shadow: 0 0 0 5px rgba(99, 102, 241, 0.2);
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    left: 30px;
  }
`;

const Arrow = styled.div`
  &::before {
    content: '';
    position: absolute;
    top: 20px;
    ${props => props.isOdd ? `
      left: -15px;
      border-right: 15px solid white;
      border-top: 15px solid transparent;
      border-bottom: 15px solid transparent;
    ` : `
      right: -15px;
      border-left: 15px solid white;
      border-top: 15px solid transparent;
      border-bottom: 15px solid transparent;
    `}
    
    @media (max-width: ${props => props.theme.breakpoints.md}) {
      left: -15px;
      right: auto;
      border-right: 15px solid white;
      border-left: 0;
      border-top: 15px solid transparent;
      border-bottom: 15px solid transparent;
    }
  }
`;

const Time = styled.div`
  display: inline-block;
  background: linear-gradient(135deg, ${props => props.theme.colors.primaryLight}, ${props => props.theme.colors.primary});
  color: white;
  padding: 0.3rem 1rem;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const Title = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 0.8rem;
  color: ${props => props.theme.colors.dark};
`;

const Description = styled.p`
  color: ${props => props.theme.colors.gray};
  font-size: 1rem;
`;

const TimelineItem = ({ time, title, description, index }) => {
  const isOdd = index % 2 !== 0;
  
  return (
    <Item
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Content isOdd={isOdd}>
        <Arrow isOdd={isOdd} />
        <Time>{time}</Time>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Content>
      <Dot />
    </Item>
  );
};

export default TimelineItem;