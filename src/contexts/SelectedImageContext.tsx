import React, { PropsWithChildren, createContext } from "react";
import { Image } from "../features/Gallery/type";
import { images } from "../shared/constants";

// Define a type for the context data
type MyContextData = {
  selectedImage: number[];
  setSelectedImage: React.Dispatch<React.SetStateAction<number[]>>;
  activeImages: Image[];
  setActiveImages: React.Dispatch<React.SetStateAction<Image[]>>;
};

// Create the context
export const ImageContext = createContext<MyContextData | undefined>(undefined);

export const SelectedImageProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [selectedImage, setSelectedImage] = React.useState<number[]>([]);
  const [activeImages, setActiveImages] = React.useState<Image[]>(images);
  const contextValue: MyContextData = {
    selectedImage,
    setSelectedImage,
    activeImages,
    setActiveImages,
  };

  return (
    <ImageContext.Provider value={contextValue}>
      {children}
    </ImageContext.Provider>
  );
};
