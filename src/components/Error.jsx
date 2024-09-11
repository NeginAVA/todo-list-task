
const Error = ({ message }) => {
    return (
        <div className="flex items-center justify-center h-full p-4">
            <div className="text-center">
                <h2 className="text-2xl font-semibold text-red-600">Error</h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mt-2">{message}</p>
            </div>
        </div>
    );
};

export default Error;