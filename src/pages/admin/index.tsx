import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import AdminProducts from './AdminProducts';
import AdminCategories from './AdminCategories';
import AdminOrders from './AdminOrders';
import AdminCancelledOrders from './AdminCancelledOrders';
import AdminShipping from './AdminShipping';
import AdminImageManagement from './AdminImageManagement';
import AdminUsers from './AdminUsers';
import AdminReports from './AdminReports';
import AdminAuditLog from './AdminAuditLog';
import AdminHealth from './AdminHealth';
import AdminBlogs from './AdminBlogs';
import AdminProtectedRoute from '@/components/AdminProtectedRoute';

const AdminPanel: React.FC = () => {
  return (
    <Routes>
      <Route path="login" element={<AdminLogin />} />
      <Route path="/" element={
        <AdminProtectedRoute>
          <AdminLayout />
        </AdminProtectedRoute>
      }>
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={
          <AdminProtectedRoute requiredPermission="products.manage">
            <AdminProducts />
          </AdminProtectedRoute>
        } />
        <Route path="categories" element={
          <AdminProtectedRoute requiredPermission="categories.manage">
            <AdminCategories />
          </AdminProtectedRoute>
        } />
        <Route path="orders" element={
          <AdminProtectedRoute requiredPermission="orders.manage">
            <AdminOrders />
          </AdminProtectedRoute>
        } />
        <Route path="cancelled-orders" element={
          <AdminProtectedRoute requiredPermission="orders.manage">
            <AdminCancelledOrders />
          </AdminProtectedRoute>
        } />
        <Route path="shipping" element={
          <AdminProtectedRoute requiredPermission="orders.manage">
            <AdminShipping />
          </AdminProtectedRoute>
        } />
        <Route path="images" element={
          <AdminProtectedRoute requiredPermission="products.manage">
            <AdminImageManagement />
          </AdminProtectedRoute>
        } />
        <Route path="users" element={
          <AdminProtectedRoute requiredPermission="users.manage">
            <AdminUsers />
          </AdminProtectedRoute>
        } />
        <Route path="reports" element={
          <AdminProtectedRoute requiredPermission="reports.view">
            <AdminReports />
          </AdminProtectedRoute>
        } />
        <Route path="blogs" element={
          <AdminProtectedRoute>
            <AdminBlogs />
          </AdminProtectedRoute>
        } />
        <Route path="audit" element={
          <AdminProtectedRoute requiredPermission="audit.view">
            <AdminAuditLog />
          </AdminProtectedRoute>
        } />
        <Route path="health" element={
          <AdminProtectedRoute requiredPermission="health.view">
            <AdminHealth />
          </AdminProtectedRoute>
        } />
      </Route>
      <Route path="*" element={<Navigate to="/admin/login" replace />} />
    </Routes>
  );
};

export default AdminPanel;
