import { SelectedImageProvider } from "./contexts/SelectedImageContext";
import {
  MultiBackend,
  TouchTransition,
  MouseTransition,
  DndProvider,
} from "react-dnd-multi-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { HTML5Backend } from "react-dnd-html5-backend";

import Gallery from "./features/Gallery/Gallery";

export const HTML5toTouch = {
  backends: [
    {
      id: "html5",
      backend: HTML5Backend,
      transition: MouseTransition,
    },
    {
      id: "touch",
      backend: TouchBackend,
      options: { enableMouseEvents: true },
      preview: true,
      transition: TouchTransition,
    },
  ],
};

function App() {
  return (
    <SelectedImageProvider>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <DndProvider backend={MultiBackend} options={HTML5toTouch}>
        <Gallery />
      </DndProvider>
    </SelectedImageProvider>
  );
}

export default App;
