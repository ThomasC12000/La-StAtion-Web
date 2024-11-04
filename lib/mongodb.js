import mongoose from "mongoose";

// Vérification de l'URI MongoDB dans les variables d'environnement
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Veuillez ajouter votre URI MongoDB dans .env.local");
}

// Mise en cache de la connexion
let cached = global.mongoose || { conn: null, promise: null };

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {}).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

global.mongoose = cached;

export default connectToDatabase;
