// app/api/test-connection/route.js
import connectToDatabase from '../../../lib/mongodb';

export async function GET() {
  try {
    await connectToDatabase();
    return new Response(JSON.stringify({ message: 'Connexion à MongoDB réussie' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Erreur de connexion à MongoDB', error: error.message }), { status: 500 });
  }
}
