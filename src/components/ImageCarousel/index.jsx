import React, { useContext } from "react";
import { AppContext } from "@context";
import arrowIconLarge from "@icons/icons8-galón-izquierdo-62.png";
import arrowIconSmall from "@icons/icons8-galón-izquierdo-48.png";
import "./styles.css";

function ImageCarousel() {
  const { slideBackward, slideForward } = useContext(AppContext);
  return (
    <section className="image-carousel" aria-label="dog image carousel">
      <button className="backward-button" onClick={slideBackward}>
        <img
          src={arrowIconLarge}
          srcSet={`${arrowIconSmall} 480w, ${arrowIconLarge} 1080w`}
          alt="Backward button"
        />
      </button>
      {/*
      To do
      
      <Images /> 
      <Selectors />
      
      */}
      <button className="forward-button" onClick={slideForward}>
        <img
          src={arrowIconLarge}
          srcSet={`${arrowIconSmall} 480w, ${arrowIconLarge} 1080w`}
          alt="Forward button"
        />
      </button>
    </section>
  );
}

export default ImageCarousel;
