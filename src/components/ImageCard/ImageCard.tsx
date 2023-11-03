import React, { useState, useContext } from "react";
import { Props } from "./type";
import classNames from "clsx";
import { ImageContext } from "../../contexts/SelectedImageContext";

const ImageCard: React.FC<React.PropsWithChildren<Props>> = (props) => {
  const { className = "", imageSource, index, id } = props;
  const [isImageHover, setIsImageHover] = useState<boolean>(false);
  const context = useContext(ImageContext);

  if (!context) {
    return null;
  }

  const { selectedImage, setSelectedImage } = context;
  console.log(selectedImage);
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    if (checked) {
      setSelectedImage((prev) => [...prev, id]);
    } else {
      const checkedImages = selectedImage.filter((image) => image != id);
      setSelectedImage(checkedImages);
    }
  };
  return (
    <div
      className={classNames({
        " md:w-[436px] md:h-[500px]": index === 0,
        "relative  border flex border-gray rounded": true,
        " md:h-60 md:w-52": index !== 0,
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
          " absolute top-0 flex items-start justify-start h-full  rounded bg-overLayerColor z-50 ":
            true,
          "w-full ": isImageHover,
          "w-0": !isImageHover,
        })}
      >
        {isImageHover && (
          <input
            className="absolute top-2 left-2  sm:top-5 flex sm:left-5 md:w-5 md:h-5 "
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
