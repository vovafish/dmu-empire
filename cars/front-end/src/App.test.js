import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import CarsListPage from './pages/CarsListPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import emailjs from '@emailjs/browser';
import ReturnOfVehiclePage from './pages/ReturnOfVehiclePage.jsx';
import App from './App.js';

test('render App component without crashing', () => {
  render(<App />);
});

test('render CarsListPage component without crashing', () => {
  render(<CarsListPage />);
});

test('renders CarsListPage with heading "Cars"', () => {
  render(<CarsListPage />);
  const headingElement = screen.getByRole('heading', {
    level: 1,
    name: 'Cars',
  });
  expect(headingElement).toBeInTheDocument();
});

describe('ReturnOfVehiclePage', () => {
  it('checking whether the return of a vehicle form actually work and exists', async () => {
    const sendFormMock = jest.fn().mockResolvedValueOnce({ text: 'success' });
    jest.spyOn(emailjs, 'sendForm').mockImplementation(sendFormMock);

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

    expect(sendFormMock).toHaveBeenCalledWith(
      'service_8lfvu6w',
      'template_e7yl9tj',
      expect.any(HTMLFormElement),
      'OobbSW-DHtFMhWbqK'
    );
  });
});
