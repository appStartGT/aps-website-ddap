'use client';

import { Box, Container, Typography, Grid, Link, Stack, IconButton, Divider, useTheme, useMediaQuery } from "@mui/material";
import Image from "next/image";
import { config } from '../src/utils/config';
import { useLanguage } from "../src/contexts/LanguageContext";
import GetQuoteButton from "./GetQuoteButton";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";

export default function Footer() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { t } = useLanguage();
  
  const navItems = [
    { key: "home", path: "/" },
    { key: "aboutUs", path: "/about" },
    { key: "services", path: "/services" },
    { key: "projects", path: "/projects" },
    { key: "contact", path: "/contact" },
  ];
  
  return (
    <Box sx={{ bgcolor: "#333", color: "white", py: { xs: 4, md: 6 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 3, md: 4 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ mb: 2, textAlign: { xs: 'center', sm: 'left' } }}>
              <Image
                src="/img/png/logo_texto.png"
                alt={config.company.name}
                width={isMobile ? 140 : 160}
                height={isMobile ? 70 : 80}
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </Box>
            <Typography 
              variant="body2" 
              sx={{ 
                mb: 2, 
                fontSize: { xs: '0.85rem', md: '0.9rem' },
                textAlign: { xs: 'center', sm: 'left' }
              }}
            >
              Professional drywall installation, repair, and painting services for residential and commercial properties.
            </Typography>
            
            <Box sx={{ mt: 3, textAlign: { xs: 'center', sm: 'left' } }}>
              <GetQuoteButton
                variant="contained"
                startIcon={<RequestQuoteIcon />}
                size="medium"
                sx={{
                  borderRadius: 1.5,
                  px: 2,
                  py: 1,
                  textTransform: 'none',
                  fontWeight: 'medium',
                }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: "bold", 
                mb: 2,
                fontSize: { xs: '1.1rem', md: '1.25rem' },
                textAlign: { xs: 'center', sm: 'left' }
              }}
            >
              {t('Footer.quickLinks')}
            </Typography>
            <Stack 
              spacing={1} 
              direction={{ xs: 'row', sm: 'column' }}
              flexWrap={{ xs: 'wrap', sm: 'nowrap' }}
              justifyContent={{ xs: 'center', sm: 'flex-start' }}
            >
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.path}
                  underline="hover"
                  sx={{ 
                    color: "white", 
                    "&:hover": { color: "#ff0000" },
                    mx: { xs: 1, sm: 0 },
                    fontSize: { xs: '0.85rem', md: '0.9rem' },
                  }}
                >
                  {t(`NavBar.${item.key}`)}
                </Link>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: "bold", 
                mb: 2,
                fontSize: { xs: '1.1rem', md: '1.25rem' },
                textAlign: { xs: 'center', sm: 'left' }
              }}
            >
              {t('Footer.contactInfo')}
            </Typography>
            <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
              <Typography 
                variant="body2" 
                sx={{ 
                  mb: 1,
                  fontSize: { xs: '0.85rem', md: '0.9rem' },
                }}
              >
                Phone: {config.contact.phone}
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  mb: 1,
                  fontSize: { xs: '0.85rem', md: '0.9rem' },
                }}
              >
                Email: {config.contact.email}
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  mb: 2,
                  fontSize: { xs: '0.85rem', md: '0.9rem' },
                }}
              >
                Address: {config.contact.address}
              </Typography>

              <Stack 
                direction="row" 
                spacing={1} 
                sx={{ mt: 2 }}
                justifyContent={{ xs: 'center', sm: 'flex-start' }}
              >
                {[
                  { name: "facebook", url: config.social.facebook },
                  { name: "insta", url: config.social.instagram },
                  { name: "youtube", url: config.social.youtube }
                ].map((social) => (
                  <IconButton 
                    key={social.name} 
                    sx={{ p: 0 }}
                    component="a"
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={`/img/icons/${social.name}.png`}
                      alt={social.name}
                      width={28}
                      height={28}
                    />
                  </IconButton>
                ))}
              </Stack>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: { xs: 3, md: 4 }, borderColor: "rgba(255,255,255,0.1)" }} />

        <Typography 
          variant="body2" 
          align="center" 
          sx={{ 
            opacity: 0.7,
            fontSize: { xs: '0.8rem', md: '0.85rem' }, 
          }}
        >
          © {new Date().getFullYear()} {config.company.name}. {t('Footer.rights')}
        </Typography>
      </Container>
    </Box>
  );
} 