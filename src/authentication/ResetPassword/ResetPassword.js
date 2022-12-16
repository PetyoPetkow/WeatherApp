import React from "react";

import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Form, Button, Input } from "antd";

export const ResetPassword = () => {
    const auth = getAuth();

    const onFinish = (values) => {
        sendPasswordResetEmail(auth, values.email);
        console.log("Success:", values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <>
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
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "Please input your email!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Send reset link
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};
