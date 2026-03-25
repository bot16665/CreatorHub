import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Layout from './components/Layout';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Editor from './pages/Editor';
import EditPost from './pages/EditPost';
import MyPosts from './pages/MyPosts';
import ProtectedRoute from './components/ProtectedRoute';

/**
 * Main App Component
 * Defines all routes for the application
 * - Public routes: Register, Login
 * - Protected routes: Dashboard (requires authentication)
 */
function App() {
  return (
    <Layout>
      <Routes>
        {/* Public Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes - Require Authentication */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/myposts" element={<MyPosts />} />
          <Route path="/edit-post/:id" element={<EditPost />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Layout>
  );
}

/**
 * Export the App component
 */
export default App;
