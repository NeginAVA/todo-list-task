import { Layout } from "antd";
import HeaderComponent from "./components/Header.jsx";
import TodoList from "./components/TodoList/TodoList.jsx";

const { Content } = Layout;

const App = () => {

    return (
        <Layout className="min-h-screen bg-gray-100 text-black dark:bg-gray-900 dark:text-white">
            <HeaderComponent />
            <Content className="p-4">
                <div className="container mx-auto">
                    <TodoList />
                </div>
            </Content>
        </Layout>
    );
};

export default App;
