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
  Grid,
  LinearProgress,
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
  Person as PersonIcon,
  AccountCircle as AccountIcon,
  PersonAdd as PersonAddIcon,
  ArrowForward as ArrowForwardIcon,
  Check as CheckIcon,
  Close as CloseIcon
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
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("data:image/svg+xml,%3Csvg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.03"%3E%3Cpath d="M50 50c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zM30 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm40 40c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
    opacity: 0.1
  }
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(5),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  maxWidth: '550px',
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
    },
    '&.Mui-error': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#d32f2f'
      }
    }
  },
  '& .MuiInputLabel-root': {
    fontWeight: 500,
    '&.Mui-focused': {
      color: '#1a237e'
    },
    '&.Mui-error': {
      color: '#d32f2f'
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

const PasswordStrengthBar = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1)
}));

const PasswordRequirement = styled(Box)(({ theme, met }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  fontSize: '0.8rem',
  color: met ? '#2e7d32' : '#757575',
  transition: 'color 0.3s ease'
}));

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    full_name: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const { register } = useAuth();
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

  const getPasswordStrength = () => {
    const password = formData.password;
    let strength = 0;
    
    if (password.length >= 6) strength += 25;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    
    return strength;
  };

  const getPasswordStrengthColor = () => {
    const strength = getPasswordStrength();
    if (strength <= 25) return '#f44336';
    if (strength <= 50) return '#ff9800';
    if (strength <= 75) return '#2196f3';
    return '#4caf50';
  };

  const getPasswordStrengthText = () => {
    const strength = getPasswordStrength();
    if (strength <= 25) return 'Weak';
    if (strength <= 50) return 'Fair';
    if (strength <= 75) return 'Good';
    return 'Strong';
  };

  const passwordRequirements = [
    { text: 'At least 6 characters', met: formData.password.length >= 6 },
    { text: 'At least 8 characters', met: formData.password.length >= 8 },
    { text: 'Contains uppercase letter', met: /[A-Z]/.test(formData.password) },
    { text: 'Contains number', met: /[0-9]/.test(formData.password) }
  ];

  const validateForm = () => {
    if (!formData.full_name.trim()) {
      setError('Full name is required');
      return false;
    }
    if (!formData.username.trim()) {
      setError('Username is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');

    const { confirmPassword, ...registerData } = formData;
    const result = await register(registerData);
    
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

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <StyledContainer component="main" maxWidth={false}>
      <StyledPaper elevation={0}>
        <HeaderBox>
          <IconWrapper>
            <PersonAddIcon sx={{ fontSize: '2.5rem', color: '#ffffff' }} />
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
            Create Account
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
            Join our reading community today
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
            gap: 2
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <StyledTextField
                required
                fullWidth
                id="full_name"
                label="Full Name"
                name="full_name"
                autoComplete="name"
                autoFocus
                value={formData.full_name}
                onChange={handleChange}
                disabled={loading}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon sx={{ color: '#1a237e', opacity: 0.7 }} />
                    </InputAdornment>
                  ),
                }}
                placeholder="Enter your full name"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <StyledTextField
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                value={formData.username}
                onChange={handleChange}
                disabled={loading}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountIcon sx={{ color: '#1a237e', opacity: 0.7 }} />
                    </InputAdornment>
                  ),
                }}
                placeholder="Choose a username"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <StyledTextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
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
                placeholder="Enter your email"
              />
            </Grid>

            <Grid item xs={12}>
              <StyledTextField
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="new-password"
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
                placeholder="Create a strong password"
              />
              
              {formData.password && (
                <PasswordStrengthBar>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={getPasswordStrength()}
                      sx={{
                        flex: 1,
                        height: 6,
                        borderRadius: 3,
                        backgroundColor: alpha('#000000', 0.1),
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: getPasswordStrengthColor(),
                          borderRadius: 3
                        }
                      }}
                    />
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: getPasswordStrengthColor(),
                        fontWeight: 600,
                        minWidth: 50
                      }}
                    >
                      {getPasswordStrengthText()}
                    </Typography>
                  </Box>
                  <Grid container spacing={1}>
                    {passwordRequirements.map((req, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <PasswordRequirement met={req.met}>
                          {req.met ? (
                            <CheckIcon sx={{ fontSize: '1rem' }} />
                          ) : (
                            <CloseIcon sx={{ fontSize: '1rem' }} />
                          )}
                          {req.text}
                        </PasswordRequirement>
                      </Grid>
                    ))}
                  </Grid>
                </PasswordStrengthBar>
              )}
            </Grid>

            <Grid item xs={12}>
              <StyledTextField
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={loading}
                error={formData.confirmPassword && formData.password !== formData.confirmPassword}
                helperText={
                  formData.confirmPassword && formData.password !== formData.confirmPassword 
                    ? 'Passwords do not match' 
                    : ''
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: '#1a237e', opacity: 0.7 }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle confirm password visibility"
                        onClick={toggleConfirmPasswordVisibility}
                        edge="end"
                        sx={{ color: '#1a237e', opacity: 0.7 }}
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                placeholder="Confirm your password"
              />
            </Grid>
          </Grid>

          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{ 
              mt: 3,
              py: 1.5,
              minHeight: 56
            }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: '#ffffff' }} />
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                Create Account
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
              Already have an account?
            </Typography>
            <Link 
              component={RouterLink} 
              to="/login" 
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
              Sign In Instead
            </Link>
          </Box>
        </Box>
      </StyledPaper>
    </StyledContainer>
  );
};

export default Register;