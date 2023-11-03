import { useContext } from "react";
import { ImageContext } from "../contexts/SelectedImageContext";

export const useSelectedImage = () => {
  return useContext(ImageContext);
};
