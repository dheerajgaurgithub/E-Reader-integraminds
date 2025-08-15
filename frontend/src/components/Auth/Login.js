import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Link,
  CircularProgress,
  InputAdornment,
  IconButton,
  Divider,
  useTheme,
  useMediaQuery,
  styled,
  alpha
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email as EmailIcon,
  Lock as LockIcon,
  Login as LoginIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

// Styled components for enhanced UI
const StyledContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #1a237e 0%, #303f9f 30%, #3949ab 60%, #5e35b1 100%)',
  position: 'relative',
  padding: theme.spacing(2),
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0l8 6-8 6V8h-4v4h4zM0 50V0l6 6-6 8h8v4H4v28h4v4H0z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
    opacity: 0.1
  }
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(5),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  maxWidth: '480px',
  borderRadius: theme.spacing(3),
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(20px)',
  border: `1px solid ${alpha('#ffffff', 0.2)}`,
  boxShadow: '0 20px 40px rgba(26, 35, 126, 0.15)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #1a237e 0%, #303f9f 50%, #3949ab 100%)'
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(4),
    margin: theme.spacing(2)
  }
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.spacing(2),
    backgroundColor: alpha('#f5f5f5', 0.8),
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      backgroundColor: alpha('#f5f5f5', 1),
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(26, 35, 126, 0.1)'
    },
    '&.Mui-focused': {
      backgroundColor: '#ffffff',
      transform: 'translateY(-1px)',
      boxShadow: '0 8px 24px rgba(26, 35, 126, 0.15)',
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#1a237e',
        borderWidth: '2px'
      }
    }
  },
  '& .MuiInputLabel-root': {
    fontWeight: 500,
    '&.Mui-focused': {
      color: '#1a237e'
    }
  },
  '& .MuiOutlinedInput-input': {
    padding: theme.spacing(1.5, 1.5)
  }
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.spacing(2.5),
  padding: theme.spacing(1.5, 4),
  fontSize: '1.1rem',
  fontWeight: 600,
  textTransform: 'none',
  background: 'linear-gradient(45deg, #1a237e 30%, #303f9f 90%)',
  boxShadow: '0 4px 16px rgba(26, 35, 126, 0.3)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    background: 'linear-gradient(45deg, #0d1654 30%, #1a237e 90%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 24px rgba(26, 35, 126, 0.4)'
  },
  '&:active': {
    transform: 'translateY(0)'
  },
  '&:disabled': {
    background: alpha('#1a237e', 0.3),
    transform: 'none'
  }
}));

const StyledAlert = styled(Alert)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  backgroundColor: alpha('#ffebee', 0.9),
  backdropFilter: 'blur(10px)',
  border: `1px solid ${alpha('#f44336', 0.2)}`,
  '& .MuiAlert-icon': {
    color: '#d32f2f'
  }
}));

const HeaderBox = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(4),
  position: 'relative'
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: 80,
  height: 80,
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #1a237e 0%, #303f9f 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 24px',
  boxShadow: '0 8px 24px rgba(26, 35, 126, 0.25)',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: -4,
    borderRadius: '50%',
    background: 'linear-gradient(45deg, #1a237e, #303f9f, #3949ab)',
    zIndex: -1,
    opacity: 0.3,
    animation: 'pulse 2s infinite'
  },
  '@keyframes pulse': {
    '0%': {
      transform: 'scale(1)',
      opacity: 0.3
    },
    '50%': {
      transform: 'scale(1.05)',
      opacity: 0.1
    },
    '100%': {
      transform: 'scale(1)',
      opacity: 0.3
    }
  }
}));

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Basic validation
    if (!formData.email.trim()) {
      setError('Email is required');
      setLoading(false);
      return;
    }
    if (!formData.password.trim()) {
      setError('Password is required');
      setLoading(false);
      return;
    }

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <StyledContainer component="main" maxWidth={false}>
      <StyledPaper elevation={0}>
        <HeaderBox>
          <IconWrapper>
            <LoginIcon sx={{ fontSize: '2.5rem', color: '#ffffff' }} />
          </IconWrapper>
          <Typography 
            component="h1" 
            variant={isMobile ? "h4" : "h3"}
            sx={{ 
              fontWeight: 700,
              color: '#1a237e',
              mb: 1,
              fontSize: {
                xs: '2rem',
                sm: '2.5rem',
                md: '3rem'
              }
            }}
          >
            Welcome Back
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary"
            sx={{ 
              fontWeight: 400,
              opacity: 0.8,
              fontSize: {
                xs: '1rem',
                sm: '1.1rem'
              }
            }}
          >
            Sign in to continue to your account
          </Typography>
        </HeaderBox>
        
        {error && (
          <StyledAlert 
            severity="error" 
            sx={{ 
              width: '100%', 
              mb: 3,
              animation: 'fadeIn 0.3s ease-in'
            }}
          >
            {error}
          </StyledAlert>
        )}

        <Box 
          component="form" 
          onSubmit={handleSubmit} 
          sx={{ 
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 2.5
          }}
        >
          <StyledTextField
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon sx={{ color: '#1a237e', opacity: 0.7 }} />
                </InputAdornment>
              ),
            }}
            placeholder="Enter your email address"
          />
          
          <StyledTextField
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            disabled={loading}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon sx={{ color: '#1a237e', opacity: 0.7 }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={togglePasswordVisibility}
                    edge="end"
                    sx={{ color: '#1a237e', opacity: 0.7 }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            placeholder="Enter your password"
          />

          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{ 
              mt: 2,
              py: 1.5,
              minHeight: 56
            }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: '#ffffff' }} />
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                Sign In
                <ArrowForwardIcon sx={{ fontSize: '1.2rem' }} />
              </Box>
            )}
          </StyledButton>

          <Divider sx={{ my: 2, opacity: 0.6 }}>
            <Typography variant="body2" color="text.secondary">
              or
            </Typography>
          </Divider>

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Don't have an account?
            </Typography>
            <Link 
              component={RouterLink} 
              to="/register" 
              sx={{
                color: '#1a237e',
                fontWeight: 600,
                textDecoration: 'none',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                borderBottom: '2px solid transparent',
                '&:hover': {
                  borderBottomColor: '#1a237e',
                  transform: 'translateY(-1px)'
                }
              }}
            >
              Create New Account
            </Link>
          </Box>

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Link 
              component={RouterLink} 
              to="/forgot-password"
              variant="body2"
              sx={{
                color: '#1a237e',
                textDecoration: 'none',
                opacity: 0.8,
                '&:hover': {
                  opacity: 1,
                  textDecoration: 'underline'
                }
              }}
            >
              Forgot your password?
            </Link>
          </Box>
        </Box>
      </StyledPaper>
    </StyledContainer>
  );
};

export default Login;