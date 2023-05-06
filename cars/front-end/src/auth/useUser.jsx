import { useState, useEffect } from 'react';
import { useToken } from './useToken';

export const useUser = () => {
  const [token] = useToken(); // get token from useToken hook

  const getPayloadFromToken = (token) => {
    // separate by period and get middle portion of the token
    const encodedPayload = token.split('.')[1];
    return JSON.parse(atob(encodedPayload)); // decode base64 encoded payload and parse JSON
  };

  const [user, setUser] = useState(() => {
    if (!token) return null; // if no token is present, return null
    return getPayloadFromToken(token); // otherwise, return user object parsed from token
  });

  useEffect(() => {
    if (!token) {
      setUser(null); // if token is removed or not present, set user to null
    } else {
      setUser(getPayloadFromToken(token)); // otherwise, update user with new token
    }
  }, [token]);

  return user; // return user object
};
