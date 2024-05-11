import React, { useState } from "react";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Col, Layout, Menu, Row, Space, theme } from "antd";
import "./index.css";
import { IoMdAdd, IoMdSettings } from "react-icons/io";
import type { MenuProps } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { CgDarkMode } from "react-icons/cg";
import { MdPerson } from "react-icons/md";
import { IoChatbubbles } from "react-icons/io5";
import Header from "./Header";
import SearchFooter from "./Footer";
import ContentContainer from "./Content";
import Sidebar from "../Components/Sidebar";
import Main from "../Components/Main";

const { Content, Footer } = Layout;

// type MenuItem = Required<MenuProps>["items"][number];

// const items: MenuItem[] = [
//   { key: "1", icon: <IoMdAdd className="menu-add-icon" />, label: "New Chat" },

//   {
//     key: "3",
//     label: "Chat History",
//     icon: <IoChatbubbles className="menu-add-icon" />,
//     children: [
//       { key: "3-1", label: "Chat 1" },
//       { key: "3-2", label: "Chat 2" },
//       { key: "3-3", label: "Chat 3" },
//       { key: "3-4", label: "Chat 4" },
//       { key: "3-5", label: "Chat 5" },
//       { key: "3-6", label: "Chat 6" },
//       { key: "3-7", label: "Chat 7" },
//       { key: "3-8", label: "Chat 8" },
//       { key: "3-9", label: "Chat 9" },
//       { key: "3-10", label: "Chat 10" },
//       { key: "3-11", label: "Chat 11" },
//       { key: "3-12", label: "Chat 12" },
//       { key: "3-13", label: "Chat 13" },
//       { key: "3-14", label: "Chat 14" },
//       { key: "3-15", label: "Chat 15" },
//       { key: "3-16", label: "Chat 16" },
//       { key: "3-17", label: "Chat 17" },
//       { key: "3-18", label: "Chat 18" },
//       { key: "3-19", label: "Chat 19" },
//       { key: "3-20", label: "Chat 20" },
//     ]
//   },
// ];

const Home: React.FC = () => {
  // const {
  //   token: { colorBgContainer, borderRadiusLG },
  // } = theme.useToken();

  // const [collapsed, setCollapsed] = useState(false);

  // const toggleCollapsed = () => {
  //   setCollapsed(!collapsed);
  // };

  return (
    <>
      {/* <Layout className="home-layout">
        <Layout>
          <Header />
          <Content>
            <div
              style={{
                width: 256,
                zIndex: "1000",
                position: "absolute",
                top: "2%",
                left: "0",
              }}
            >
              <Button
                type="primary"
                onClick={toggleCollapsed}
                style={{ marginBottom: 16 }}
                className="menu-toggel-btn"
              >
                {collapsed ? <MenuUnfoldOutlined style={{fontSize: "1.5rem"}} /> : <MenuFoldOutlined style={{fontSize: "1.5rem"}} />}
              </Button>
              <Menu
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                mode="inline"
                theme={"light"}
                inlineCollapsed={collapsed}
                items={items}
                className="home-sidebar-menu"
                style={{ maxHeight: "80vh", overflowY: "auto" }}
              />
            </div>
            <ResponseContent />
          </Content>
            <SearchFooter />
        </Layout>
      </Layout> */}
      <Row>
        <Col span={2}>
          <Sidebar />
        </Col>
        <Col span={20}>
          {" "}
          <Main />
        </Col>
      </Row>
    </>
  );
};

export default Home;
