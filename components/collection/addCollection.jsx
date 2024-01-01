import { createCategory } from "@/service/category";
import { Button, Form, Input, Modal } from "antd";
import React from "react";
import UploadFile from "../common/UploadFile";
import { createCollection } from "@/service/collection";

function AddCollection({ open, refresh, closeAdd }) {
  const [form] = Form.useForm();
  const submit = async (e) => {
    await createCollection(e);
    refresh();
    onCloseAdd();
  };
  const onCloseAdd = () => {
    closeAdd();
    form.resetFields();
  };
  return (
    <Modal
      title="Tạo Bộ Sưu Tập"
      open={open}
      onCancel={onCloseAdd}
      footer={false}
    >
      <Form onFinish={submit} layout="vertical" form={form}>
        <Form.Item
          label="Tên Thể Loại"
          name="name"
          rules={[{ required: true, message: "Không được bỏ trống!" }]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          label="Ảnh"
          name="image"
          rules={[{ required: true, message: "Không được bỏ trống!" }]}
        >
          <UploadFile />
        </Form.Item>
        <div>
          <Button htmlType="submit" className="w-full" size="large">
            Tạo
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

export default AddCollection;
