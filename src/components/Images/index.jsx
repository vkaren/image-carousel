import React, { useContext } from "react";
import { AppContext } from "@context";
import spinnerIcon from "@icons/icons8-spinner-marco-5-50.png";
import "./styles.css";

function Images() {
  const {
    images,
    selectedBreed,
    currentImageId,
    slideMode,
    onMouseEnter,
    onMouseOut,
  } = useContext(AppContext);

  return (
    <div className="images">
      {images.length ? (
        images.map((url, i) => (
          <img
            src={url}
            alt={`${selectedBreed} dog`}
            aria-hidden={currentImageId !== i}
            loading="lazy"
            className={`dog-img ${currentImageId === i && slideMode}`}
            id={`img-${i}`}
            key={`img-${i}`}
            onMouseEnter={onMouseEnter}
            onMouseOut={onMouseOut}
            onTouchStart={onMouseEnter}
            onTouchEnd={onMouseOut}
          />
        ))
      ) : (
        <img src={spinnerIcon} alt="Loading" className="spinner" />
      )}
    </div>
  );
}

export default Images;
