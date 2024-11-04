import connectToDatabase from "../../../../../lib/mongodb";
import User from "../../../../../models/user";
import crypto from "crypto";

export async function POST(req) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ message: "Méthode non autorisée" }), {
      status: 405,
    });
  }

  try {
    const { resetPasswordToken, newPassword } = await req.json();

    if (!resetPasswordToken || !newPassword) {
      return new Response(
        JSON.stringify({ message: "Token ou nouveau mot de passe manquant !" }),
        { status: 400 }
      );
    }

    await connectToDatabase();

    const hashedToken = crypto
      .createHash("sha256")
      .update(resetPasswordToken)
      .digest("hex");
    const existingUser = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!existingUser) {
      return new Response(
        JSON.stringify({
          message: "Lien de réinitialisation invalide ou expiré !",
        }),
        { status: 400 }
      );
    }

    existingUser.password = newPassword;
    existingUser.resetPasswordToken = undefined;
    existingUser.resetPasswordExpires = undefined;
    await existingUser.save();

    return new Response(
      JSON.stringify({ message: "Mot de passe réinitialisé !" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la réinitialisation :", error);
    return new Response(
      JSON.stringify({
        message: "Erreur lors de la réinitialisation !",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
