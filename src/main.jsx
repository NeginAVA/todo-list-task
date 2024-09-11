import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ConfigProvider } from 'antd';
import { ThemeProvider } from './context/ThemeContext.jsx'; // Import your ThemeProvider

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "hsl(243, 100%, 69%)",
                }
            }}
        >
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </ConfigProvider>
    </React.StrictMode>
);
