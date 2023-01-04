import React, { useContext, useState } from "react";

import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { Input, Form, Checkbox, Button, DatePicker, Select } from "antd";

import { countryArr } from "../../constants/CardConstants/COUNTRY_ARRAY";
import { UserContext } from "../../UserContext";
import { register } from "./register";

export const RegisterFrom = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);
    const [registerEmail, setRegisterEmail] = useState();
    const [registerPassword, setRegisterPassword] = useState();
    const [userValues, setUserValues] = useState({ username: "", country: "", birthDate: "" });

    const onFinish = (values) => {
        register(auth, registerEmail, registerPassword, navigate, setUser, userValues);
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
                        setUserValues({ ...userValues, username: e.target.value });
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
                    label="Birth date"
                    name="birthDate"
                    rules={[
                        {
                            required: true,
                            message: "Please input your birth date!",
                        },
                    ]}
                >
                    <DatePicker
                        onChange={(value) => {
                            setUserValues({ ...userValues, birthDate: value });
                        }}
                    />
                </Form.Item>

                <Form.Item label="Country" name="country">
                    <Select
                        style={{ width: "30%" }}
                        showSearch
                        value={userValues?.country}
                        placeholder="Select a country"
                        optionFilterProp="children"
                        onChange={(e) => {
                            console.log(e);
                            setUserValues({ ...userValues, country: e });
                        }}
                        filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
                        options={countryArr}
                    />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
