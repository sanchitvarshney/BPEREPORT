import { Suspense } from 'react';
import { Box, CircularProgress } from '@mui/material';
import ErrorBoundary from './ErrorBoundary';

const Loader = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    }}
  >
    <CircularProgress />
  </Box>
);

const Loadable = (Component) => (props) => (
  <ErrorBoundary>
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  </ErrorBoundary>
);

export default Loadable;
