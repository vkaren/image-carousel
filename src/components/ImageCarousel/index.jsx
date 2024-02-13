import { useContext } from "react";
import { AppContext } from "@context";
import Images from "@components/Images";
import Selectors from "@components/Selectors";
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
          fetchpriority="high"
          loading="eager"
          alt="Backward button"
        />
      </button>

      <Images />
      <Selectors />

      <button className="forward-button" onClick={slideForward}>
        <img
          src={arrowIconLarge}
          srcSet={`${arrowIconSmall} 480w, ${arrowIconLarge} 1080w`}
          fetchpriority="high"
          loading="eager"
          alt="Forward button"
        />
      </button>
    </section>
  );
}

export default ImageCarousel;
