import React, { useContext, useState, useRef } from "react";
import { ImImage } from "react-icons/im";
import classNames from "clsx";

import { Image } from "./type";
import ImageCard from "../../components/ImageCard/ImageCard";
import GalleryCard from "../../components/GalleryCard/GalleryCard";
import { ImageContext } from "../../contexts/SelectedImageContext";
import { images } from "../../shared/constants";

const Gallery: React.FC = () => {
  //state to track images after the deletion
  const [activeImages, setActiveImages] = useState<Image[]>(images);
  //create a new context for selected image context
  const context = useContext(ImageContext);

  //to track the drag start item
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dragItem = useRef<any>(null);

  //to track the drag enter item
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dragOverItem = useRef<any>(null);

  //to handle undefined context
  if (!context) {
    return null;
  }

  const { selectedImage, setSelectedImage } = context;

  //delete selected image
  const deleteFiles = () => {
    //filter out the selected image
    const filteredImage = activeImages.filter(
      (image) => !selectedImage.includes(image.id)
    );
    setActiveImages(filteredImage);
    setSelectedImage([]);
  };

  //handle the reordering by dragging the image
  const handleReordering = () => {
    const _activeImage = [...activeImages];
    const draggedItem = _activeImage.splice(dragItem.current, 1)[0];

    _activeImage.splice(dragOverItem.current, 0, draggedItem);
    //reset the reference
    dragItem.current = null;
    dragOverItem.current = null;

    //update the dragged images
    setActiveImages(_activeImage);
  };

  return (
    <GalleryCard className="xl:max-w-[1180px] lg:max-w-[972px] md:max-w-[744px] media510:max-w-[500px] mx-auto">
      <div className="flex flex-col  gap-5 items-center ">
        <div className="self-start text-md  media380:text-xl font-bold py-5 border-b border-1 w-full">
          {selectedImage && selectedImage.length > 0 ? (
            <div className="flex px-2 md:px-0 gap-5 mx-auto items-center media470:max-w-[436px] md:max-w-[664px] xl:max-w-[1120px] lg:max-w-[892px] justify-between">
              <div className="flex gap-2 items-center">
                <input
                  className="h-4 w-4 media380:h-6 media380:w-6"
                  type="checkbox"
                  checked={selectedImage.length > 0 ? true : false}
                  onChange={() => setSelectedImage([])}
                />
                <h2>
                  {selectedImage.length}{" "}
                  {selectedImage.length > 1 ? "files" : "file"} selected
                </h2>
              </div>
              <button
                className="bg-none font-medium border-0 text-red-800"
                onClick={deleteFiles}
              >
                Delete {selectedImage.length > 1 ? "files" : "file"}
              </button>
            </div>
          ) : (
            <h2 className="mx-auto items-center pl-2 sm:pl-5 md:pl-0 media510:max-w-[436px] md:max-w-[664px] xl:max-w-[1120px] lg:max-w-[892px] justify-between ">
              Gallery
            </h2>
          )}
        </div>

        <div className="grid mx-auto gap-2 sm:gap-3 px-2 md:gap-5 grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 pb-5 justify-center items-center content-center justify-items-center  ">
          {activeImages.map((image, index) => {
            return (
              <div
                draggable
                onDragStart={() => (dragItem.current = index)}
                onDragEnter={() => (dragOverItem.current = index)}
                onDragEnd={handleReordering}
                onTouchStart={() => (dragItem.current = index)}
                onTouchMove={() => (dragOverItem.current = index)}
                onTouchEnd={handleReordering}
                className={classNames({
                  "col-span-2 row-span-2": index === 0,
                  " cursor-pointer": true,
                })}
              >
                <ImageCard
                  imageSource={`/images/${image.imageSource}`}
                  index={index}
                  id={image.id}
                />
              </div>
            );
          })}
          <div className="border border-gray border-dashed rounded h-full w-full flex items-center justify-center">
            <div className="flex items-center flex-col gap-2">
              <ImImage className="w-8 h-8" />
              <p className="text-xs media500:text-base">Add Image</p>
            </div>
          </div>
        </div>
      </div>
    </GalleryCard>
  );
};

export default Gallery;
