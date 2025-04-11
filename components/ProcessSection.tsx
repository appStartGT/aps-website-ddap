'use client';

import { Box, Container, Typography, Grid, useTheme, useMediaQuery, Paper } from "@mui/material";
// import Image from "next/image";
import { useLanguage } from "../src/contexts/LanguageContext";

// Process steps with images and descriptions
const processSteps = [
  {
    id: 1,
    title: "Consultation",
    description: "We start with a detailed consultation to understand your needs and vision for the project.",
    image: "/img/process/consultation.jpg"
  },
  {
    id: 2,
    title: "Planning",
    description: "Our experts create a comprehensive plan, including timeline, materials, and cost estimates.",
    image: "/img/process/planning.jpg"
  },
  {
    id: 3,
    title: "Preparation",
    description: "We properly prepare the space, protecting your furniture and belongings before work begins.",
    image: "/img/process/preparation.jpg"
  },
  {
    id: 4,
    title: "Installation",
    description: "Our skilled professionals execute the drywall installation with precision and attention to detail.",
    image: "/img/process/installation.jpg"
  },
  {
    id: 5,
    title: "Finishing",
    description: "We meticulously finish the surfaces, ensuring a smooth, flawless result ready for painting.",
    image: "/img/process/finishing.jpg"
  },
  {
    id: 6,
    title: "Final Inspection",
    description: "A thorough inspection ensures everything meets our high-quality standards and your expectations.",
    image: "/img/process/inspection.jpg"
  }
];

export default function ProcessSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { t } = useLanguage();

  return (
    <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: "#f9f9f9" }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          component="h2"
          align="center"
          sx={{ mb: { xs: 1, md: 2 }, fontWeight: "bold" }}
        >
          {t('Process.subtitle') || "How We Work"}
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
          {t('Process.title') || "Our Process"}
        </Typography>

        <Grid container spacing={3}>
          {processSteps.map((step) => (
            <Grid item xs={12} sm={6} md={4} key={step.id}>
              <Paper 
                elevation={2} 
                sx={{ 
                  borderRadius: 2, 
                  overflow: 'hidden',
                  height: '100%',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 6,
                  }
                }}
              >
                <Box sx={{ position: 'relative', width: '100%', height: 200 }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      Process Image {step.id}
                    </Typography>
                  </div>
                  {/* Once you have actual images, use the Image component: */}
                  {/* <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    style={{ objectFit: 'cover' }}
                  /> */}
                </Box>
                
                <Box sx={{ p: 3 }}>
                  <Typography 
                    variant="h6" 
                    component="h3" 
                    sx={{ 
                      mb: 1,
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <Box 
                      sx={{ 
                        width: 32, 
                        height: 32, 
                        borderRadius: '50%', 
                        bgcolor: 'primary.main', 
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 1.5,
                        fontWeight: 'bold',
                        fontSize: '0.9rem'
                      }}
                    >
                      {step.id}
                    </Box>
                    {t(`Process.steps.${step.id}.title`) || step.title}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary">
                    {t(`Process.steps.${step.id}.description`) || step.description}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
} 