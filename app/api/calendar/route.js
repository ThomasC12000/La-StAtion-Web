import connectToDatabase from "../../../lib/mongodb";
import Event from "../../../models/calendar";
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

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  try {
    await connectAndCheckUser(userId);

    const events = await Event.find({ userId }).sort({ date: 1, time: 1 });
    console.log("Events fetched:", events);
    return NextResponse.json(events);
  } catch (error) {
    return handleError(error.message, 400);
  }
}

export async function POST(req) {
  const { title, date, time, priority, userId } = await req.json();

  if (!userId || !title || !date || !time || !priority) {
    return handleError("Tous les champs sont requis", 400);
  }

  try {
    await connectToDatabase();
    await connectAndCheckUser(userId);

    const newEvent = new Event({ title, date, time, priority, userId });
    const savedEvent = await newEvent.save();
    console.log("New event saved:", savedEvent);
    return NextResponse.json(savedEvent, { status: 201 });
  } catch (error) {
    return handleError("Erreur lors de l'ajout de l'événement", 500);
  }
}

export async function DELETE(req) {
  const { id } = await req.json();

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return handleError("Invalid Event ID", 400);
  }

  try {
    await connectToDatabase();
    const deletedEvent = await Event.findByIdAndDelete(id);

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
