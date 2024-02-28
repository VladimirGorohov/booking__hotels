import React from "react";
import { Layout } from "antd";
import _Input from "../UI/Input/Input";
import { Outlet } from "react-router-dom";
import classes from "./Content.module.css";

const { Content } = Layout;

const _Content = () => (
  <Content className={classes.content}>
    <Outlet />
  </Content>
);

export default _Content;
