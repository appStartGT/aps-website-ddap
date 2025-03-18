'use client';

import { Box, Container, Typography, Grid, Card, CardContent, CardMedia, useTheme, useMediaQuery } from "@mui/material";
import { useLanguage } from "../src/contexts/LanguageContext";

export default function ServicesSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { t } = useLanguage();
  
  const services = [
    {
      key: "service1",
      image: "/img/services/drywall.jpg", // You'll need to add actual images
    },
    {
      key: "service2",
      image: "/img/services/painting.jpg", // You'll need to add actual images
    },
    {
      key: "service3",
      image: "/img/services/repair.jpg", // You'll need to add actual images
    },
  ];
  
  return (
    <Box sx={{ py: { xs: 6, md: 8 } }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          component="h2"
          align="center"
          sx={{ mb: { xs: 1, md: 2 }, fontWeight: "bold" }}
        >
          {t('Services.title1')}
        </Typography>
        <Typography
          variant={isMobile ? "h4" : "h3"}
          component="h2"
          align="center"
          sx={{ 
            mb: { xs: 4, md: 6 }, 
            fontWeight: "bold", 
            color: "primary.main",
            fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' }
          }}
        >
          {t('Services.title2')}
        </Typography>

        <Grid container spacing={{ xs: 3, md: 4 }}>
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  boxShadow: 3,
                  borderRadius: 2,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6,
                  }
                }}
              >
                <CardMedia
                  component="div"
                  sx={{
                    height: { xs: 180, md: 200 },
                    backgroundColor: 'grey.300',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Service Image Placeholder
                  </Typography>
                </CardMedia>
                <CardContent sx={{ flexGrow: 1, p: { xs: 2, md: 3 } }}>
                  <Typography 
                    gutterBottom 
                    variant="h5" 
                    component="h3" 
                    sx={{ 
                      fontWeight: 'bold',
                      fontSize: { xs: '1.3rem', md: '1.5rem' },
                      mb: 2
                    }}
                  >
                    {t(`Services.${service.key}.title`)}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{
                      fontSize: { xs: '0.875rem', md: '0.95rem' },
                      lineHeight: 1.6
                    }}
                  >
                    {t(`Services.${service.key}.description`)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
} 