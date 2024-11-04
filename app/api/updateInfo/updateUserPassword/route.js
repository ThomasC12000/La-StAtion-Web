import connectToDatabase from "../../../../lib/mongodb";
import User from "../../../../models/user";

export async function POST(req) {
  try {
    const { userId, oldPassword, newPassword } = await req.json();

    await connectToDatabase();

    const user = await User.findById(userId);
    if (!user) {
      return new Response(
        JSON.stringify({ success: false, message: "Utilisateur non trouvé." }),
        { status: 404 }
      );
    }

    const isPasswordValid = await user.comparePassword(
      oldPassword,
      user.password
    );
    if (!isPasswordValid) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Mot de passe actuel incorrect.",
        }),
        { status: 400 }
      );
    }

    user.password = newPassword;
    await user.save();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Mot de passe changé avec succès.",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors du changement de mot de passe:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Erreur lors du changement de mot de passe.",
      }),
      { status: 500 }
    );
  }
}
