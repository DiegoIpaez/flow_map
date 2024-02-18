import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
  type Node,
  type Edge,
  type NodeChange,
  type EdgeChange,
  type Connection,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from "reactflow";

interface IFlowStore {
  nodes: Node[];
  edges: Edge[];
  saveNodeChanges: (newNodes: NodeChange[]) => void;
  saveEdgeChanges: (newEdges: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
  setNodeById: (id: string, label: string) => void;
}

const initialNodes = [
  {
    id: "1",
    type: "textUpdater",
    data: { label: "Input Node" },
    position: { x: 250, y: 25 },
  },

  {
    id: "2",
    type: "textUpdater",
    data: { label: "Default node" },
    position: { x: 100, y: 125 },
  },
  {
    id: "3",
    type: "output",
    data: {
      label: "Output Node asds df sadfdsafsd fdsafsd fsdfdsa fds fdsa fds f",
    },
    position: { x: 250, y: 250 },
  },
];

const initialEdges = [
  { id: "e1-2", source: "1", target: "2", label: "to be" },
  { id: "e2-3", source: "2", target: "3", animated: true },
];

const useFlowStore = create(
  persist<IFlowStore>(
    (set) => ({
      nodes: initialNodes,
      edges: initialEdges,
      saveNodeChanges: (newNodes: NodeChange[]) => {
        set((state) => ({
          ...state,
          nodes: applyNodeChanges(newNodes, state.nodes),
        }));
      },
      saveEdgeChanges: (newEdges: EdgeChange[]) => {
        set((state) => ({
          ...state,
          edges: applyEdgeChanges(newEdges, state.edges),
        }));
      },
      onConnect: (connection: Connection) => {
        set((state) => ({
          ...state,
          edges: addEdge(connection, state.edges),
        }));
      },
      setNodeById: (id: string, label: string) => {
        set((state) => {
          const node = state.nodes.find((node) => node?.id === id);
          if (!node) return state;
          const updatedNodes = state.nodes.map((node) => {
            if (node?.id === id && node?.data) {
              node.data.label = label;
              return node;
            }
            return node;
          });
          return { ...state, nodes: updatedNodes };
        });
      },
      removeNode: (id: string) => {
        set((state) => {
          const node = state.nodes.find((node) => node?.id === id);
          if (!node) return state;
          const updatedNodes = state.nodes.filter((node) => node?.id !== id );
          return { ...state, nodes: updatedNodes };
        });
      }
    }),
    {
      name: "flow",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useFlowStore;
