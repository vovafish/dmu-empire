import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import CarsListPage from './pages/CarsListPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import emailjs from '@emailjs/browser';
import ReturnOfVehiclePage from './pages/ReturnOfVehiclePage.jsx';
import { validatePhoneNumber } from './pages/SignUpPage.jsx';
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

    render(
      <MemoryRouter>
        <ReturnOfVehiclePage />
      </MemoryRouter>
    );

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

describe('SignUpPage', () => {
  describe('validatePhoneNumber', () => {
    it('returns true for valid UK phone numbers', () => {
      render(
        <MemoryRouter>
          <SignUpPage />
        </MemoryRouter>
      );
      const input = screen.getByPlaceholderText('01234567890 (optional)');

      fireEvent.change(input, { target: { value: '07123456789' } });
      expect(input.value).toBe('07123456789');

      const isValid = validatePhoneNumber(input.value);
      expect(isValid).toBe(true);
    });

    it('returns false for invalid UK phone numbers', () => {
      render(
        <MemoryRouter>
          <SignUpPage />
        </MemoryRouter>
      );
      const input = screen.getByPlaceholderText('01234567890 (optional)');

      fireEvent.change(input, { target: { value: '071234567' } });
      expect(input.value).toBe('071234567');

      const isValid = validatePhoneNumber(input.value);
      expect(isValid).toBe(false);
    });
  });

  it('should not allow user to submit form if any field (except phone number) is empty or if password and confirm password are not the same', () => {
    render(
      <MemoryRouter>
        <SignUpPage />
      </MemoryRouter>
    );

    // Get input fields
    const firstNameInput = screen.getByPlaceholderText('Your first name');
    const lastNameInput = screen.getByPlaceholderText('Your last name');
    const emailInput = screen.getByPlaceholderText('someone@gmail.com');
    const passwordInput = screen.getByPlaceholderText('password');
    const confirmPasswordInput =
      screen.getByPlaceholderText('Confirm password');
    const registerButton = screen.getByText('Register');

    // Fill out form fields with valid data, except for phone number
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'johndoe@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'passwordd' } });

    // Make sure the Register button is disabled
    expect(registerButton).toBeDisabled();

    // Fill out form fields with invalid data, except for phone number
    fireEvent.change(firstNameInput, { target: { value: '' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'johndoe@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password' } });

    // Make sure the Register button is still disabled
    expect(registerButton).toBeDisabled();

    // Fill out form fields with all valid data, except for phone number
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'johndoe@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password' } });

    // Make sure the Register button is enabled
    expect(registerButton).toBeEnabled();
  });
});
