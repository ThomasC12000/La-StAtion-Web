import connectToDatabase from "../../../../lib/mongodb";
import Code from "../../../../models/secretCode";

export async function POST(request) {
  const { secretCode } = await request.json();
  console.log("Vérification du code secret:", secretCode);

  try {
    await connectToDatabase();
    const secret = await Code.findOne({ secretCode });

    if (secret) {
      await Code.findOneAndDelete({ secretCode });
      return new Response(
        JSON.stringify({ message: "Code validé avec succès" }),
        { status: 200 }
      );
    } else {
      return new Response(JSON.stringify({ message: "Code invalide" }), {
        status: 400,
      });
    }
  } catch (error) {
    console.error("Erreur lors de la vérification du code secret", error);
    return new Response(
      JSON.stringify({ message: "Une erreur est survenue" }),
      { status: 500 }
    );
  }
}
