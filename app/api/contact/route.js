import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

// Configuration de Nodemailer
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function POST(request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Configurer le mail
    const mailOptions = {
      from: email,
      to: process.env.EMAIL,
      subject: subject,
      text: message,
      html: `<p>Nom: ${name}</p><p>Email: ${email}</p><p>Sujet: ${subject}</p><p>Message: ${message}</p>`,
    };

    // Envoyer le mail
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Votre message a été envoyé avec succès !" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de l'envoi du formulaire" },
      { status: 500 }
    );
  }
}
