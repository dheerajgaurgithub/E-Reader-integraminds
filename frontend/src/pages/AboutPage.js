import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Avatar, 
  Button,
  Card,
  CardContent,
  Grid,
  useTheme,
  useMediaQuery,
  styled,
  ThemeProvider,
  createTheme
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Dark Blue Theme (consistent with other components)
const darkBlueTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1e3a8a',
      light: '#3b82f6',
      dark: '#1e40af',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ffffff',
      dark: '#f1f5f9',
      contrastText: '#1e3a8a',
    },
    background: {
      default: '#0f172a',
      paper: '#1e293b',
    },
    text: {
      primary: '#ffffff',
      secondary: '#cbd5e1',
    },
    action: {
      hover: '#334155',
      selected: '#475569',
    },
    divider: '#475569',
  },
});

// Styled components for enhanced styling
const StyledHeroSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #3b82f6 100%)',
  color: '#ffffff',
  padding: theme.spacing(12, 0),
  marginBottom: theme.spacing(8),
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(30, 58, 138, 0.3) 0%, transparent 50%)',
    opacity: 0.8
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
    opacity: 0.3
  }
}));

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
  border: '1px solid #475569',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-12px) scale(1.02)',
    boxShadow: '0 20px 40px rgba(59, 130, 246, 0.25)',
    borderColor: '#3b82f6',
    background: 'linear-gradient(135deg, #334155 0%, #475569 100%)',
  }
}));

const StyledTeamCard = styled(Card)(({ theme }) => ({
  height: '100%',
  background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
  border: '2px solid #475569',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  overflow: 'hidden',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover': {
    transform: 'translateY(-10px) scale(1.03)',
    borderColor: '#3b82f6',
    boxShadow: '0 25px 50px rgba(59, 130, 246, 0.3)',
    background: 'linear-gradient(135deg, #334155 0%, #475569 100%)',
    '&::before': {
      opacity: 1,
    }
  }
}));

const StyledButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #1e3a8a 30%, #3b82f6 90%)',
  borderRadius: '50px',
  padding: '16px 40px',
  fontSize: '1.2rem',
  fontWeight: 700,
  textTransform: 'none',
  boxShadow: '0 8px 32px rgba(30, 58, 138, 0.4)',
  border: 'none',
  color: '#ffffff',
  letterSpacing: '0.5px',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
    transition: 'left 0.6s ease',
  },
  '&:hover': {
    background: 'linear-gradient(45deg, #3b82f6 30%, #60a5fa 90%)',
    transform: 'translateY(-3px)',
    boxShadow: '0 12px 40px rgba(59, 130, 246, 0.5)',
    '&::before': {
      left: '100%',
    }
  }
}));

const AboutPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const teamMembers = [
    {
      "name": "Dheeraj Gaur",
      "role": "Founder & CEO",
      "bio": "Passionate about reading and technology, Dheeraj started this platform to make reading more accessible to everyone through innovative digital solutions.",
      "color": "#1e3a8a",
      "portfolio": "https://dheerajgaurofficial.netlify.app/",
      "image": "https://lh3.googleusercontent.com/a/ACg8ocJvx-VbehHVLPXM-a42GC7VyR2DpYQsKsIM22uFKF4dzuy8A8IN=s432-c-no"
    }
  ];

  return (
    <ThemeProvider theme={darkBlueTheme}>
      <Box sx={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      }}>
        {/* Hero Section */}
        <StyledHeroSection>
          <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
            <Typography 
              variant={isMobile ? 'h3' : isTablet ? 'h2' : 'h1'} 
              component="h1"
              gutterBottom
              sx={{ 
                fontWeight: 800,
                mb: 3,
                fontSize: {
                  xs: '2.8rem',
                  sm: '3.8rem',
                  md: '4.5rem',
                  lg: '5rem'
                },
                lineHeight: 1.1,
                textShadow: '0 4px 20px rgba(0,0,0,0.3)',
                background: 'linear-gradient(45deg, #ffffff 30%, #cbd5e1 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              📚 About Our E-Reader Platform
            </Typography>
            <Typography 
              variant={isMobile ? 'h6' : 'h5'} 
              sx={{ 
                maxWidth: 700, 
                mx: 'auto', 
                opacity: 0.95,
                fontSize: {
                  xs: '1.2rem',
                  sm: '1.4rem',
                  md: '1.6rem'
                },
                lineHeight: 1.5,
                fontWeight: 300,
                textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                color: '#e2e8f0'
              }}
            >
              Empowering readers with a modern, accessible, and feature-rich digital reading experience.
            </Typography>
          </Container>
        </StyledHeroSection>

        <Container maxWidth="lg" sx={{ pb: 8 }}>
          {/* Our Story */}
          <Box sx={{ mb: { xs: 6, md: 8 }, textAlign: 'center' }}>
            <Typography 
              variant={isMobile ? 'h4' : 'h3'} 
              component="h2" 
              gutterBottom
              sx={{ 
                color: '#ffffff',
                fontWeight: 700,
                mb: 4,
                fontSize: {
                  xs: '2rem',
                  sm: '2.5rem',
                  md: '3rem'
                }
              }}
            >
              🌟 Our Story
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                maxWidth: 900, 
                mx: 'auto',
                lineHeight: 1.8,
                fontSize: {
                  xs: '1.1rem',
                  sm: '1.2rem',
                  md: '1.3rem'
                },
                px: { xs: 2, sm: 0 },
                color: '#cbd5e1'
              }}
            >
              Founded in 2024, our e-reader platform was born out of a passion for reading and technology. 
              We noticed that while digital reading was becoming increasingly popular, many platforms were 
              either too complex or lacked essential features for serious readers. We set out to create 
              a solution that combines the best of technology with the pure joy of reading.
            </Typography>
          </Box>

          {/* Mission & Vision */}
          <Grid container spacing={{ xs: 3, md: 4 }} sx={{ mb: { xs: 6, md: 8 } }}>
            <Grid item xs={12} md={6}>
              <StyledCard elevation={0}>
                <CardContent sx={{ p: { xs: 3, md: 4 }, height: '100%' }}>
                  <Box sx={{ 
                    width: 80, 
                    height: 80, 
                    borderRadius: '50%', 
                    background: 'linear-gradient(45deg, #1e3a8a 30%, #3b82f6 90%)', 
                    mb: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 32px rgba(30, 58, 138, 0.3)',
                    border: '3px solid rgba(59, 130, 246, 0.2)'
                  }}>
                    <Typography sx={{ color: 'white', fontSize: '2rem', fontWeight: 'bold' }}>
                      🎯
                    </Typography>
                  </Box>
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    gutterBottom
                    sx={{ 
                      color: '#ffffff',
                      fontWeight: 700,
                      mb: 2
                    }}
                  >
                    Our Mission
                  </Typography>
                  <Typography 
                    sx={{ 
                      lineHeight: 1.7,
                      fontSize: '1.1rem',
                      color: '#cbd5e1'
                    }}
                  >
                    To make reading more accessible, enjoyable, and convenient for everyone, 
                    by providing a platform that understands and adapts to the needs of modern readers.
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
            <Grid item xs={12} md={6}>
              <StyledCard elevation={0}>
                <CardContent sx={{ p: { xs: 3, md: 4 }, height: '100%' }}>
                  <Box sx={{ 
                    width: 80, 
                    height: 80, 
                    borderRadius: '50%', 
                    background: 'linear-gradient(45deg, #3b82f6 30%, #60a5fa 90%)', 
                    mb: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 32px rgba(59, 130, 246, 0.3)',
                    border: '3px solid rgba(96, 165, 250, 0.2)'
                  }}>
                    <Typography sx={{ color: 'white', fontSize: '2rem', fontWeight: 'bold' }}>
                      🚀
                    </Typography>
                  </Box>
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    gutterBottom
                    sx={{ 
                      color: '#ffffff',
                      fontWeight: 700,
                      mb: 2
                    }}
                  >
                    Our Vision
                  </Typography>
                  <Typography 
                    sx={{ 
                      lineHeight: 1.7,
                      fontSize: '1.1rem',
                      color: '#cbd5e1'
                    }}
                  >
                    We envision a world where everyone has access to the books they love, 
                    with a reading experience that's personalized, intuitive, and available 
                    anytime, anywhere.
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
          </Grid>

          {/* Team Section */}
          <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
            <Typography 
              variant={isMobile ? 'h4' : 'h3'} 
              component="h2" 
              gutterBottom
              sx={{ 
                color: '#ffffff',
                fontWeight: 700,
                mb: 2,
                fontSize: {
                  xs: '2rem',
                  sm: '2.5rem',
                  md: '3rem'
                }
              }}
            >
              👥 Meet Our Team
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: { xs: 4, md: 6 }, 
                maxWidth: 700, 
                mx: 'auto',
                lineHeight: 1.7,
                px: { xs: 2, sm: 0 },
                fontSize: {
                  xs: '1.1rem',
                  sm: '1.2rem'
                },
                color: '#cbd5e1'
              }}
            >
              We're a passionate team of book lovers, developers, and designers dedicated to 
              creating the best reading experience for you.
            </Typography>
            
            <Grid container spacing={{ xs: 3, md: 4 }} justifyContent="center">
              {teamMembers.map((member, index) => (
                <Grid item xs={12} sm={8} md={6} lg={4} key={index}>
                  <StyledTeamCard elevation={0}>
                    <CardContent sx={{ 
                      p: { xs: 3, md: 4 },
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      position: 'relative',
                      zIndex: 1
                    }}>
                      <Avatar 
                        src={member.image}
                        alt={member.name}
                        sx={{ 
                          width: { xs: 120, md: 150 }, 
                          height: { xs: 120, md: 150 }, 
                          mb: 3,
                          border: '4px solid #3b82f6',
                          boxShadow: '0 12px 40px rgba(59, 130, 246, 0.4)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'scale(1.05)',
                            boxShadow: '0 16px 50px rgba(59, 130, 246, 0.6)',
                          }
                        }}
                      />
                      <Typography 
                        variant="h5" 
                        component="h3" 
                        gutterBottom
                        sx={{ 
                          fontWeight: 700,
                          color: '#ffffff',
                          fontSize: { xs: '1.3rem', md: '1.5rem' },
                          mb: 1
                        }}
                      >
                        {member.name}
                      </Typography>
                      <Typography 
                        sx={{ 
                          fontWeight: 600,
                          mb: 3,
                          fontSize: '1rem',
                          textTransform: 'uppercase',
                          letterSpacing: '1px',
                          color: '#3b82f6',
                          background: 'rgba(59, 130, 246, 0.1)',
                          padding: '8px 16px',
                          borderRadius: '20px',
                          border: '1px solid rgba(59, 130, 246, 0.3)'
                        }}
                      >
                        {member.role}
                      </Typography>
                      <Typography 
                        sx={{ 
                          lineHeight: 1.7,
                          fontSize: '1rem',
                          color: '#cbd5e1',
                          mb: 3
                        }}
                      >
                        {member.bio}
                      </Typography>
                      <Button
                        variant="outlined"
                        href={member.portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          borderColor: '#3b82f6',
                          color: '#3b82f6',
                          borderRadius: '25px',
                          padding: '10px 24px',
                          fontWeight: 600,
                          textTransform: 'none',
                          '&:hover': {
                            backgroundColor: 'rgba(59, 130, 246, 0.1)',
                            borderColor: '#60a5fa',
                            transform: 'translateY(-2px)',
                          }
                        }}
                      >
                        🌐 View Portfolio
                      </Button>
                    </CardContent>
                  </StyledTeamCard>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Call to Action */}
          <Box 
            sx={{ 
              textAlign: 'center',
              p: { xs: 4, md: 6 },
              borderRadius: 4,
              background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
              border: '2px solid #475569',
              maxWidth: 800,
              mx: 'auto',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
                opacity: 0.8
              }
            }}
          >
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Typography 
                variant={isMobile ? 'h4' : 'h3'} 
                component="h2" 
                gutterBottom
                sx={{ 
                  color: '#ffffff',
                  fontWeight: 800,
                  mb: 2,
                  fontSize: {
                    xs: '1.8rem',
                    sm: '2.2rem',
                    md: '2.5rem'
                  }
                }}
              >
                🚀 Ready to Start Reading?
              </Typography>
              <Typography 
                sx={{ 
                  mb: 4, 
                  maxWidth: 600, 
                  mx: 'auto',
                  lineHeight: 1.7,
                  fontSize: { xs: '1.1rem', md: '1.2rem' },
                  px: { xs: 1, sm: 0 },
                  color: '#cbd5e1'
                }}
              >
                Join thousands of readers who have already discovered their next favorite book on our platform.
              </Typography>
              <StyledButton 
                onClick={() => navigate('/register')}
                size="large"
                sx={{
                  minWidth: { xs: 220, sm: 280 },
                  fontSize: { xs: '1.1rem', sm: '1.2rem' }
                }}
              >
                📖 Sign Up Free
              </StyledButton>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default AboutPage;