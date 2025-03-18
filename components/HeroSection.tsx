'use client';

import { Box, Container, Typography, Button, Stack, useTheme, useMediaQuery } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Image from 'next/image';
import { config } from '../src/utils/config';
import { useLanguage } from "../src/contexts/LanguageContext";

export default function HeroSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { t } = useLanguage();
  
  // Format phone number for WhatsApp URL (remove any non-numeric characters)
  const whatsappNumber = config.contact.phone.replace(/\D/g, '');
  
  return (
    <Box sx={{ 
      width: "100%", 
      minHeight: {xs: "80vh", md: "100vh"}, 
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <Box sx={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: -1 }}>
        <Image
          src="/img/svg/hero_background.svg"
          alt="Hero Background"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%)',
            zIndex: 1
          }}
        />
      </Box>
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            py: { xs: 6, md: 8 },
          }}
        >
          <Typography
            variant={isMobile ? "h3" : "h2"}
            component="h1"
            sx={{
              fontWeight: "bold",
              mb: 3,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
              lineHeight: 1.2,
              color: "white",
              textShadow: "2px 2px 4px rgba(0,0,0,0.5)"
            }}
          >
            <Typography
              component="span"
              variant={isMobile ? "h3" : "h2"}
              sx={{
                color: "#ff6b6b",
                fontWeight: "bold",
                fontSize: 'inherit',
                textShadow: "2px 2px 4px rgba(0,0,0,0.5)"
              }}
            >
              {t('Hero.title1')}
            </Typography>{" "}
            {t('Hero.title2')}
            <br />
            {t('Hero.title3')}
          </Typography>

          <Typography
            variant={isMobile ? "body1" : "h5"}
            sx={{
              maxWidth: "md",
              mb: 4,
              color: "white",
              px: { xs: 2, sm: 4 },
              fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
              textShadow: "1px 1px 2px rgba(0,0,0,0.4)"
            }}
          >
            {t('Hero.subtitle')}
          </Typography>

          <Stack 
            direction={{ xs: "column", sm: "row" }} 
            spacing={{ xs: 2, sm: 2 }}
            sx={{ width: { xs: '100%', sm: 'auto' } }}
          >
            <Button
              variant="contained"
              size={isMobile ? "medium" : "large"}
              fullWidth={isMobile}
              startIcon={<PhoneIcon />}
              href={`tel:${config.contact.phone}`}
              sx={{
                bgcolor: "#ff3333",
                py: { xs: 1, md: 1.5 },
                px: { xs: 2, md: 4 },
                whiteSpace: 'nowrap',
                boxShadow: "0 4px 10px rgba(255,51,51,0.3)",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 6px 15px rgba(255,51,51,0.4)",
                  bgcolor: "#e62e2e",
                }
              }}
            >
              {t('Hero.callButton')}
            </Button>

            <Button
              variant="contained"
              size={isMobile ? "medium" : "large"}
              fullWidth={isMobile}
              startIcon={<EmailIcon />}
              href={`mailto:${config.contact.email}`}
              sx={{
                bgcolor: "#ff3333",
                py: { xs: 1, md: 1.5 },
                px: { xs: 2, md: 4 },
                boxShadow: "0 4px 10px rgba(255,51,51,0.3)",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 6px 15px rgba(255,51,51,0.4)",
                  bgcolor: "#e62e2e",
                }
              }}
            >
              {t('Hero.emailButton')}
            </Button>
            
            <Button
              variant="contained"
              size={isMobile ? "medium" : "large"}
              fullWidth={isMobile}
              startIcon={<WhatsAppIcon />}
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                bgcolor: "#e62e2e", // WhatsApp green color
                py: { xs: 1, md: 1.5 },
                px: { xs: 2, md: 4 },
                boxShadow: "0 4px 10px rgba(37,211,102,0.3)",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 6px 15px rgba(37,211,102,0.4)",
                  bgcolor: "#e62e2e", // Slightly darker green on hover
                }
              }}
            >
              WhatsApp
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
