import React from "react";
import { Tabs, TabPane } from "@douyinfe/semi-ui";
import ScenTree from "./Tree";
import Libraries from "./Libs";

const LeftSide = () => {
  return (
    <Tabs className="flex flex-col mx-2">
      <TabPane tab="ScenTree" itemKey="1">
        <ScenTree />
      </TabPane>
      <TabPane tab="Libraries" itemKey="2">
        <Libraries />
      </TabPane>
    </Tabs>
  );
};

export default LeftSide;
