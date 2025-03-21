import { Suspense } from 'react';
import React, { useState, useEffect } from 'react';
import Loader from './Loader';
import ErrorLoading from 'reusable/ErrorLoading';

const Loadable = (Component) => (props) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Reset error state if component re-renders
    setHasError(false);
  }, [Component]);

  if (hasError) {
    return <ErrorLoading/>;
  }

  return (
    <Suspense
      fallback={<Loader />}
      onError={() => {
        setHasError(true);
      }}
    >
      <Component {...props} />
    </Suspense>
  );
};

export default Loadable;
