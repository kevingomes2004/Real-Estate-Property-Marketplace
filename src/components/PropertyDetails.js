import React from 'react';
import { useParams } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ImageGallery from 'react-image-gallery';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { Card, CardContent, Typography, Box, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import 'react-tabs/style/react-tabs.css';
import 'react-image-gallery/styles/css/image-gallery.css';

//Memorized components for renedering Google Maps
const PropertyMap = React.memo(({ location }) => {
  const mapContainerStyle = {
    width: '100%',
    height: '400px',
    borderRadius: '8px',
    overflow: 'hidden',
  };

  //Load Google Maps script
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBAWfrAolHo_ikHaOtBebDrlySSkSYjOXs",
  });

  if (loadError) return <Typography>Error loading maps</Typography>;
  if (!isLoaded) return <Typography>Loading maps...</Typography>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={location}
      zoom={15}
    >
      <Marker position={location} />
    </GoogleMap>
  );
});

//Main component for displaying property details
const PropertyDetails = ({ properties, favorites, onFavoriteToggle }) => {
  //Get property ID from URL parameters
  const { id } = useParams();
  //Find property by ID
  const property = properties.find((p) => p.id === parseInt(id));

  if (!property) return <Typography variant="h5">Property not found</Typography>;

  //Prepare images for Image Gallery
  const images = property.images.map((img) => ({
    original: img,
    thumbnail: img,
  }));

  //Check if property is in the favorites list
  const isFavorite = favorites.some((f) => f.id === property.id);

  return (
    <Box sx={{ maxWidth: '900px', mx: 'auto', mt: 4, p: 2 }}>
      <Card elevation={4} sx={{ borderRadius: '16px' }}>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom>
            {property.title}
          </Typography>

          {/* Image Gallery */}
          <Box sx={{ mb: 4 }}>
            <ImageGallery
              items={images}
              showPlayButton={false}
              showFullscreenButton={true}
              showNav={true}
            />
          </Box>

          {/* Price and Favorite */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 4,
            }}
          >
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                £{property.price.toLocaleString()}
              </Typography>
              <Typography color="textSecondary">{property.postcode}</Typography>
            </Box>
            <IconButton
              onClick={() => onFavoriteToggle(property)}
              sx={{
                color: isFavorite ? 'error.main' : 'text.secondary',
                bgcolor: isFavorite ? 'error.light' : 'action.hover',
                borderRadius: '50%',
              }}
            >
              {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
          </Box>

          {/* Tabs Section */}
          <Tabs>
            <TabList>
              <Tab>Description</Tab>
              <Tab>Floor Plan</Tab>
              <Tab>Map</Tab>
            </TabList>

            <TabPanel>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body1">{property.longDescription}</Typography>
                <Typography variant="h6" sx={{ mt: 3 }}>
                  Property Details
                </Typography>
                <ul>
                  <li>Type: {property.type}</li>
                  <li>Bedrooms: {property.bedrooms}</li>
                  <li>Date Added: {new Date(property.dateAdded).toLocaleDateString()}</li>
                </ul>
              </Box>
            </TabPanel>

            <TabPanel>
              <Box
                component="img"
                src={property.floorPlan}
                alt="Floor Plan"
                sx={{
                  maxWidth: '100%',
                  maxHeight: '500px',
                  borderRadius: '8px',
                  mt: 2,
                  boxShadow: 2,
                }}
              />
            </TabPanel>

            <TabPanel>
              <PropertyMap location={property.location} />
            </TabPanel>
          </Tabs>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PropertyDetails;