import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Button from '../ui/Button';

const RegisterSection = styled.section`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.primaryDark});
  color: white;
  position: relative;
  overflow: hidden;
  padding: 4rem 0;
  
  &::before {
    content: '';
    position: absolute;
    width: 400px;
    height: 400px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    top: -200px;
    left: -200px;
  }
  
  &::after {
    content: '';
    position: absolute;
    width: 300px;
    height: 300px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    bottom: -150px;
    right: -150px;
  }
`;

const RegisterContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
`;

const RegisterTitle = styled(motion.h2)`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 2.5rem;
  }
`;

const RegisterDescription = styled(motion.p)`
  font-size: 1.2rem;
  margin-bottom: 3rem;
  opacity: 0.9;
`;

const RegisterCTA = styled(Button)`
  display: inline-block;
  background-color: white;
  color: ${props => props.theme.colors.primary};
  padding: 1.2rem 3rem;
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: 600;
  transition: all 0.3s;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  }
`;

// New styled components for the form
const RegisterForm = styled(motion.form)`
  background: rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: 10px;
  backdrop-filter: blur(5px);
  margin-top: 2rem;
  text-align: left;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 1rem;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
  
  &:focus {
    outline: none;
    border-color: white;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 1rem;
  min-height: 100px;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
  
  &:focus {
    outline: none;
    border-color: white;
  }
`;

const SubmitButton = styled(Button)`
  width: 100%;
  margin-top: 1rem;
`;

const ThankYouMessage = styled(motion.div)`
  background: rgba(255, 255, 255, 0.2);
  padding: 2rem;
  border-radius: 10px;
  backdrop-filter: blur(5px);
  margin-top: 2rem;
  text-align: center;
`;

const ErrorMessage = styled.div`
  color: #ff6b6b;
  background: rgba(255, 0, 0, 0.1);
  padding: 0.75rem;
  border-radius: 5px;
  margin-bottom: 1rem;
  text-align: center;
`;

const Register = () => {
  // State for form visibility and data
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    teamName: '',
    experience: '',
    expectations: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Your Heroku API URL
  const API_URL = 'https://summeropenreg-esbcg8bgekgrabfu.canadacentral-01.azurewebsites.net/api/Registrations';;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleRegisterClick = (e) => {
    e.preventDefault();
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      console.log('Submitting form data:', formData);

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      console.log('Response status:', response.status);

      if (response.ok) {
        setSubmitSuccess(true);
        setShowForm(false);
      } else {
        let errorText = 'Failed to register. Please try again.';

        try {
          const errorData = await response.json();
          console.log('Error response:', errorData);

          if (response.status === 409) {
            errorText = 'This email is already registered.';
          } else if (errorData.message) {
            errorText = errorData.message;
          }
        } catch (jsonError) {
          console.error('Error parsing error response:', jsonError);
        }

        setErrorMessage(errorText);
      }
    } catch (error) {
      console.error('Network error:', error);
      setErrorMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <RegisterSection id="register">
      <div className="container">
        <RegisterContent>
          <RegisterTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Ready to Join the Challenge?
          </RegisterTitle>
          <RegisterDescription
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Registration is open to everyone. Secure your spot now and prepare for an exciting weekend of innovation and collaboration!
          </RegisterDescription>

          {!showForm && !submitSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <RegisterCTA
                onClick={handleRegisterClick}
                light
              >
                Register Now
              </RegisterCTA>
            </motion.div>
          )}

          {showForm && (
            <RegisterForm
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onSubmit={handleSubmit}
            >
              {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

              <FormGroup>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="teamName">Team Name (optional)</Label>
                <Input
                  type="text"
                  id="teamName"
                  name="teamName"
                  value={formData.teamName}
                  onChange={handleInputChange}
                  placeholder="If you have a team already, enter the name"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="experience">Your Experience (optional)</Label>
                <TextArea
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  placeholder="Tell us about your relevant experience"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="expectations">Your Expectations (optional)</Label>
                <TextArea
                  id="expectations"
                  name="expectations"
                  value={formData.expectations}
                  onChange={handleInputChange}
                  placeholder="What do you hope to gain from this challenge?"
                />
              </FormGroup>

              <SubmitButton type="submit" disabled={isSubmitting} light>
                {isSubmitting ? 'Submitting...' : 'Submit Registration'}
              </SubmitButton>
            </RegisterForm>
          )}

          {submitSuccess && (
            <ThankYouMessage
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3>Thank You for Registering!</h3>
              <p>Your registration has been received. We'll be in touch with more details soon.</p>
            </ThankYouMessage>
          )}
        </RegisterContent>
      </div>
    </RegisterSection>
  );
};

export default Register;