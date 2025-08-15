import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  IconButton,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
  useTheme,
  useMediaQuery,
  Fab,
} from '@mui/material';
import {
  ArrowBack,
  ArrowForward,
  Settings,
  Close,
  MenuBook,
  Visibility,
  WbSunny,
  NightlightRound,
  TextFields,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { booksAPI } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

// Enhanced Navigation controls component
const NavigationControls = ({ 
  onPrevious, 
  onNext, 
  currentPage, 
  totalPages, 
  onPageChange,
  progressPercentage,
  calculateReadingTime,
  readingTheme,
  isMobile
}) => (
  <Box sx={{ 
    position: 'fixed', 
    bottom: 0, 
    left: 0, 
    right: 0, 
    background: 'linear-gradient(180deg, rgba(25, 118, 210, 0.95) 0%, rgba(13, 71, 161, 0.98) 100%)',
    backdropFilter: 'blur(20px)',
    borderTop: '2px solid rgba(255, 255, 255, 0.2)',
    zIndex: 1200,
    boxShadow: '0 -4px 20px rgba(25, 118, 210, 0.3)',
  }}>
    <Box sx={{ 
      maxWidth: isMobile ? '100%' : 1200, 
      mx: 'auto', 
      px: isMobile ? 1.5 : 3,
      py: isMobile ? 1.5 : 2,
    }}>
      <Box display="flex" alignItems="center" gap={isMobile ? 1 : 2} mb={1.5}>
        <IconButton 
          onClick={onPrevious} 
          disabled={currentPage <= 1}
          size={isMobile ? "medium" : "large"}
          sx={{
            color: 'white',
            bgcolor: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.25)',
              transform: 'scale(1.05)',
            },
            '&:disabled': {
              color: 'rgba(255, 255, 255, 0.3)',
              bgcolor: 'rgba(255, 255, 255, 0.05)',
            },
            transition: 'all 0.2s ease-in-out',
          }}
        >
          <ArrowBack sx={{ fontSize: isMobile ? 20 : 24 }} />
        </IconButton>
        
        <Box sx={{ flexGrow: 1, px: isMobile ? 1 : 2 }}>
          <Slider
            value={currentPage}
            min={1}
            max={totalPages}
            step={1}
            onChange={onPageChange}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `Page ${value}`}
            sx={{
              color: 'white',
              height: isMobile ? 6 : 8,
              '& .MuiSlider-thumb': {
                width: isMobile ? 18 : 22,
                height: isMobile ? 18 : 22,
                backgroundColor: 'white',
                border: '3px solid #1976d2',
                boxShadow: '0 0 0 8px rgba(255, 255, 255, 0.2)',
                transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                '&:hover, &.Mui-focusVisible': {
                  boxShadow: '0 0 0 12px rgba(255, 255, 255, 0.16)',
                },
                '&.Mui-active': {
                  width: isMobile ? 22 : 26,
                  height: isMobile ? 22 : 26,
                },
              },
              '& .MuiSlider-track': {
                backgroundColor: 'white',
                border: 'none',
                height: isMobile ? 6 : 8,
                borderRadius: 4,
              },
              '& .MuiSlider-rail': {
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                height: isMobile ? 6 : 8,
                borderRadius: 4,
              },
              '& .MuiSlider-valueLabel': {
                backgroundColor: 'rgba(13, 71, 161, 0.9)',
                color: 'white',
                fontSize: isMobile ? '12px' : '14px',
                fontWeight: 600,
              },
            }}
          />
        </Box>
        
        <IconButton 
          onClick={onNext} 
          disabled={currentPage >= totalPages}
          size={isMobile ? "medium" : "large"}
          sx={{
            color: 'white',
            bgcolor: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.25)',
              transform: 'scale(1.05)',
            },
            '&:disabled': {
              color: 'rgba(255, 255, 255, 0.3)',
              bgcolor: 'rgba(255, 255, 255, 0.05)',
            },
            transition: 'all 0.2s ease-in-out',
          }}
        >
          <ArrowForward sx={{ fontSize: isMobile ? 20 : 24 }} />
        </IconButton>
      </Box>
      
      <Box 
        display="flex" 
        justifyContent="space-between" 
        alignItems="center"
        flexDirection={isMobile ? 'column' : 'row'}
        gap={isMobile ? 1 : 0}
      >
        <Typography 
          variant={isMobile ? "caption" : "body2"} 
          sx={{ 
            color: 'rgba(255, 255, 255, 0.9)',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Visibility sx={{ fontSize: isMobile ? 14 : 16 }} />
          {progressPercentage.toFixed(1)}% • {calculateReadingTime()}
        </Typography>
        <Typography 
          variant={isMobile ? "body2" : "body1"}
          sx={{ 
            color: 'white',
            fontWeight: 600,
            fontSize: isMobile ? '14px' : '16px',
          }}
        >
          Page {currentPage} of {totalPages}
        </Typography>
      </Box>
    </Box>
  </Box>
);

const BookReader = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const [book, setBook] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(isMobile ? 16 : 18);
  const [readingTheme, setReadingTheme] = useState('light');
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    fetchBook();
    fetchProgress();
  }, [id]);

  useEffect(() => {
    if (book && book.content) {
      // Split content into pages (simple implementation)
      const wordsPerPage = isMobile ? 200 : 300;
      const words = book.content.split(' ');
      const pageCount = Math.ceil(words.length / wordsPerPage);
      
      const bookPages = [];
      for (let i = 0; i < pageCount; i++) {
        const startIndex = i * wordsPerPage;
        const endIndex = Math.min((i + 1) * wordsPerPage, words.length);
        const pageContent = words.slice(startIndex, endIndex).join(' ');
        bookPages.push(`<p>${pageContent}</p>`);
      }
      
      setPages(bookPages);
      setTotalPages(pageCount);
      
      // Set current page from progress or start from beginning
      if (progress && progress.current_page) {
        setCurrentPage(progress.current_page);
      }
    }
  }, [book, progress, isMobile]);

  useEffect(() => {
    // Update reading progress when page changes
    if (book && currentPage > 0) {
      updateProgress();
    }
  }, [currentPage, book]);

  const fetchBook = async () => {
    try {
      const response = await booksAPI.getBook(id);
      setBook(response.data.book);
    } catch (err) {
      setError('Failed to load book');
      console.error('Book fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchProgress = async () => {
    try {
      const response = await booksAPI.getProgress(id);
      setProgress(response.data.progress);
    } catch (err) {
      console.log('No progress found for this book');
    }
  };

  const updateProgress = async () => {
    if (!user) return;
    
    try {
      const response = await booksAPI.updateProgress(id, {
        current_page: currentPage,
        total_pages: totalPages,
      });
      
      if (response.data && response.data.progress) {
        setProgress(response.data.progress);
      }
      
      if (currentPage === totalPages && !progress?.completed) {
        if (!progress || progress.current_page < totalPages) {
          console.log('Book completed!');
        }
      }
    } catch (err) {
      console.error('Failed to update progress:', err);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => {
        const newPage = prevPage + 1;
        if (prevPage === 1 && !progress) {
          console.log('Started reading book');
        }
        return newPage;
      });
    }
  };

  const handlePageJump = (event, value) => {
    setCurrentPage(Math.min(Math.max(1, value), totalPages));
  };

  const progressPercentage = totalPages > 0 ? Math.min(100, Math.max(0, (currentPage / totalPages) * 100)) : 0;
  
  const calculateReadingTime = () => {
    if (!progress?.started_reading) return 'Just started';
    
    const started = new Date(progress.started_reading);
    const now = new Date();
    const diffMs = now - started;
    const diffMins = Math.round(diffMs / 60000);
    
    if (diffMins < 1) return 'Just started';
    if (diffMins < 60) return `${diffMins} min`;
    
    const hours = Math.floor(diffMins / 60);
    const mins = diffMins % 60;
    return `${hours}h ${mins}m`;
  };

  const getThemeColors = () => {
    switch (readingTheme) {
      case 'dark':
        return {
          background: 'linear-gradient(135deg, #0d1b2a 0%, #1b263b 50%, #2d3748 100%)',
          contentBg: 'rgba(255, 255, 255, 0.05)',
          textColor: 'rgba(255, 255, 255, 0.9)',
          headerBg: 'rgba(13, 27, 42, 0.95)',
        };
      case 'sepia':
        return {
          background: 'linear-gradient(135deg, #f7f3e9 0%, #f1e5d1 50%, #e8d5b7 100%)',
          contentBg: 'rgba(139, 69, 19, 0.05)',
          textColor: '#4a4a4a',
          headerBg: 'rgba(247, 243, 233, 0.95)',
        };
      default:
        return {
          background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 50%, #90caf9 100%)',
          contentBg: 'rgba(25, 118, 210, 0.03)',
          textColor: '#1a1a1a',
          headerBg: 'rgba(255, 255, 255, 0.95)',
        };
    }
  };

  const themeColors = getThemeColors();

  if (loading) {
    return (
      <Box sx={{ 
        minHeight: '100vh',
        background: themeColors.background,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Box textAlign="center">
          <CircularProgress 
            size={isMobile ? 40 : 60} 
            sx={{ color: '#1976d2', mb: 2 }} 
          />
          <Typography variant="h6" sx={{ color: '#1976d2' }}>
            Loading your book...
          </Typography>
        </Box>
      </Box>
    );
  }

  if (error || !book) {
    return (
      <Box sx={{ 
        minHeight: '100vh',
        background: themeColors.background,
        pt: 8,
      }}>
        <Container maxWidth="md">
          <Alert 
            severity="error"
            sx={{ 
              borderRadius: 3,
              fontSize: isMobile ? '14px' : '16px',
            }}
          >
            {error || 'Book not found'}
          </Alert>
          <Box mt={3}>
            <Button 
              variant="contained" 
              onClick={() => navigate('/books')}
              size={isMobile ? 'large' : 'medium'}
              fullWidth={isMobile}
              sx={{
                background: 'linear-gradient(45deg, #1976d2 30%, #1565c0 90%)',
                fontWeight: 600,
                textTransform: 'none',
                borderRadius: 2,
              }}
            >
              Back to Books
            </Button>
          </Box>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: themeColors.background,
      pb: isMobile ? 16 : 14,
      position: 'relative',
    }}>
      {/* Header */}
      <Paper 
        elevation={0}
        sx={{ 
          p: isMobile ? 1.5 : 2.5, 
          position: 'sticky', 
          top: 0, 
          zIndex: 1000,
          background: themeColors.headerBg,
          backdropFilter: 'blur(20px)',
          borderBottom: '2px solid rgba(25, 118, 210, 0.1)',
          boxShadow: '0 4px 20px rgba(25, 118, 210, 0.1)',
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" sx={{ flex: 1, minWidth: 0 }}>
            <IconButton 
              onClick={() => navigate('/books')} 
              sx={{ 
                mr: isMobile ? 1 : 2,
                color: '#1976d2',
                bgcolor: 'rgba(25, 118, 210, 0.1)',
                '&:hover': {
                  bgcolor: 'rgba(25, 118, 210, 0.2)',
                  transform: 'scale(1.05)',
                },
                transition: 'all 0.2s ease-in-out',
              }}
              size={isMobile ? 'small' : 'medium'}
            >
              <Close sx={{ fontSize: isMobile ? 20 : 24 }} />
            </IconButton>
            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography 
                variant={isMobile ? "subtitle1" : "h6"} 
                sx={{ 
                  color: '#0d47a1',
                  fontWeight: 'bold',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <MenuBook sx={{ fontSize: isMobile ? 18 : 20, color: '#1976d2' }} />
                {book.title}
              </Typography>
              <Typography 
                variant={isMobile ? "caption" : "body2"} 
                sx={{ 
                  color: '#1976d2',
                  fontWeight: 500,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                by {book.author}
              </Typography>
            </Box>
          </Box>
          
          {!isMobile && (
            <Fab
              size="medium"
              onClick={() => setSettingsOpen(true)}
              sx={{
                background: 'linear-gradient(45deg, #1976d2 30%, #1565c0 90%)',
                color: 'white',
                '&:hover': {
                  background: 'linear-gradient(45deg, #1565c0 30%, #0d47a1 90%)',
                  transform: 'scale(1.1)',
                },
                transition: 'all 0.2s ease-in-out',
                boxShadow: '0 4px 12px rgba(25, 118, 210, 0.4)',
              }}
            >
              <Settings />
            </Fab>
          )}
          
          {isMobile && (
            <IconButton 
              onClick={() => setSettingsOpen(true)}
              sx={{
                color: '#1976d2',
                bgcolor: 'rgba(25, 118, 210, 0.1)',
                '&:hover': {
                  bgcolor: 'rgba(25, 118, 210, 0.2)',
                },
              }}
              size="small"
            >
              <Settings sx={{ fontSize: 20 }} />
            </IconButton>
          )}
        </Box>
        
        <Box mt={2}>
          <LinearProgress 
            variant="determinate" 
            value={progressPercentage} 
            sx={{ 
              height: isMobile ? 6 : 8, 
              borderRadius: 4,
              backgroundColor: 'rgba(25, 118, 210, 0.1)',
              '& .MuiLinearProgress-bar': {
                background: 'linear-gradient(90deg, #1976d2, #1565c0)',
                borderRadius: 4,
                boxShadow: '0 0 10px rgba(25, 118, 210, 0.5)',
              },
            }}
          />
          <Box display="flex" justifyContent="space-between" mt={0.5}>
            <Typography variant="caption" sx={{ color: '#1976d2', fontWeight: 500 }}>
              {progressPercentage.toFixed(0)}% Complete
            </Typography>
            <Typography variant="caption" sx={{ color: '#1976d2', fontWeight: 500 }}>
              {calculateReadingTime()}
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Content */}
      <Container 
        maxWidth="md" 
        sx={{ 
          py: isMobile ? 3 : 4, 
          px: isMobile ? 2 : 3,
        }}
      >
        <Paper 
          elevation={3}
          sx={{
            p: isMobile ? 3 : 6,
            minHeight: isMobile ? '50vh' : '60vh',
            background: themeColors.contentBg,
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(25, 118, 210, 0.1)',
            borderRadius: 3,
            lineHeight: 1.8,
            fontSize: `${fontSize}px`,
            fontFamily: '"Georgia", "Times New Roman", serif',
            color: themeColors.textColor,
            boxShadow: '0 8px 32px rgba(25, 118, 210, 0.1)',
            '& p': {
              marginBottom: '1.5em',
              textAlign: 'justify',
              textJustify: 'inter-word',
              hyphens: 'auto',
              lineHeight: 1.9,
            },
            '&:hover': {
              boxShadow: '0 12px 40px rgba(25, 118, 210, 0.15)',
            },
            transition: 'all 0.3s ease-in-out',
          }}
          dangerouslySetInnerHTML={{ 
            __html: pages[currentPage - 1] || 
              `<p style="text-align: center; color: #666; font-style: italic; padding: 2rem;">
                <span style="font-size: 1.2em;">📖</span><br/>
                No content available for this page.
              </p>`
          }}
        />
      </Container>

      {/* Mobile Settings FAB */}
      {isMobile && (
        <Fab
          onClick={() => setSettingsOpen(true)}
          sx={{
            position: 'fixed',
            bottom: isMobile ? 140 : 120,
            right: 20,
            background: 'linear-gradient(45deg, #1976d2 30%, #1565c0 90%)',
            color: 'white',
            '&:hover': {
              background: 'linear-gradient(45deg, #1565c0 30%, #0d47a1 90%)',
              transform: 'scale(1.1)',
            },
            transition: 'all 0.2s ease-in-out',
            boxShadow: '0 4px 12px rgba(25, 118, 210, 0.4)',
            zIndex: 1100,
          }}
        >
          <Settings />
        </Fab>
      )}

      {/* Navigation Controls */}
      <NavigationControls 
        onPrevious={handlePreviousPage}
        onNext={handleNextPage}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(e, value) => handlePageJump(e, value)}
        progressPercentage={progressPercentage}
        calculateReadingTime={calculateReadingTime}
        readingTheme={readingTheme}
        isMobile={isMobile}
      />

      {/* Enhanced Settings Dialog */}
      <Dialog 
        open={settingsOpen} 
        onClose={() => setSettingsOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: 3,
            background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
            border: '2px solid rgba(25, 118, 210, 0.1)',
            maxWidth: isMobile ? '90vw' : '400px',
            width: '100%',
          }
        }}
      >
        <DialogTitle 
          sx={{ 
            background: 'linear-gradient(90deg, #1976d2, #1565c0)',
            color: 'white',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Settings />
          Reading Settings
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Box sx={{ minWidth: 250 }}>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel 
                sx={{ 
                  color: '#1976d2', 
                  '&.Mui-focused': { color: '#1565c0' } 
                }}
              >
                <Box display="flex" alignItems="center" gap={1}>
                  <TextFields fontSize="small" />
                  Font Size
                </Box>
              </InputLabel>
              <Select
                value={fontSize}
                label="Font Size"
                onChange={(e) => setFontSize(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(25, 118, 210, 0.3)',
                    borderWidth: 2,
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#1976d2',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#1565c0',
                  },
                }}
              >
                <MenuItem value={14}>Small (14px)</MenuItem>
                <MenuItem value={16}>Medium (16px)</MenuItem>
                <MenuItem value={18}>Large (18px)</MenuItem>
                <MenuItem value={20}>Extra Large (20px)</MenuItem>
                <MenuItem value={22}>XXL (22px)</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl fullWidth>
              <InputLabel 
                sx={{ 
                  color: '#1976d2', 
                  '&.Mui-focused': { color: '#1565c0' } 
                }}
              >
                <Box display="flex" alignItems="center" gap={1}>
                  <WbSunny fontSize="small" />
                  Theme
                </Box>
              </InputLabel>
              <Select
                value={readingTheme}
                label="Theme"
                onChange={(e) => setReadingTheme(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(25, 118, 210, 0.3)',
                    borderWidth: 2,
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#1976d2',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#1565c0',
                  },
                }}
              >
                <MenuItem value="light">
                  <Box display="flex" alignItems="center" gap={2}>
                    <WbSunny fontSize="small" />
                    Light Theme
                  </Box>
                </MenuItem>
                <MenuItem value="dark">
                  <Box display="flex" alignItems="center" gap={2}>
                    <NightlightRound fontSize="small" />
                    Dark Theme
                  </Box>
                </MenuItem>
                <MenuItem value="sepia">
                  <Box display="flex" alignItems="center" gap={2}>
                    <span style={{ fontSize: '16px' }}>🟫</span>
                    Sepia Theme
                  </Box>
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 2 }}>
          <Button 
            onClick={() => setSettingsOpen(false)}
            variant="contained"
            fullWidth
            sx={{
              background: 'linear-gradient(45deg, #1976d2 30%, #1565c0 90%)',
              fontWeight: 600,
              textTransform: 'none',
              borderRadius: 2,
              py: 1.5,
              fontSize: '16px',
            }}
          >
            Apply Settings
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BookReader;