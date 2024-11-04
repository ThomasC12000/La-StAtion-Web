import connectToDatabase from "../../../../../lib/mongodb";
import User from "../../../../../models/user";
import { sendWelcomeEmail } from "../../../../../lib/mail";

export async function POST(req) {
  try {
    const { firstName, lastName, email, password, createdAt } =
      await req.json();

    // Vérifier si tous les champs requis sont présents
    if (!firstName || !lastName || !email || !password) {
      return new Response(JSON.stringify({ message: "Champ manquant !" }), {
        status: 400,
      });
    }

    await connectToDatabase();

    // Vérifier si l'email est déjà utilisé
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(
        JSON.stringify({ message: "Cette adresse e-mail est déjà utilisée !" }),
        { status: 400 }
      );
    }

    // Créer un nouvel utilisateur avec le mot de passe hashé automatiquement via le middleware pre('save') dans le modèle User
    const newUser = new User({
      name: `${firstName} ${lastName}`,
      firstName,
      lastName,
      email,
      password,
      profileImage: "/img/profile_image/neutral_user.png",
      createdAt: new Date(createdAt),
      role: "user",
    });
    await newUser.save();

    await sendWelcomeEmail(email, firstName);

    // Répondre avec succès si l'utilisateur est créé
    return new Response(
      JSON.stringify({ message: "Utilisateur créé avec succès !" }),
      { status: 201 }
    );
  } catch (error) {
    // Gérer les erreurs et renvoyer un message d'erreur approprié
    console.error("Erreur lors de la création de votre compte :", error);
    return new Response(
      JSON.stringify({
        message: "Erreur lors de la création de votre compte !",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
