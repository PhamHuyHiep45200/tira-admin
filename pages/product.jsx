import ProductApprove from "@/components/post/ProductApprove";
import ProductApproved from "@/components/post/ProductApproved";
import ProductCancle from "@/components/post/ProductCancle";
import { Tabs, Tag } from "antd";
import React from "react";

function product() {
  const onChange = (key) => {
    console.log(key);
  };

  const items = [
    {
      key: "1",
      label: <Tag color="green">Tất Cả Sản Phẩm</Tag>,
      children: <ProductApproved />,
    },
    {
      key: "2",
      label: <Tag color="blue">Sản Phẩm Đợi Duyệt</Tag>,
      children: <ProductApprove />,
    },
    {
      key: "3",
      label: <Tag color="red">Sản Phẩm Huỷ Bỏ</Tag>,
      children: <ProductCancle />,
    },
  ];
  return (
    <div>
      <div className="text-center text-[30px] font-bold text-[#333]">
        Quản Lý Sản Phẩm
      </div>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
}

export default product;
