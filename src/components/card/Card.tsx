import React from "react";
import classNames from "clsx";

import { Props } from "./type";

const Card: React.FC<React.PropsWithChildren<Props>> = (props) => {
  const { children, className = "" } = props;

  return (
    <div
      className={classNames({
        "bg-white border-1 border border-gray rounded": true,
        [className]: true,
      })}
    >
      {children}
    </div>
  );
};

export default Card;
