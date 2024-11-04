import connectToDatabase from "../../../../lib/mongodb";
import User from "../../../../models/user";
import Event from "../../../../models/calendar";

export async function DELETE(req) {
  const { userId } = await req.json();

  if (!userId) {
    return new Response(
      JSON.stringify({ success: false, message: "ID utilisateur manquant." }),
      { status: 400 }
    );
  }

  try {
    await connectToDatabase();
    await Event.deleteMany({ userId });
    await User.findByIdAndDelete(userId);
    return new Response(
      JSON.stringify({
        success: true,
        message: "Compte supprimé avec succès.",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la suppression du compte:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Erreur lors de la suppression du compte.",
      }),
      { status: 500 }
    );
  }
}
