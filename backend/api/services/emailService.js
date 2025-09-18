const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Sends an email using Nodemailer with Gmail as the service.
 *
 * @async
 * @function sendEmail
 * @param {string} to - Recipient email address.
 * @param {string} subject - Subject of the email.
 * @param {string} html - HTML content of the email body.
 * @returns {Promise<nodemailer.SentMessageInfo>} A promise resolving with the result of the email sending operation.
 *
 * @example
 * await sendEmail(
 *   "recipient@example.com",
 *   "Password Reset",
 *   "<p>Click <a href='https://example.com/reset'>here</a> to reset your password.</p>"
 * );
 */
async function sendEmail(to, subject, html) {
  const mailOptions = {
    from: `"ToDo Support" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  };

  return transporter.sendMail(mailOptions);
}

module.exports = { sendEmail };
