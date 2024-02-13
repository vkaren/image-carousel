import { useState, createContext, useEffect } from "react";
const AppContext = createContext({});

function AppProvider({ children }) {
  const [images, setImages] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("dachshund");
  const [currentImageId, setCurrentImageId] = useState(0);
  const [slideMode, setSlideMode] = useState("forward");
  const [isMouseOver, setMouseOver] = useState(false);

  useEffect(() => {
    getImages();
  }, [selectedBreed]);

  useEffect(() => {
    let timer = null;

    if (images.length && !isMouseOver) {
      timer = setTimeout(slideForward, 3000);
    }

    return () => clearTimeout(timer);
  }, [images, currentImageId, isMouseOver]);

  const getImages = async () => {
    try {
      const response = await fetch(
        `https://dog.ceo/api/breed/${selectedBreed}/images/random/10`
      );

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const responseJson = await response.json();
      const imagesUrls = responseJson.message;

      setImages(imagesUrls);
    } catch (err) {
      throw new Error(err);
    }
  };

  const onSelectBreed = (e) => {
    setImages([]);
    setCurrentImageId(0);
    setSlideMode("forward");
    setMouseOver(false);
    setSelectedBreed(e.currentTarget.value);
  };

  const slideForward = (_, imageId = getNextImageId()) => {
    if (slideMode !== "forward") {
      setSlideMode("forward");
    }
    setCurrentImageId(imageId);
  };

  const slideBackward = (_, imageId = getPrevImageId()) => {
    if (slideMode !== "backward") {
      setSlideMode("backward");
    }
    setCurrentImageId(imageId);
  };

  const getNextImageId = () =>
    currentImageId < images.length - 1 ? currentImageId + 1 : 0;

  const getPrevImageId = () =>
    currentImageId - 1 < 0 ? images.length - 1 : currentImageId - 1;

  const selectImage = (event) => {
    const selector = event.currentTarget;
    const selectorId = selector.id.split("-")[1] - "";

    if (selectorId < currentImageId) {
      slideBackward(null, selectorId);
    } else {
      slideForward(null, selectorId);
    }
  };

  const onMouseEnter = (e) => {
    setMouseOver(true);
    setSlideMode("pause");
  };

  const onMouseOut = (e) => {
    setMouseOver(false);
    setSlideMode("active");
  };

  return (
    <AppContext.Provider
      value={{
        images,
        selectedBreed,
        currentImageId,
        slideMode,
        selectImage,
        slideBackward,
        slideForward,
        onMouseEnter,
        onMouseOut,
        onSelectBreed,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export { AppContext, AppProvider };
