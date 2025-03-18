'use client';

import { Box, Container, Typography, Grid, Card, CardMedia, CardContent } from "@mui/material";
import { useLanguage } from "../src/contexts/LanguageContext";

// Replace with actual project data when available
const projects = [
  {
    title: "Modern Home Renovation",
    description: "Complete drywall installation and painting in a modern home renovation.",
    image: "/img/projects/project1.jpg", // Placeholder, will need actual images
  },
  {
    title: "Commercial Office Space",
    description: "Professional painting services for a commercial office building.",
    image: "/img/projects/project2.jpg", // Placeholder, will need actual images
  },
  {
    title: "Residential Drywall Repair",
    description: "Extensive drywall repair and repainting after water damage.",
    image: "/img/projects/project3.jpg", // Placeholder, will need actual images
  },
];

export default function ProjectsSection() {
  const { t } = useLanguage();
  
  return (
    <Box sx={{ py: 8, bgcolor: "#f5f5f5" }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h2"
          align="center"
          sx={{ mb: 6, fontWeight: "bold" }}
        >
          {t('Projects.title')}
        </Typography>

        <Grid container spacing={4}>
          {projects.map((project, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  boxShadow: 3,
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'scale(1.03)',
                  }
                }}
              >
                <CardMedia
                  component="div"
                  sx={{
                    height: 240,
                    backgroundColor: 'grey.300',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Project Image Placeholder
                  </Typography>
                </CardMedia>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h3">
                    {project.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {project.description}
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