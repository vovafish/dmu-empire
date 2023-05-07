import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useToken } from '../auth/useToken';
import { EmailVerificationSuccess } from './EmailVerificationSuccess';
import { EmailVerificationFail } from './EmailVerificationFail';

export const EmailVerificationLandingPage = () => {
  // state variables for loading and success status, and getting the verification string from the URL
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const { verificationString } = useParams();

  // useToken is a custom hook that sets the token to local storage
  const [, setToken] = useToken();

  // useEffect to load verification status when the component mounts
  useEffect(() => {
    const loadVerification = async () => {
      try {
        const response = await axios.put('/api/verify-email', {
          verificationString,
        });
        const { token } = response.data;
        setToken(token);
        setIsSuccess(true);
        setIsLoading(false);
      } catch (e) {
        setIsSuccess(false);
        setIsLoading(false);
      }
    };
    loadVerification();
  }, [setToken, verificationString]);

  // if still loading, show a loading message
  if (isLoading)
    return (
      <div className="mainContainer">
        <p>Loading...</p>
      </div>
    );
  // if verification failed, show an error message
  if (!isSuccess) return <EmailVerificationFail />;
  // if verification succeeded, show a success message
  return <EmailVerificationSuccess />;
};
