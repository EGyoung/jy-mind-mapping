export type Node = {
  width: number;
  height: number;
  text: string;
  color: string;
  backgroundColor: string;
  id: string;
  position: NodePosition;
  children: Node[];
};

export type NodePosition = {
  x: number;
  y: number;
};