import { sendCodeByEmail } from "../../../lib/mail"; // Assurez-vous que ce chemin est correct

export async function POST(req) {
  const { code, email } = await req.json();

  if (!code || !email) {
    return new Response(
      JSON.stringify({ message: "Code ou e-mail manquant." }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
  try {
    await sendCodeByEmail(code, email);
    return new Response(
      JSON.stringify({ message: "Code envoyé avec succès" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Erreur lors de l'envoi du code", error);
    return new Response(
      JSON.stringify({ message: "Erreur lors de l'envoi du code" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
