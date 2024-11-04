import connectToDatabase from "../../../../lib/mongodb";
import User from "../../../../models/user";

export async function GET(req) {
  try {
    await connectToDatabase();
    const users = await User.find({});
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    return new Response(
      JSON.stringify({ error: "Erreur lors de la récupération des données" }),
      { status: 500 }
    );
  }
}
