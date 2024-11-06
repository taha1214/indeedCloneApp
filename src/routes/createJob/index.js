import { Button, Form, Input } from "antd";
import "./index.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../shared/constant";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import CompanyHeader from "../../components/Header/companyHeader"

const CreateJob = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { user } = useSelector((s) => s.userReducer);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const blogId = searchParams.get("blogId");

  useEffect(() => {
    if (blogId) {
      axios
        .get(`${baseUrl}/blog/getBlog/${blogId}`)
        .then((res) => {
          if (res.data) {
            form.setFieldsValue({
              title: res.data.blog.title,
              requirements: res.data.blog.requirements,
              description: res.data.blog.description,
            });
          }
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    }
  }, [blogId, form]);

  const onFinish = (value) => {
    console.log("Form Values:", value);
    setLoading(true);
    const payload = {
      title: value.title,
      description: value.description,
      requirements: value.requirements,
      authorId: user?._id,
    };

    if (blogId) {
      payload.id = blogId;
      axios
        .put(`${baseUrl}/blog/updateBlog`, payload)
        .then((res) => {
          console.log("Update Response:", res);
          setLoading(false);
          navigate("/");
        })
        .catch((err) => {
          setLoading(false);
        });
    } else {
      axios
        .post(`${baseUrl}/jobPost/CreateJObs`, payload)
        .then((res) => {
          console.log("Create Response:", res);
          setLoading(false);
          navigate("/");
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div>
      <CompanyHeader />
    <div className="create-blog-form">
      <h1>Create Job</h1>
      <Form
        form={form}
        name="basic"
        initialValues={{ title: "", requirements: "", description: "" }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <div className="field-container">
          <p>Title</p>
          <Form.Item
            name="title"
            rules={[
              {
                required: true,
                message: "This field is required!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </div>
        <div className="field-container">
          <p>Description</p>
          <Form.Item
            name="description"
            rules={[
              {
                required: true,
                message: "This field is required",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
        </div>
        <div className="field-container">
          <p>Requirements</p>
          <Form.Item
            name="requirements"
            rules={[
              {
                required: true,
                message: "This field is required",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
        </div>

        <div className="footer-sec">
          <Button
            type="default"
            className="footer-sec-button"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Form.Item className="footer-sec-button">
            <Button type="primary" htmlType="submit" loading={loading}>
              {blogId ? "Update" : "Create"}
            </Button>
          </Form.Item>
        </div>
      </Form>
      </div></div>
  );
};

export default CreateJob;
