import mongoose from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";

// Définition du schéma utilisateur
const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  profileImage: { type: String },
  role: { type: String },
});

// Middleware pre-save pour le hashage du mot de passe et la mise à jour du champ `name`
UserSchema.pre("save", async function (next) {
  try {
    // Hashage du mot de passe si modifié
    if (this.isModified("password")) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }

    // Mise à jour du champ `name`
    this.name = `${this.firstName} ${this.lastName}`;

    next();
  } catch (error) {
    next(error);
  }
});

// Méthode pour comparer le mot de passe
UserSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

// Méthode pour générer un token de réinitialisation
UserSchema.methods.generateResetToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpires = Date.now() + 3600000; // 1 heure
  return resetToken;
};

const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);

export default UserModel;
