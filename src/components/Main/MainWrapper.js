import { Layout } from "antd";
import MainContent from "./MainContent";
import RightSideBar from "../RightSideBar/RightSideBar";

import style from "./Main.module.css";

const { Content, Sider } = Layout;

const MainWrapper = ({ displayCity, isFavourite }) => {
    return (
        <Layout className={style.mainLayout}>
            <Content>
                <MainContent
                    displayCity={displayCity}
                    isFavourite={isFavourite}
                    className={style.mainContentContainer}
                ></MainContent>
            </Content>
            <Sider className={style.mainSizer} width={"30%"}>
                <RightSideBar></RightSideBar>
            </Sider>
        </Layout>
    );
};
export default MainWrapper;
