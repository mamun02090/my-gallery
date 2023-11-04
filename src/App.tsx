import { mediaQuery } from "./shared/constants";
import { SelectedImageProvider } from "./contexts/SelectedImageContext";
import DragContext from "./components/DragContext/DragContext";
import Test from "./components/Test";

function App() {
  return (
    // <DragDropContext onDragEnd={() => {}}>
    <SelectedImageProvider>
      <div className={`py-20 ${mediaQuery}`}>
        <Test />
      </div>
    </SelectedImageProvider>
    // </DragDropContext>
  );
}

export default App;
