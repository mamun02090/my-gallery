import React, { PropsWithChildren } from "react";
import Card from "../card/Card";
import { Props } from "./type";

const GalleryCard: React.FC<PropsWithChildren<Props>> = (props) => {
  const { children, className = "" } = props;
  return <Card className={className}>{children}</Card>;
};

export default GalleryCard;
