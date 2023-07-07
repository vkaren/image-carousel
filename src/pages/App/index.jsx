import { Suspense, lazy } from "react";
import { AppProvider } from "@context";
import LoadingSkeleton from "@components/LoadingSkeleton";
import "./styles.css";

const SelectBreed = lazy(() => import("@components/SelectBreed"));
const ImageCarousel = lazy(() => import("@components/ImageCarousel"));

function App() {
  return (
    <AppProvider>
      <Suspense fallback={<LoadingSkeleton />}>
        <SelectBreed />
        <ImageCarousel />
      </Suspense>
    </AppProvider>
  );
}

export default App;
