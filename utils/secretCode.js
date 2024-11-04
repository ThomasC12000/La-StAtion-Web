"use server";

import connectToDatabase from "../lib/mongodb"; // Assurez-vous que le chemin est correct
import Code from "../models/secretCode"; // Assurez-vous que le chemin est correct

export const generateRandomCode = async () => {
  const chars = "ABCDEFGHIJKLMNPQRSTUVWXYZ123456789";
  const code = [];
  for (let i = 0; i < 12; i++) {
    if (i > 0 && i % 4 === 0) {
      code.push("-");
    }
    const randomIndex = Math.floor(Math.random() * chars.length);
    code.push(chars[randomIndex]);
  }
  const secretCode = code.join("");

  await connectToDatabase();

  try {
    const newCode = new Code({ secretCode });
    await newCode.save();
    console.log("Code enregistré avec succès:", secretCode);
  } catch (error) {
    console.error("Erreur lors de l'enregistrement du code:", error);
  }
  return secretCode;
};
