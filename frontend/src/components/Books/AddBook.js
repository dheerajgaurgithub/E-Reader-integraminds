import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { booksAPI } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
  Alert,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  ThemeProvider,
  createTheme,
  Fade,
  Card,
  CardContent,
} from '@mui/material';
import { 
  Add as AddIcon, 
  Cancel as CancelIcon,
  MenuBook as BookIcon,
  Person as AuthorIcon,
  Description as DescriptionIcon,
  Category as GenreIcon,
  Article as ContentIcon
} from '@mui/icons-material';

// Dark Blue Theme (consistent with BooksList)
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
    success: {
      main: '#10b981',
    },
    error: {
      main: '#ef4444',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#1e293b',
          border: '1px solid #334155',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: '#1e3a8a',
          color: '#ffffff',
          boxShadow: '0 4px 20px rgba(30, 58, 138, 0.4)',
          '&:hover': {
            backgroundColor: '#3b82f6',
            boxShadow: '0 6px 25px rgba(59, 130, 246, 0.5)',
            transform: 'translateY(-2px)',
          },
          '&:disabled': {
            backgroundColor: '#475569',
            color: '#94a3b8',
          },
        },
        outlined: {
          borderColor: '#3b82f6',
          color: '#3b82f6',
          '&:hover': {
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            borderColor: '#60a5fa',
            transform: 'translateY(-1px)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#334155',
            transition: 'all 0.3s ease',
            '& fieldset': {
              borderColor: '#475569',
              borderWidth: '2px',
            },
            '&:hover fieldset': {
              borderColor: '#3b82f6',
              boxShadow: '0 0 10px rgba(59, 130, 246, 0.2)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#60a5fa',
              boxShadow: '0 0 15px rgba(96, 165, 250, 0.3)',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#cbd5e1',
            fontWeight: 500,
            '&.Mui-focused': {
              color: '#60a5fa',
            },
          },
          '& .MuiInputBase-input': {
            color: '#ffffff',
          },
          '& .MuiFormHelperText-root': {
            color: '#94a3b8',
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
              borderWidth: '2px',
            },
            '&:hover fieldset': {
              borderColor: '#3b82f6',
              boxShadow: '0 0 10px rgba(59, 130, 246, 0.2)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#60a5fa',
              boxShadow: '0 0 15px rgba(96, 165, 250, 0.3)',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#cbd5e1',
            fontWeight: 500,
            '&.Mui-focused': {
              color: '#60a5fa',
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          color: '#ffffff',
        },
        icon: {
          color: '#cbd5e1',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          backgroundColor: '#1e293b',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#334155',
            color: '#3b82f6',
          },
          '&.Mui-selected': {
            backgroundColor: '#1e3a8a',
            '&:hover': {
              backgroundColor: '#3b82f6',
            },
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        standardError: {
          backgroundColor: '#dc2626',
          color: '#ffffff',
          border: '1px solid #ef4444',
          '& .MuiAlert-icon': {
            color: '#ffffff',
          },
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: '#ffffff',
        },
      },
    },
  },
});

const AddBook = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    genre: '',
    content: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await booksAPI.addBook({
        ...formData,
        userId: user.id
      });
      navigate('/books');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add book');
    } finally {
      setLoading(false);
    }
  };

  const genres = [
    'Fiction',
    'Non-Fiction',
    'Science Fiction',
    'Fantasy',
    'Mystery',
    'Biography',
    'Romance',
    'Thriller',
    'Horror',
    'Historical Fiction',
    'Poetry',
    'Self-Help'
  ];

  return (
    <ThemeProvider theme={darkBlueTheme}>
      <Box sx={{ 
        backgroundColor: '#0f172a', 
        minHeight: '100vh',
        py: 4,
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
      }}>
        <Container maxWidth="md">
          <Fade in timeout={800}>
            <Card sx={{ 
              background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
              border: '2px solid #475569',
              borderRadius: 4,
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)',
            }}>
              <Box sx={{
                background: 'linear-gradient(90deg, #1e3a8a 0%, #3b82f6 100%)',
                p: 3,
                textAlign: 'center'
              }}>
                <BookIcon sx={{ fontSize: 48, color: '#ffffff', mb: 1 }} />
                <Typography variant="h3" sx={{ 
                  color: '#ffffff', 
                  fontWeight: 'bold',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }}>
                  Add New Book
                </Typography>
                <Typography variant="subtitle1" sx={{ 
                  color: '#cbd5e1',
                  mt: 1,
                  opacity: 0.9
                }}>
                  Share your favorite books with the community
                </Typography>
              </Box>

              <CardContent sx={{ p: 4 }}>
                {error && (
                  <Fade in>
                    <Alert severity="error" sx={{ mb: 3 }}>
                      {error}
                    </Alert>
                  </Fade>
                )}

                <Box component="form" onSubmit={handleSubmit}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {/* Title Field */}
                    <Box sx={{ position: 'relative' }}>
                      <TextField
                        required
                        fullWidth
                        id="title"
                        label="Book Title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter the book title..."
                        InputProps={{
                          startAdornment: (
                            <BookIcon sx={{ color: '#3b82f6', mr: 1, fontSize: 20 }} />
                          ),
                        }}
                      />
                    </Box>

                    {/* Author Field */}
                    <Box sx={{ position: 'relative' }}>
                      <TextField
                        required
                        fullWidth
                        id="author"
                        label="Author"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        placeholder="Enter the author's name..."
                        InputProps={{
                          startAdornment: (
                            <AuthorIcon sx={{ color: '#3b82f6', mr: 1, fontSize: 20 }} />
                          ),
                        }}
                      />
                    </Box>

                    {/* Genre Field */}
                    <FormControl fullWidth required>
                      <InputLabel id="genre-label" sx={{ display: 'flex', alignItems: 'center' }}>
                        <GenreIcon sx={{ color: '#3b82f6', mr: 1, fontSize: 20 }} />
                        Genre
                      </InputLabel>
                      <Select
                        labelId="genre-label"
                        id="genre"
                        name="genre"
                        value={formData.genre}
                        label="Genre"
                        onChange={handleChange}
                      >
                        {genres.map((genre) => (
                          <MenuItem key={genre} value={genre}>
                            {genre}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    {/* Description Field */}
                    <TextField
                      fullWidth
                      id="description"
                      label="Description"
                      name="description"
                      multiline
                      rows={4}
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Write a brief description of the book..."
                      helperText="Optional: Provide a summary or your thoughts about the book"
                      InputProps={{
                        startAdornment: (
                          <DescriptionIcon sx={{ 
                            color: '#3b82f6', 
                            mr: 1, 
                            fontSize: 20,
                            alignSelf: 'flex-start',
                            mt: 1
                          }} />
                        ),
                      }}
                    />

                    {/* Content Field */}
                    <TextField
                      required
                      fullWidth
                      id="content"
                      label="Book Content"
                      name="content"
                      multiline
                      rows={10}
                      value={formData.content}
                      onChange={handleChange}
                      placeholder="Paste the full text of the book here..."
                      helperText="Paste the complete book content or chapters here"
                      InputProps={{
                        startAdornment: (
                          <ContentIcon sx={{ 
                            color: '#3b82f6', 
                            mr: 1, 
                            fontSize: 20,
                            alignSelf: 'flex-start',
                            mt: 1
                          }} />
                        ),
                      }}
                      sx={{
                        '& .MuiInputBase-root': {
                          backgroundColor: '#1e293b',
                          border: '2px solid #334155',
                        }
                      }}
                    />
                  </Box>

                  {/* Action Buttons */}
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'flex-end', 
                    gap: 2, 
                    mt: 4,
                    pt: 3,
                    borderTop: '1px solid #475569'
                  }}>
                    <Button
                      variant="outlined"
                      startIcon={<CancelIcon />}
                      onClick={() => navigate('/books')}
                      disabled={loading}
                      size="large"
                      sx={{
                        minWidth: 120,
                        transition: 'all 0.3s ease',
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <AddIcon />}
                      disabled={loading}
                      size="large"
                      sx={{
                        minWidth: 160,
                        background: loading 
                          ? 'linear-gradient(45deg, #475569 30%, #64748b 90%)'
                          : 'linear-gradient(45deg, #1e3a8a 30%, #3b82f6 90%)',
                        transition: 'all 0.3s ease',
                        '&:not(:disabled):hover': {
                          background: 'linear-gradient(45deg, #3b82f6 30%, #60a5fa 90%)',
                          transform: 'translateY(-2px)',
                        },
                      }}
                    >
                      {loading ? 'Adding Book...' : 'Add Book'}
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Fade>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default AddBook;