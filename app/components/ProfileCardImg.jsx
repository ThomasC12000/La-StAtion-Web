"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function ProfileCardImg() {
  const { data: session, update } = useSession();
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    if (session?.user?.profileImage) {
      setSelectedImage(session.user.profileImage);
    }
  }, [session]);

  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };

  const handleSave = async () => {
    if (!session?.user?.id) return;

    try {
      const response = await fetch("/api/updateInfo/profileImage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session.user.id,
          selectedImage,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Image sauvegardée avec succès !");
        await update({
          ...session,
          user: { ...session.user, profileImage: selectedImage },
        });
      } else {
        alert("Échec de la sauvegarde de l'image.");
      }
    } catch (error) {
      console.error("Erreur lors de la sauvegarde de l'image:", error);
      alert("Une erreur est survenue lors de la sauvegarde de l'image.");
    }
  };

  const imageToDisplay = selectedImage || session?.user?.profileImage;

  return (
    <div className="col-lg-3 mb-4">
      <div className="card h-100 shadow-lg p-3 rounded-5 d-flex flex-column justify-content-center align-items-center">
        <img
          className="rounded-circle mb-3"
          width="150"
          src={imageToDisplay}
          alt="Profile Pic"
        />
        <div className="text-center mb-1">
          <h5 className="font-weight-bold">{session?.user?.name}</h5>
          <p className="text-muted">{session?.user?.email}</p>
        </div>

        <hr className="w-100 my-1" />

        <div className="mb-4">
          <div
            className="btn-group"
            role="group"
            aria-label="Select Profile Image"
          >
            {[
              "/img/profile_image/men.png",
              "/img/profile_image/women.png",
              "/img/profile_image/neutral_user.png",
            ].map((img, idx) => (
              <button
                key={idx}
                type="button"
                className="btn btn-light"
                onClick={() => handleImageSelect(img)}
              >
                {["HOMME", "FEMME", "NEUTRE"][idx]}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-3 mt-1 text-center">
          <button
            className="btn btn-primary rounded-5"
            type="button"
            onClick={handleSave}
          >
            Changer d&apos;image
          </button>
        </div>
      </div>
    </div>
  );
}
