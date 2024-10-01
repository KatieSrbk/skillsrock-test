import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from './routes';

const AppRoutes = () => (
    <Router>
        <Routes>
            {routes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element}>
                    {route.children && route.children.map((childRoute, idx) => (
                        <Route key={idx} path={childRoute.path} element={childRoute.element} />
                    ))}
                </Route>
            ))}
        </Routes>
    </Router>
);

export default AppRoutes;
