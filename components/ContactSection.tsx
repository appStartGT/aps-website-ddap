"use client";

import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { config } from "../src/utils/config";
import { useLanguage } from "../src/contexts/LanguageContext";

export default function ContactSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { t } = useLanguage();

  return (
    <Box id="contact-section" sx={{ py: { xs: 6, md: 8 } }}>
      <Container maxWidth="lg">
        <Typography
          variant={isMobile ? "h4" : "h3"}
          component="h2"
          align="center"
          sx={{
            mb: { xs: 4, md: 6 },
            fontWeight: "bold",
            fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem" },
          }}
        >
          {t("Contact.title")}
        </Typography>

        <Grid container spacing={{ xs: 3, md: 4 }}>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                p: { xs: 3, md: 4 },
                height: "100%",
                borderRadius: 2,
              }}
            >
              <Typography
                variant="h5"
                component="h3"
                sx={{
                  mb: { xs: 2, md: 3 },
                  fontWeight: "bold",
                  fontSize: { xs: "1.4rem", md: "1.5rem" },
                }}
              >
                {t("Contact.getInTouch")}
              </Typography>

              <Stack spacing={{ xs: 2, md: 3 }} sx={{ mb: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <PhoneIcon sx={{ mr: 2, color: "primary.main" }} />
                  <Typography
                    variant="body1"
                    sx={{ fontSize: { xs: "0.95rem", md: "1rem" } }}
                  >
                    {config.contact.phone}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <EmailIcon sx={{ mr: 2, color: "primary.main" }} />
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: { xs: "0.95rem", md: "1rem" },
                      wordBreak: "break-word",
                    }}
                  >
                    {config.contact.email}
                  </Typography>
                </Box>
{/* 
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <LocationOnIcon sx={{ mr: 2, color: "primary.main" }} />
                  <Typography
                    variant="body1"
                    sx={{ fontSize: { xs: "0.95rem", md: "1rem" } }}
                  >
                    {config.contact.address}
                  </Typography>
                </Box> */}
              </Stack>

              <Typography
                variant="body1"
                sx={{
                  mb: 2,
                  fontSize: { xs: "0.95rem", md: "1rem" },
                }}
              >
                {t("Contact.schedule")}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                p: { xs: 3, md: 4 },
                height: "100%",
                borderRadius: 2,
              }}
            >
              <Typography
                variant="h5"
                component="h3"
                sx={{
                  mb: { xs: 2, md: 3 },
                  fontWeight: "bold",
                  fontSize: { xs: "1.4rem", md: "1.5rem" },
                }}
              >
                {t("Contact.sendMessage")}
              </Typography>

              <form>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label={t("Contact.form.firstName")}
                      variant="outlined"
                      required
                      size={isMobile ? "small" : "medium"}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label={t("Contact.form.lastName")}
                      variant="outlined"
                      required
                      size={isMobile ? "small" : "medium"}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label={t("Contact.form.email")}
                      variant="outlined"
                      type="email"
                      required
                      size={isMobile ? "small" : "medium"}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label={t("Contact.form.phone")}
                      variant="outlined"
                      size={isMobile ? "small" : "medium"}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label={t("Contact.form.message")}
                      variant="outlined"
                      multiline
                      rows={isMobile ? 3 : 4}
                      required
                      size={isMobile ? "small" : "medium"}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      size={isMobile ? "medium" : "large"}
                      sx={{
                        bgcolor: "#ff0000",
                        "&:hover": {
                          bgcolor: "#cc0000",
                        },
                        py: { xs: 1, md: 1.5 },
                        mt: { xs: 1, md: 2 },
                      }}
                    >
                      {t("Contact.form.send")}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
