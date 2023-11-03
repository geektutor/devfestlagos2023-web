"use client";
import React, { useState } from "react";

const DPGenerator = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const generateDP = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 300; // Set the canvas size according to your requirements
    canvas.height = 300;

    const context = canvas.getContext("2d");

    // You can implement image processing logic here to add a frame to the selectedImage.
    // For simplicity, I'll just draw the selected image as is.
    const image = new Image();
    image.src = selectedImage;
    image.onload = () => {
      context.drawImage(image, 0, 0, canvas.width, canvas.height);

      // To make it downloadable, we'll convert the canvas to a data URL and create a link for download.
      const dpDataUrl = canvas.toDataURL("image/png");

      const a = document.createElement("a");
      a.href = dpDataUrl;
      a.download = "profile_picture.png"; // Specify the filename
      a.click();
    };
  };

  return (
    <div>
      <h1>DP Generator</h1>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {selectedImage && (
        <img src={selectedImage} alt="Selected Image" width="300" />
      )}
      <button onClick={generateDP}>Generate and Download DP</button>
    </div>
  );
};

export default DPGenerator;
