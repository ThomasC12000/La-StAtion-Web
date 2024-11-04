import nodemailer from "nodemailer";

const createTransporter = () => {
  return nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

// Envoyer un email de réinitialisation de mot de passe
const sendPasswordResetEmail = async (
  email,
  firstName,
  resetURL,
  formattedDate,
  formattedTime
) => {
  const transporter = createTransporter();

  const htmlMessage = `
    <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 30px; background-color: #f9f9f9;">
      <center>
        <h2 style="color: #007bff; margin-bottom: 20px;">Réinitialisation de votre mot de passe</h2>
        <p>Bonjour <strong>${firstName}</strong>,</p>
        <p>Vous avez demandé une réinitialisation de mot de passe pour le compte associé à l'adresse e-mail <strong>${email}</strong>.</p>
        <p>Cliquez sur le lien suivant pour réinitialiser votre mot de passe :</p>
        <a href="${resetURL}" style="display: inline-block; background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 20px; margin: 20px 0;">Réinitialiser le mot de passe</a>
        <p style="margin-top: 20px;">Si vous n'avez pas demandé cette réinitialisation, ignorez cet e-mail.</p>
        <p style="margin-top: 20px;">Réinitialisation demandée le <strong>${formattedDate}</strong> à <strong>${formattedTime}</strong></p>
        <p style="margin-top: 20px;">Merci !</p>
        <p>L'équipe de votre site</p>
      </center>
    </div>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: "Réinitialisation de mot de passe",
    html: htmlMessage,
  });
};

// Envoyer un email de bienvenue
const sendWelcomeEmail = async (email, firstName) => {
  const transporter = createTransporter();

  const htmlMessage = `
    <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
      <center>
        <h2 style="color: #007bff; margin-bottom: 20px;">Bienvenue sur notre site !</h2>
        <p>Bonjour <strong>${firstName}</strong>,</p>
        <p>Merci de vous être inscrit sur notre site. Nous sommes ravis de vous accueillir.</p>
        <p>Si vous avez des questions ou besoin d'aide, n'hésitez pas à nous contacter.</p>
        <p style="margin-top: 20px;">Merci !</p>
        <p>L'équipe de votre site</p>
      </center>
    </div>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: "Bienvenue sur notre site",
    html: htmlMessage,
  });
};

// Envoyer un email avec un code secret de connexion
const sendCodeByEmail = async (code, email) => {
  const transporter = createTransporter();

  const htmlMessage = `
    <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
      <center>
        <h2 style="color: #007bff; margin-bottom: 20px;">Code Secret</h2>
        <p>Bonjour,</p>
        <p>Voici votre code d'accès :</p>
        <h3 style="font-size: 24px; font-weight: bold; color: #333;">${code}</h3>
        <p>Ce code vous permettra de créer votre espace personnel sur notre site.</p>
        <p>Vous pouvez suivre le lien ci-dessous pour accéder à la page de création de votre espace personnel</p>
        <a href="http://localhost:3000/api/auth/newUser" style="display: inline-block; background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 20px; margin: 20px 0;">Créer mon espace personnel</a>
        <p style="margin-top: 20px;">Merci !</p>
        <p>L'équipe de La StAtion</p>
      </center>
    </div>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: "Vos codes d'accées à notre site - La StAtion",
    html: htmlMessage,
  });
};

export { sendPasswordResetEmail, sendWelcomeEmail, sendCodeByEmail };
