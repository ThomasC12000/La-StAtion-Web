// pages/api/change-password.js
import { auth } from "../../../../../auth";
import bcrypt from "bcrypt";
import connectToDatabase from "../../../../../lib/mongodb";

export default async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  const session = await auth({ req });

  if (!session) {
    return res.status(401).json({ error: "Non autorisé" });
  }

  const { oldPassword, newPassword, confirmPassword } = req.body;

  if (newPassword !== confirmPassword) {
    return res
      .status(400)
      .json({ error: "Les mots de passe ne correspondent pas" });
  }

  const { db } = await connectToDatabase();
  const user = await db
    .collection("users")
    .findOne({ email: session.user.email });

  if (!user) {
    return res.status(404).json({ error: "Utilisateur non trouvé" });
  }

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    return res.status(400).json({ error: "Mot de passe actuel incorrect" });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await db
    .collection("users")
    .updateOne(
      { email: session.user.email },
      { $set: { password: hashedPassword } }
    );

  res.status(200).json({ message: "Mot de passe changé avec succès" });
};
