// Import necessary modules from react-router-dom and our custom useUser hook
import { Route, Navigate } from 'react-router-dom';
import { useUser } from './useUser';

// Define a component for a private route that requires authentication to access
export const PrivateRoute = ({ children }) => {
  // Get the user object from the useUser hook
  const user = useUser();

  // If the user is authenticated, render the component that was passed in as a prop
  // If the user is not authenticated, redirect to the login page
  return user ? children : <Navigate to="/login" />;
};
