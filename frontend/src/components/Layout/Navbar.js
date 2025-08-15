import React, { useState, Fragment } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Box,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Badge,
  Chip,
  styled,
  alpha
} from '@mui/material';
import {
  Menu as MenuIcon,
  AccountCircle,
  Book,
  Home as HomeIcon,
  Info as AboutIcon,
  FeaturedPlayList as FeaturesIcon,
  History,
  Dashboard as DashboardIcon,
  Add as AddIcon,
  Logout,
  Settings,
  NotificationsNone as NotificationsIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

// Styled components for enhanced UI
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1a237e 0%, #303f9f 50%, #3949ab 100%)',
  boxShadow: '0 4px 20px rgba(26, 35, 126, 0.15)',
  backdropFilter: 'blur(10px)',
  borderBottom: `1px solid ${alpha('#ffffff', 0.1)}`,
  position: 'sticky'
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: '64px !important',
  padding: theme.spacing(0, 2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(0, 3),
    minHeight: '72px !important'
  }
}));

const LogoText = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  fontSize: '1.5rem',
  background: 'linear-gradient(45deg, #ffffff 30%, #e3f2fd 90%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textDecoration: 'none',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'scale(1.05)',
    filter: 'brightness(1.1)'
  },
  [theme.breakpoints.up('sm')]: {
    fontSize: '1.6rem'
  }
}));

const StyledNavButton = styled(Button)(({ theme, active }) => ({
  color: '#ffffff',
  textTransform: 'none',
  fontWeight: active ? 700 : 500,
  fontSize: '0.95rem',
  padding: theme.spacing(1, 2),
  borderRadius: '25px',
  position: 'relative',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  marginRight: theme.spacing(0.5),
  ...(active && {
    backgroundColor: alpha('#ffffff', 0.15),
    boxShadow: '0 2px 8px rgba(255, 255, 255, 0.2)',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '60%',
      height: '2px',
      backgroundColor: '#ffffff',
      borderRadius: '1px'
    }
  }),
  '&:hover': {
    backgroundColor: alpha('#ffffff', 0.12),
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(255, 255, 255, 0.2)'
  }
}));

const StyledAuthButton = styled(Button)(({ theme, variant }) => ({
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '0.9rem',
  padding: theme.spacing(1, 2.5),
  borderRadius: '20px',
  transition: 'all 0.3s ease',
  minWidth: '80px',
  ...(variant === 'outlined' ? {
    borderColor: '#ffffff',
    color: '#ffffff',
    borderWidth: '2px',
    '&:hover': {
      backgroundColor: '#ffffff',
      color: '#1a237e',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(255, 255, 255, 0.3)'
    }
  } : {
    backgroundColor: alpha('#ffffff', 0.15),
    color: '#ffffff',
    border: 'none',
    '&:hover': {
      backgroundColor: alpha('#ffffff', 0.25),
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(255, 255, 255, 0.2)'
    }
  })
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    background: 'linear-gradient(180deg, #fafafa 0%, #ffffff 100%)',
    borderRight: `1px solid ${theme.palette.grey[200]}`,
    width: 320,
    boxShadow: '4px 0 20px rgba(26, 35, 126, 0.08)'
  }
}));

const StyledListItem = styled(ListItem)(({ theme, selected }) => ({
  borderRadius: theme.spacing(1.5),
  margin: theme.spacing(0.5, 1),
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    backgroundColor: alpha('#1a237e', 0.08),
    transform: 'translateX(4px)',
    boxShadow: '0 2px 8px rgba(26, 35, 126, 0.12)'
  },
  ...(selected && {
    backgroundColor: '#1a237e',
    color: '#ffffff',
    boxShadow: '0 4px 12px rgba(26, 35, 126, 0.25)',
    '&:hover': {
      backgroundColor: '#0d1654',
      transform: 'translateX(4px)',
    },
    '& .MuiListItemIcon-root': {
      color: '#ffffff'
    }
  })
}));

const ProfileMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: theme.spacing(2),
    minWidth: 280,
    boxShadow: '0 8px 32px rgba(26, 35, 126, 0.15)',
    border: `1px solid ${alpha('#1a237e', 0.1)}`,
    overflow: 'visible',
    marginTop: theme.spacing(1),
    '&::before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      right: 18,
      width: 12,
      height: 12,
      backgroundColor: '#ffffff',
      transform: 'translateY(-50%) rotate(45deg)',
      border: `1px solid ${alpha('#1a237e', 0.1)}`,
      borderBottom: 'none',
      borderRight: 'none',
      zIndex: 0
    }
  }
}));

const UserInfoBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2, 2.5),
  background: 'linear-gradient(135deg, #e8eaf6 0%, #f3e5f5 100%)',
  borderRadius: theme.spacing(1.5),
  margin: theme.spacing(1, 1.5, 1.5, 1.5),
  border: `1px solid ${alpha('#1a237e', 0.1)}`
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 36,
  height: 36,
  border: '2px solid rgba(255, 255, 255, 0.8)',
  boxShadow: '0 2px 8px rgba(26, 35, 126, 0.2)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1)',
    boxShadow: '0 4px 16px rgba(26, 35, 126, 0.3)'
  }
}));

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    handleMenuClose();
  };

  const publicMenuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/', color: '#1a237e' },
    { text: 'Features', icon: <FeaturesIcon />, path: '/features', color: '#303f9f' },
    { text: 'About', icon: <AboutIcon />, path: '/about', color: '#3949ab' },
  ];

  const protectedMenuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard', color: '#1a237e' },
    { text: 'Books', icon: <Book />, path: '/books', color: '#303f9f' },
    { text: 'Add Book', icon: <AddIcon />, path: '/add-book', color: '#3949ab' },
    { text: 'Reading History', icon: <History />, path: '/history', color: '#5e35b1' },
  ];

  const renderAuthButtons = () => (
    <Box sx={{ 
      display: 'flex', 
      gap: 1.5,
      alignItems: 'center'
    }}>
      <StyledAuthButton
        component={RouterLink} 
        to="/login"
        size={isSmallMobile ? "small" : "medium"}
      >
        Login
      </StyledAuthButton>
      <StyledAuthButton
        variant="outlined"
        component={RouterLink} 
        to="/register"
        size={isSmallMobile ? "small" : "medium"}
      >
        Register
      </StyledAuthButton>
    </Box>
  );

  const renderNavItems = (items) => (
    <Box sx={{ 
      display: 'flex', 
      gap: 0.5,
      alignItems: 'center'
    }}>
      {items.map((item) => (
        <StyledNavButton
          key={item.path}
          component={RouterLink}
          to={item.path}
          startIcon={item.icon}
          active={location.pathname === item.path}
          size={isSmallMobile ? "small" : "medium"}
        >
          {item.text}
        </StyledNavButton>
      ))}
    </Box>
  );

  const appTitle = (
    <LogoText 
      variant="h6" 
      component={RouterLink} 
      to="/"
      sx={{
        flexGrow: { xs: 1, md: 0 },
        mr: { md: 4 },
      }}
    >
      📚 E-Reader Platform
    </LogoText>
  );

  return (
    <>
      <StyledAppBar position="sticky" elevation={0}>
        <StyledToolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ 
                mr: 2,
                '&:hover': {
                  backgroundColor: alpha('#ffffff', 0.1),
                  transform: 'scale(1.1)'
                }
              }}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          {appTitle}

          {!isMobile && (
            <Box sx={{ 
              flexGrow: 1, 
              display: 'flex', 
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              {isAuthenticated 
                ? renderNavItems(protectedMenuItems)
                : renderNavItems(publicMenuItems)
              }
            </Box>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {isAuthenticated && !isMobile && (
              <IconButton
                color="inherit"
                sx={{
                  mr: 1,
                  '&:hover': {
                    backgroundColor: alpha('#ffffff', 0.1),
                    transform: 'scale(1.1)'
                  }
                }}
              >
                <Badge badgeContent={3} color="error" variant="dot">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            )}

            {!isAuthenticated ? (
              !isMobile && renderAuthButtons()
            ) : (
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
                sx={{
                  ml: 1,
                  p: 0.5
                }}
              >
                {user?.profile_picture ? (
                  <StyledAvatar 
                    src={user.profile_picture}
                    alt={user?.name || 'User'}
                  />
                ) : (
                  <StyledAvatar sx={{ bgcolor: '#ffffff', color: '#1a237e' }}>
                    {user?.name ? user.name.charAt(0).toUpperCase() : <AccountCircle />}
                  </StyledAvatar>
                )}
              </IconButton>
            )}
          </Box>
        </StyledToolbar>
      </StyledAppBar>

      <ProfileMenu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <UserInfoBox>
          <Typography variant="subtitle1" fontWeight="600" color="#1a237e">
            {user?.name || 'User'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user?.email || ''}
          </Typography>
          <Chip 
            label="Premium" 
            size="small" 
            sx={{ 
              mt: 1, 
              bgcolor: '#1a237e', 
              color: 'white',
              fontSize: '0.7rem'
            }} 
          />
        </UserInfoBox>
        
        <MenuItem 
          onClick={() => { 
            navigate('/profile'); 
            handleMenuClose(); 
          }}
          sx={{ 
            py: 1.5,
            mx: 1,
            borderRadius: 1.5,
            '&:hover': {
              backgroundColor: alpha('#1a237e', 0.08)
            }
          }}
        >
          <ListItemIcon>
            <Settings fontSize="small" sx={{ color: '#1a237e' }} />
          </ListItemIcon>
          <ListItemText 
            primary="Profile & Settings"
            primaryTypographyProps={{ fontWeight: 500 }}
          />
        </MenuItem>
        <Divider sx={{ my: 1, mx: 2 }} />
        <MenuItem 
          onClick={handleLogout}
          sx={{ 
            py: 1.5,
            mx: 1,
            borderRadius: 1.5,
            color: '#d32f2f',
            '&:hover': {
              backgroundColor: alpha('#d32f2f', 0.08)
            }
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" sx={{ color: '#d32f2f' }} />
          </ListItemIcon>
          <ListItemText 
            primary="Logout"
            primaryTypographyProps={{ fontWeight: 500 }}
          />
        </MenuItem>
      </ProfileMenu>

      {isMobile && (
        <StyledDrawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <Box sx={{ 
            p: 3, 
            display: 'flex', 
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: `1px solid ${theme.palette.grey[200]}`
          }}>
            <LogoText sx={{ fontSize: '1.3rem' }}>
              📚 E-Reader Platform
            </LogoText>
            <IconButton onClick={handleDrawerToggle} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
          
          <List sx={{ pt: 2 }}>
            {isAuthenticated ? (
              <>
                <Box sx={{ px: 2, mb: 2 }}>
                  <UserInfoBox sx={{ m: 0 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <StyledAvatar
                        src={user?.profile_picture}
                        sx={{ width: 50, height: 50 }}
                      >
                        {user?.name ? user.name.charAt(0).toUpperCase() : <AccountCircle />}
                      </StyledAvatar>
                      <Box>
                        <Typography variant="subtitle1" fontWeight="600" color="#1a237e">
                          {user?.name || 'User'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {user?.email || ''}
                        </Typography>
                      </Box>
                    </Box>
                  </UserInfoBox>
                </Box>
                
                {protectedMenuItems.map((item) => (
                  <StyledListItem
                    button
                    key={item.path}
                    component={RouterLink}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    selected={location.pathname === item.path}
                  >
                    <ListItemIcon sx={{ color: item.color }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={item.text}
                      primaryTypographyProps={{ fontWeight: 500 }}
                    />
                  </StyledListItem>
                ))}
                <Divider sx={{ my: 2, mx: 2 }} />
                <StyledListItem
                  button
                  component={RouterLink}
                  to="/profile"
                  onClick={() => setMobileOpen(false)}
                >
                  <ListItemIcon sx={{ color: '#1a237e' }}>
                    <Settings />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Profile & Settings"
                    primaryTypographyProps={{ fontWeight: 500 }}
                  />
                </StyledListItem>
                <StyledListItem
                  button
                  onClick={() => {
                    handleLogout();
                    setMobileOpen(false);
                  }}
                >
                  <ListItemIcon sx={{ color: '#d32f2f' }}>
                    <Logout />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Logout"
                    primaryTypographyProps={{ fontWeight: 500, color: '#d32f2f' }}
                  />
                </StyledListItem>
              </>
            ) : (
              <>
                {publicMenuItems.map((item) => (
                  <StyledListItem
                    button
                    key={item.path}
                    component={RouterLink}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    selected={location.pathname === item.path}
                  >
                    <ListItemIcon sx={{ color: item.color }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={item.text}
                      primaryTypographyProps={{ fontWeight: 500 }}
                    />
                  </StyledListItem>
                ))}
                <Divider sx={{ my: 2, mx: 2 }} />
                <Box sx={{ px: 2, display: 'flex', gap: 1.5, flexDirection: 'column' }}>
                  <Button
                    fullWidth
                    variant="contained"
                    component={RouterLink}
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    sx={{ 
                      bgcolor: '#1a237e',
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 600,
                      py: 1.5,
                      '&:hover': {
                        bgcolor: '#0d1654'
                      }
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    component={RouterLink}
                    to="/register"
                    onClick={() => setMobileOpen(false)}
                    sx={{
                      borderColor: '#1a237e',
                      color: '#1a237e',
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 600,
                      py: 1.5,
                      borderWidth: '2px',
                      '&:hover': {
                        backgroundColor: '#1a237e',
                        borderWidth: '2px'
                      }
                    }}
                  >
                    Register
                  </Button>
                </Box>
              </>
            )}
          </List>
        </StyledDrawer>
      )}
    </>
  );
};

export default Navbar;