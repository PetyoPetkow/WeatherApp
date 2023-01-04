import { getDoc, doc, updateDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import { Form, Input, Button } from "antd";

const UserProfile = () => {
    const navigate = useNavigate();

    const { user } = useContext(UserContext);
    const [userInfo, setUserInfo] = useState("");
    const [newUserValues, setNewUserValues] = useState();

    const getUserData = async () => {
        const userData = await getDoc(doc(db, "users", user.uid));
        console.log(userData.data());
        if (userData.data()) {
            setUserInfo(userData.data());
        }
    };
    useEffect(() => {
        if (user) {
            getUserData();
            console.log(userInfo);
        }
    }, [user]);

    const onFinish = (values) => {
        console.log("Success:", values);
        updateUserInformation(user, newUserValues, userInfo, navigate);
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <>
            {userInfo && (
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
                            setNewUserValues({ ...newUserValues, username: e.target.value });
                        }}
                        initialValue={userInfo.username}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Country"
                        name="country"
                        onChange={(e) => {
                            setNewUserValues({ ...newUserValues, country: e.target.value });
                        }}
                        initialValue={userInfo.country}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 5, span: 8 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>{" "}
                        <Button type="primary" href="/userProfile">
                            Cancel
                        </Button>
                    </Form.Item>
                </Form>
            )}
        </>
    );
};

const updateUserInformation = async (user, newUserValues, userInfo, navigate) => {
    console.log(newUserValues);
    console.log(userInfo);
    await updateDoc(doc(db, "users", user.uid), {
        username: newUserValues?.username ? newUserValues.username : userInfo.username,
        country: newUserValues?.country || newUserValues?.country == "" ? newUserValues.country : userInfo.country,
    });
    navigate("/userProfile");
};

export default UserProfile;
