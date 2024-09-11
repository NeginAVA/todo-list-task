import {useEffect, useState} from 'react';
import {Button, Card, Input, Modal, Select} from 'antd';
import {
    CheckCircleOutlined,
    EditOutlined,
    SearchOutlined,
    SyncOutlined,
    UnorderedListOutlined
} from '@ant-design/icons';
import {highlightText} from '../../utils/helpers.jsx';
import useSearch from '../../hooks/useSearch.js';
import Loading from '../Loading.jsx';
import Error from '../Error.jsx';
import NotFound from "../NotFound.jsx";
import mockTasksData from '../../data/mockTasksData.json';
import styles from './TodoList.module.css';

const {Option} = Select;

const TodoList = () => {
        const [tasks, setTasks] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
        const [isModalVisible, setIsModalVisible] = useState(false);
        const [newTaskTitle, setNewTaskTitle] = useState('');
        const [newTaskStatus, setNewTaskStatus] = useState('Todo');
        const [editingTaskId, setEditingTaskId] = useState(null);
        const [activeTab, setActiveTab] = useState('Todo');

        const {searchTerm, handleSearch, filteredItems: filteredTasks} = useSearch(tasks);

        useEffect(() => {
            fetch('https://jsonplaceholder.typicode.com/todos')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    const updatedData = data.map(task => ({
                        ...task,
                        status: task.completed ? 'Done' : 'Todo',
                    }));

                    const allTasks = [...updatedData, ...mockTasksData];

                    setTasks(allTasks);
                    setLoading(false);
                })
                .catch(error => {
                    setError('Error fetching todos: ' + error.message);
                    setLoading(false);
                });
        }, []);

        if (loading) return <Loading/>;
        if (error) return <Error message={error}/>;

        const handleCreateTask = () => {
            setNewTaskTitle('');
            setNewTaskStatus('Todo');
            setEditingTaskId(null);
            setIsModalVisible(true);
        };

        const handleEditTask = (task) => {
            setNewTaskTitle(task.title);
            setNewTaskStatus(task.status);
            setEditingTaskId(task.id);
            setIsModalVisible(true);
        };

        const handleSaveTask = () => {
            if (editingTaskId) {
                setTasks(prevTasks =>
                    prevTasks.map(task =>
                        task.id === editingTaskId
                            ? {...task, title: newTaskTitle, status: newTaskStatus, completed: newTaskStatus === 'Done'}
                            : task
                    )
                );
            } else {
                const newTask = {
                    id: Date.now(),
                    title: newTaskTitle,
                    status: newTaskStatus,
                    completed: newTaskStatus === 'Done',
                };
                setTasks(prevTasks => [newTask, ...prevTasks]);
            }
            setIsModalVisible(false);
            setNewTaskTitle('');
            setNewTaskStatus('Todo');
        };

        const handleCancel = () => {
            setIsModalVisible(false);
            setNewTaskTitle('');
            setNewTaskStatus('Todo');
        };

        const todoTasks = filteredTasks.filter(todo => todo.status === 'Todo');
        const doingTasks = filteredTasks.filter(todo => todo.status === 'Doing');
        const doneTasks = filteredTasks.filter(todo => todo.status === 'Done');

        const noResultsFound = filteredTasks.length === 0;

        const renderTaskList = (tasks, status) => (
            <div className={`sm:p-4 px-2 py-4 ${status !== activeTab ? 'hidden sm:block' : ''}`}>
                <h2 className="text-xl font-bold mb-4 border-b border-gray-300 pb-2 dark:text-white sm:block hidden">
                    {status === 'Todo' && <UnorderedListOutlined className="mr-2 text-blue-500"/>}
                    {status === 'Doing' && <SyncOutlined className="mr-2 text-yellow-500"/>}
                    {status === 'Done' && <CheckCircleOutlined className="mr-2 text-green-500"/>}
                    {status}
                </h2>
                {tasks.map(todo => (
                    <Card
                        key={todo.id}
                        className="mb-4 rounded-lg shadow-lg group hover:text-primary transition-colors duration-200 dark:bg-gray-800 dark:text-white"
                    >
                        <div className="flex justify-between items-center">
                            <p>{highlightText(todo.title, searchTerm)}</p>
                            <Button
                                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                icon={<EditOutlined/>}
                                shape="circle"
                                onClick={() => handleEditTask(todo)}
                            />
                        </div>
                    </Card>
                ))}
            </div>
        );

        const renderCustomTabs = () => (
            <div className="flex justify-between mb-4 border-b border-gray-300 dark:border-gray-700 sm:hidden">
                {['Todo', 'Doing', 'Done'].map((status) => (
                    <button
                        key={status}
                        onClick={() => setActiveTab(status)}
                        className={`flex-1 text-xl font-bold py-2 transition-colors duration-200 ${
                            activeTab === status
                                ? 'text-primary dark:text-lavender border-b-2 border-primary dark:border-lavender'
                                : 'text-gray-500 dark:text-gray-400'
                        }`}
                    >
                        {status === 'Todo' && <UnorderedListOutlined className="mr-2 text-blue-500"/>}
                        {status === 'Doing' && <SyncOutlined className="mr-2 text-yellow-500"/>}
                        {status === 'Done' && <CheckCircleOutlined className="mr-2 text-green-500"/>}
                        {status}
                    </button>
                ))}
            </div>
        );

        const CustomInput = ({...props}) => (
                <Input {...props} className={`${styles.customInput} ${props.className}`}/>
            )
        ;
        return (
            <div className="sm:p-8 py-6 px-4 transition-colors duration-300">
                <div className="flex flex-row items-center justify-between mb-8">

                    <CustomInput
                        size="large"
                        placeholder="Search tasks"
                        onChange={(e) => handleSearch(e.target.value)}
                        className="w-full sm:w-[600px] mr-4"
                        suffix={<SearchOutlined className={styles.searchIcon}/>}
                    />
                    <Button
                        type="primary"
                        size="large"
                        onClick={handleCreateTask}
                    >
                        Create Task
                    </Button>
                </div>
                {noResultsFound ? (
                    <NotFound/>
                ) : (
                    <>
                        {renderCustomTabs()}
                        <div className="flex flex-col sm:grid sm:grid-cols-3 gap-4">
                            {renderTaskList(todoTasks, 'Todo')}
                            {renderTaskList(doingTasks, 'Doing')}
                            {renderTaskList(doneTasks, 'Done')}
                        </div>
                    </>
                )}
                <Modal
                    title={editingTaskId ? "Edit Task" : "Create New Task"}
                    open={isModalVisible}
                    onOk={handleSaveTask}
                    onCancel={handleCancel}
                    okText={editingTaskId ? "Save Changes" : "Save"}
                    cancelText="Close"
                    okButtonProps={{type: 'primary'}}
                >
                    <Input
                        placeholder="Task Title"
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        className="mb-4"
                    />
                    <Select
                        value={newTaskStatus}
                        onChange={setNewTaskStatus}
                        className="w-full mb-4"
                    >
                        <Option value="Todo">Todo</Option>
                        <Option value="Doing">Doing</Option>
                        <Option value="Done">Done</Option>
                    </Select>
                </Modal>
            </div>
        );
    }
;

export default TodoList;