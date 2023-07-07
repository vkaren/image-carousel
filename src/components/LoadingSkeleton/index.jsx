import "./styles.css";

function LoadingSkeleton() {
  return (
    <section className="skeleton" aria-disabled={true} aria-label="Loading">
      <div className="section_select-breed"></div>
      <div className="section_images"></div>
      <div className="images_selectors"></div>
    </section>
  );
}

export default LoadingSkeleton;
