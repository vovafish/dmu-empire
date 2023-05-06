// Import the SendGrid module and assign it to the 'sendgrid' variable
import sendgrid from '@sendgrid/mail';

// Set the SendGrid API key to the value of the 'SENDGRID' environment variable
sendgrid.setApiKey(process.env.SENDGRID);

// Export a function called 'sendEmail' that takes an object with 'to', 'from', 'subject', 'text', and 'html' properties as input
export const sendEmail = ({ to, from, subject, text, html }) => {
  // Create a new message object with the specified properties
  const msg = {
    to,
    from,
    subject,
    text,
    html,
  };
  // Send the message using the SendGrid module and return a promise
  return sendgrid.send(msg);
};
