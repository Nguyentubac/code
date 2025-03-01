// src/App.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header'; // Import Header
import Sidebar from './components/Sidebar';
import Content from './components/Content';
import Layout from './components/Layout';
function App() {
    return <Layout />;
}
export default App;
