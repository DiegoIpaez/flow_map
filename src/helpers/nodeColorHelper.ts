import { type Node } from "reactflow";

const nodeColor = (node: Node) => {
  switch (node.type) {
    case "textUpdater":
      return "#6ede87";
    default:
      return "#ff0072";
  }
};

export default nodeColor;
