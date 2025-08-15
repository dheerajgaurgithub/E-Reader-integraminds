import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Card,
  CardContent,
  Button,
  useTheme, 
  useMediaQuery,
  styled,
  Chip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  Bookmark as BookmarkIcon,
  Devices as DevicesIcon,
  Speed as SpeedIcon,
  Search as SearchIcon,
  Book as BookIcon,
  Person as PersonIcon,
  CloudSync as CloudSyncIcon,
  FormatSize as FormatSizeIcon,
  DarkMode as DarkModeIcon,
  Notifications as NotificationsIcon,
  CheckCircle as CheckCircleIcon,
  Star as StarIcon
} from '@mui/icons-material';

// Styled components for enhanced styling
const StyledHeroSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1a237e 0%, #303f9f 50%, #3949ab 100%)',
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
    background: 'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23ffffff" fill-opacity="0.08"%3E%3Cpath d="M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z"/%3E%3C/g%3E%3C/svg%3E")',
    opacity: 0.1
  }
}));

const StyledFeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
  border: `2px solid transparent`,
  background: '#ffffff',
  position: 'relative',
  overflow: 'visible',
  '&:hover': {
    transform: 'translateY(-12px) scale(1.02)',
    borderColor: '#1a237e',
    boxShadow: '0 20px 40px rgba(26, 35, 126, 0.15)',
    '& .feature-icon': {
      transform: 'scale(1.1) rotate(5deg)',
      background: 'linear-gradient(45deg, #1a237e 30%, #303f9f 90%)'
    },
    '& .feature-chip': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 8px rgba(26, 35, 126, 0.3)'
    }
  }
}));

const StyledIconBox = styled(Box)(({ theme }) => ({
  width: 80,
  height: 80,
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #1a237e 0%, #303f9f 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#ffffff',
  marginBottom: theme.spacing(3),
  alignSelf: 'center',
  transition: 'all 0.3s ease',
  boxShadow: '0 8px 24px rgba(26, 35, 126, 0.2)',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: -4,
    borderRadius: '50%',
    background: 'linear-gradient(45deg, #1a237e, #303f9f, #3949ab)',
    zIndex: -1,
    opacity: 0
  },
  '&:hover::after': {
    opacity: 0.3
  }
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '25px',
  padding: '12px 32px',
  fontSize: '1rem',
  fontWeight: 600,
  textTransform: 'none',
  transition: 'all 0.3s ease',
  '&.primary-button': {
    background: 'linear-gradient(45deg, #1a237e 30%, #303f9f 90%)',
    boxShadow: '0 4px 16px rgba(26, 35, 126, 0.3)',
    '&:hover': {
      background: 'linear-gradient(45deg, #0d1654 30%, #1a237e 90%)',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 24px rgba(26, 35, 126, 0.4)'
    }
  },
  '&.secondary-button': {
    borderColor: '#1a237e',
    color: '#1a237e',
    borderWidth: '2px',
    '&:hover': {
      backgroundColor: '#1a237e',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 16px rgba(26, 35, 126, 0.3)'
    }
  }
}));

const features = [
  {
    title: 'Extensive Library',
    description: 'Access thousands of books across all genres.',
    icon: <BookIcon fontSize="large" />,
    color: '#1a237e',
    badge: 'Popular',
    details: [
      'Wide range of genres and categories',
      'New releases and bestsellers',
      'Personalized recommendations',
      'Save books to your reading list'
    ]
  },
  {
    title: 'Seamless Reading',
    description: 'Enjoy a distraction-free reading experience.',
    icon: <BookmarkIcon fontSize="large" />,
    color: '#303f9f',
    badge: 'Essential',
    details: [
      'Customizable font sizes and styles',
      'Day and night reading modes',
      'Page turn animations',
      'Bookmark your favorite pages'
    ]
  },
  {
    title: 'Cross-Device Sync',
    description: 'Pick up where you left off on any device.',
    icon: <DevicesIcon fontSize="large" />,
    color: '#3949ab',
    badge: 'Premium',
    details: [
      'Sync across all your devices',
      'Automatic progress saving',
      'Offline reading available',
      'Cloud backup of your library'
    ]
  },
  {
    title: 'Smart Search',
    description: 'Find exactly what you\'re looking for.',
    icon: <SearchIcon fontSize="large" />,
    color: '#5e35b1',
    badge: 'New',
    details: [
      'Search by title, author, or keyword',
      'Advanced filters and sorting',
      'Save your favorite searches',
      'Discover similar books'
    ]
  },
  {
    title: 'Reading Stats',
    description: 'Track your reading habits and progress.',
    icon: <SpeedIcon fontSize="large" />,
    color: '#673ab7',
    badge: 'Analytics',
    details: [
      'Time spent reading',
      'Books completed',
      'Reading speed analysis',
      'Personal reading challenges'
    ]
  },
  {
    title: 'Personalized Profile',
    description: 'Make it truly yours.',
    icon: <PersonIcon fontSize="large" />,
    color: '#7986cb',
    badge: 'Custom',
    details: [
      'Custom reading preferences',
      'Reading goals and achievements',
      'Personal notes and highlights',
      'Follow your favorite authors'
    ]
  }
];

const FeaturesPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ 
      minHeight: '100vh',
      bgcolor: '#fafafa'
    }}>
      {/* Hero Section */}
      <StyledHeroSection>
        <Container maxWidth="lg">
          <Typography 
            variant={isMobile ? 'h3' : isTablet ? 'h2' : 'h1'} 
            component="h1"
            gutterBottom
            sx={{ 
              fontWeight: 700,
              mb: 3,
              fontSize: {
                xs: '2.5rem',
                sm: '3.5rem',
                md: '4rem',
                lg: '4.5rem'
              },
              lineHeight: 1.1
            }}
          >
            Powerful Features
          </Typography>
          <Typography 
            variant={isMobile ? 'h6' : 'h5'} 
            sx={{ 
              maxWidth: 700, 
              mx: 'auto', 
              opacity: 0.95,
              fontSize: {
                xs: '1.1rem',
                sm: '1.3rem',
                md: '1.5rem'
              },
              lineHeight: 1.4,
              fontWeight: 300
            }}
          >
            Discover everything our e-reader platform has to offer
          </Typography>
        </Container>
      </StyledHeroSection>

      {/* Main Features */}
      <Container maxWidth="lg" sx={{ mb: { xs: 6, md: 8 } }}>
        <Grid container spacing={{ xs: 3, md: 4 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} lg={4} key={index}>
              <StyledFeatureCard elevation={3}>
                <CardContent sx={{ 
                  p: { xs: 3, md: 4 },
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  height: '100%',
                  position: 'relative'
                }}>
                  <Chip
                    label={feature.badge}
                    className="feature-chip"
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      bgcolor: feature.color,
                      color: 'white',
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      transition: 'all 0.3s ease'
                    }}
                  />
                  
                  <StyledIconBox className="feature-icon">
                    {React.cloneElement(feature.icon, { 
                      fontSize: 'large',
                      sx: { fontSize: '2rem' }
                    })}
                  </StyledIconBox>
                  
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    gutterBottom 
                    sx={{ 
                      color: '#1a237e',
                      fontWeight: 600,
                      mb: 2,
                      fontSize: { xs: '1.3rem', md: '1.5rem' }
                    }}
                  >
                    {feature.title}
                  </Typography>
                  
                  <Typography 
                    color="text.secondary" 
                    sx={{ 
                      mb: 3,
                      fontSize: '1rem',
                      lineHeight: 1.5
                    }}
                  >
                    {feature.description}
                  </Typography>
                  
                  <List dense sx={{ width: '100%', flex: 1 }}>
                    {feature.details.map((detail, i) => (
                      <ListItem key={i} disableGutters sx={{ py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <CheckCircleIcon 
                            sx={{ 
                              fontSize: '1.2rem',
                              color: feature.color,
                              opacity: 0.8
                            }} 
                          />
                        </ListItemIcon>
                        <ListItemText 
                          primary={detail}
                          primaryTypographyProps={{
                            fontSize: '0.9rem',
                            lineHeight: 1.4
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </StyledFeatureCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Additional Features Section */}
      <Box sx={{ 
        bgcolor: 'white', 
        py: { xs: 6, md: 10 },
        position: 'relative'
      }}>
        <Container maxWidth="lg">
          <Typography 
            variant={isMobile ? 'h4' : 'h3'} 
            component="h2" 
            align="center" 
            gutterBottom
            sx={{ 
              mb: { xs: 4, md: 6 },
              color: '#1a237e',
              fontWeight: 700
            }}
          >
            Even More Great Features
          </Typography>
          
          <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ maxWidth: 600, mx: { xs: 'auto', md: 0 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <StarIcon sx={{ color: '#1a237e', mr: 2, fontSize: '2rem' }} />
                  <Typography 
                    variant={isMobile ? 'h5' : 'h4'} 
                    component="h3"
                    sx={{ 
                      color: '#1a237e',
                      fontWeight: 600
                    }}
                  >
                    Customizable Reading Experience
                  </Typography>
                </Box>
                <Typography 
                  color="text.secondary" 
                  paragraph
                  sx={{ 
                    fontSize: '1.1rem',
                    lineHeight: 1.6,
                    mb: 4
                  }}
                >
                  Tailor your reading experience to your preferences with our extensive customization options.
                </Typography>
                <List>
                  {[
                    { 
                      icon: <FormatSizeIcon sx={{ color: '#1a237e' }} />, 
                      text: 'Adjustable font size and style',
                      subtext: 'Choose from 20+ fonts and sizes'
                    },
                    { 
                      icon: <DarkModeIcon sx={{ color: '#303f9f' }} />, 
                      text: 'Dark mode and theme options',
                      subtext: 'Comfortable reading in any light'
                    },
                    { 
                      icon: <CloudSyncIcon sx={{ color: '#3949ab' }} />, 
                      text: 'Automatic cloud sync',
                      subtext: 'Never lose your progress'
                    },
                    { 
                      icon: <NotificationsIcon sx={{ color: '#5e35b1' }} />, 
                      text: 'Reading reminders and notifications',
                      subtext: 'Stay on track with your goals'
                    }
                  ].map((item, index) => (
                    <ListItem key={index} disableGutters sx={{ py: 1, alignItems: 'flex-start' }}>
                      <ListItemIcon sx={{ minWidth: 48, pt: 0.5 }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText 
                        primary={item.text}
                        secondary={item.subtext}
                        primaryTypographyProps={{
                          fontWeight: 500,
                          fontSize: '1rem'
                        }}
                        secondaryTypographyProps={{
                          fontSize: '0.9rem',
                          color: 'text.secondary'
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box 
                sx={{
                  background: 'linear-gradient(135deg, #e8eaf6 0%, #f3e5f5 100%)',
                  borderRadius: 3,
                  p: { xs: 4, md: 6 },
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  textAlign: { xs: 'center', md: 'left' },
                  border: '1px solid #e0e0e0',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <Box 
                  sx={{
                    position: 'absolute',
                    top: -20,
                    right: -20,
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    bgcolor: '#1a237e',
                    opacity: 0.1
                  }}
                />
                <Typography 
                  variant={isMobile ? 'h5' : 'h4'} 
                  gutterBottom
                  sx={{ 
                    color: '#1a237e',
                    fontWeight: 600,
                    mb: 2
                  }}
                >
                  Ready to experience all these features?
                </Typography>
                <Typography 
                  color="text.secondary" 
                  sx={{ 
                    mb: 4,
                    fontSize: '1.1rem',
                    lineHeight: 1.6
                  }}
                >
                  Join thousands of readers who have already enhanced their reading experience with our platform.
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  gap: 2, 
                  flexWrap: 'wrap',
                  justifyContent: { xs: 'center', md: 'flex-start' }
                }}>
                  <StyledButton 
                    variant="contained" 
                    size="large"
                    className="primary-button"
                    onClick={() => navigate('/register')}
                    sx={{
                      minWidth: { xs: 200, sm: 180 }
                    }}
                  >
                    Sign Up Free
                  </StyledButton>
                  <StyledButton 
                    variant="outlined" 
                    size="large"
                    className="secondary-button"
                    onClick={() => navigate('/about')}
                    sx={{
                      minWidth: { xs: 200, sm: 180 }
                    }}
                  >
                    Learn More
                  </StyledButton>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default FeaturesPage;