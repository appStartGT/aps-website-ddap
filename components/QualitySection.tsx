'use client';

import { Box, Container, Typography, Grid, useTheme, useMediaQuery, Paper } from "@mui/material";
import { useLanguage } from "../src/contexts/LanguageContext";

export default function QualitySection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { t } = useLanguage();
  
  return (
    <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: "#f9f9f9" }}>
      <Container maxWidth="lg">
        <Typography
          variant={isMobile ? "h4" : "h3"}
          component="h2"
          align="center"
          sx={{ 
            mb: { xs: 4, md: 6 }, 
            fontWeight: "bold",
            fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' }
          }}
        >
          <Typography
            component="span"
            variant="inherit"
            sx={{
              color: "primary.main",
              fontWeight: "bold",
            }}
          >
            {t('Quality.unmatched')}
          </Typography>{" "}
          {t('Quality.quality')}
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={10} md={8}>
            <Paper elevation={2} sx={{ p: { xs: 3, md: 4 }, borderRadius: 2 }}>
              <Typography 
                variant="body1" 
                paragraph
                sx={{ 
                  fontSize: { xs: '0.95rem', md: '1.1rem' },
                  textAlign: { xs: 'left', md: 'center' }
                }}
              >
                {t('Quality.paragraph1')}
              </Typography>
              <Typography 
                variant="body1" 
                paragraph
                sx={{ 
                  fontSize: { xs: '0.95rem', md: '1.1rem' },
                  textAlign: { xs: 'left', md: 'center' },
                  mb: 0
                }}
              >
                {t('Quality.paragraph2')}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
} 