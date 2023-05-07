import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import CarsListPage from './pages/CarsListPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import emailjs from '@emailjs/browser';
import ReturnOfVehiclePage from './pages/ReturnOfVehiclePage.jsx';
import App from './App.js';

// Test that the App component renders without crashing
test('render App component without crashing', () => {
  render(<App />);
});

// Test that the CarsListPage component renders without crashing
test('render CarsListPage component without crashing', () => {
  render(<CarsListPage />);
});

// Test that the CarsListPage component renders with the correct heading
test('renders CarsListPage with heading "Cars"', () => {
  render(<CarsListPage />);
  const headingElement = screen.getByRole('heading', {
    level: 1,
    name: 'Cars',
  });
  expect(headingElement).toBeInTheDocument();
});

// Test that the ReturnOfVehiclePage form works and exists
describe('ReturnOfVehiclePage', () => {
  it('checking whether the return of a vehicle form actually work and exists', async () => {
    // Mock the sendForm function and set it to return a success message
    const sendFormMock = jest.fn().mockResolvedValueOnce({ text: 'success' });
    jest.spyOn(emailjs, 'sendForm').mockImplementation(sendFormMock);

    // Render the ReturnOfVehiclePage component
    render(<ReturnOfVehiclePage />);

    // Fill in the form fields
    const nameInput = screen.getByLabelText('Name');
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });

    const emailInput = screen.getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'johndoe@example.com' } });

    const messageInput = screen.getByLabelText('Message');
    fireEvent.change(messageInput, { target: { value: 'Test message' } });

    // Submit the form
    const submitButton = screen.getByRole('button', { name: 'Send' });
    fireEvent.click(submitButton);

    // Check that the sendForm function was called with the correct arguments
    expect(sendFormMock).toHaveBeenCalledWith(
      'service_8lfvu6w',
      'template_e7yl9tj',
      expect.any(HTMLFormElement),
      'OobbSW-DHtFMhWbqK'
    );
  });
});
