import { Avatar, Col, Dropdown, Menu, Row } from "antd";
import React, { useState } from "react";
import "./index.css";import { UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { IoIosMail } from "react-icons/io";
import { IoLogOutSharp } from "react-icons/io5";
import { FaUserAstronaut } from "react-icons/fa6";

const Header: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);

  const handleMenuClick = () => {
    setVisible(!visible);
  };

  const handleLogout = () => {
    window.location.href = "/login";
  };

  const items: MenuProps["items"] = [
    {
      label: "johnsmith@example.com",
      key: "1",
      icon: <IoIosMail />,
    },
    {
      label: "John Smith",
      key: "2",
      icon: <MdDriveFileRenameOutline />,
    },
    {
      label: "Logout",
      key: "3",
      icon: <IoLogOutSharp />,  
      danger: true,
      onClick: handleLogout,
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <div className="header-container">
      <Row>
        <Col span={1}></Col>
        <Col span={21} className="header-title-container">
          <span className="header-title">SPEAKIMAGE</span>
        </Col>
        <Col span={2} className="header-profile-container">
          <Dropdown
            menu={menuProps}
            placement="bottomRight"
            className="header-profile-dropdown"
            
          >
            <FaUserAstronaut className="header-profile-dropdown" />
          </Dropdown>
        </Col>
      </Row>
    </div>
  );
};

export default Header;
