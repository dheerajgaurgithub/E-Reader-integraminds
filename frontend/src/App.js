import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import theme from './theme/theme';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Layout Components
import Navbar from './components/Layout/Navbar';

// Auth Components
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

// App Components
import Dashboard from './components/Dashboard/Dashboard';
import BooksList from './components/Books/BooksList';
import AddBook from './components/Books/AddBook';
import BookReader from './components/Books/BookReader';
import ReadingHistory from './components/History/ReadingHistory';
import Profile from './components/Profile/Profile';

// New Pages
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import FeaturesPage from './pages/FeaturesPage';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Public Route Component (redirect to dashboard if authenticated)
const PublicRoute = ({ children, restricted = false }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  // If route is restricted and user is authenticated, redirect to dashboard
  // Otherwise, show the children (the requested page)
  return restricted && isAuthenticated ? <Navigate to="/dashboard" /> : children;
};

function AppContent() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Routes>
          {/* Public Landing Page */}
          <Route 
            path="/" 
            element={
              <PublicRoute>
                <LandingPage />
              </PublicRoute>
            } 
          />
          
          {/* Public Pages */}
          <Route 
            path="/about" 
            element={
              <PublicRoute>
                <AboutPage />
              </PublicRoute>
            } 
          />
          <Route 
            path="/features" 
            element={
              <PublicRoute>
                <FeaturesPage />
              </PublicRoute>
            } 
          />
          
          {/* Auth Pages - Only accessible when not authenticated */}
          <Route 
            path="/login" 
            element={
              <PublicRoute restricted={true}>
                <Login />
              </PublicRoute>
            } 
          />
          <Route 
            path="/register" 
            element={
              <PublicRoute restricted={true}>
                <Register />
              </PublicRoute>
            } 
          />
          
          {/* Protected Routes - Only accessible when authenticated */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/books" 
            element={
              <ProtectedRoute>
                <BooksList />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/add-book" 
            element={
              <ProtectedRoute>
                <AddBook />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/books/:id" 
            element={
              <ProtectedRoute>
                <BookReader />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/history" 
            element={
              <ProtectedRoute>
                <ReadingHistory />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          
          {/* Default Route */}
          <Route path="/" element={<Navigate to="/dashboard" />} />
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Box>
    </Box>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
