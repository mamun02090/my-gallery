import { SelectedImageProvider } from "./contexts/SelectedImageContext";
import Gallery from "./features/Gallery/Gallery";

import { mediaQuery } from "./shared/constants";

function App() {
  return (
    <SelectedImageProvider>
      <div className={`py-20 ${mediaQuery}`}>
        <Gallery />
      </div>
    </SelectedImageProvider>
  );
}

export default App;
