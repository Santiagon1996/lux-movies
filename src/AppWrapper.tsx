import React from 'react';
import { BrowserRouter, StaticRouter } from 'react-router-dom';
import App from './App';

interface AppWrapperProps {
    url?: string;
}

const AppWrapper: React.FC<AppWrapperProps> = ({ url }) => {
    // Condición clave para el SSR
    if (typeof window === 'undefined') {
        return (
            <StaticRouter location={url || '/'}>
                <App />
            </StaticRouter>
        );
    }

    return (
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
};

export default AppWrapper;

//Este componente lo utilizamos para envolver la aplicación con el router adecuado según si estamos en el servidor (SSR) o en el cliente (CSR).