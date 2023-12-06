import { Button, Drawer, Image, Table } from "antd";
import React, { useEffect, useState } from "react";
import { getAllOrder, updateOrder } from "@/service/order";
import moment from "moment/moment";
import { Tag } from "antd";

function Order() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [detail, setDetail] = useState(null);
  const [detailPopup, setDetailPopup] = useState(false);

  const getStatus = (type) => {
    switch (type) {
      case "INPROGRESS":
        return (
          <Tag color="orange" className="font-bold">
            INPROGRESS
          </Tag>
        );

      case "PAID":
        return (
          <Tag color="purple" className="font-bold">
            PAID
          </Tag>
        );

      case "RECEIVED":
        return (
          <Tag color="green" className="font-bold">
            RECEIVED
          </Tag>
        );

      default:
        return (
          <Tag color="magenta" className="font-bold">
            CANCLE
          </Tag>
        );
    }
  };
  const columns = [
    {
      title: "Trạng thái",
      align: "center",
      key: "name",
      render: (e) => <div>{getStatus(e.statusOrder)}</div>,
    },
    {
      title: "Người thuê",
      dataIndex: ["UserReceiverOrder", "name"],
      key: "name",
    },
    {
      title: "Xe thuê",
      key: "tags",
      dataIndex: ["motoOrder", "name"],
    },
    {
      title: "Thời gian thuê",
      key: "tags",
      render: (e) => (
        <div>{moment(e.createdAt).format("HH:mm:ss DD-MM-YYYY")}</div>
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      render: (e) => (
        <div className=" mt-[10px] space-x-[10px]">
          <div
            style={{ opacity: e.statusOrder === "INPROGRESS" ? 1 : 0.4 }}
            className="px-[10px] py-[5px] rounded-sm bg-[red] border-[red] border-[1px] bg-opacity-25 space-x-[5px] text-[white]  mt-[10px] cursor-pointer font-medium"
            onClick={() => handleDelete(e.id, e.statusOrder)}
          >
            <span className="text-[red]">Huỷ Đơn</span>
          </div>
        </div>
      ),
    },
  ];
  useEffect(() => {
    getAll();
  }, []);
  const getAll = async () => {
    setLoading(true);
    try {
      const response = await getAllOrder();
      console.log(response);
      if (response.data && response.data.status === 200) {
        setLoading(false);
        setData(response.data.data);
      } else {
        console.log(response);
      }
    } catch (error) {
      setLoading(false);
    }
  };
  const handleDelete = async (id, type) => {
    if (type === "INPROGRESS") {
      const response = await updateOrder(id, {
        statusOrder: "CANCLE",
      });
      if (response.data && response.data.status === 200) {
        getAll();
      } else {
        console.log(response);
      }
    }
  };
  return (
    <div>
      <div className="font-weight text-[20px] text-center mb-5 ">
        Lịch Sử Thuê Xe
      </div>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              setDetailPopup(true);
              setDetail(record);
            },
          };
        }}
      />
      <Drawer
        title="Chi tiết order"
        width={600}
        placement="right"
        onClose={() => setDetailPopup(false)}
        open={detailPopup}
      >
        <span className="font-bold text-[18px] text-[red]">
          Thông tin người thuê
        </span>
        <div className=" mt-[10px]">
          <span className="text-[#666] text-[14px] font-medium">Tên: </span>
          <span className="text-[#111] font-semibold ml-[5px]">
            {detail?.UserReceiverOrder?.name}
          </span>
        </div>
        <div className=" mt-[10px]">
          <span className="text-[#666] text-[14px] font-medium">Email: </span>
          <span className="text-[#111] font-semibold ml-[5px]">
            {detail?.UserReceiverOrder?.email}
          </span>
        </div>
        <div className=" mt-[10px]">
          <span className="text-[#666] text-[14px] font-medium">
            Số điện thoại:{" "}
          </span>
          <span className="text-[#111] font-semibold ml-[5px]">
            {detail?.UserReceiverOrder?.phone}
          </span>
        </div>
        <div className=" mt-[10px]">
          <span className="text-[#666] text-[14px] font-medium">
            Căn cước công dân:{" "}
          </span>
          <span className="text-[#111] font-semibold ml-[5px]">
            {detail?.idCard}
          </span>
        </div>
        <span className="font-bold text-[18px] text-[red]">
          Thông tin về xe
        </span>
        <div className=" mt-[10px]">
          <span className="text-[#666] text-[14px] font-medium">Tên:</span>
          <span className="text-[#111] font-semibold ml-[5px]">
            {detail?.motoOrder?.name}
          </span>
        </div>
        <div className="flex flex-col items-start mt-[10px]">
          <span className="text-[#666] text-[14px] font-medium">Ảnh </span>
          <Image
            width={300}
            height={200}
            alt=""
            src={`${process.env.NEXT_PUBLIC_URL_SERVER}${
              detail?.motoOrder
                ? JSON.parse(detail?.motoOrder?.listThumbnail)[0]
                : ""
            }`}
          />
        </div>
        <span className="font-bold text-[18px] text-[red]">Chi tiết order</span>
        <div className=" mt-[10px]">
          <span className="text-[#666] text-[14px] font-medium">
            Thời gian làm đơn thuê xe:{" "}
          </span>
          <span className="text-[#111] font-semibold ml-[5px]">
            {moment(detail?.createdAt).format("HH:mm")} ngày{" "}
            {moment(detail?.createdAt).format("DD-MM-YYYY")}
          </span>
        </div>
        <div className=" mt-[10px]">
          <span className="text-[#666] text-[14px] font-medium">
            Địa điểm nhận xe:{" "}
          </span>
          <span className="text-[#111] font-semibold ml-[5px]">
            {detail?.receivingAddress}
          </span>
        </div>
        <div className=" mt-[10px]">
          <span className="text-[#666] text-[14px] font-medium">
            Thời gian nhận xe:{" "}
          </span>
          <span className="text-[#111] font-semibold ml-[5px]">
            {moment(detail?.rentalStartDate).format("HH:mm")} ngày{" "}
            {moment(detail?.rentalStartDate).format("DD-MM-YYYY")}
          </span>
        </div>
        <div className=" mt-[10px]">
          <span className="text-[#666] text-[14px] font-medium">
            Thời gian trả xe:{" "}
          </span>
          <span className="text-[#111] font-semibold ml-[5px]">
            {moment(detail?.leaseEndDate).format("HH:mm")} ngày{" "}
            {moment(detail?.leaseEndDate).format("DD-MM-YYYY")}
          </span>
        </div>
        <div className=" mt-[10px]">
          <span className="text-[#666] text-[14px] font-medium">
            Giá thuê xe:{" "}
          </span>
          <span className="text-[#111] font-semibold ml-[5px]">
            {new Intl.NumberFormat("ja-JP").format(detail?.allMoney)}đ
          </span>
        </div>
      </Drawer>
    </div>
  );
}

export default Order;
