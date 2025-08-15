import React from 'react';
import { Box, Button, Container, Typography, useTheme, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Custom dark blue theme
const darkBlueTheme = createTheme({
  palette: {
    primary: {
      main: '#1e3a8a', // Dark blue
      light: '#3b82f6',
      dark: '#1e1b4b',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ffffff',
      contrastText: '#1e3a8a',
    },
    background: {
      default: '#0f172a', // Very dark blue
      paper: '#ffffff',
    },
    text: {
      primary: '#ffffff',
      secondary: '#94a3b8',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
  },
});

const LandingPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const heroStyles = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #1e3a8a 0%, #0f172a 50%, #1e40af 100%)',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1), transparent 50%)',
      pointerEvents: 'none',
    },
  };

  const buttonStyles = {
    primary: {
      backgroundColor: '#ffffff',
      color: '#1e3a8a',
      px: { xs: 3, sm: 4 },
      py: { xs: 1.5, sm: 2 },
      borderRadius: '50px',
      fontWeight: 600,
      fontSize: { xs: '1rem', sm: '1.1rem' },
      textTransform: 'none',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
      transition: 'all 0.3s ease',
      '&:hover': {
        backgroundColor: '#f8fafc',
        transform: 'translateY(-2px)',
        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.3)',
      },
    },
    secondary: {
      border: '2px solid #ffffff',
      color: '#ffffff',
      px: { xs: 3, sm: 4 },
      py: { xs: 1.5, sm: 2 },
      borderRadius: '50px',
      fontWeight: 600,
      fontSize: { xs: '1rem', sm: '1.1rem' },
      textTransform: 'none',
      transition: 'all 0.3s ease',
      '&:hover': {
        backgroundColor: '#ffffff',
        color: '#1e3a8a',
        transform: 'translateY(-2px)',
      },
    },
  };

  const featureCardStyles = {
    textAlign: 'center',
    p: { xs: 3, md: 4 },
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-8px)',
    },
  };

  const featureIconStyles = {
    width: { xs: 70, md: 80 },
    height: { xs: 70, md: 80 },
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #3b82f6, #1e40af)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    mb: 3,
    fontSize: { xs: '1.8rem', md: '2rem' },
    fontWeight: 'bold',
    boxShadow: '0 8px 32px rgba(59, 130, 246, 0.3)',
    transition: 'all 0.3s ease',
  };

  return (
    <ThemeProvider theme={darkBlueTheme}>
      <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
        {/* Hero Section */}
        <Box sx={heroStyles}>
          <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
            <Box sx={{ textAlign: 'center', py: { xs: 8, md: 12 } }}>
              <Typography 
                variant={isMobile ? 'h3' : isTablet ? 'h2' : 'h1'}
                component="h1" 
                sx={{
                  fontWeight: 700,
                  mb: { xs: 3, md: 4 },
                  background: 'linear-gradient(45deg, #ffffff, #e2e8f0)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem', lg: '5.5rem' },
                  lineHeight: 1.1,
                }}
              >
                Your Personal Digital Library
              </Typography>
              <Typography 
                variant={isMobile ? 'h6' : 'h5'}
                component="h2" 
                sx={{
                  mb: { xs: 4, md: 6 },
                  color: '#cbd5e1',
                  maxWidth: '600px',
                  mx: 'auto',
                  lineHeight: 1.6,
                  fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
                }}
              >
                Read, discover, and track your reading journey all in one place.
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                gap: { xs: 2, sm: 3 }, 
                justifyContent: 'center',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center',
                maxWidth: '400px',
                mx: 'auto'
              }}>
                <Button 
                  variant="contained" 
                  onClick={() => navigate('/register')}
                  sx={buttonStyles.primary}
                  fullWidth={isMobile}
                >
                  Get Started
                </Button>
                <Button 
                  variant="outlined" 
                  onClick={() => navigate('/features')}
                  sx={buttonStyles.secondary}
                  fullWidth={isMobile}
                >
                  Learn More
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>

        {/* Features Section */}
        <Box sx={{ 
          py: { xs: 8, md: 12 }, 
          backgroundColor: '#ffffff',
          color: '#1e293b'
        }}>
          <Container maxWidth="lg">
            <Typography 
              variant={isMobile ? 'h4' : 'h3'} 
              component="h2" 
              align="center" 
              sx={{
                fontWeight: 600,
                mb: 2,
                color: '#1e3a8a',
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              }}
            >
              Why Choose Our E-Reader?
            </Typography>
            <Typography 
              variant="h6"
              align="center"
              sx={{
                color: '#64748b',
                mb: { xs: 6, md: 8 },
                maxWidth: '600px',
                mx: 'auto',
                fontSize: { xs: '1rem', sm: '1.1rem' },
              }}
            >
              Experience reading like never before with our cutting-edge features designed for book lovers.
            </Typography>
            
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: { 
                xs: '1fr', 
                md: 'repeat(3, 1fr)' 
              }, 
              gap: { xs: 4, md: 6 },
              mt: { xs: 6, md: 8 }
            }}>
              {[
                {
                  title: 'Personalized Library',
                  description: 'Build your own digital book collection and access it anywhere, anytime.',
                  icon: '📚'
                },
                {
                  title: 'Reading Progress',
                  description: 'Track your reading progress and pick up right where you left off.',
                  icon: '📈'
                },
                {
                  title: 'Cross-Device Sync',
                  description: 'Seamlessly switch between devices without losing your place.',
                  icon: '🔄'
                }
              ].map((feature, index) => (
                <Box key={index} sx={featureCardStyles}>
                  <Box sx={featureIconStyles}>
                    <span style={{ fontSize: 'inherit' }}>{feature.icon}</span>
                  </Box>
                  <Typography 
                    variant="h5" 
                    gutterBottom 
                    sx={{ 
                      fontWeight: 600, 
                      color: '#1e3a8a',
                      mb: 2,
                      fontSize: { xs: '1.3rem', md: '1.5rem' },
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography 
                    sx={{
                      color: '#64748b',
                      lineHeight: 1.7,
                      fontSize: { xs: '1rem', md: '1.1rem' },
                    }}
                  >
                    {feature.description}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Container>
        </Box>

        {/* Call to Action Section */}
        <Box sx={{
          py: { xs: 8, md: 12 },
          background: 'linear-gradient(135deg, #1e3a8a, #0f172a)',
          textAlign: 'center'
        }}>
          <Container maxWidth="md">
            <Typography 
              variant={isMobile ? 'h4' : 'h3'}
              component="h2"
              sx={{
                fontWeight: 600,
                mb: 3,
                color: '#ffffff',
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              }}
            >
              Ready to Transform Your Reading Experience?
            </Typography>
            <Typography 
              variant="h6"
              sx={{
                color: '#cbd5e1',
                mb: 4,
                maxWidth: '500px',
                mx: 'auto',
                fontSize: { xs: '1rem', sm: '1.2rem' },
                lineHeight: 1.6,
              }}
            >
              Join thousands of readers who have already discovered the future of digital reading.
            </Typography>
            <Button 
              variant="contained"
              sx={{
                ...buttonStyles.primary,
                py: { xs: 2, sm: 2.5 },
                px: { xs: 4, sm: 6 },
                fontSize: { xs: '1.1rem', sm: '1.2rem' },
              }}
            >
              Start Reading Today
            </Button>
          </Container>
        </Box>

        {/* Footer */}
        <Box sx={{
          py: 4,
          backgroundColor: '#0f172a',
          borderTop: '1px solid #334155',
          textAlign: 'center'
        }}>
          <Container maxWidth="lg">
            <Typography sx={{ color: '#64748b', fontSize: '0.9rem' }}>
              © 2025 Digital Library. All rights reserved.
            </Typography>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default LandingPage;