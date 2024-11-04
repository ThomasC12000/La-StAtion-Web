import connectToDatabase from '../../../../../lib/mongodb';
import User from '../../../../../models/user';
import { sendPasswordResetEmail } from '../../../../../lib/mail';

export async function POST(req) {
  const { email } = await req.json();

  if (!email) {
    return new Response(JSON.stringify({ message: 'Veuillez fournir une adresse e-mail !' }), { status: 400 });
  }

  try {
    await connectToDatabase();

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return new Response(JSON.stringify({ message: 'Aucun utilisateur trouvé avec cette adresse e-mail !' }), { status: 404 });
    }

    const resetToken = existingUser.generateResetToken();
    await existingUser.save();

    const resetURL = `http://localhost:3000/api/auth/password/${resetToken}`;
    const requestDate = new Date();
    const formattedDate = requestDate.toLocaleDateString('fr-FR', { timeZone: 'Europe/Paris' });
    const formattedTime = requestDate.toLocaleTimeString('fr-FR', { timeZone: 'Europe/Paris' });

    await sendPasswordResetEmail(existingUser.email, existingUser.firstName, resetURL, formattedDate, formattedTime);
    
    return new Response(JSON.stringify({ message: 'Un e-mail de réinitialisation a été envoyé !' }), { status: 200 });
  } catch (error) {
    console.error('Erreur lors de la réinitialisation :', error);
    return new Response(JSON.stringify({ message: 'Erreur lors de la réinitialisation !', error: error.message }), { status: 500 });
  }
}
