import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Check if it's a chunk load error
      const isChunkLoadError =
        this.state.error?.message?.includes('Failed to fetch dynamically imported module') ||
        this.state.error?.message?.includes('Loading chunk');

      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            gap: 2
          }}
        >
          <Typography variant="h5" color="error">
            {isChunkLoadError ? 'Session Expired' : 'Something went wrong'}
          </Typography>
          <Typography variant="body1">
            {isChunkLoadError
              ? 'Your session has expired. Please refresh the page or login again.'
              : 'An unexpected error occurred. Please try again.'}
          </Typography>
          <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                window.location.reload();
              }}
            >
              Refresh Page
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                // Clear any auth tokens
                localStorage.clear();
                sessionStorage.clear();
                // Redirect to login
                window.location.href = '/login';
              }}
            >
              Back to Login
            </Button>
          </Box>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
