import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ResetPassword from './pages/ResetPassword';
import PointsRecharge from './pages/finance/PointsRecharge';
import PointsRecordPage from './pages/finance/PointsRecordPage';
import PublicAccountListPage from './pages/wechat/PublicAccountListPage';
import PublicAccountFormPage from './pages/wechat/PublicAccountFormPage';
import ArticleListPage from './pages/article/ArticleListPage';
import ArticleDetailPage from './pages/article/ArticleDetailPage';
import ImageListPage from './pages/image/ImageListPage';
import StrategyListPage from './pages/publish/StrategyListPage';
import StrategyFormPage from './pages/publish/StrategyFormPage';
import LayoutListPage from './pages/publish/LayoutListPage';
import PublishRecordPage from './pages/publish/PublishRecordPage';
import AIConfigList from './pages/ai-config/AIConfigList';
import AIConfigForm from './pages/ai-config/AIConfigForm';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Finance Center */}
        <Route
          path="/finance/points"
          element={
            <ProtectedRoute>
              <MainLayout>
                <PointsRecordPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/finance/recharge"
          element={
            <ProtectedRoute>
              <MainLayout>
                <PointsRecharge />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* WeChat Management */}
        <Route
          path="/wechat/list"
          element={
            <ProtectedRoute>
              <MainLayout>
                <PublicAccountListPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/wechat/add"
          element={
            <ProtectedRoute>
              <MainLayout>
                <PublicAccountFormPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/wechat/edit/:id"
          element={
            <ProtectedRoute>
              <MainLayout>
                <PublicAccountFormPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Materials Management */}
        <Route
          path="/materials/articles"
          element={
            <ProtectedRoute>
              <MainLayout>
                <ArticleListPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/materials/articles/:id"
          element={
            <ProtectedRoute>
              <MainLayout>
                <ArticleDetailPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/materials/images"
          element={
            <ProtectedRoute>
              <MainLayout>
                <ImageListPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Publish Management */}
        <Route
          path="/publish/strategy"
          element={
            <ProtectedRoute>
              <MainLayout>
                <StrategyListPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/publish/strategy/new"
          element={
            <ProtectedRoute>
              <MainLayout>
                <StrategyFormPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/publish/strategy/edit/:id"
          element={
            <ProtectedRoute>
              <MainLayout>
                <StrategyFormPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/publish/templates"
          element={
            <ProtectedRoute>
              <MainLayout>
                <LayoutListPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/publish/list"
          element={
            <ProtectedRoute>
              <MainLayout>
                <PublishRecordPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* AI Settings */}
        <Route
          path="/settings/ai"
          element={
            <ProtectedRoute>
              <MainLayout>
                <AIConfigList />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings/ai/new"
          element={
            <ProtectedRoute>
              <MainLayout>
                <AIConfigForm />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings/ai/edit/:id"
          element={
            <ProtectedRoute>
              <MainLayout>
                <AIConfigForm />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Settings */}
        <Route
          path="/settings/password"
          element={
            <ProtectedRoute>
              <MainLayout>
                <ResetPassword />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Default Route */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}