import React, { FC } from "react";
import { Header } from "antd/es/layout/layout";
import { Row, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { RouteNames } from "../router";
import { useActions } from "../hooks/useActions";

const Navbar: FC = () => {
  const navigate = useNavigate();
  const { logout } = useActions();
  const { isAuth, user } = useTypedSelector((state) => state.auth);

  return (
    <Header>
      <Row justify="end">
        {isAuth ? (
          <>
            <div style={{ color: "white" }}>{user.username}</div>
            <Menu theme="dark" mode="horizontal" selectable={false}>
              <Menu.Item onClick={() => logout()} key={1}>
                Logout
              </Menu.Item>
            </Menu>
          </>
        ) : (
          <Menu theme="dark" mode="horizontal" selectable={false}>
            <Menu.Item onClick={() => navigate(RouteNames.LOGIN)} key={1}>
              Login
            </Menu.Item>
          </Menu>
        )}
      </Row>
    </Header>
  );
};

export default Navbar;
