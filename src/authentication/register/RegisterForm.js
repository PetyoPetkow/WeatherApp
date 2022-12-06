import React, { useContext, useState } from "react";

import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { Input, Form, Checkbox, Button } from "antd";

import { UserContext } from "../../UserContext";
import { register } from "./register";

export const RegisterFrom = () => {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const [registerEmail, setRegisterEmail] = useState();
    const [registerPassword, setRegisterPassword] = useState();
    const [name, setName] = useState();

    const onFinish = (values) => {
        console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    return (
        <div style={{ marginTop: "150px" }}>
            <Form
                layout="vertical"
                size="large"
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "Please input your username!",
                        },
                    ]}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "Please input your email!",
                        },
                    ]}
                    onChange={(e) => {
                        setRegisterEmail(e.target.value);
                    }}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password!",
                        },
                    ]}
                    onChange={(e) => {
                        setRegisterPassword(e.target.value);
                    }}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{ offset: 8, span: 16 }}
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        onClick={() =>
                            register(
                                auth,
                                registerEmail,
                                registerPassword,
                                navigate,
                                setUser,
                                name
                            )
                        }
                    >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
