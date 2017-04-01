import React from 'react';
import Report from './components/Report';
import Project from './components/Project';
import CreateProject from './components/Project/Create';
import Summary from './components/Summary';
import Sale from './components/Sale';
import Purchase from './components/Purchase';
import Cost from './components/Cost';
import Login from './components/Login';
import Register from './components/Register';

const NoMatch = () => (
    <div className="container">
        <h1>404</h1>
    </div>
)

const routes = [
    {
        path: '/',
        redirect: '/report/summary',
        exact: true
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/register',
        component: Register
    },
    {
        path: '/report',
        component: Report,
        routes: [
            {
                path: '/report/summary',
                component: Summary
            },
            {
                path: '/report/sale',
                component: Sale
            },
            {
                path: '/report/purchase',
                component: Purchase
            },
            {
                path: '/report/cost',
                component: Cost
            }
        ]
    },
    {
        path: '/project',
        component: Project,
        routes: [
            {
                path: '/project/create',
                component: CreateProject
            }
        ]
    }
];

export default routes;