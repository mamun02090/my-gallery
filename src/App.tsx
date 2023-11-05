import { SelectedImageProvider } from "./contexts/SelectedImageContext";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Gallery from "./features/Gallery/Gallery";

function App() {
  return (
    <SelectedImageProvider>
      <DndProvider backend={HTML5Backend}>
        <Gallery />
      </DndProvider>
    </SelectedImageProvider>
  );
}

export default App;
