import { useState } from 'react';

export const useToken = () => {
  // Get the token from local storage if it exists
  const [token, setTokenInternal] = useState(() => {
    return localStorage.getItem('token');
  });

  // Save the new token to local storage and update the state
  const setToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setTokenInternal(newToken);
  };

  // Return the token and the function to set the token
  return [token, setToken];
};
