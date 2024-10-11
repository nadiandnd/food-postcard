import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import "./App.css";

function App() {
  const [foodName, setFoodName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [foodImage, setFoodImage] = useState(null); // Store the uploaded image
  const postcardRef = useRef(null);

  const handleDownload = () => {
    const postcardElement = postcardRef.current;
    html2canvas(postcardElement).then((canvas) => {
      const link = document.createElement("a");
      link.download = `ป้ายโรงทาน - ${ownerName}.png`;
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFoodImage(URL.createObjectURL(file)); // Create a URL for the uploaded image
    }
  };

  const handleFoodNameChange = (e) => {
    setFoodName(e.target.value);
  };

  const handleOwnerNameChange = (e) => {
    setOwnerName(e.target.value);
  };

  return (
    <div className="App">
      {/* Form to input data */}
      <div className="form-container">
        <h3>แบบฟอร์มป้ายโรงทาน</h3>
        <form>
          <div>
            <label>รูปอาหาร:</label>
            <input type="file" onChange={handleImageChange} accept="image/*" />
          </div>
          <div>
            <label>ชื่ออาหาร:</label>
            <input
              type="text"
              value={foodName}
              onChange={handleFoodNameChange}
            />
          </div>
          <div>
            <label>ชื่อเจ้าภาพ:</label>
            <input
              type="text"
              value={ownerName}
              onChange={handleOwnerNameChange}
            />
          </div>
        </form>
      </div>

      {/* Postcard Preview */}
      <div ref={postcardRef} className="postcard-container">
        <div className="postcard-content">
          {foodImage && (
            <img
              id="food-image"
              className="food-image"
              src={foodImage}
              alt="Food"
            />
          )}
          <p className="food-name">{foodName}</p>
          <p className="owner-name">{ownerName}</p>
        </div>
      </div>

      {/* Download button */}
      <button onClick={handleDownload} className="download-button">
        ดาวน์โหลดภาพ
      </button>
    </div>
  );
}

export default App;
