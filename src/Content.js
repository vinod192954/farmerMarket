import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';

const Content = () => {
  return (
    <Container sx={{ textAlign: 'center', py: 4 }}>
      <Box sx={{ bgcolor: '#f5f5f5', p: 4, borderRadius: 2, mb: 3 }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#2E7D32' }}>
          Farmer's Market
        </Typography>
      </Box>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
        Welcome to MyStore
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Find the best products at the best prices!
      </Typography>
      <Button variant="contained" color="success" size="large">
        Know More
      </Button>
      <Box sx={{ mt: 4 }}>
        <img
          src="https://res.cloudinary.com/dzmhdzvfb/image/upload/v1740377517/variety-of-fresh-organic-vegetables-and-fruits-in-the-garden_ksalbl.jpg"
          alt="Website Banner"
          style={{ width: '40%', borderRadius: 8 }}
        />
      </Box>
    </Container>
  );
};

export default Content;
