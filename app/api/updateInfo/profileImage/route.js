import connectToDatabase from "../../../../lib/mongodb";
import User from "../../../../models/user";

export async function POST(req) {
  try {
    const { userId, selectedImage } = await req.json();

    await connectToDatabase();

    const user = await User.findById(userId);
    if (!user) {
      return new Response(
        JSON.stringify({ message: "Utilisateur non trouvé." }),
        { status: 404 }
      );
    }

    user.profileImage = selectedImage;
    await user.save();

    return new Response(
      JSON.stringify({
        message: "Image de profil mise à jour avec succès.",
        success: true,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "Erreur lors de la mise à jour de l'image de profil :",
      error
    );
    return new Response(
      JSON.stringify({
        message: "Erreur lors de la mise à jour de l'image de profil.",
        success: false,
      }),
      { status: 500 }
    );
  }
}
