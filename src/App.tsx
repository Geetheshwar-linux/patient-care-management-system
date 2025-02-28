import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { AdminDashboard } from './pages/admin/Dashboard';
import { CaretakerDashboard } from './pages/caretaker/Dashboard';
import { FamilyDashboard } from './pages/family/Dashboard';
import { SignLanguageConverter } from './pages/SignLanguageConverter';
import { AboutUs } from './pages/AboutUs';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Layout } from './components/Layout';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-language" element={<SignLanguageConverter />} />
          <Route path="/about-us" element={<AboutUs />} />
          
          <Route path="/admin" element={
            <ProtectedRoute role="admin">
              <Layout>
                <AdminDashboard />
              </Layout>
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