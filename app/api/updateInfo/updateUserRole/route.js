import connectToDatabase from "../../../../lib/mongodb";
import User from "../../../../models/user";

export async function PATCH(req) {
  const { userId, newRole } = await req.json();

  try {
    await connectToDatabase();
    const user = await User.findById(userId);
    if (!user) {
      return new Response(JSON.stringify({ error: "Utilisateur non trouvé" }), {
        status: 404,
      });
    }

    user.role = newRole; // Mise à jour du rôle
    await user.save();

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error(
      "Erreur lors de la mise à jour du rôle de l'utilisateur:",
      error
    );
    return new Response(
      JSON.stringify({
        error: "Erreur lors de la mise à jour du rôle de l'utilisateur",
      }),
      { status: 500 }
    );
  }
}
