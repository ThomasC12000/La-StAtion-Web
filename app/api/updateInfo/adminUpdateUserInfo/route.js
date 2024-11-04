import connectToDatabase from "../../../../lib/mongodb";
import User from "../../../../models/user";

export async function PUT(req) {
  const { userId, firstName, lastName, email } = await req.json();

  try {
    await connectToDatabase();
    const user = await User.findById(userId);
    if (!user) {
      return new Response(JSON.stringify({ error: "Utilisateur non trouvé" }), {
        status: 404,
      });
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    await user.save();

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
    return new Response(
      JSON.stringify({
        error: "Erreur lors de la mise à jour de l'utilisateur",
      }),
      { status: 500 }
    );
  }
}
