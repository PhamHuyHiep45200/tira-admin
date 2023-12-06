import { CreateContext } from "@/context/ContextProviderGlobal";
import {
  AreaChartOutlined,
  BellOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Layout, Menu, Popover } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";

const { Sider, Content } = Layout;
function LayoutMain({ children }) {
  const { noti, user } = useContext(CreateContext);
  const router = useRouter();
  const changeMenu = (e) => {
    router.push(e.key);
  };
  const content = () => {
    return (
      <div>
        {noti.length &&
          noti.map((e) => (
            <div
              key={e.id}
              className="my-[10px] flex border-b-[1px] border-[#eaeaea] max-w-[300px] space-x-[10px] max-h-[500px] overflow-y-auto"
            >
              <div>
                <Avatar>{e.UserReceiverOrder.name[0]}</Avatar>
              </div>
              <div className="text-[#777]">
                <span className="font-bold text-[black]">
                  {e.UserReceiverOrder.name}
                </span>{" "}
                đã thuê xe{" "}
                <span className="text-medium text-[red]">
                  {e.motoOrder.name}
                </span>{" "}
                vào lúc {moment(e.createdAt).format("HH:mm")} phút{" "}
                {moment(e.createdAt).format("DD-MM-YYYY")}
              </div>
            </div>
          ))}
      </div>
    );
  };
  const itemsLayout = [
    {
      key: "/",
      icon: <AreaChartOutlined />,
      label: "Trang chủ",
    },
    {
      key: "/user",
      icon: <UsergroupAddOutlined />,
      label: "Người dùng",
    },
    {
      key: "/category",
      icon: <UsergroupAddOutlined />,
      label: "Thể Loại",
    },
    {
      key: "/product",
      icon: <UsergroupAddOutlined />,
      label: "Quản Lý Bài Đăng",
    },
    {
      key: "/order",
      icon: <UsergroupAddOutlined />,
      label: "Đơn hàng",
    },
    {
      key: "/banner",
      icon: <UsergroupAddOutlined />,
      label: "Banner",
    },
  ];
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);
  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={itemsLayout}
          onClick={changeMenu}
        />
      </Sider>
      <Layout>
        <Content style={{ margin: "24px 16px 0" }}>
          <div style={{ padding: 24, minHeight: 360 }} className="max-h-[calc(100vh-60px)] overflow-y-auto">{children}</div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default LayoutMain;
