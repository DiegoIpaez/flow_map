import useFlowStore from "@/store/flowStore";
import { useState } from "react";
import ReactFlow, {
  Controls,
  Background,
  MiniMap,
  Panel,
  BackgroundVariant,
} from "reactflow";
import PanelContent from "./panelContent/PanelContent";
import nodeColor from "@/helpers/nodeColorHelper";
import TextUpdaterNode from "@/components/node/textUpdaterNode/TextUpdaterNode";

const { Dots } = BackgroundVariant;

const defaultEdgeOptions = { animated: true };
const nodeTypes = { textUpdater: TextUpdaterNode };

const miniMapProps = {
  nodeColor,
  nodeStrokeWidth: 1,
  pannable: true,
  zoomable: false,
};

const Flow = () => {
  const { edges, nodes, saveEdgeChanges, saveNodeChanges, onConnect } = useFlowStore();

  const [variant, setVariant] = useState<BackgroundVariant>(Dots);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={saveNodeChanges}
      onEdgesChange={saveEdgeChanges}
      onConnect={onConnect}
      defaultEdgeOptions={defaultEdgeOptions}
      nodeTypes={nodeTypes}
    >
      <Background variant={variant} />
      <Panel position={"top-left"}>
        <PanelContent setVariant={setVariant} />
      </Panel>
      <Controls />
      <MiniMap {...miniMapProps} />
    </ReactFlow>
  );
};

export default Flow;
