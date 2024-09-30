const nodemailer = require('nodemailer');

const createTransporter = (email, password) => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: email,
      pass: password,
    },
  });
};

const sendEmail = async (transporter, to, subject, text) => {
  const mailOptions = {
    from: transporter.options.auth.user,
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Correo enviado');
  } catch (error) {
    console.error('Error al enviar el correo:', error);
  }
};

module.exports = { createTransporter, sendEmail };