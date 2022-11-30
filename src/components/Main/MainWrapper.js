import { Layout } from "antd";
import MainContent from "./MainContent";
import RightSideBar from "../RightSideBar/RightSideBar";

const { Content, Sider } = Layout;

const MainWrapper = ({ displayCity }) => {
    return (
        <Layout style={{ height: "100%", backgroundColor: "transparent" }}>
            <Content>
                <MainContent
                    displayCity={displayCity}
                    style={{ display: "block" }}
                ></MainContent>
            </Content>
            <Sider style={{ backgroundColor: "transparent" }} width={"30%"}>
                <RightSideBar></RightSideBar>
            </Sider>
        </Layout>
    );
};
export default MainWrapper;