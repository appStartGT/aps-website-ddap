"use client";
import { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Button,
  Stack,
  Divider,
  CircularProgress,
  useScrollTrigger,
  Slide,
  Fade,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemText,
  alpha,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import PhoneIcon from "@mui/icons-material/Phone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../src/contexts/LanguageContext";
import { Locale } from "../src/i18n";
import GetQuoteButton from "./GetQuoteButton";
import { config } from "../src/utils/config";
const settings: Locale[] = ["en", "es"];

// Navbar that hides when scrolling down and shows when scrolling up
function HideOnScroll(props: { children: React.ReactElement }) {
  const { children } = props;
  const trigger = useScrollTrigger({
    threshold: 100,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const LandingNavBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { locale, setLocale, t, isLoading } = useLanguage();
  // Track if the component is mounted to prevent hydration mismatch
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleChangeLanguage = (newLocale: Locale) => {
    if (newLocale !== locale) {
      setLocale(newLocale);
    }
  };

  // Function to handle phone number click
  const handlePhoneClick = () => {
    window.location.href = `tel:${config.contact.phone}`;
  };

  // Function to handle email click
  const handleEmailClick = () => {
    window.location.href = `mailto:${config.contact.email}`;
  };

  // Function to handle WhatsApp click
  const handleWhatsAppClick = () => {
    window.open(`whatsapp://send?phone=${config.contact.phone}`, "_blank");
  };

  // If not mounted yet, return a simple placeholder to avoid hydration issues
  if (!mounted) {
    return <AppBar position="fixed" sx={{ visibility: "hidden" }}></AppBar>;
  }

  return (
    <>
      <HideOnScroll>
        <AppBar
          position="fixed"
          sx={{
            bgcolor: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(8px)",
            top: 0,
            boxShadow: 0,
            borderBottom: "1px solid rgba(0,0,0,0.05)",
            transition: "all 0.3s ease-in-out",
          }}
        >
          <Fade in={true} timeout={1000}>
            <Container maxWidth="lg">
              <Toolbar disableGutters sx={{ height: { xs: 70, md: 80 } }}>
                {/* Logo - Visible on all screens */}
                <Box
                  sx={{
                    display: "flex",
                    mr: { xs: 1, md: 3 },
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.02)",
                    },
                  }}
                >
                  <Link
                    href="/"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <Image
                      src="/img/png/logo_texto.png"
                      alt="Logo"
                      width={100}
                      height={100}
                      style={{
                        width: "auto",
                        height: "auto",
                        maxHeight: "150px",
                      }}
                      priority
                    />
                  </Link>
                </Box>

                {/* Contact Phone - Desktop only */}
                <Box
                  sx={{
                    display: { xs: "none", md: "flex" },
                    alignItems: "center",
                    ml: 2,
                    cursor: "pointer",
                    "&:hover": {
                      "& .MuiTypography-root": {
                        color: "#ff0000",
                        textDecoration: "underline",
                      },
                    },
                    transition: "all 0.2s ease",
                  }}
                  onClick={handlePhoneClick}
                >
                  <PhoneIcon
                    sx={{
                      color: "#ff0000",
                      mr: 1,
                      fontSize: "1.2rem",
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#333",
                      fontWeight: 500,
                      letterSpacing: "0.5px",
                    }}
                  >
                    {config.contact.phone}
                  </Typography>
                </Box>

                {/* Company Tagline - Desktop only */}
                <Box
                  sx={{
                    flexGrow: 1,
                    display: { xs: "none", md: "flex" },
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      fontStyle: "italic",
                      fontWeight: 300,
                      color: "#555",
                      letterSpacing: "0.5px",
                      fontSize: "1rem",
                      textAlign: "center",
                      position: "relative",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: -5,
                        left: "25%",
                        width: "50%",
                        height: 2,
                        bgcolor: "#ff0000",
                        opacity: 0.7,
                      },
                    }}
                  >
                    {t("NavBar.tagline")}
                  </Typography>
                </Box>

                {/* Mobile Menu Button */}
                <Box
                  sx={{
                    flexGrow: 1,
                    display: { xs: "flex", md: "none" },
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  {/* Mobile Language Toggle */}
                  <IconButton
                    onClick={() => {
                      const newLocale = locale === "en" ? "es" : "en";
                      handleChangeLanguage(newLocale);
                    }}
                    sx={{
                      color: "black",
                      mr: 1,
                      position: "relative",
                      border: "1px solid rgba(0,0,0,0.1)",
                      p: 0.75,
                      "&:hover": {
                        bgcolor: "rgba(0,0,0,0.04)",
                      },
                    }}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      <Box
                        sx={{
                          position: "relative",
                          width: 20,
                          height: 20,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          src={`/img/icons/${
                            locale === "en" ? "US-EN.png" : "ES-SP.png"
                          }`}
                          alt={locale}
                          width={20}
                          height={20}
                          style={{ borderRadius: "50%" }}
                        />
                      </Box>
                    )}
                  </IconButton>
                  <IconButton
                    size="large"
                    onClick={handleDrawerToggle}
                    sx={{
                      color: mobileOpen ? "transparent" : "black",
                      transition: "transform 0.3s, color 0.2s",
                      "&:hover": {
                        transform: "scale(1.1)",
                        bgcolor: "transparent",
                      },
                      zIndex: 1201,
                    }}
                  >
                    <MenuIcon />
                  </IconButton>
                </Box>

                {/* Desktop Right Section */}
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  sx={{ display: { xs: "none", md: "flex" } }}
                >
                  <GetQuoteButton
                    startIcon={<RequestQuoteIcon />}
                    sx={{
                      py: 1,
                      px: 2,
                      textTransform: "none",
                      borderRadius: "4px",
                      transition: "all 0.3s",
                      boxShadow: "0 4px 8px rgba(255,0,0,0.2)",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 6px 10px rgba(255,0,0,0.3)",
                      },
                    }}
                  />

                  <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

                  <Stack direction="row" spacing={1}>
                    {settings.map((setting) => (
                      <Button
                        key={setting}
                        onClick={() => handleChangeLanguage(setting)}
                        disabled={isLoading}
                        sx={{
                          color: "black",
                          opacity: locale === setting ? 1 : 0.7,
                          bgcolor:
                            locale === setting
                              ? "rgba(0,0,0,0.05)"
                              : "transparent",
                          minWidth: "40px",
                          p: 1,
                          borderRadius: "4px",
                          transition: "all 0.2s",
                          "&:hover": {
                            bgcolor: "rgba(0,0,0,0.08)",
                            transform: "translateY(-1px)",
                          },
                        }}
                        startIcon={
                          isLoading && locale !== setting ? (
                            <CircularProgress size={16} color="inherit" />
                          ) : (
                            <Image
                              src={`/img/icons/${
                                setting === "en" ? "US-EN.png" : "ES-SP.png"
                              }`}
                              alt={setting}
                              width={20}
                              height={20}
                            />
                          )
                        }
                      >
                        {setting.toUpperCase()}
                      </Button>
                    ))}
                  </Stack>
                </Stack>
              </Toolbar>
            </Container>
          </Fade>
        </AppBar>
      </HideOnScroll>

      {/* Mobile Menu Drawer */}
      <SwipeableDrawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        onOpen={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: "100%",
            bgcolor: "rgba(255, 255, 255, 0.98)",
            backdropFilter: "blur(10px)",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            position: "relative",
            p: 3,
          }}
        >
          {/* Close Button */}
          <IconButton
            onClick={handleDrawerToggle}
            sx={{
              position: "absolute",
              right: 16,
              top: 16,
              color: "#ff0000",
              bgcolor: alpha("#ff0000", 0.05),
              "&:hover": {
                bgcolor: alpha("#ff0000", 0.1),
                transform: "rotate(90deg)",
              },
              transition: "all 0.3s ease",
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Logo */}
          <Box sx={{ my: 4, textAlign: "center" }}>
            <Image
              src="/img/png/logo_texto.png"
              alt="Logo"
              width={100}
              height={100}
              style={{
                width: "auto",
                height: "auto",
                maxHeight: "150px",
              }}
              priority
            />
          </Box>

          {/* Tagline */}
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontStyle: "italic",
              fontWeight: 300,
              color: "#555",
              letterSpacing: "0.5px",
              textAlign: "center",
              mb: 4,
              position: "relative",
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: -8,
                left: "30%",
                width: "40%",
                height: 2,
                bgcolor: "#ff0000",
                opacity: 0.7,
              },
            }}
          >
            {t("NavBar.tagline")}
          </Typography>

          {/* Get Quote Button */}
          <GetQuoteButton
            startIcon={<RequestQuoteIcon />}
            fullWidth
            sx={{
              py: 1.5,
              mb: 3,
              textTransform: "none",
              fontSize: "1rem",
              borderRadius: "6px",
              boxShadow: "0 4px 12px rgba(255,0,0,0.25)",
              "&:hover": {
                boxShadow: "0 6px 15px rgba(255,0,0,0.35)",
              },
            }}
          />

          {/* Contact Information */}
          <List sx={{ mb: 3 }}>
            <ListItem
              onClick={handlePhoneClick}
              sx={{
                px: 2,
                py: 1.5,
                borderRadius: "8px",
                mb: 1,
                bgcolor: alpha("#000", 0.02),
                "&:hover": { bgcolor: alpha("#ff0000", 0.05) },
                cursor: "pointer",
              }}
            >
              <PhoneIcon sx={{ color: "#ff0000", mr: 2 }} />
              <ListItemText
                primary={config.contact.phone}
                primaryTypographyProps={{ fontWeight: 500 }}
              />
            </ListItem>

            <ListItem
              onClick={handleWhatsAppClick}
              sx={{
                px: 2,
                py: 1.5,
                borderRadius: "8px",
                mb: 1,
                bgcolor: alpha("#000", 0.02),
                "&:hover": { bgcolor: alpha("#25D366", 0.1) },
                cursor: "pointer",
              }}
            >
              <WhatsAppIcon sx={{ color: "#25D366", mr: 2 }} />
              <ListItemText
                primary={config.contact.phone}
                primaryTypographyProps={{ fontWeight: 500 }}
              />
            </ListItem>

            <ListItem
              onClick={handleEmailClick}
              sx={{
                px: 2,
                py: 1.5,
                borderRadius: "8px",
                bgcolor: alpha("#000", 0.02),
                "&:hover": { bgcolor: alpha("#1976d2", 0.05) },
                cursor: "pointer",
              }}
            >
              <EmailIcon sx={{ color: "#1976d2", mr: 2 }} />
              <ListItemText
                primary={config.contact.email}
                primaryTypographyProps={{ fontWeight: 500 }}
              />
            </ListItem>
          </List>

          {/* Divider */}
          <Divider sx={{ mb: 3 }} />

          {/* Language Switcher */}
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {locale === "en" ? "Select language" : "Seleccionar idioma"}
            </Typography>
            <Stack
              direction="row"
              spacing={2}
              justifyContent="center"
              sx={{ mb: 4 }}
            >
              {settings.map((setting) => (
                <Button
                  key={setting}
                  onClick={() => handleChangeLanguage(setting)}
                  disabled={isLoading}
                  sx={{
                    color: locale === setting ? "#fff" : "rgba(0,0,0,0.7)",
                    bgcolor:
                      locale === setting ? "#ff0000" : "rgba(0,0,0,0.05)",
                    px: 3,
                    py: 1,
                    borderRadius: "6px",
                    transition: "all 0.3s",
                    "&:hover": {
                      bgcolor:
                        locale === setting ? "#cc0000" : "rgba(0,0,0,0.09)",
                    },
                    boxShadow:
                      locale === setting
                        ? "0 4px 8px rgba(255,0,0,0.2)"
                        : "none",
                  }}
                  startIcon={
                    isLoading && locale !== setting ? (
                      <CircularProgress size={16} color="inherit" />
                    ) : (
                      <Image
                        src={`/img/icons/${
                          setting === "en" ? "US-EN.png" : "ES-SP.png"
                        }`}
                        alt={setting}
                        width={20}
                        height={20}
                      />
                    )
                  }
                >
                  {setting === "en" ? "English" : "Español"}
                </Button>
              ))}
            </Stack>
          </Box>

          {/* Footer */}
          <Box sx={{ mt: "auto", pt: 3, textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} Dany&apos;s Drywall & Painting
            </Typography>
          </Box>
        </Box>
      </SwipeableDrawer>

      {/* Add spacer to prevent content from hiding behind the fixed navbar */}
      <Toolbar sx={{ height: { xs: 70, md: 80 } }} />
    </>
  );
};

export default LandingNavBar;
