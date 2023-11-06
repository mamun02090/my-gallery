import React, { useState, useContext } from "react";
import classNames from "clsx";
import { DropTargetMonitor, useDrag, useDrop } from "react-dnd";

import { Props } from "./type";
import { ImageContext } from "../../contexts/SelectedImageContext";

const ImageCard: React.FC<React.PropsWithChildren<Props>> = (props) => {
  const { className = "", imageSource, index, id, moveImage } = props;
  const [isImageHover, setIsImageHover] = useState<boolean>(false);
  const context = useContext(ImageContext);
  const ref = React.useRef<HTMLDivElement | null>(null);

  type Item = {
    id: number;
    index: number;
  };

  const [, drop] = useDrop({
    accept: "image",
    hover: (item: Item, monitor: DropTargetMonitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      //handle the corner case of same index drag and drop
      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();
      let hoverClientY = 0;
      if (clientOffset) {
        hoverClientY = clientOffset.y - hoverBoundingRect.top;
      }

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveImage(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "image",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging(),
      };
    },
  });

  if (!context) {
    return null;
  }

  const { selectedImage, setSelectedImage } = context;

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    if (checked) {
      //add checked image to selected image
      setSelectedImage((prev) => [...prev, id]);
    } else {
      //remove unchecked image from selected image
      const checkedImages = selectedImage.filter((image) => image != id);
      setSelectedImage(checkedImages);
    }
  };

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={classNames({
        " md:w-[436px] md:h-[500px]": index === 0,
        "relative border-2 flex border-gray-300 transition-all duration-500 rounded ":
          true,
        " md:h-60 md:w-52": index !== 0,
        "shadow md:h-60 md:w-52": isDragging,

        [className]: true,
      })}
      onMouseEnter={() => setIsImageHover(true)}
      onMouseLeave={() => setIsImageHover(false)}
    >
      <img
        src={imageSource}
        className="rounded"
        height={index === 0 ? 500 : 240}
        width={index === 0 ? 436 : 208}
      ></img>
      <div
        className={classNames({
          " absolute top-0 flex w-full items-start justify-start h-full transition-opacity duration-500 rounded bg-overLayerColor z-50 ":
            true,
          " opacity-1 ": isImageHover,
          "opacity-0": !isImageHover,
        })}
      >
        {isImageHover && (
          <input
            className={classNames({
              "absolute top-2 left-2 transition-opacity duration-500 sm:top-5 flex sm:left-5 md:w-5 md:h-5 ":
                true,
              " opacity-1 ": isImageHover,
              "opacity-0": !isImageHover,
            })}
            type="checkbox"
            checked={selectedImage.includes(id) ? true : false}
            onChange={(e) => changeHandler(e)}
          />
        )}
      </div>
    </div>
  );
};

export default ImageCard;
