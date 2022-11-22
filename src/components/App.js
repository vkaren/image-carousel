import React from "react";

class App extends React.Component {
  state = {
    urls: [],
    imagesRef: {},
    selectorsRef: {},
    currentImage: 0,
    topImages: "all",
    slide: "forward",
  };

  componentDidMount() {
    this.getImages();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentImage !== this.state.currentImage) {
      if (
        this.state.imagesRef[this.state.currentImage] &&
        this.state.imagesRef[this.state.currentImage].current
      ) {
        this.state.imagesRef[prevState.currentImage].current.classList.remove(
          "start",
          "slide-forward",
          "slide-backward"
        );

        this.state.selectorsRef[
          prevState.currentImage
        ].current.classList.remove("active");

        this.state.selectorsRef[this.state.currentImage].current.classList.add(
          "active"
        );

        if (this.state.slide === "forward") {
          this.state.imagesRef[this.state.currentImage].current.classList.add(
            "slide-forward"
          );
        } else {
          this.state.imagesRef[this.state.currentImage].current.classList.add(
            "slide-backward"
          );
        }
      }
    }
    if (prevState.topImages !== this.state.topImages) {
      clearInterval(this.timer);
      this.setState(
        { urls: [], imagesRef: {}, selectorsRef: {}, currentImage: 0 },
        () => this.getImages()
      );
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  getImages = () => {
    const topImages = this.state.topImages;

    fetch(`https://www.reddit.com/r/aww/top/.json?t=${topImages}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        let urls = this.state.urls;
        let imagesRef = this.state.imagesRef;
        let selectorsRef = this.state.selectorsRef;

        urls = result.data.children
          .filter((img) => img.data.url_overridden_by_dest.includes("jpg"))
          .map((img) => ({
            url: img.data.url_overridden_by_dest,
            alt: img.data.title,
          }));

        for (let i = 0; i < urls.length; i++) {
          imagesRef[i] = React.createRef();
          selectorsRef[i] = React.createRef();
        }

        this.setState({ urls, imagesRef, selectorsRef }, () => {
          this.timer = setInterval(() => {
            this.nextImage();
          }, 3000);
        });
      })
      .catch((error) => console.log("Error: " + error));
  };

  previousImage = () => {
    clearInterval(this.timer);

    let currentImage = this.state.currentImage;

    if (currentImage > 0) {
      currentImage--;
    } else {
      currentImage = this.state.urls.length - 1;
    }

    this.setState({ currentImage, slide: "backward" }, () => {
      this.timer = setInterval(() => {
        this.nextImage();
      }, 3000);
    });
  };

  nextImage = (event) => {
    if (event) {
      clearInterval(this.timer);
    }

    let currentImage = this.state.currentImage;

    if (currentImage < this.state.urls.length - 1) {
      currentImage++;
    } else {
      currentImage = 0;
    }

    this.setState({ currentImage, slide: "forward" }, () => {
      if (event) {
        this.timer = setInterval(() => {
          this.nextImage();
        }, 3000);
      }
    });
  };

  selectImage = (event) => {
    clearInterval(this.timer);

    const imgSelected = event.currentTarget.id;
    let currentImage = this.state.currentImage;
    let slide = this.state.slide;

    if (imgSelected < currentImage) {
      slide = "backward";
    } else {
      slide = "forward";
    }
    currentImage = imgSelected;

    this.setState({ currentImage, slide }, () => {
      this.timer = setInterval(() => {
        this.nextImage();
      }, 3000);
    });
  };

  selectTopImages = (event) => {
    const selectorValue = event.currentTarget.value;
    let topImages = this.state.topImages;

    topImages = selectorValue;

    this.setState({ topImages });
  };

  render() {
    return (
      <div>
        <div className="select-top" key="select-top">
          <label htmlFor="top-img-select">Top images</label>

          <select
            name="top"
            id="top-img-select"
            onChange={this.selectTopImages}
          >
            <option value="all">All</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
            <option value="year">Year</option>
          </select>
        </div>

        <div className="box" key="box-image">
          <a onClick={this.previousImage} className="left">
            <img
              src="https://img.icons8.com/fluency-systems-regular/48/ffffff/chevron-left--v2.png"
              alt="Previous image"
            />
          </a>

          {this.state.urls.length ? (
            this.state.urls.map((img, i) => (
              <img
                key={"img" + i}
                ref={this.state.imagesRef[i]}
                className={i === 0 ? "reddit-img slide-forward" : "reddit-img"}
                onMouseEnter={() => {
                  this.state.imagesRef[i].current.classList.remove(
                    "slide-forward",
                    "slide-backward",
                    "start"
                  );
                  this.state.imagesRef[i].current.classList.add("pause");

                  clearInterval(this.timer);
                }}
                onMouseOut={() => {
                  this.state.imagesRef[i].current.classList.remove("pause");
                  this.state.imagesRef[i].current.classList.add("start");
                  this.timer = setInterval(() => {
                    this.nextImage();
                  }, 3000);
                }}
                src={img.url}
                alt={img.alt}
              />
            ))
          ) : (
            <img
              className="load"
              src="https://img.icons8.com/ios/50/ffffff/spinner-frame-4.png"
              alt="Loading..."
            />
          )}

          <div className="selectors">
            {this.state.urls.map((url, i) => (
              <span
                key={"selector" + i}
                ref={this.state.selectorsRef[i]}
                id={i}
                className={i === 0 ? "selector-slide active" : "selector-slide"}
                role="button"
                onClick={this.selectImage}
              ></span>
            ))}
          </div>
          <a onClick={this.nextImage} className="right">
            <img
              src="https://img.icons8.com/fluency-systems-regular/48/ffffff/chevron-left--v2.png"
              alt="Next image"
            />
          </a>
        </div>
      </div>
    );
  }
}

export default App;
