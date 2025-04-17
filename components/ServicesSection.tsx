"use client";

import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useLanguage } from "../src/contexts/LanguageContext";
import GetQuoteButton from "./GetQuoteButton";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import Image from "next/image";

export default function ServicesSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { t } = useLanguage();

  const services = [
    {
      key: "service1",
      image: "/img/webp/services/drywall.webp", // You'll need to add actual images
    },
    {
      key: "service2",
      image: "/img/webp/services/painting.webp", // You'll need to add actual images
    },
    {
      key: "service3",
      image: "/img/webp/services/repair.webp", // You'll need to add actual images
    },
  ];

  return (
    <Box id="services-section" sx={{ py: { xs: 6, md: 8 } }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          component="h2"
          align="center"
          sx={{ mb: { xs: 1, md: 2 }, fontWeight: "bold" }}
        >
          {t("Services.title1")}
        </Typography>
        <Typography
          variant={isMobile ? "h4" : "h3"}
          component="h2"
          align="center"
          sx={{
            mb: { xs: 4, md: 6 },
            fontWeight: "bold",
            color: "primary.main",
            fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem" },
          }}
        >
          {t("Services.title2")}
        </Typography>

        <Grid container spacing={{ xs: 3, md: 4 }}>
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: 3,
                  borderRadius: 2,
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: 6,
                  },
                }}
              >
                <CardMedia
                  component="div"
                  sx={{
                    height: { xs: 180, md: 200 },
                    backgroundColor: "grey.300",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    src={service.image}
                    alt={`Service ${index + 1}`}
                    width={100}
                    height={100}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </CardMedia>
                <CardContent sx={{ flexGrow: 1, p: { xs: 2, md: 3 } }}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h3"
                    sx={{
                      fontWeight: "bold",
                      fontSize: { xs: "1.3rem", md: "1.5rem" },
                      mb: 2,
                    }}
                  >
                    {t(`Services.${service.key}.title`)}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      fontSize: { xs: "0.875rem", md: "0.95rem" },
                      lineHeight: 1.6,
                    }}
                  >
                    {t(`Services.${service.key}.description`)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 6, display: "flex", justifyContent: "center" }}>
          <GetQuoteButton
            variant="contained"
            startIcon={<RequestQuoteIcon />}
            size={isMobile ? "medium" : "large"}
            sx={{
              py: 1.5,
              px: 3,
              borderRadius: 2,
              boxShadow: "0 4px 12px rgba(255, 0, 0, 0.2)",
              "&:hover": {
                boxShadow: "0 6px 15px rgba(255, 0, 0, 0.3)",
                transform: "translateY(-3px)",
              },
              transition: "all 0.3s ease",
            }}
          />
        </Box>
      </Container>
    </Box>
  );
}
