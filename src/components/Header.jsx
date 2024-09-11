import { useContext } from "react";
import {Button, Layout} from "antd";
import {BulbOutlined, MoonOutlined} from "@ant-design/icons";
import { ThemeContext } from "../context/ThemeContext.jsx";

const {Header} = Layout;

const HeaderComponent = () => {

    const { isDarkMode, toggleTheme } = useContext(ThemeContext);

    return (
        <Header
            className="sm:px-12 px-4 py-4 shadow-lg bg-transparent dark:shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <h3 className={`text-${isDarkMode ? "white" : "black"} m-0 text-lg font-semibold`}>
                    Todo-list Task
                </h3>
                <div className="flex items-center space-x-2">
                    <Button onClick={toggleTheme} type="primary" icon={isDarkMode ? (
                        <BulbOutlined className="text-white text-2xl"/>
                    ) : (
                        <MoonOutlined className="text-white text-2xl"/>
                    )}
                    />
                </div>
            </div>

        </Header>
    );
};

export default HeaderComponent;
