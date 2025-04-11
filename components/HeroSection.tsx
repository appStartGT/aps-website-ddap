"use client";

import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  useTheme,
  useMediaQuery,
  Grid,
  Paper,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import Image from "next/image";
import { config } from "../src/utils/config";
import { useLanguage } from "../src/contexts/LanguageContext";
import GetQuoteButton from "./GetQuoteButton";

export default function HeroSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { t, locale } = useLanguage();

  // Format phone number for WhatsApp URL (remove any non-numeric characters)
  const whatsappNumber = config.contact.phone.replace(/\D/g, "");

  return (
    <Box
      id="hero-section"
      sx={{
        width: "100%",
        minHeight: { xs: "80vh", md: "100vh" },
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
        }}
      >
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
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%)",
            zIndex: 1,
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
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem" },
              lineHeight: 1.2,
              color: "white",
              textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
            }}
          >
            <Typography
              component="span"
              variant={isMobile ? "h3" : "h2"}
              sx={{
                color: "#ff6b6b",
                fontWeight: "bold",
                fontSize: "inherit",
                textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
              }}
            >
              {t("Hero.title1")}
            </Typography>{" "}
            {t("Hero.title2")}
            <br />
            {t("Hero.title3")}
          </Typography>

          <Typography
            variant={isMobile ? "body1" : "h5"}
            sx={{
              maxWidth: "md",
              mb: 5,
              color: "white",
              px: { xs: 2, sm: 4 },
              fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
              textShadow: "1px 1px 2px rgba(0,0,0,0.4)",
            }}
          >
            {t("Hero.subtitle")}
          </Typography>

          {/* New streamlined action buttons */}
          <Paper
            elevation={5}
            sx={{
              maxWidth: "sm",
              width: "100%",
              borderRadius: 2,
              overflow: "hidden",
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(8px)",
              py: 1,
              px: { xs: 2, sm: 3 },
              mb: 2,
            }}
          >
            <Grid container spacing={2} sx={{ py: 2 }}>
              {/* Primary CTA - Get a Quote */}
              <Grid item xs={12}>
                <GetQuoteButton
                  size="large"
                  fullWidth
                  startIcon={<RequestQuoteIcon />}
                  sx={{
                    py: 1.5,
                    fontSize: { xs: "0.95rem", sm: "1.1rem" },
                    borderRadius: 2,
                    boxShadow: "0 4px 10px rgba(255,51,51,0.25)",
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 6px 15px rgba(255,51,51,0.3)",
                    },
                  }}
                />
              </Grid>

              {/* Secondary actions - Contact methods */}
              <Grid item xs={12}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                  sx={{ mb: 1, fontWeight: 500 }}
                >
                  {locale === "en"
                    ? "or contact us directly:"
                    : "o contáctenos directamente:"}
                </Typography>

                <Stack direction="row" spacing={2} justifyContent="center">
                  <Button
                    variant="outlined"
                    startIcon={<PhoneIcon />}
                    href={`tel:${config.contact.phone}`}
                    sx={{
                      borderColor: "#ff3333",
                      color: "#ff3333",
                      minWidth: 0,
                      borderRadius: 8,
                      ...(isMobile && {
                        justifyContent: "center",
                        "& .MuiButton-startIcon": {
                          margin: 0,
                        },
                      }),
                      "&:hover": {
                        borderColor: "#e62e2e",
                        bgcolor: "rgba(255,51,51,0.05)",
                      },
                    }}
                  >
                    {!isMobile && t("Hero.callButton")}
                  </Button>

                  <Button
                    variant="outlined"
                    startIcon={<WhatsAppIcon />}
                    href={`whatsapp://send?phone=${whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      borderColor: "#25D366",
                      color: "#25D366",
                      minWidth: 0,
                      borderRadius: 8,
                      ...(isMobile && {
                        justifyContent: "center",
                        "& .MuiButton-startIcon": {
                          margin: 0,
                        },
                      }),
                      "&:hover": {
                        borderColor: "#25D366",
                        bgcolor: "rgba(37,211,102,0.05)",
                      },
                    }}
                  >
                    {!isMobile && t("Hero.whatsappButton")}
                  </Button>

                  <Button
                    variant="outlined"
                    startIcon={<EmailIcon />}
                    href={`mailto:${config.contact.email}`}
                    sx={{
                      borderColor: "#ff3333",
                      color: "#ff3333",
                      minWidth: 0,
                      borderRadius: 8,
                      ...(isMobile && {
                        justifyContent: "center",
                        "& .MuiButton-startIcon": {
                          margin: 0,
                        },
                      }),
                      "&:hover": {
                        borderColor: "#e62e2e",
                        bgcolor: "rgba(255,51,51,0.05)",
                      },
                    }}
                  >
                    {!isMobile && t("Hero.emailButton")}
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}
