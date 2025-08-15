import React, { useState, useEffect } from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  Grid,
  Pagination,
  CircularProgress,
  Alert,
  Chip,
  Button,
  Paper,
  useTheme,
  useMediaQuery,
  Divider,
} from '@mui/material';
import {
  Book,
  Schedule,
  TrendingUp,
  MenuBook,
  AccessTime,
  CheckCircle,
  AutoStories,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { historyAPI } from '../../services/api';

const ReadingHistory = () => {
  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    fetchHistory();
    fetchStats();
  }, [page]);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const response = await historyAPI.getHistory({ page, limit: 10 });
      setHistory(response.data.history);
      setTotalPages(response.data.pages);
    } catch (err) {
      setError('Failed to load reading history');
      console.error('History fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await historyAPI.getStats();
      setStats(response.data.stats);
    } catch (err) {
      console.error('Stats fetch error:', err);
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 100) return '#4CAF50';
    if (percentage >= 75) return '#2196F3';
    if (percentage >= 50) return '#FF9800';
    return '#F44336';
  };

  const getStatusChip = (percentage) => {
    if (percentage >= 100) {
      return (
        <Chip 
          label="Completed" 
          icon={<CheckCircle />}
          sx={{ 
            backgroundColor: '#4CAF50', 
            color: 'white',
            fontWeight: 600,
            '& .MuiChip-icon': { color: 'white' }
          }} 
          size="small" 
        />
      );
    } else if (percentage >= 75) {
      return (
        <Chip 
          label="Almost Done" 
          sx={{ 
            backgroundColor: '#2196F3', 
            color: 'white',
            fontWeight: 600
          }} 
          size="small" 
        />
      );
    } else if (percentage >= 25) {
      return (
        <Chip 
          label="In Progress" 
          sx={{ 
            backgroundColor: '#FF9800', 
            color: 'white',
            fontWeight: 600
          }} 
          size="small" 
        />
      );
    } else {
      return (
        <Chip 
          label="Just Started" 
          sx={{ 
            backgroundColor: '#E3F2FD', 
            color: '#1565C0',
            fontWeight: 600
          }} 
          size="small" 
        />
      );
    }
  };

  const StatCard = ({ title, value, icon, color = '#1565C0' }) => (
    <Card 
      elevation={3}
      sx={{ 
        background: 'linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)',
        color: 'white',
        height: '100%',
        minHeight: { xs: '120px', sm: '140px' },
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
        
        <Typography 
          variant={isSmallMobile ? "h5" : "h4"} 
          component="div" 
          sx={{ 
            fontWeight: 'bold', 
            color: 'white',
            lineHeight: 1.2
          }}
        >
          {value}
        </Typography>
      </CardContent>
    </Card>
  );

  if (loading && page === 1) {
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
            Loading your reading history...
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
          📚 Reading History
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            color: '#666', 
            textAlign: { xs: 'center', sm: 'left' }
          }}
        >
          Track your reading journey and progress
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
      {stats && (
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
            📊 Reading Statistics
          </Typography>
          
          <Grid container spacing={{ xs: 2, sm: 3 }}>
            <Grid item xs={12} sm={6} lg={3}>
              <StatCard
                title="Books Started"
                value={stats.total_books || 0}
                icon={<Book />}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <StatCard
                title="Books Completed"
                value={stats.completed_books || 0}
                icon={<CheckCircle />}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <StatCard
                title="Pages Read"
                value={stats.total_pages_read || 0}
                icon={<AutoStories />}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <StatCard
                title="Average Progress"
                value={`${Math.round(stats.avg_progress || 0)}%`}
                icon={<TrendingUp />}
              />
            </Grid>
          </Grid>
        </Paper>
      )}

      {/* Reading History List */}
      {history.length === 0 ? (
        <Paper 
          elevation={2}
          sx={{ 
            p: { xs: 3, sm: 4 },
            textAlign: 'center',
            background: 'linear-gradient(135deg, #F8FFFE 0%, #E3F2FD 100%)',
            border: '2px dashed #BBDEFB',
            borderRadius: 3
          }}
        >
          <MenuBook sx={{ fontSize: 60, color: '#1565C0', mb: 2 }} />
          <Typography 
            variant="h6" 
            sx={{ color: '#0D47A1', mb: 1, fontWeight: 600 }}
          >
            No reading history found
          </Typography>
          <Typography 
            variant="body1" 
            color="textSecondary" 
            sx={{ mb: 3 }}
          >
            Start reading some books to see your progress here!
          </Typography>
          <Button
            variant="contained"
            startIcon={<Book />}
            onClick={() => navigate('/books')}
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
            Browse Books
          </Button>
        </Paper>
      ) : (
        <>
          <Grid container spacing={{ xs: 2, sm: 3 }}>
            {history.map((item) => (
              <Grid item xs={12} key={item._id}>
                <Card
                  elevation={2}
                  sx={{
                    cursor: 'pointer',
                    background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FFFE 100%)',
                    border: '1px solid #E3F2FD',
                    borderRadius: 3,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 24px rgba(21, 101, 192, 0.15)',
                      borderColor: '#1565C0'
                    }
                  }}
                  onClick={() => navigate(`/books/${item.book_id}`)}
                >
                  <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                    <Grid container spacing={{ xs: 2, sm: 3 }} alignItems="center">
                      {/* Book Info */}
                      <Grid item xs={12} md={5}>
                        <Typography 
                          variant={isMobile ? "h6" : "h5"} 
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
                          {item.book.title}
                        </Typography>
                        <Typography 
                          variant="subtitle1" 
                          sx={{ 
                            color: '#1565C0', 
                            fontWeight: 500, 
                            mb: 2 
                          }}
                        >
                          by {item.book.author}
                        </Typography>
                        <Box display="flex" flexWrap="wrap" gap={1}>
                          {getStatusChip(item.progress_percentage)}
                          {item.book.genre && (
                            <Chip 
                              label={item.book.genre} 
                              variant="outlined" 
                              size="small"
                              sx={{
                                borderColor: '#1565C0',
                                color: '#1565C0',
                                fontWeight: 500,
                                '&:hover': {
                                  backgroundColor: '#E3F2FD'
                                }
                              }}
                            />
                          )}
                        </Box>
                      </Grid>
                      
                      {/* Progress Info */}
                      <Grid item xs={12} md={4}>
                        <Box 
                          sx={{
                            backgroundColor: '#F8FFFE',
                            borderRadius: 2,
                            p: { xs: 2, sm: 2.5 },
                            border: '1px solid #E3F2FD'
                          }}
                        >
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              color: '#0D47A1', 
                              fontWeight: 600,
                              mb: 1
                            }}
                          >
                            📖 {item.current_page} / {item.total_pages} pages
                          </Typography>
                          <LinearProgress
                            variant="determinate"
                            value={item.progress_percentage}
                            sx={{ 
                              mt: 1, 
                              height: 10, 
                              borderRadius: 5,
                              backgroundColor: '#E3F2FD',
                              '& .MuiLinearProgress-bar': {
                                backgroundColor: getProgressColor(item.progress_percentage),
                                borderRadius: 5
                              }
                            }}
                          />
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              color: getProgressColor(item.progress_percentage),
                              fontWeight: 600,
                              mt: 1,
                              textAlign: 'center'
                            }}
                          >
                            {Math.round(item.progress_percentage)}% complete
                          </Typography>
                        </Box>
                      </Grid>
                      
                      {/* Date Info */}
                      <Grid item xs={12} md={3}>
                        <Box 
                          sx={{
                            backgroundColor: '#F8FFFE',
                            borderRadius: 2,
                            p: { xs: 2, sm: 2.5 },
                            border: '1px solid #E3F2FD',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center'
                          }}
                        >
                          <Box mb={2}>
                            <Box display="flex" alignItems="center" mb={0.5}>
                              <AccessTime sx={{ fontSize: 16, color: '#1565C0', mr: 1 }} />
                              <Typography 
                                variant="caption" 
                                sx={{ 
                                  color: '#0D47A1', 
                                  fontWeight: 600,
                                  textTransform: 'uppercase',
                                  letterSpacing: 0.5
                                }}
                              >
                                Last Read
                              </Typography>
                            </Box>
                            <Typography 
                              variant="body2" 
                              sx={{ 
                                color: '#1565C0',
                                fontWeight: 500,
                                fontSize: { xs: '0.75rem', sm: '0.875rem' }
                              }}
                            >
                              {formatDate(item.last_read)}
                            </Typography>
                          </Box>
                          
                          {item.started_reading && (
                            <Box>
                              <Box display="flex" alignItems="center" mb={0.5}>
                                <Schedule sx={{ fontSize: 16, color: '#1565C0', mr: 1 }} />
                                <Typography 
                                  variant="caption" 
                                  sx={{ 
                                    color: '#0D47A1', 
                                    fontWeight: 600,
                                    textTransform: 'uppercase',
                                    letterSpacing: 0.5
                                  }}
                                >
                                  Started
                                </Typography>
                              </Box>
                              <Typography 
                                variant="body2" 
                                sx={{ 
                                  color: '#1565C0',
                                  fontWeight: 500,
                                  fontSize: { xs: '0.75rem', sm: '0.875rem' }
                                }}
                              >
                                {formatDate(item.started_reading)}
                              </Typography>
                            </Box>
                          )}
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Pagination */}
          {totalPages > 1 && (
            <Box 
              display="flex" 
              justifyContent="center" 
              mt={4}
              sx={{
                '& .MuiPagination-ul': {
                  gap: { xs: 0.5, sm: 1 }
                },
                '& .MuiPaginationItem-root': {
                  color: '#1565C0',
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: '#E3F2FD'
                  },
                  '&.Mui-selected': {
                    background: 'linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)',
                    color: 'white',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #0D47A1 0%, #1565C0 100%)'
                    }
                  }
                }
              }}
            >
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                size={isSmallMobile ? "medium" : "large"}
                showFirstButton={!isSmallMobile}
                showLastButton={!isSmallMobile}
              />
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default ReadingHistory;