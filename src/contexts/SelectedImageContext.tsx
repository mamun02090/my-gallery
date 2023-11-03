import React, { PropsWithChildren, createContext } from "react";

// Define a type for the context data
type MyContextData = {
  selectedImage: number[];
  setSelectedImage: React.Dispatch<React.SetStateAction<number[]>>;
};

// Create the context
export const ImageContext = createContext<MyContextData | undefined>(undefined);

export const SelectedImageProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [selectedImage, setSelectedImage] = React.useState<number[]>([]);

  const contextValue: MyContextData = {
    selectedImage,
    setSelectedImage,
  };

  return (
    <ImageContext.Provider value={contextValue}>
      {children}
    </ImageContext.Provider>
  );
};
