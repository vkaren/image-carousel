import React, { useContext } from "react";
import { AppContext } from "@context";
import "./styles.css";

function Selectors() {
  const { images, currentImageId, selectImage } = useContext(AppContext);
  return (
    <div className="images-selectors">
      {images.map((url, i) => (
        <button
          className={`selector ${currentImageId === i && "active"}`}
          id={`sel-${i}`}
          key={`sel-${i}`}
          aria-label={`select image number ${i + 1}`}
          onClick={selectImage}
        ></button>
      ))}
    </div>
  );
}

export default Selectors;
