import React, { useState, useRef, useCallback, useMemo } from "react";
import ReactFlow, { ReactFlowProvider, Controls, Panel } from "reactflow";
import { useSnapshot } from "valtio";
import {
  store,
  onNodesChange,
  onEdgesChange,
  onConnect,
  setNodes,
} from "@/stores/index";
import { IconPlay, IconSave } from "@douyinfe/semi-icons";
import { Button } from "@douyinfe/semi-ui";
import { RectangleNode, TextNode, FadeInNode } from "./nodes";
import nodesProps from "./nodes/data";

import { v4 as uuidv4 } from "uuid";
import "reactflow/dist/style.css";

const nodes = {
  RectangleNode: RectangleNode,
  TextNode: TextNode,
  FadeInNode: FadeInNode,
};

let nodeTypes;
let type;

const Flow = () => {
  const snap = useSnapshot(store);

  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const saveScen = useCallback(async () => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      let nodesJson = JSON.stringify(flow);
    }
  }, [reactFlowInstance]);

  const playScen = () => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      console.log(JSON.stringify(flow));
    }
  };

  useMemo(() => {
    nodeTypes = {
      ...nodes,
      [type]: nodes[type],
    };
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      if (typeof type === "undefined" || !type) {
        return;
      }

      // nodeTypes = {
      //   ...nodes,
      //   [type]: nodes[type],
      // };

      let data = {};
      nodesProps.forEach((node) => {
        if (node.type === type) {
          data.props = { ...node.props };
        }
      });
      const uuid = uuidv4();
      data.props.id = uuid.replace(/-/g, "");

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: uuid.replace(/-/g, ""),
        type: type,
        position,
        data,
      };

      setNodes(newNode);
    },
    [reactFlowInstance]
  );

  return (
    <ReactFlowProvider>
      <div className="h-full" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={snap.nodes}
          edges={snap.edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          fitView
          nodeTypes={nodeTypes}
        >
          {/* <Background /> */}
          <Controls />
          <Panel position="top-right">
            <Button
              icon={<IconSave size="extra-large" />}
              className="bg-white"
              onClick={saveScen}
              type="tertiary"
            ></Button>
            <Button
              icon={<IconPlay size="extra-large" />}
              className="bg-white"
              onClick={playScen}
              type="tertiary"
            ></Button>
          </Panel>
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
};

export default Flow;
