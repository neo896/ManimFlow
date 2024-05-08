import React from "react";
import { Layout } from "@douyinfe/semi-ui";

import LeftSide from "./components/layouts/LeftSide";
import TopBar from "./components/layouts/Header";
import Flow from "./components/flow";

const { Header, Footer, Sider, Content } = Layout;

function App() {
  return (
    <Layout className="h-lvh">
      <Header className="h-12 border">
        <TopBar />
      </Header>
      <Layout>
        <Sider className="w-1/6 border-r ">
          <LeftSide />
        </Sider>
        <Content>
          <Flow />
        </Content>
        <Sider
          style={{ width: "220px", background: "var(--semi-color-fill-2)" }}
        >
          属性
        </Sider>
      </Layout>
      <Footer className="h-14 border">Footer</Footer>
    </Layout>
  );
}

export default App;
