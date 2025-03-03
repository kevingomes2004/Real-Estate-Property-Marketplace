import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import SearchPage from './components/SearchPage';
import PropertyDetails from './components/PropertyDetails';
import Navbar from './components/Navbar';
import propertyData from './data/properties.json';
import FavoritesList from './components/FavoritesList';
import './styles/responsive.css';

// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

const STORAGE_KEY = 'propertyFavorites';

const App = () => {
  // State for favorites with error handling
  const [favorites, setFavorites] = useState(() => {
    try {
      const savedFavorites = localStorage.getItem(STORAGE_KEY);
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    } catch (error) {
      console.error('Error loading favorites:', error);
      return [];
    }
  });

  // State for search results
  const [searchResults, setSearchResults] = useState(propertyData.properties);
  // Save favorites to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
      // Show success message when favorites are saved
      if (favorites.length > 0) {
        
      }
    } catch (error) {
      console.error('Error saving favorites:', error);
      
    }
  }, [favorites]);

  // Handle drag and drop
  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    // Drop outside valid area
    if (!destination) return;

    // Same position
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) return;

    const property = propertyData.properties.find(
      (p) => p.id.toString() === draggableId
    );

    if (!property) return;

    // Add to favorites
    if (source.droppableId === 'propertyList' && destination.droppableId === 'favorites') {
      if (!favorites.some((f) => f.id === property.id)) {
        setFavorites(prev => [...prev, property]);
        
      }
    }
    // Remove from favorites
    else if (source.droppableId === 'favorites' && destination.droppableId === 'propertyList') {
      setFavorites(prev => prev.filter((f) => f.id !== property.id));
      
    }
  };

  // Handle favorite toggle
  const handleFavoriteToggle = (property) => {
    setFavorites(prev => {
      if (prev.some((f) => f.id === property.id)) {
        
        return prev.filter((f) => f.id !== property.id);
      }
      return [...prev, property];
    });
  };

  // Clear all favorites with confirmation
  const handleClearFavorites = () => {
    if (window.confirm('Are you sure you want to clear all favorites?')) {
      setFavorites([]);
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (error) {
        console.error('Error clearing favorites:', error);
      }
    }
  };

  // Update search results
  const handleSearchUpdate = (filteredResults) => {
    setSearchResults(filteredResults);
  };

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <Router>
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="min-h-screen bg-gray-100">
              <Navbar />
              <Routes>
                <Route
                  path="/"
                  element={
                    <SearchPage
                      properties={propertyData.properties}
                      searchResults={searchResults}
                      onSearchUpdate={handleSearchUpdate}
                      favorites={favorites}
                      onFavoriteToggle={handleFavoriteToggle}
                      onClearFavorites={handleClearFavorites}
                    />
                  }
                />
                <Route 
                  path="/favorites" 
                  element={
                    <FavoritesList 
                      favorites={favorites} 
                      onToggleFavorite={handleFavoriteToggle}
                      onClearFavorites={handleClearFavorites}
                    />
                  } 
                />
                <Route
                  path="/property/:id"
                  element={
                    <PropertyDetails
                      properties={propertyData.properties}
                      favorites={favorites}
                      onFavoriteToggle={handleFavoriteToggle}
                    />
                  }
                />
              </Routes>
            </div>
          </DragDropContext>
        </Router>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;
