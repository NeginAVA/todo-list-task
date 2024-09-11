const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
            <img
                src="images/not-found.png"
                alt="Not Found"
                className="mb-4 w-48 h-48"
            />
            <p className="text-lg text-gray-600 dark:text-gray-300">Items Not Found</p>
        </div>
    );
};

export default NotFound;
