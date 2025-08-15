import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination,
  CircularProgress,
  Alert,
  Chip,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import {
  Search,
  Add,
  FilterList,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { booksAPI } from '../../services/api';

// Dark Blue Theme
const darkBlueTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1e3a8a', // Dark blue
      light: '#3b82f6', // Lighter blue
      dark: '#1e40af', // Darker blue
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ffffff',
      dark: '#f1f5f9',
      contrastText: '#1e3a8a',
    },
    background: {
      default: '#0f172a', // Very dark blue
      paper: '#1e293b', // Dark blue-gray
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
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1e293b',
          border: '1px solid #334155',
          '&:hover': {
            backgroundColor: '#334155',
            borderColor: '#3b82f6',
            boxShadow: '0 8px 32px rgba(59, 130, 246, 0.15)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: '#1e3a8a',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#3b82f6',
            boxShadow: '0 4px 20px rgba(59, 130, 246, 0.4)',
          },
        },
        outlined: {
          borderColor: '#3b82f6',
          color: '#3b82f6',
          '&:hover': {
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            borderColor: '#60a5fa',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#334155',
            '& fieldset': {
              borderColor: '#475569',
            },
            '&:hover fieldset': {
              borderColor: '#3b82f6',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#60a5fa',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#cbd5e1',
            '&.Mui-focused': {
              color: '#60a5fa',
            },
          },
          '& .MuiInputBase-input': {
            color: '#ffffff',
          },
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#334155',
            '& fieldset': {
              borderColor: '#475569',
            },
            '&:hover fieldset': {
              borderColor: '#3b82f6',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#60a5fa',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: '#1e3a8a',
          color: '#ffffff',
          border: '1px solid #3b82f6',
        },
        outlined: {
          backgroundColor: 'transparent',
          color: '#3b82f6',
          borderColor: '#3b82f6',
        },
      },
    },
    MuiPagination: {
      styleOverrides: {
        root: {
          '& .MuiPaginationItem-root': {
            color: '#cbd5e1',
            borderColor: '#475569',
            '&:hover': {
              backgroundColor: '#334155',
            },
            '&.Mui-selected': {
              backgroundColor: '#1e3a8a',
              color: '#ffffff',
              '&:hover': {
                backgroundColor: '#3b82f6',
              },
            },
          },
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: '#3b82f6',
        },
      },
    },
  },
});

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [authorFilter, setAuthorFilter] = useState('');
  const [sortBy, setSortBy] = useState('updated_at');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, [page, sortBy]);

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (page === 1) {
        fetchBooks();
      } else {
        setPage(1);
      }
    }, 500);

    return () => clearTimeout(delayedSearch);
  }, [searchTerm, authorFilter]);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const params = {
        page,
        limit: 12,
        search: searchTerm,
        author: authorFilter,
        sort: sortBy,
      };

      const response = await booksAPI.getBooks(params);
      setBooks(response.data.books);
      setTotalPages(response.data.pages);
      setTotal(response.data.total);
    } catch (err) {
      setError('Failed to load books');
      console.error('Books fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setAuthorFilter('');
    setSortBy('updated_at');
    setPage(1);
  };

  return (
    <ThemeProvider theme={darkBlueTheme}>
      <Box sx={{ backgroundColor: '#0f172a', minHeight: '100vh' }}>
        <Container maxWidth="lg" sx={{ pt: 4, pb: 4 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h4" gutterBottom sx={{ color: '#ffffff', fontWeight: 'bold' }}>
              📚 Books Library
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => navigate('/add-book')}
              sx={{
                background: 'linear-gradient(45deg, #1e3a8a 30%, #3b82f6 90%)',
                boxShadow: '0 4px 20px rgba(59, 130, 246, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #3b82f6 30%, #60a5fa 90%)',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              Add Book
            </Button>
          </Box>

          {/* Search and Filter Controls */}
          <Card sx={{ mb: 3, background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)' }}>
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Search books..."
                    variant="outlined"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: <Search sx={{ mr: 1, color: '#3b82f6' }} />,
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    label="Filter by author"
                    variant="outlined"
                    value={authorFilter}
                    onChange={(e) => setAuthorFilter(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth>
                    <InputLabel sx={{ color: '#cbd5e1' }}>Sort by</InputLabel>
                    <Select
                      value={sortBy}
                      label="Sort by"
                      onChange={(e) => setSortBy(e.target.value)}
                      sx={{ color: '#ffffff' }}
                    >
                      <MenuItem value="updated_at">Recently Updated</MenuItem>
                      <MenuItem value="created_at">Recently Added</MenuItem>
                      <MenuItem value="title">Title (A-Z)</MenuItem>
                      <MenuItem value="author">Author (A-Z)</MenuItem>
                      <MenuItem value="publication_date">Publication Date</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={2}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<FilterList />}
                    onClick={clearFilters}
                  >
                    Clear
                  </Button>
                </Grid>
              </Grid>
              
              {(searchTerm || authorFilter) && (
                <Box mt={2}>
                  <Typography variant="body2" sx={{ color: '#cbd5e1' }}>
                    Showing {total} results
                    {searchTerm && (
                      <Chip
                        label={`Search: "${searchTerm}"`}
                        onDelete={() => setSearchTerm('')}
                        size="small"
                        sx={{ ml: 1 }}
                      />
                    )}
                    {authorFilter && (
                      <Chip
                        label={`Author: "${authorFilter}"`}
                        onDelete={() => setAuthorFilter('')}
                        size="small"
                        sx={{ ml: 1 }}
                      />
                    )}
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>

          {error && (
            <Alert severity="error" sx={{ mb: 3, backgroundColor: '#dc2626', color: '#ffffff' }}>
              {error}
            </Alert>
          )}

          {/* Books Grid */}
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
              <CircularProgress size={60} />
            </Box>
          ) : books.length === 0 ? (
            <Card sx={{ background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)' }}>
              <CardContent>
                <Typography variant="h6" textAlign="center" sx={{ color: '#cbd5e1', mb: 2 }}>
                  {searchTerm || authorFilter ? 'No books found matching your criteria' : 'No books available'}
                </Typography>
                <Box textAlign="center" mt={2}>
                  <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => navigate('/add-book')}
                    sx={{
                      background: 'linear-gradient(45deg, #1e3a8a 30%, #3b82f6 90%)',
                      boxShadow: '0 4px 20px rgba(59, 130, 246, 0.3)',
                    }}
                  >
                    Add Your First Book
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ) : (
            <>
              <Grid container spacing={3}>
                {books.map((book) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={book._id}>
                    <Card
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        cursor: 'pointer',
                        background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                          transform: 'translateY(-8px) scale(1.02)',
                          boxShadow: '0 20px 40px rgba(59, 130, 246, 0.2)',
                          background: 'linear-gradient(135deg, #334155 0%, #475569 100%)',
                        }
                      }}
                      onClick={() => navigate(`/books/${book._id}`)}
                    >
                      {book.cover_image && (
                        <Box
                          component="img"
                          src={book.cover_image}
                          alt={book.title}
                          sx={{
                            height: 200,
                            objectFit: 'cover',
                            borderRadius: '4px 4px 0 0',
                          }}
                        />
                      )}
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" component="div" gutterBottom noWrap sx={{ color: '#ffffff', fontWeight: 'bold' }}>
                          {book.title}
                        </Typography>
                        <Typography variant="body2" gutterBottom sx={{ color: '#3b82f6', fontWeight: 'medium' }}>
                          by {book.author}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#cbd5e1', mb: 2 }}>
                          {book.description?.substring(0, 100)}
                          {book.description?.length > 100 ? '...' : ''}
                        </Typography>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                          {book.genre && (
                            <Chip 
                              label={book.genre} 
                              size="small" 
                              variant="outlined"
                              sx={{ 
                                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                                borderColor: '#3b82f6',
                                color: '#60a5fa'
                              }} 
                            />
                          )}
                          <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                            📄 {book.total_pages} pages
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              {/* Pagination */}
              {totalPages > 1 && (
                <Box display="flex" justifyContent="center" mt={4}>
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                    size="large"
                    sx={{
                      '& .MuiPaginationItem-root': {
                        backgroundColor: '#1e293b',
                        border: '1px solid #475569',
                        '&:hover': {
                          backgroundColor: '#334155',
                          borderColor: '#3b82f6',
                        },
                      },
                    }}
                  />
                </Box>
              )}
            </>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default BooksList;