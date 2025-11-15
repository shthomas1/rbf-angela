import React from 'react';
import '../../styles/ui/Button.css';

const Button = ({ children, variant = 'primary', size = 'medium', href, light, ...props }) => {
  const className = `btn btn-${variant} ${size === 'large' ? 'btn-large' : ''} ${light ? 'light' : ''}`;
  
  if (href) {
    return (
      <a href={href} className={className} {...props}>
        {children}
      </a>
    );
  }
  
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
};

export default Button;