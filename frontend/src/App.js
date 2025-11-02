import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AddEditSweet from './components/AddEditSweet';
import AdminPanel from './components/AdminPanel';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('access_token');
  return token ? children : <Navigate to="/" />;
}

function App() {
  return (
    <BrowserRouter>
      <div className="container py-4">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>} />
          <Route path="/admin" element={<PrivateRoute><AdminPanel/></PrivateRoute>} />
          <Route path="/sweets/add" element={<PrivateRoute><AddEditSweet/></PrivateRoute>} />
          <Route path="/sweets/edit/:id" element={<PrivateRoute><AddEditSweet edit/></PrivateRoute>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
