import { useContext } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import Gallery from "../../features/Gallery/Gallery";
import { ImageContext } from "../../contexts/SelectedImageContext";

function DragContext() {
  //create a new context for selected image context
  const context = useContext(ImageContext);

  //to handle undefined context
  if (!context) {
    return null;
  }

  const { activeImages, setActiveImages } = context;
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination || source.index === destination.index) {
      return;
    }
    const dragItem = activeImages[source.index];
    console.log(destination.index, source.index);
    activeImages.splice(source.index, 1);
    console.log(activeImages);
    activeImages.splice(destination.index, 0, dragItem);
    setActiveImages(activeImages);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Gallery />
    </DragDropContext>
  );
}

export default DragContext;
