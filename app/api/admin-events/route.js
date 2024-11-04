import connectToDatabase from "../../../lib/mongodb";
import PublicEvents from "../../../models/publicEvents";
import User from "../../../models/user";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

// Fonction utilitaire pour gérer les erreurs
const handleError = (message, status) => {
  console.error(message);
  return NextResponse.json({ error: message }, { status });
};

async function connectAndCheckUser(userId) {
  await connectToDatabase();

  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid User ID");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new Error("Utilisateur non trouvé");
  }
  return user;
}

// Fonction GET pour récupérer tous les événements, accessible à tous les utilisateurs
export async function GET(req) {
  try {
    await connectToDatabase();

    const events = await PublicEvents.find({}).sort({
      date: 1,
      time: 1,
    });
    console.log("Events fetched:", events);
    return NextResponse.json(events);
  } catch (error) {
    return handleError(error.message, 400);
  }
}

// Fonction POST pour créer un événement, accessible uniquement aux administrateurs
export async function POST(req) {
  const { title, date, time, userId } = await req.json();

  if (!userId || !title || !date || !time) {
    return handleError("Tous les champs sont requis", 400);
  }

  try {
    await connectToDatabase();
    const user = await connectAndCheckUser(userId);

    // Vérifier si l'utilisateur a le rôle d'administrateur
    if (user.role !== "admin") {
      return handleError(
        "Accès refusé : l'utilisateur n'est pas un administrateur",
        403
      );
    }

    const newEvent = new PublicEvents({ title, date, time, userId });
    const savedEvent = await newEvent.save();
    console.log("New event saved:", savedEvent);
    return NextResponse.json(savedEvent, { status: 201 });
  } catch (error) {
    return handleError("Erreur lors de l'ajout de l'événement", 500);
  }
}

// Fonction DELETE pour supprimer un événement, accessible uniquement aux administrateurs
export async function DELETE(req) {
  const { id, userId } = await req.json();

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return handleError("Invalid Event ID", 400);
  }

  try {
    await connectToDatabase();
    const user = await connectAndCheckUser(userId);

    // Vérifier si l'utilisateur a le rôle d'administrateur
    if (user.role !== "admin") {
      return handleError(
        "Accès refusé : l'utilisateur n'est pas un administrateur",
        403
      );
    }

    const deletedEvent = await PublicEvents.findByIdAndDelete(id);

    if (!deletedEvent) {
      return handleError("Aucun événement trouvé avec cet ID", 404);
    }

    return NextResponse.json(
      { message: "Événement supprimé avec succès" },
      { status: 200 }
    );
  } catch (error) {
    return handleError("Erreur lors de la suppression de l'événement", 500);
  }
}
