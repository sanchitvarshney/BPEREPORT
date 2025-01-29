import Loader from 'components/Loader';
import useAuth from 'hooks/useAuth';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Protected = ({ children, authentication = true }) => {
  const [isLoading, setIsLoading] = useState(true);
  const authStatus = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (authentication && authStatus !== authentication) {
        navigate('/login');
        setIsLoading(false);
        return;
      } else if (!authentication && authStatus !== authentication) {
        navigate('/');
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
    };

    checkAuth();
  }, [authStatus, authentication, navigate]);

  if (isLoading) {
    return <Loader />;
  }

  return <>{children}</>;
};

export default Protected;
