export interface Props {
  className?: string;
  imageSource: string;
  index: number;
  id: number;
  moveImage: (dragIndex: number, hoverIndex: number) => void;
}
