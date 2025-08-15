import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Button,
  useTheme,
  useMediaQuery,
  Paper,
  Divider,
} from '@mui/material';
import {
  Book,
  History,
  TrendingUp,
  Add,
  Person,
  MenuBook,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { historyAPI, booksAPI } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentBooks, setRecentBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsResponse, booksResponse] = await Promise.all([
        historyAPI.getStats(),
        booksAPI.getBooks({ limit: 6, sort: 'updated_at' })
      ]);

      setStats(statsResponse.data.stats);
      setRecentBooks(booksResponse.data.books);
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error('Dashboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon, color = '#1565C0', subtext = null }) => (
    <Card 
      elevation={3}
      sx={{ 
        background: 'linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)',
        color: 'white',
        height: '100%',
        minHeight: { xs: '140px', sm: '160px' },
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 24px rgba(21, 101, 192, 0.3)',
        }
      }}
    >
      <CardContent sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between',
        p: { xs: 2, sm: 3 }
      }}>
        <Box display="flex" alignItems="flex-start" justifyContent="space-between" mb={1}>
          <Box flex={1}>
            <Typography 
              variant={isSmallMobile ? "caption" : "body2"} 
              sx={{ 
                color: 'rgba(255,255,255,0.8)', 
                fontWeight: 500,
                letterSpacing: 0.5,
                textTransform: 'uppercase'
              }}
            >
              {title}
            </Typography>
          </Box>
          <Box 
            sx={{ 
              backgroundColor: 'rgba(255,255,255,0.15)', 
              borderRadius: '50%', 
              p: { xs: 0.75, sm: 1 },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {React.cloneElement(icon, { 
              fontSize: isSmallMobile ? 'medium' : 'large',
              sx: { color: 'white' }
            })}
          </Box>
        </Box>
        
        <Box>
          <Typography 
            variant={isSmallMobile ? "h5" : "h4"} 
            component="div" 
            sx={{ 
              fontWeight: 'bold', 
              color: 'white',
              lineHeight: 1.2,
              mb: 0.5
            }}
          >
            {value}
          </Typography>
          {subtext && (
            <Typography 
              variant={isSmallMobile ? "caption" : "body2"} 
              sx={{ color: 'rgba(255,255,255,0.7)' }}
            >
              {subtext}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
  
  const ProgressBar = ({ value, color = '#1565C0', label }) => (
    <Box sx={{ width: '100%', mb: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
        <Typography 
          variant="body2" 
          sx={{ color: '#1565C0', fontWeight: 500 }}
        >
          {label}
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ color: '#0D47A1', fontWeight: 600 }}
        >
          {typeof value === 'string' ? value : `${Math.round(value)}%`}
        </Typography>
      </Box>
      <Box 
        sx={{ 
          width: '100%', 
          bgcolor: '#E3F2FD', 
          borderRadius: 2, 
          overflow: 'hidden',
          height: 8
        }}
      >
        <Box 
          sx={{
            width: `${typeof value === 'string' ? 0 : Math.min(100, Math.max(0, value))}%`,
            bgcolor: color,
            height: '100%',
            transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)',
            borderRadius: 2
          }}
        />
      </Box>
    </Box>
  );

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box 
          display="flex" 
          justifyContent="center" 
          alignItems="center" 
          minHeight="60vh"
          flexDirection="column"
        >
          <CircularProgress size={60} sx={{ color: '#1565C0', mb: 3 }} />
          <Typography variant="h6" sx={{ color: '#1565C0' }}>
            Loading your dashboard...
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: { xs: 2, sm: 4 }, mb: 4, px: { xs: 2, sm: 3 } }}>
      {/* Header */}
      <Box sx={{ mb: { xs: 3, sm: 4 } }}>
        <Typography 
          variant={isMobile ? "h5" : "h4"} 
          sx={{ 
            color: '#0D47A1', 
            fontWeight: 'bold',
            mb: 1,
            textAlign: { xs: 'center', sm: 'left' }
          }}
        >
          Welcome back, {user?.full_name || user?.username}!
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            color: '#666', 
            textAlign: { xs: 'center', sm: 'left' }
          }}
        >
          Here's your reading progress overview
        </Typography>
      </Box>

      {error && (
        <Alert 
          severity="error" 
          sx={{ 
            mb: 3,
            borderRadius: 2,
            '& .MuiAlert-icon': { color: '#1565C0' }
          }}
        >
          {error}
        </Alert>
      )}

      {/* Statistics Cards */}
      <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: { xs: 3, sm: 4 } }}>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Books Started"
            value={stats?.total_books_started || 0}
            subtext={`${stats?.books_in_progress || 0} in progress`}
            icon={<Book />}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Books Completed"
            value={stats?.books_completed || 0}
            subtext={`${stats?.completion_rate || 0}% completion rate`}
            icon={<TrendingUp />}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Pages Read"
            value={stats?.total_pages_read || 0}
            subtext={`${stats?.total_pages_in_progress_books || 0} in progress`}
            icon={<History />}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Average Progress"
            value={`${Math.round(stats?.avg_progress || 0)}%`}
            subtext={`${Math.round(stats?.avg_pages_per_book || 0)} avg pages/book`}
            icon={<TrendingUp />}
          />
        </Grid>
      </Grid>
      
      {/* Progress Overview */}
      <Paper 
        elevation={2}
        sx={{ 
          mb: { xs: 3, sm: 4 }, 
          p: { xs: 2, sm: 3 },
          background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FFFE 100%)',
          border: '1px solid #E3F2FD',
          borderRadius: 3
        }}
      >
        <Typography 
          variant={isMobile ? "h6" : "h5"} 
          sx={{ 
            color: '#0D47A1', 
            fontWeight: 'bold', 
            mb: 3,
            textAlign: { xs: 'center', sm: 'left' }
          }}
        >
          📊 Reading Progress Overview
        </Typography>
        
        <Grid container spacing={{ xs: 2, sm: 4 }}>
          <Grid item xs={12} md={6}>
            <ProgressBar 
              label="Completion Rate"
              value={stats?.completion_rate || 0} 
              color={stats?.completion_rate >= 50 ? '#4CAF50' : '#FF9800'}
            />
            <ProgressBar 
              label="Books in Progress"
              value={Math.min(100, (stats?.books_in_progress || 0) * 20)} 
              color="#2196F3"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ProgressBar 
              label="Average Book Progress"
              value={stats?.avg_progress || 0} 
              color={stats?.avg_progress >= 50 ? '#4CAF50' : '#FF9800'}
            />
            <Box>
              <ProgressBar 
                label="Total Pages Read"
                value={Math.min(100, (stats?.total_pages_read || 0) / 1000 * 100)} 
                color="#1565C0"
              />
              <Typography 
                variant="caption" 
                sx={{ 
                  color: '#666', 
                  textAlign: 'center', 
                  display: 'block',
                  mt: -1
                }}
              >
                Goal: 1000 pages
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Recent Books */}
      <Paper 
        elevation={2}
        sx={{ 
          mb: { xs: 3, sm: 4 },
          p: { xs: 2, sm: 3 },
          background: '#FFFFFF',
          border: '1px solid #E3F2FD',
          borderRadius: 3
        }}
      >
        <Box 
          display="flex" 
          justifyContent="space-between" 
          alignItems="center" 
          mb={3}
          flexDirection={{ xs: 'column', sm: 'row' }}
          gap={{ xs: 2, sm: 0 }}
        >
          <Typography 
            variant={isMobile ? "h6" : "h5"} 
            sx={{ 
              color: '#0D47A1', 
              fontWeight: 'bold'
            }}
          >
            📚 Recent Books
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => navigate('/add-book')}
            sx={{
              background: 'linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)',
              borderRadius: 2,
              px: { xs: 2, sm: 3 },
              py: 1,
              textTransform: 'none',
              fontWeight: 600,
              boxShadow: '0 4px 12px rgba(21, 101, 192, 0.3)',
              '&:hover': {
                background: 'linear-gradient(135deg, #0D47A1 0%, #1565C0 100%)',
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 16px rgba(21, 101, 192, 0.4)',
              }
            }}
          >
            Add Book
          </Button>
        </Box>

        {recentBooks.length === 0 ? (
          <Box 
            sx={{ 
              textAlign: 'center', 
              py: { xs: 4, sm: 6 },
              background: 'linear-gradient(135deg, #F8FFFE 0%, #E3F2FD 100%)',
              borderRadius: 3,
              border: '2px dashed #BBDEFB'
            }}
          >
            <MenuBook sx={{ fontSize: 60, color: '#1565C0', mb: 2 }} />
            <Typography 
              variant="h6" 
              sx={{ color: '#0D47A1', mb: 1, fontWeight: 600 }}
            >
              No books available
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
              Start by adding your first book!
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => navigate('/add-book')}
              size="large"
              sx={{
                background: 'linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)',
                borderRadius: 2,
                px: 4,
                py: 1.5,
                textTransform: 'none',
                fontWeight: 600
              }}
            >
              Add Your First Book
            </Button>
          </Box>
        ) : (
          <Grid container spacing={{ xs: 2, sm: 3 }}>
            {recentBooks.map((book) => (
              <Grid item xs={12} sm={6} lg={4} key={book._id}>
                <Card 
                  elevation={2}
                  sx={{ 
                    height: '100%',
                    minHeight: '200px',
                    cursor: 'pointer',
                    background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FFFE 100%)',
                    border: '1px solid #E3F2FD',
                    borderRadius: 3,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': { 
                      transform: 'translateY(-6px)',
                      boxShadow: '0 12px 24px rgba(21, 101, 192, 0.15)',
                      borderColor: '#1565C0'
                    }
                  }}
                  onClick={() => navigate(`/books/${book._id}`)}
                >
                  <CardContent sx={{ p: { xs: 2, sm: 3 }, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Typography 
                      variant="h6" 
                      component="div" 
                      sx={{
                        color: '#0D47A1',
                        fontWeight: 'bold',
                        mb: 1,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        lineHeight: 1.3
                      }}
                    >
                      {book.title}
                    </Typography>
                    <Typography 
                      variant="subtitle2" 
                      sx={{ color: '#1565C0', fontWeight: 500, mb: 2 }}
                    >
                      by {book.author}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#666', 
                        flex: 1,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        lineHeight: 1.4
                      }}
                    >
                      {book.description || 'No description available'}
                    </Typography>
                    {book.genre && (
                      <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid #E3F2FD' }}>
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            color: '#1565C0',
                            backgroundColor: '#E3F2FD',
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 1,
                            fontWeight: 500,
                            textTransform: 'uppercase',
                            letterSpacing: 0.5
                          }}
                        >
                          {book.genre}
                        </Typography>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>

      {/* Quick Actions */}
      <Paper 
        elevation={2}
        sx={{ 
          p: { xs: 2, sm: 3 },
          background: 'linear-gradient(135deg, #0D47A1 0%, #1565C0 100%)',
          borderRadius: 3,
          color: 'white'
        }}
      >
        <Typography 
          variant={isMobile ? "h6" : "h5"} 
          sx={{ 
            fontWeight: 'bold', 
            mb: 3,
            textAlign: { xs: 'center', sm: 'left' },
            color: 'white'
          }}
        >
          ⚡ Quick Actions
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<Book />}
              onClick={() => navigate('/books')}
              sx={{
                backgroundColor: 'rgba(255,255,255,0.15)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: 2,
                py: 1.5,
                textTransform: 'none',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.25)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                }
              }}
            >
              Browse Books
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<Add />}
              onClick={() => navigate('/add-book')}
              sx={{
                backgroundColor: 'rgba(255,255,255,0.15)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: 2,
                py: 1.5,
                textTransform: 'none',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.25)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                }
              }}
            >
              Add Book
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<History />}
              onClick={() => navigate('/history')}
              sx={{
                backgroundColor: 'rgba(255,255,255,0.15)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: 2,
                py: 1.5,
                textTransform: 'none',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.25)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                }
              }}
            >
              Reading History
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<Person />}
              onClick={() => navigate('/profile')}
              sx={{
                backgroundColor: 'rgba(255,255,255,0.15)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: 2,
                py: 1.5,
                textTransform: 'none',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.25)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                }
              }}
            >
              Profile Settings
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Dashboard;