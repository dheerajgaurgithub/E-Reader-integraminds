import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Grid,
  Avatar,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Divider,
  useTheme,
  useMediaQuery,
  Fade,
  Grow,
} from '@mui/material';
import {
  Person,
  Settings,
  Save,
  PhotoCamera,
  AccountCircle,
  Palette,
  Speed,
  TextFields,
  Email,
  Badge,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    full_name: '',
    username: '',
    email: '',
    profile_picture: '',
    reading_preferences: {
      font_size: 'medium',
      theme: 'light',
      reading_speed: 'normal',
    },
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (user) {
      setFormData({
        full_name: user.full_name || '',
        username: user.username || '',
        email: user.email || '',
        profile_picture: user.profile_picture || '',
        reading_preferences: {
          font_size: user.reading_preferences?.font_size || 'medium',
          theme: user.reading_preferences?.theme || 'light',
          reading_speed: user.reading_preferences?.reading_speed || 'normal',
        },
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('reading_preferences.')) {
      const prefKey = name.split('.')[1];
      setFormData({
        ...formData,
        reading_preferences: {
          ...formData.reading_preferences,
          [prefKey]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await updateProfile(formData);
      
      if (result.success) {
        setSuccess('Profile updated successfully!');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
      <Box sx={{ mt: { xs: 2, sm: 4 }, mb: 4 }}>
        {/* Header */}
        <Box sx={{ mb: { xs: 3, sm: 4 }, textAlign: { xs: 'center', sm: 'left' } }}>
          <Typography 
            variant={isMobile ? "h5" : "h4"} 
            sx={{ 
              color: '#0D47A1', 
              fontWeight: 'bold',
              mb: 1
            }}
          >
            ⚙️ Profile Settings
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ color: '#666' }}
          >
            Manage your account information and reading preferences
          </Typography>
        </Box>

        {/* Alerts */}
        <Fade in={!!error}>
          <Box sx={{ mb: error ? 2 : 0 }}>
            {error && (
              <Alert 
                severity="error" 
                sx={{ 
                  borderRadius: 2,
                  '& .MuiAlert-icon': { color: '#F44336' }
                }}
              >
                {error}
              </Alert>
            )}
          </Box>
        </Fade>

        <Fade in={!!success}>
          <Box sx={{ mb: success ? 2 : 0 }}>
            {success && (
              <Alert 
                severity="success" 
                sx={{ 
                  borderRadius: 2,
                  backgroundColor: '#E8F5E8',
                  '& .MuiAlert-icon': { color: '#4CAF50' }
                }}
              >
                {success}
              </Alert>
            )}
          </Box>
        </Fade>

        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
          {/* Profile Picture Section */}
          <Grid item xs={12} md={4}>
            <Grow in timeout={800}>
              <Paper 
                elevation={3}
                sx={{
                  background: 'linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)',
                  borderRadius: 3,
                  overflow: 'hidden',
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '40%',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                    zIndex: 1
                  }
                }}
              >
                <CardContent 
                  sx={{ 
                    textAlign: 'center', 
                    p: { xs: 3, sm: 4 },
                    position: 'relative',
                    zIndex: 2
                  }}
                >
                  <Box sx={{ mb: 3 }}>
                    <Avatar
                      src={formData.profile_picture}
                      sx={{ 
                        width: { xs: 100, sm: 120 }, 
                        height: { xs: 100, sm: 120 }, 
                        mx: 'auto', 
                        mb: 2,
                        border: '4px solid rgba(255,255,255,0.3)',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
                      }}
                    >
                      <Person sx={{ fontSize: { xs: 50, sm: 60 }, color: 'white' }} />
                    </Avatar>
                    <Typography 
                      variant={isSmallMobile ? "h6" : "h5"} 
                      sx={{ 
                        color: 'white',
                        fontWeight: 'bold',
                        mb: 0.5
                      }}
                    >
                      {formData.full_name || formData.username || 'User'}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: 'rgba(255,255,255,0.8)',
                        mb: 2
                      }}
                    >
                      @{formData.username || 'username'}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: 'rgba(255,255,255,0.7)',
                        display: 'block',
                        mb: 3
                      }}
                    >
                      {formData.email}
                    </Typography>
                  </Box>
                  
                  <Button
                    variant="contained"
                    startIcon={<PhotoCamera />}
                    size={isSmallMobile ? "small" : "medium"}
                    sx={{
                      backgroundColor: 'rgba(255,255,255,0.15)',
                      color: 'white',
                      border: '1px solid rgba(255,255,255,0.3)',
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 600,
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.25)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                      }
                    }}
                  >
                    Change Photo
                  </Button>
                </CardContent>
              </Paper>
            </Grow>
          </Grid>

          {/* Profile Form */}
          <Grid item xs={12} md={8}>
            <Grow in timeout={1000}>
              <Paper 
                elevation={3} 
                sx={{ 
                  p: { xs: 2, sm: 3, md: 4 },
                  background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FFFE 100%)',
                  border: '1px solid #E3F2FD',
                  borderRadius: 3
                }}
              >
                <Box component="form" onSubmit={handleSubmit}>
                  {/* Personal Information Section */}
                  <Box sx={{ mb: 4 }}>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        color: '#0D47A1',
                        fontWeight: 'bold',
                        mb: 3
                      }}
                    >
                      <AccountCircle sx={{ mr: 1, color: '#1565C0' }} />
                      Personal Information
                    </Typography>
                    
                    <Grid container spacing={{ xs: 2, sm: 3 }}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          id="full_name"
                          label="Full Name"
                          name="full_name"
                          value={formData.full_name}
                          onChange={handleChange}
                          disabled={loading}
                          InputProps={{
                            startAdornment: <Person sx={{ color: '#1565C0', mr: 1 }} />,
                          }}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                              '&:hover fieldset': {
                                borderColor: '#1565C0',
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: '#1565C0',
                              }
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                              color: '#1565C0',
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          id="username"
                          label="Username"
                          name="username"
                          value={formData.username}
                          onChange={handleChange}
                          disabled={loading}
                          InputProps={{
                            startAdornment: <Badge sx={{ color: '#1565C0', mr: 1 }} />,
                          }}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                              '&:hover fieldset': {
                                borderColor: '#1565C0',
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: '#1565C0',
                              }
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                              color: '#1565C0',
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          disabled={true}
                          helperText="Email cannot be changed"
                          InputProps={{
                            startAdornment: <Email sx={{ color: '#999', mr: 1 }} />,
                          }}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                              backgroundColor: '#F5F5F5',
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          id="profile_picture"
                          label="Profile Picture URL"
                          name="profile_picture"
                          value={formData.profile_picture}
                          onChange={handleChange}
                          disabled={loading}
                          InputProps={{
                            startAdornment: <PhotoCamera sx={{ color: '#1565C0', mr: 1 }} />,
                          }}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                              '&:hover fieldset': {
                                borderColor: '#1565C0',
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: '#1565C0',
                              }
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                              color: '#1565C0',
                            }
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Box>

                  <Divider 
                    sx={{ 
                      my: 4, 
                      borderColor: '#E3F2FD',
                      borderWidth: 1
                    }} 
                  />

                  {/* Reading Preferences Section */}
                  <Box sx={{ mb: 4 }}>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        color: '#0D47A1',
                        fontWeight: 'bold',
                        mb: 3
                      }}
                    >
                      <Settings sx={{ mr: 1, color: '#1565C0' }} />
                      Reading Preferences
                    </Typography>

                    <Grid container spacing={{ xs: 2, sm: 3 }}>
                      <Grid item xs={12} sm={4}>
                        <FormControl 
                          fullWidth
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                              '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#1565C0',
                              },
                              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#1565C0',
                              }
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                              color: '#1565C0',
                            }
                          }}
                        >
                          <InputLabel>Font Size</InputLabel>
                          <Select
                            value={formData.reading_preferences.font_size}
                            label="Font Size"
                            name="reading_preferences.font_size"
                            onChange={handleChange}
                            disabled={loading}
                            startAdornment={<TextFields sx={{ color: '#1565C0', mr: 1 }} />}
                          >
                            <MenuItem value="small">📝 Small</MenuItem>
                            <MenuItem value="medium">📄 Medium</MenuItem>
                            <MenuItem value="large">📋 Large</MenuItem>
                            <MenuItem value="extra-large">📊 Extra Large</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <FormControl 
                          fullWidth
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                              '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#1565C0',
                              },
                              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#1565C0',
                              }
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                              color: '#1565C0',
                            }
                          }}
                        >
                          <InputLabel>Theme</InputLabel>
                          <Select
                            value={formData.reading_preferences.theme}
                            label="Theme"
                            name="reading_preferences.theme"
                            onChange={handleChange}
                            disabled={loading}
                            startAdornment={<Palette sx={{ color: '#1565C0', mr: 1 }} />}
                          >
                            <MenuItem value="light">☀️ Light</MenuItem>
                            <MenuItem value="dark">🌙 Dark</MenuItem>
                            <MenuItem value="sepia">📜 Sepia</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <FormControl 
                          fullWidth
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                              '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#1565C0',
                              },
                              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#1565C0',
                              }
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                              color: '#1565C0',
                            }
                          }}
                        >
                          <InputLabel>Reading Speed</InputLabel>
                          <Select
                            value={formData.reading_preferences.reading_speed}
                            label="Reading Speed"
                            name="reading_preferences.reading_speed"
                            onChange={handleChange}
                            disabled={loading}
                            startAdornment={<Speed sx={{ color: '#1565C0', mr: 1 }} />}
                          >
                            <MenuItem value="slow">🐢 Slow</MenuItem>
                            <MenuItem value="normal">🚶 Normal</MenuItem>
                            <MenuItem value="fast">🏃 Fast</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Box>

                  {/* Save Button */}
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      justifyContent: { xs: 'center', sm: 'flex-end' },
                      gap: 2,
                      pt: 2,
                      borderTop: '1px solid #E3F2FD'
                    }}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      startIcon={loading ? null : <Save />}
                      disabled={loading}
                      size={isSmallMobile ? "medium" : "large"}
                      sx={{
                        minWidth: { xs: '100%', sm: 160 },
                        background: loading ? '#ccc' : 'linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)',
                        borderRadius: 2,
                        py: 1.5,
                        textTransform: 'none',
                        fontWeight: 600,
                        fontSize: '1rem',
                        boxShadow: '0 4px 12px rgba(21, 101, 192, 0.3)',
                        '&:hover': {
                          background: loading ? '#ccc' : 'linear-gradient(135deg, #0D47A1 0%, #1565C0 100%)',
                          transform: loading ? 'none' : 'translateY(-2px)',
                          boxShadow: loading ? 'none' : '0 6px 16px rgba(21, 101, 192, 0.4)',
                        },
                        '&:disabled': {
                          background: '#ccc',
                          color: '#999'
                        }
                      }}
                    >
                      {loading ? (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <CircularProgress size={20} sx={{ color: 'white' }} />
                          Saving...
                        </Box>
                      ) : (
                        'Save Changes'
                      )}
                    </Button>
                  </Box>
                </Box>
              </Paper>
            </Grow>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Profile;