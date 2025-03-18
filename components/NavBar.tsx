"use client";
import { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
  Stack,
  Divider,
  CircularProgress,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../src/contexts/LanguageContext";
import { Locale } from "../src/i18n";

const settings: Locale[] = ["en", "es"];

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const { locale, setLocale, t, isLoading } = useLanguage();
  // Track if the component is mounted to prevent hydration mismatch
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleChangeLanguage = (newLocale: Locale) => {
    if (newLocale !== locale) {
      setLocale(newLocale);
    }
  };

  const pages = [
    { key: "home", path: "/" },
    { key: "aboutUs", path: "/about" },
    { key: "services", path: "/services" },
    { key: "projects", path: "/projects" },
    { key: "blog", path: "/blog" },
    { key: "contact", path: "/contact" },
  ];

  // If not mounted yet, return a simple placeholder to avoid hydration issues
  if (!mounted) {
    return <AppBar position="fixed" sx={{ visibility: "hidden" }}></AppBar>;
  }

  return (
    <>
      <AppBar position="fixed" sx={{ bgcolor: "white", top: 0, boxShadow: 1 }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            {/* Logo - Visible on all screens */}
            <Box sx={{ display: "flex", mr: { xs: 1, md: 3 } }}>
              <Link href="/" style={{ display: "flex", alignItems: "center" }}>
                <Image
                  src="/img/png/logo_texto.png"
                  alt="Logo"
                  width={120}
                  height={60}
                  style={{
                    width: "auto",
                    height: "auto",
                    maxHeight: "60px",
                  }}
                  priority
                />
              </Link>
            </Box>

            {/* Mobile Menu */}
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
                justifyContent: "flex-end",
              }}
            >
              <IconButton
                size="large"
                onClick={handleOpenNavMenu}
                sx={{ color: "black" }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page.key}
                    onClick={handleCloseNavMenu}
                    component={Link}
                    href={page.path}
                  >
                    <Typography textAlign="center">
                      {t(`NavBar.${page.key}`)}
                    </Typography>
                  </MenuItem>
                ))}
                <MenuItem>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<RequestQuoteIcon />}
                    sx={{
                      bgcolor: "#ff0000",
                      color: "white",
                      "&:hover": {
                        bgcolor: "#cc0000",
                      },
                    }}
                  >
                    {t("NavBar.getQuote")}
                  </Button>
                </MenuItem>
                <Divider />
                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent="center"
                  py={1}
                >
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
                        minWidth: "80px",
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
              </Menu>
            </Box>

            {/* Desktop Menu */}
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "center",
                gap: 2,
              }}
            >
              {pages.map((page) => (
                <Button
                  key={page.key}
                  onClick={handleCloseNavMenu}
                  component={Link}
                  href={page.path}
                  sx={{
                    color: "black",
                    "&:hover": {
                      color: "#ff0000",
                      bgcolor: "transparent",
                    },
                  }}
                >
                  <Typography textTransform={"capitalize"}>
                    {t(`NavBar.${page.key}`)}
                  </Typography>
                </Button>
              ))}
            </Box>

            {/* Desktop Right Section */}
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{ display: { xs: "none", md: "flex" } }}
            >
              <Button
                variant="contained"
                startIcon={<RequestQuoteIcon />}
                sx={{
                  bgcolor: "#ff0000",
                  "&:hover": {
                    bgcolor: "#cc0000",
                  },
                }}
              >
                {t("NavBar.getQuote")}
              </Button>

              <Divider orientation="vertical" flexItem />

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
                        locale === setting ? "rgba(0,0,0,0.05)" : "transparent",
                      minWidth: "80px",
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
      </AppBar>
      {/* Extra space for the fixed navbar */}
      {/* <Box sx={{ height: { xs: 70, md: 80 } }} /> */}
    </>
  );
};

export default NavBar;
