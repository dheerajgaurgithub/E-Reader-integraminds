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
} from '@mui/material';
import {
  ArrowBack,
  ArrowForward,
  Settings,
  Close,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { booksAPI } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

// Navigation controls component
const NavigationControls = ({ 
  onPrevious, 
  onNext, 
  currentPage, 
  totalPages, 
  onPageChange,
  progressPercentage,
  calculateReadingTime,
  theme
}) => (
  <Box sx={{ 
    position: 'fixed', 
    bottom: 0, 
    left: 0, 
    right: 0, 
    p: 2, 
    backgroundColor: theme === 'dark' ? 'rgba(42, 42, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    borderTop: '1px solid',
    borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
    zIndex: 1200
  }}>
    <Box sx={{ maxWidth: 800, mx: 'auto', px: 2 }}>
      <Box display="flex" alignItems="center" gap={2} mb={1}>
        <IconButton 
          onClick={onPrevious} 
          disabled={currentPage <= 1}
          color="primary"
          size="large"
        >
          <ArrowBack />
        </IconButton>
        
        <Box sx={{ flexGrow: 1, px: 2 }}>
          <Slider
            value={currentPage}
            min={1}
            max={totalPages}
            step={1}
            onChange={onPageChange}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `Page ${value}`}
            sx={{
              color: theme === 'dark' ? '#fff' : 'primary.main',
              '& .MuiSlider-thumb': {
                width: 16,
                height: 16,
                transition: '0.2s',
                '&:hover, &.Mui-focusVisible': {
                  boxShadow: '0 0 0 8px rgba(25, 118, 210, 0.16)',
                },
                '&.Mui-active': {
                  width: 20,
                  height: 20,
                },
              },
            }}
          />
        </Box>
        
        <IconButton 
          onClick={onNext} 
          disabled={currentPage >= totalPages}
          color="primary"
          size="large"
        >
          <ArrowForward />
        </IconButton>
      </Box>
      
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="caption" color="text.secondary">
          {progressPercentage.toFixed(1)}% • {calculateReadingTime()}
        </Typography>
        <Typography variant="body2">
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
  const [book, setBook] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [theme, setTheme] = useState('light');
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    fetchBook();
    fetchProgress();
  }, [id]);

  useEffect(() => {
    if (book && book.content) {
      // Split content into pages (simple implementation)
      const wordsPerPage = 300;
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
  }, [book, progress]);

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
      // Progress might not exist yet, that's okay
      console.log('No progress found for this book');
    }
  };

  const updateProgress = async () => {
    if (!user) return; // Don't track progress for non-authenticated users
    
    try {
      const response = await booksAPI.updateProgress(id, {
        current_page: currentPage,
        total_pages: totalPages,
      });
      
      // Update local progress state with the latest from server
      if (response.data && response.data.progress) {
        setProgress(response.data.progress);
      }
      
      // Notify user when they complete the book
      if (currentPage === totalPages && !progress?.completed) {
        // Only show the completion message if we haven't already
        if (!progress || progress.current_page < totalPages) {
          // You can add a toast notification here if you have one
          console.log('Book completed!');
        }
      }
    } catch (err) {
      console.error('Failed to update progress:', err);
      // Consider adding a retry mechanism here
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
        // If this is the first page, we're starting the book
        if (prevPage === 1 && !progress) {
          // You can add analytics or additional logic for book start
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
  
  // Calculate time spent reading (simple implementation)
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

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error || !book) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Alert severity="error">
          {error || 'Book not found'}
        </Alert>
        <Box mt={2}>
          <Button variant="contained" onClick={() => navigate('/books')}>
            Back to Books
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      backgroundColor: theme === 'dark' ? '#1a1a1a' : '#f5f5f5',
      pb: 12 // Add padding to prevent content from being hidden behind the navigation
    }}>
      {/* Header */}
      <Paper 
        elevation={1} 
        sx={{ 
          p: 2, 
          position: 'sticky', 
          top: 0, 
          zIndex: 1000,
          backgroundColor: theme === 'dark' ? '#2a2a2a' : '#ffffff',
          borderBottom: '1px solid',
          borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <IconButton 
              onClick={() => navigate('/books')} 
              sx={{ mr: 2 }}
              color={theme === 'dark' ? 'inherit' : 'default'}
            >
              <Close />
            </IconButton>
            <Box sx={{ maxWidth: 300, overflow: 'hidden' }}>
              <Typography variant="h6" noWrap>
                {book.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" noWrap>
                by {book.author}
              </Typography>
            </Box>
          </Box>
          
          <Box display="flex" alignItems="center" gap={1}>
            <IconButton 
              onClick={() => setSettingsOpen(true)}
              color={theme === 'dark' ? 'inherit' : 'default'}
              size="small"
            >
              <Settings />
            </IconButton>
          </Box>
        </Box>
        
        <Box mt={2}>
          <LinearProgress 
            variant="determinate" 
            value={progressPercentage} 
            sx={{ 
              height: 4, 
              borderRadius: 3,
              backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
            }}
          />
        </Box>
      </Paper>

      {/* Content */}
      <Container maxWidth="md" sx={{ py: 4, px: { xs: 2, sm: 3 } }}>
        <Paper 
          elevation={0}
          sx={{
            p: { xs: 3, sm: 5, md: 6 },
            minHeight: '60vh',
            backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)',
            borderRadius: 2,
            lineHeight: 1.8,
            fontSize: `${fontSize}px`,
            fontFamily: 'Georgia, serif',
            color: theme === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'text.primary',
            '& p': {
              marginBottom: '1.5em',
              textAlign: 'justify',
              textJustify: 'inter-word',
              hyphens: 'auto'
            },
            '&:hover': {
              boxShadow: theme === 'dark' 
                ? '0 0 20px rgba(255, 255, 255, 0.05)' 
                : '0 0 20px rgba(0, 0, 0, 0.05)'
            },
            transition: 'all 0.3s ease-in-out',
            mb: 12 // Add margin to prevent content from being hidden behind the navigation
          }}
          dangerouslySetInnerHTML={{ 
            __html: pages[currentPage - 1] || 
              `<p style="text-align: center; color: #666; font-style: italic;">
                No content available for this page.
              </p>`
          }}
        />
      </Container>

      {/* Navigation Controls */}
      <NavigationControls 
        onPrevious={handlePreviousPage}
        onNext={handleNextPage}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(e, value) => handlePageJump(e, value)}
        progressPercentage={progressPercentage}
        calculateReadingTime={calculateReadingTime}
        theme={theme}
      />

      {/* Settings Dialog */}
      <Dialog open={settingsOpen} onClose={() => setSettingsOpen(false)}>
        <DialogTitle>Reading Settings</DialogTitle>
        <DialogContent>
          <Box sx={{ minWidth: 300, pt: 1 }}>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Font Size</InputLabel>
              <Select
                value={fontSize}
                label="Font Size"
                onChange={(e) => setFontSize(e.target.value)}
              >
                <MenuItem value={14}>Small</MenuItem>
                <MenuItem value={16}>Medium</MenuItem>
                <MenuItem value={18}>Large</MenuItem>
                <MenuItem value={20}>Extra Large</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl fullWidth>
              <InputLabel>Theme</InputLabel>
              <Select
                value={theme}
                label="Theme"
                onChange={(e) => setTheme(e.target.value)}
              >
                <MenuItem value="light">Light</MenuItem>
                <MenuItem value="dark">Dark</MenuItem>
                <MenuItem value="sepia">Sepia</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSettingsOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BookReader;
