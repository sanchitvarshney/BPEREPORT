import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.heading}>404</h1>
        <p style={styles.message}>Oops! The page you are looking for doesn't exist.</p>
        <Link to="/" style={styles.button}>Go Back to Home</Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(135deg,rgb(255, 255, 255),rgb(241, 241, 248))', // Smooth gradient background
    fontFamily: 'Arial, sans-serif',
    color: '#1F1F2B',
    textAlign: 'center',
    overflow: 'hidden',
  },
  content: {
    position: 'relative',
    zIndex: 2,
  },
  heading: {
    fontSize: '120px',
    fontWeight: '700',
    margin: '0',
    animation: 'fadeIn 1s ease-in-out', // Add some animation for the heading
  },
  message: {
    fontSize: '20px',
    marginTop: '20px',
    fontWeight: '300',
    animation: 'fadeIn 2s ease-in-out', // Delay the message animation
  },
  button: {
    display: 'inline-block',
    marginTop: '30px',
    padding: '15px 30px',
    fontSize: '16px',
    fontWeight: '500',
    backgroundColor: '',
    color: '#1F1F2B',
    textDecoration: 'none',
    borderRadius: '8px',
    transition: 'background-color 0.3s',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    cursor: 'pointer',
  },
};

// Animations for fading in text
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateY(-30px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`, styleSheet.cssRules.length);

export default NotFoundPage;
