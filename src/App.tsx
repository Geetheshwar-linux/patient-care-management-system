import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { AdminDashboard } from './pages/admin/Dashboard';
import { Caretakers } from './pages/admin/Caretakers'; // Ensure correct import
import { Patients } from './pages/admin/Patients';
import { Tasks } from './pages/admin/Tasks';
import { CaretakerDashboard } from './pages/caretaker/Dashboard';
import { FamilyDashboard } from './pages/family/Dashboard';
import { SignLanguageConverter } from './pages/SignLanguageConverter';
import { AboutUs } from './pages/AboutUs';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Layout } from './components/Layout';
import { AdminLayout } from './components/AdminLayout';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-language" element={<SignLanguageConverter />} />
          
          <Route path="/admin" element={
            <ProtectedRoute role="admin">
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/caretakers" element={ // Ensure the path is correct
            <ProtectedRoute role="admin">
              <AdminLayout>
                <Caretakers />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/patients" element={
            <ProtectedRoute role="admin">
              <AdminLayout>
                <Patients />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/tasks" element={
            <ProtectedRoute role="admin">
              <AdminLayout>
                <Tasks />
              </AdminLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/caretaker" element={
            <ProtectedRoute role="caretaker">
              <Layout>
                <CaretakerDashboard />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/family" element={
            <ProtectedRoute role="family">
              <Layout>
                <FamilyDashboard />
              </Layout>
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;