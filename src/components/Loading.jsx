import React from 'react';
import { Spin } from 'antd';

const Loading = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900">
            <Spin size="large" className="text-primary dark:text-white" />
            <p className="mt-4 sm:text-2xl text-lg text-gray-700 dark:text-gray-300">Loading...</p>
        </div>
    );
};

export default Loading;