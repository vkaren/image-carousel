import React, { useState, createContext, useEffect } from "react";
const AppContext = createContext({});

function AppProvider({ children }) {
  // Image list
  const [images, setImages] = useState([]);

  // Breed option selected
  const [selectedBreed, setSelectedBreed] = useState("chihuahua");

  // Image to display
  const [currentImageId, setCurrentImageId] = useState(0);

  // Slide animation mode
  const [slideMode, setSlideMode] = useState("forward");

  // The mouse is/isn't over an image
  const [isMouseOver, setMouseOver] = useState(false);

  useEffect(() => {
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
    getImages();
  }, [selectedBreed]);

  useEffect(() => {
    let timer = null;

    if (images.length && !isMouseOver) {
      timer = setTimeout(slideForward, 3000);
    }

    return () => clearTimeout(timer);
  }, [images, currentImageId, isMouseOver]);

  const onSelectBreed = (e) => {
    setImages([]);
    setCurrentImageId(0);
    setSlideMode("forward");
    setMouseOver(false);
    setSelectedBreed(e.currentTarget.value);
  };

  const slideForward = () => {
    if (slideMode !== "forward") {
      setSlideMode("forward");
    }

    if (currentImageId < images.length - 1) {
      setCurrentImageId(currentImageId + 1);
    } else {
      setCurrentImageId(0);
    }
  };

  const slideBackward = () => {
    const prevImageId =
      currentImageId - 1 < 0 ? images.length - 1 : currentImageId - 1;

    if (slideMode !== "backward") {
      setSlideMode("backward");
    }
    setCurrentImageId(prevImageId);
  };

  const selectImage = (event) => {
    const selector = event.currentTarget;
    const selectorId = selector.id.split("-")[1] - "";

    if (selectorId < currentImageId) {
      if (slideMode !== "backward") {
        setSlideMode("backward");
      }
    } else {
      if (slideMode !== "forward") {
        setSlideMode("forward");
      }
    }

    setCurrentImageId(selectorId);
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
