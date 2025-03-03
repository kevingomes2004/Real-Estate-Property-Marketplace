import React, { useState } from 'react';
import { TextField, Select, MenuItem, FormControl, InputLabel, Button, Grid, Paper, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { Droppable } from 'react-beautiful-dnd';
import PropertyCard from './PropertyCard';
import FavoritesList from './FavoritesList';

// Component to display the search page
const SearchPage = ({ 
  properties, 
  searchResults, 
  onSearchUpdate, 
  favorites, 
  onFavoriteToggle, 
  onClearFavorites 
}) => {
  // State to manage search criteria
  const [searchCriteria, setSearchCriteria] = useState({
    type: '',
    minPrice: '',
    maxPrice: '',
    minBedrooms: '',
    maxBedrooms: '',
    dateAfter: null,
    dateBefore: null,
    postcode: ''
  });

  //Function to handle search based on criteria
  const handleSearch = () => {
    const filtered = properties.filter(property => {
      const matchesType = !searchCriteria.type || property.type === searchCriteria.type;
      const matchesMinPrice = !searchCriteria.minPrice || property.price >= parseInt(searchCriteria.minPrice);
      const matchesMaxPrice = !searchCriteria.maxPrice || property.price <= parseInt(searchCriteria.maxPrice);
      const matchesMinBedrooms = !searchCriteria.minBedrooms || property.bedrooms >= parseInt(searchCriteria.minBedrooms);
      const matchesMaxBedrooms = !searchCriteria.maxBedrooms || property.bedrooms <= parseInt(searchCriteria.maxBedrooms);
      const matchesDateAfter = !searchCriteria.dateAfter || new Date(property.dateAdded) >= searchCriteria.dateAfter;
      const matchesDateBefore = !searchCriteria.dateBefore || new Date(property.dateAdded) <= searchCriteria.dateBefore;
      const matchesPostcode = !searchCriteria.postcode || property.postcode.toLowerCase().startsWith(searchCriteria.postcode.toLowerCase());

      return matchesType && matchesMinPrice && matchesMaxPrice && 
             matchesMinBedrooms && matchesMaxBedrooms && 
             matchesDateAfter && matchesDateBefore && matchesPostcode;
    });

    onSearchUpdate(filtered);
  };

  return (
    <Grid container spacing={4} justifyContent="center" padding={4}>
      {/* Search Form */}
      <Grid item xs={12} md={8}>
        <Paper elevation={3} sx={{ padding: 4, borderRadius: 2 }}>
          <Typography variant="h5" gutterBottom color="primary">
            Property Search
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Property Type</InputLabel>
                <Select
                  value={searchCriteria.type}
                  onChange={(e) => setSearchCriteria({ ...searchCriteria, type: e.target.value })}
                >
                  <MenuItem value="">Any</MenuItem>
                  <MenuItem value="house">House</MenuItem>
                  <MenuItem value="flat">Flat</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Min Price"
                type="number"
                value={searchCriteria.minPrice}
                onChange={(e) => setSearchCriteria({ ...searchCriteria, minPrice: e.target.value })}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Max Price"
                type="number"
                value={searchCriteria.maxPrice}
                onChange={(e) => setSearchCriteria({ ...searchCriteria, maxPrice: e.target.value })}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Min Bedrooms"
                type="number"
                value={searchCriteria.minBedrooms}
                onChange={(e) => setSearchCriteria({ ...searchCriteria, minBedrooms: e.target.value })}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Max Bedrooms"
                type="number"
                value={searchCriteria.maxBedrooms}
                onChange={(e) => setSearchCriteria({ ...searchCriteria, maxBedrooms: e.target.value })}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <DatePicker
                label="Date After"
                value={searchCriteria.dateAfter}
                onChange={(newValue) => setSearchCriteria({ ...searchCriteria, dateAfter: newValue })}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <DatePicker
                label="Date Before"
                value={searchCriteria.dateBefore}
                onChange={(newValue) => setSearchCriteria({ ...searchCriteria, dateBefore: newValue })}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Postcode"
                value={searchCriteria.postcode}
                onChange={(e) => setSearchCriteria({ ...searchCriteria, postcode: e.target.value })}
                fullWidth
              />
            </Grid>
          </Grid>

          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            sx={{ marginTop: 3, width: '100%' }}
          >
            Search
          </Button>
        </Paper>
      </Grid>

      {/* Results Section */}
      <Grid item xs={12} md={8}>
        <Droppable droppableId="propertyList">
          {(provided) => (
            <Grid container spacing={2} ref={provided.innerRef} {...provided.droppableProps}>
              {searchResults.map((property, index) => (
                <Grid item xs={12} sm={6} md={4} key={property.id}>
                  <PropertyCard
                    property={property}
                    index={index}
                    isFavorite={favorites.some((f) => f.id === property.id)}
                    onToggleFavorite={onFavoriteToggle}
                  />
                </Grid>
              ))}
              {provided.placeholder}
            </Grid>
          )}
        </Droppable>
      </Grid>

      {/* Favorites Section */}
      <Grid item xs={12} md={4}>
        <FavoritesList
          favorites={favorites}
          onToggleFavorite={onFavoriteToggle}
          onClearFavorites={onClearFavorites}
        />
      </Grid>
    </Grid>
  );
};

export default SearchPage;
