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
    console.log(destination, source);
    activeImages.splice(source.index, 1);
    console.log(activeImages);
    const destDropId = destination.droppableId;
    const tmp = destDropId;
    destination.droppableId = source.droppableId;
    source.droppableId = tmp;
    const tmpDestIndex = destination.index;
    destination.index = source.index;
    source.index = tmpDestIndex;
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
