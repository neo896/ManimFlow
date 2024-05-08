import React, { useState } from "react";
import { Handle, Position } from "reactflow";
import { ColorPicker } from "antd";
import { InputNumber, Divider } from "@douyinfe/semi-ui";
import { RectangleSvg } from "@/components/svg";
import { updateNodeData } from "@/stores/index";

const RectangleNode = ({ data }) => {
  const [color, setColor] = useState(data.props.color);
  const [width, setWidth] = useState(data.props.width);
  const [height, setHeight] = useState(data.props.height);
  const [grid_xstep, setGrid_xstep] = useState(data.props.grid_xstep);
  const [grid_ystep, setGrid_ystep] = useState(data.props.grid_ystep);
  return (
    <div className="px-2 py-2 shadow-md rounded-md bg-white border-2 border-stone-400">
      <div className="flex items-center justify-start gap-3">
        <div className="rounded-xl w-8 h-8 flex justify-center items-center bg-gray-100">
          <RectangleSvg width="16" height="16" />
        </div>
        <div className="text-gray-500">Rectangle</div>
      </div>
      <Divider margin="14px" />

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-start gap-10">
          <div>color</div>
          <ColorPicker
            value={color}
            onChange={(value, hex) => {
              setColor(hex);
              updateNodeData(data.props.id, { color: hex });
            }}
            className="nodrag"
          />
        </div>
        <div className="flex items-center justify-start gap-2">
          <div>width</div>
          <InputNumber
            size="small"
            value={width}
            onChange={(value) => {
              setWidth(value);
              updateNodeData(data.props.id, { width: value });
            }}
            className="nodrag"
          />
        </div>
        <div className="flex items-center justify-start gap-2">
          <div>height</div>
          <InputNumber
            size="small"
            value={height}
            onChange={(value) => {
              setHeight(value);
              updateNodeData(data.props.id, { height: value });
            }}
            className="nodrag"
          />
        </div>
        <div className="flex items-center justify-start gap-2">
          <div>grid_xstep </div>
          <InputNumber
            size="small"
            value={grid_xstep}
            onChange={(value) => {
              setGrid_xstep(value);
              updateNodeData(data.props.id, { grid_xstep: value });
            }}
            className="nodrag"
          />
        </div>
        <div className="flex items-center justify-start gap-2">
          <div>grid_ystep </div>
          <InputNumber
            size="small"
            value={grid_ystep}
            onChange={(value) => {
              setGrid_ystep(value);
              updateNodeData(data.props.id, { grid_ystep: value });
            }}
            className="nodrag"
          />
        </div>
      </div>
      <Handle type="source" id="animation" position={Position.Right} />
    </div>
  );
};

export default RectangleNode;
