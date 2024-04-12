import React from "react";

import "./css/custom-input.css";
const CustomFileInput = ({ onFileChange, imageUrl }: any) => {
  const handleFileChange = (e: any) => {
    if (e && e.target && e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      onFileChange(file);
    }
  };

  return (
    <div className="custom-file-input">
      <label className="custom-file-label relative mb-4" htmlFor="file">
        {"Choose file"}
      </label>

      {imageUrl && (
        <div className="image-container">
          <img src={imageUrl} alt="selected" />
        </div>
      )}
      <input
        type="file"
        id="file"
        className="input-file"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default CustomFileInput;
