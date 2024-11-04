import connectToDatabase from "../../../../lib/mongodb";
import User from "../../../../models/user";

export async function POST(req) {
  try {
    const { userId, firstName, lastName, email } = await req.json();

    await connectToDatabase();

    const user = await User.findById(userId);
    if (!user) {
      return new Response(
        JSON.stringify({ success: false, message: "Utilisateur non trouvé." }),
        { status: 404 }
      );
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.name = `${firstName} ${lastName}`;
    await user.save();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Informations mises à jour avec succès.",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "Erreur lors de la mise à jour des informations utilisateur:",
      error
    );
    return new Response(
      JSON.stringify({
        success: false,
        message: "Erreur lors de la mise à jour des informations.",
      }),
      { status: 500 }
    );
  }
}
