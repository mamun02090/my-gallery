import React, { useRef, useState } from "react";
import classNames from "clsx";
import "./test.css";
const todo = [
  {
    id: "item-1",
    content: "Item-1",
  },
  {
    id: "item-2",
    content: "Item-2",
  },
  {
    id: "item-3",
    content: "Item-3",
  },
  {
    id: "item-4",
    content: "Item-4",
  },
  {
    id: "item-5",
    content: "Item-5",
  },
  {
    id: "item-6",
    content: "Item-6",
  },
  {
    id: "item-7",
    content: "Item-7",
  },
  {
    id: "item-8",
    content: "Item-8",
  },
  {
    id: "item-9",
    content: "Item-9",
  },
];

// a little function to help us with reordering the result

const grid = 8;

const Test = () => {
  const [data, setData] = useState(todo);
  const [isDrag, setIsDraging] = useState();
  const containerRef = useRef();

  const detectLeftButton = (e) => {
    e = e || window.event;
    if ("button" in e) {
      return e.buttons === 1;
    }
    const button = e.which || e.button;
    return button === 1;
  };

  const dragStart = (e, index) => {
    if (!detectLeftButton(e)) return;
    setIsDraging(index);

    const container = containerRef.current;
    const items = [...container.childNodes];
    const dragItem = items[index];
    const itemBelongDragItem = items.slice(index + 1);
    const noDragItems = items.filter((item, i) => i !== index);
    const dragData = data[index];
    let newData = [...data];
    //distance between two card
    const spaceY =
      items[1].getBoundingClientRect().top -
      items[0].getBoundingClientRect().bottom;
    const spaceX =
      items[1].getBoundingClientRect().left -
      items[0].getBoundingClientRect().right;

    const dragBoundingClientRect = dragItem.getBoundingClientRect();

    //set style for dragitem
    dragItem.style.position = "fixed";
    dragItem.style.zIndex = 5000;
    dragItem.style.width = dragBoundingClientRect.width + "px";
    dragItem.style.height = dragBoundingClientRect.height + "px";
    dragItem.style.top = dragBoundingClientRect.top + "px";
    dragItem.style.left = dragBoundingClientRect.left + "px";
    dragItem.style.cursor = "grabbing";

    //temp div
    const div = document.createElement("div");
    div.id = "div-temp";
    div.style.width = dragBoundingClientRect.width + "px";
    div.style.height = dragBoundingClientRect.height + "px";
    div.style.pointerEvents = "none";
    container.appendChild(div);

    //distance to be moved
    const distanceY = dragBoundingClientRect.height + spaceY;
    const distanceX = dragBoundingClientRect.width + spaceX;

    itemBelongDragItem.forEach((item) => {
      item.style.transform = `translate(${distanceX}px, ${distanceY}px)`;
    });

    //get the original coordinates for mouse pointer
    const x = e.clientX;
    const y = e.clientY;
    document.onpointermove = dragMove;
    function dragMove(e) {
      //original coordinates minus current coordinates
      const posX = e.clientX - x;
      const posY = e.clientY - y;
      dragItem.style.transform = `translate(${posX}px, ${posY}px)`;
      //swap the position and data
      noDragItems.forEach((item) => {
        //check the element is overlapping
        const rect1 = dragItem.getBoundingClientRect();
        const rect2 = item.getBoundingClientRect();
        const isOverlapping =
          rect1.y < rect2.y + rect2.height / 2 &&
          rect1.y + rect1.height / 2 > rect2.y &&
          rect1.x < rect2.x + rect2.width / 2 &&
          rect1.x + rect1.width / 2 > rect2.x;
        if (isOverlapping) {
          if (item.getAttribute("style")) {
            item.style.transform = "";
            index++;
          } else {
            item.style.transform = `translate(${distanceX}px, ${distanceY}px)`;
            index--;
          }
          newData = data.filter((item) => item.id !== dragData.id);
          newData.splice(index, 0, dragData);
        }
      });
    }

    // console.log(div);
    document.onpointerup = dragEnd;
    function dragEnd() {
      document.onpointerup = () => {};
      document.onpointermove = () => {};
      setIsDraging(undefined);
      dragItem.style = "";
      // container.removeChild(div);
      items.forEach((item) => (item.style = ""));
      setData(newData);
    }
  };

  return (
    <div
      ref={containerRef}
      className="container-touch main_content grid grid-cols-4 gap-5"
    >
      {data.map((item, index) => (
        <div
          key={item.id}
          className={classNames({
            "bg-gray-200 p-2 w-40 h-40": true,
            "pointer-events-none drag": isDrag === index,
          })}
          onPointerDown={(e) => dragStart(e, index)}
        >
          {item.id}
        </div>
      ))}
    </div>
  );
};

export default Test;
