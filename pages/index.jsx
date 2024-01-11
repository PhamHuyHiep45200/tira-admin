import {
  STATUS_CANCEL,
  STATUS_DELIVERING,
  STATUS_ORDERED,
  STATUS_PAYMENT_SUCCESS,
  STATUS_SUCCESS,
} from "@/enum/order.enum";
import { statistics } from "@/service/user";
import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Row,
  Select,
  Space,
} from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import dayjs from 'dayjs'

const { RangePicker } = DatePicker;

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const optionsDate = [
  {
    label: "Ngày",
    value: "day",
  },
  {
    label: "Tháng",
    value: "mounth",
  },
  {
    label: "Năm",
    value: "year",
  },
];

const optionsOrder = [
  {
    value: STATUS_ORDERED,
    label: "Đặt hàng Chưa thanh toán",
  },
  {
    value: STATUS_DELIVERING,
    label: "Đang giao",
  },
  {
    value: STATUS_PAYMENT_SUCCESS,
    label: "Thanh toán thành công",
  },
  {
    value: STATUS_SUCCESS,
    label: "Giao hàng thành công",
  },
  {
    value: STATUS_CANCEL,
    label: "Huỷ",
  },
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
  value,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {value}
    </text>
  );
};
const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
  },
];
export default function Home() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState();
  const [orderFilter, setOrderFilter] = useState();
  const [product, setProduct] = useState();
  const [typeDate, setTypeDate] = useState("day");
  const [dataSort, setDataSort] = useState({
    filter: 'day',
    startTime: undefined,
    endTime: undefined,
    status: undefined,
  })

  useEffect(() => {
    getStatistics();
    form.setFieldsValue({
      typeDate: "day",
    });
  }, [dataSort]);

  const getStatistics = async () => {
    try {
      const { orderCount, orderFilter, productCount } = await statistics(dataSort);
      setOrder(
        Object.entries(orderCount).map((e) => ({
          name: e[0],
          value: e[1],
        }))
      );
      setProduct(
        Object.entries(productCount).map((e) => ({
          name: e[0],
          value: e[1],
        }))
      );
      setOrderFilter(
        orderFilter.map((e) => ({
          name: e.date,
          price: e.total_price,
          quantity: e.total_quantity,
        }))
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const onValuesChange = (e, a) => {
    if (Object.keys(e)[0] === "typeDate") {
      setTypeDate(e.typeDate);
      form.setFieldValue('date', undefined)
    }
  };
  const filterStatitic = (e) => {
    console.log(e);
    let filter = {
      filter: 'day',
      startTime: undefined,
      endTime: undefined,
      status: undefined,
    }
    if(e.typeDate === 'day') {
      console.log(e.date[0], dayjs(e.date[0]).format('YYYY-MM-DD'))
      filter = {
        ...filter,
        startTime: dayjs(e.date[0]).format('YYYY-MM-DD'),
        endTime: dayjs(e.date[1]).format('YYYY-MM-DD')
      }
    } else if (e.typeDate === 'month') {
      filter = {
        ...filter,
        startTime: dayjs(e.date).format('YYYY-MM'),
        endTime: undefined
      }
    } else {
      filter = {
      ...filter,
      startTime: dayjs(e.date).format('YYYY'),
      endTime: undefined
    }
    }
    console.log(filter);
    setDataSort({
      ...filter,
      filter: e.typeDate
    })
  }
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-[30px] font-bold">THỐNG KÊ ADMIN</h1>
      {!loading && (
        <>
          <Divider />
          <Row className="flex items-end justify-around w-full">
            <Col>
              <div className="text-center">Thống kê sản phẩm</div>
              <div className="flex items-center">
                <PieChart width={400} height={400}>
                  <Pie
                    data={product}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
                <div>
                  {product.map((e, i) => {
                    return (
                      <div key={i} className="flex items-center space-x-2 mb-3">
                        <div
                          className="w-[30px] h-[30px] flex justify-center items-center"
                          style={{ background: COLORS[i] }}
                        ></div>
                        <span>{e.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Col>
            <Col className="flex flex-col justify-start">
              <div className="text-center">Thống kê order</div>
              <div className="flex items-center">
                <PieChart width={400} height={400}>
                  <Pie
                    data={order}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
                <div>
                  {order.map((e, i) => {
                    return (
                      <div key={i} className="flex items-center space-x-2 mb-3">
                        <div
                          className="w-[30px] h-[30px] flex justify-center items-center"
                          style={{ background: COLORS[i] }}
                        ></div>
                        <span>{e.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Col>
          </Row>
          <Divider />
          <div className="font-bold text-[22px] mb-5">Thống kê đơn hàng</div>
          <Form className="mb-5" form={form} onFinish={filterStatitic} onValuesChange={onValuesChange}>
            <Space>
              <Form.Item name="typeDate">
                <Select
                  style={{ width: "150px" }}
                  placeholder="Thời gian"
                  options={optionsDate}
                  size="large"
                />
              </Form.Item>
              <Form.Item name="status">
                <Select
                  style={{ width: "250px" }}
                  placeholder="Trạng thái"
                  options={optionsOrder}
                  size="large"
                />
              </Form.Item>
              <Form.Item name="date" rules={[{required: true, message: 'Vui lòng nhập thời gian'}]}>
                {typeDate === "day" && <RangePicker size="large" />}
                {typeDate === "mounth" && (
                  <DatePicker picker="month" size="large" />
                )}
                {typeDate === "year" && (
                  <DatePicker size="large" picker="year" />
                )}
              </Form.Item>
              <Form.Item>
              <Button
                size="large"
                type="primary"
                className="!px-10"
                htmlType="submit"
              >
                Lọc
              </Button>
              </Form.Item>
            </Space>
          </Form>
          <AreaChart
            width={1000}
            height={250}
            data={orderFilter}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
            <Area
              type="monotone"
              dataKey="quantity"
              stroke="#82ca9d"
              fillOpacity={1}
              fill="url(#colorPv)"
            />
          </AreaChart>
        </>
      )}
    </div>
  );
}
