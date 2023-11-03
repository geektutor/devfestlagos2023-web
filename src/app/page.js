"use client";
import React, { useState } from "react";
import { Footer, Form, Hero, Nav, Timer } from "./Components";

const DPGenerator = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [user, setUser] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const generateDP = () => {
    // Implement your image processing logic here if needed.

    // To make it downloadable, you can use the same code as before.
    // I'm using the example code for simplicity.

    const canvas = document.createElement("canvas");
    canvas.width = 3000;
    canvas.height = 4000;
    // Increase the height to accommodate the text

    const context = canvas.getContext("2d");

    const frameImage = new Image();
    frameImage.src = "/frame2.png"; // Load your frame image
    frameImage.onload = () => {
      context.drawImage(frameImage, 0, 0, canvas.width, canvas.height);

      const image = new Image();
      image.src = selectedImage;
      image.onload = () => {
        context.drawImage(
          image,
          980,
          1000,
          canvas.width - 1900,
          canvas.height - 2950
        );

        // Add text below the image
        context.fillStyle = "black"; // Set text color
        context.font = "100px Arial"; // Set font style
        context.textAlign = "left";
        context.fillText(user, 1400, 2200);

        // To make it downloadable, you can use the same code as before.
        const dpDataUrl = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = dpDataUrl;
        a.download = "devfest.png";
        a.click();
      };
    };
  };

  return (
    <div className="container">
      <Nav />
      <Hero />
      <form>
        <div className="form-container">
          <h3>
            <b>Customise your Devfest DP</b>
          </h3>
          <label>Name</label>
          <input
            className="form-name"
            value={user}
            name="user"
            onChange={(e) => setUser(e.target.value)}
          />
          <div className="form-info">Nickname, first name, how you want it</div>
          <label>Insert your picture</label>
        </div>
      </form>
      <div className="drag-main">
        <div className="drag-container">
          <div className="form-drag-drop">
            <p>Drag and drop to upload or</p>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Selected Image"
                className="previewImage"
              />
            )}
          </div>
        </div>
      </div>

      <div className="form-info">Preferrably in a square resolution</div>

      <button className="form-button" onClick={generateDP}>
        Generate and Download DP
      </button>
      <Timer />
      <Footer />
    </div>
  );
};

export default DPGenerator;
