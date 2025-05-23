"use client";
import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Modal,
  IconButton,
  Grid,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";
import { useLanguage } from "../src/contexts/LanguageContext";
import Image from "next/image";

// Define gallery items - replace with actual project photos
const galleryItems = [
  {
    id: 1,
    src: "/img/webp/gallery/placeholder1.webp",
    thumbnail: "/img/webp/gallery/placeholder1.webp",
    title: "Residential Painting",
    description: "Interior painting for a modern home",
  },
  {
    id: 2,
    src: "/img/webp/gallery/placeholder2.webp",
    thumbnail: "/img/webp/gallery/placeholder2.webp",
    title: "Commercial Drywall",
    description: "Drywall installation for an office space",
  },
  {
    id: 3,
    src: "/img/webp/gallery/placeholder3.webp",
    thumbnail: "/img/webp/gallery/placeholder3.webp",
    title: "Residential Renovation",
    description: "Complete drywall and painting renovation",
  },
  {
    id: 4,
    src: "/img/webp/gallery/placeholder4.webp",
    thumbnail: "/img/webp/gallery/placeholder4.webp",
    title: "Kitchen Remodel",
    description: "Drywall and painting for a kitchen remodel",
  },
  {
    id: 5,
    src: "/img/webp/gallery/placeholder5.webp",
    thumbnail: "/img/webp/gallery/placeholder5.webp",
    title: "Office Space",
    description: "Commercial painting project",
  },
  {
    id: 6,
    src: "/img/webp/gallery/placeholder6.webp",
    thumbnail: "/img/webp/gallery/placeholder6.webp",
    title: "Ceiling Repair",
    description: "Drywall repair and painting for damaged ceiling",
  },
];

export default function GallerySection() {
  const [open, setOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const { t } = useLanguage();

  const handleOpen = (index: number) => {
    setCurrentImage(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePrevious = () => {
    setCurrentImage((prev) =>
      prev === 0 ? galleryItems.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentImage((prev) =>
      prev === galleryItems.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <Box
      id="gallery-section"
      sx={{
        py: 8,
        bgcolor: "#f5f5f5",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h2"
          align="center"
          sx={{ mb: 2, fontWeight: "bold" }}
        >
          {t("Gallery.title")}
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          sx={{ mb: 6, maxWidth: "800px", mx: "auto" }}
        >
          {t("Gallery.subtitle")}
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {galleryItems.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Box
                sx={{
                  position: "relative",
                  height: 250,
                  cursor: "pointer",
                  borderRadius: 2,
                  overflow: "hidden",
                  boxShadow: 3,
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.03)",
                  },
                }}
                onClick={() => handleOpen(index)}
              >
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    p: 2,
                    bgcolor: "rgba(0,0,0,0.7)",
                    color: "white",
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2">{item.description}</Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Modal for larger image view */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="gallery-modal"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: { xs: "90%", sm: "80%", md: "70%" },
              height: { xs: "60%", sm: "70%", md: "80%" },
              maxWidth: 1000,
              maxHeight: 800,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 1,
              outline: "none",
              borderRadius: 2,
            }}
          >
            <IconButton
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                bgcolor: "rgba(0,0,0,0.5)",
                color: "white",
                zIndex: 1,
                "&:hover": {
                  bgcolor: "rgba(0,0,0,0.7)",
                },
              }}
            >
              <CloseIcon />
            </IconButton>

            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "black",
                borderRadius: 1,
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  src={galleryItems[currentImage].src}
                  alt={galleryItems[currentImage].title}
                  fill
                  style={{ objectFit: "contain" }}
                />
              </Box>

              <IconButton
                onClick={handlePrevious}
                sx={{
                  position: "absolute",
                  left: { xs: 8, md: 16 },
                  bgcolor: "rgba(0,0,0,0.5)",
                  color: "white",
                  "&:hover": {
                    bgcolor: "rgba(0,0,0,0.7)",
                  },
                  zIndex: 1,
                }}
              >
                <ArrowBackIosNewIcon />
              </IconButton>

              <IconButton
                onClick={handleNext}
                sx={{
                  position: "absolute",
                  right: { xs: 8, md: 16 },
                  bgcolor: "rgba(0,0,0,0.5)",
                  color: "white",
                  "&:hover": {
                    bgcolor: "rgba(0,0,0,0.7)",
                  },
                  zIndex: 1,
                }}
              >
                <ArrowForwardIosIcon />
              </IconButton>

              <Box
                sx={{
                  position: "absolute",
                  bottom: 16,
                  left: 0,
                  right: 0,
                  textAlign: "center",
                  zIndex: 1,
                  bgcolor: "rgba(0,0,0,0.5)",
                  py: 1,
                }}
              >
                <Typography
                  variant="subtitle1"
                  color="white"
                  sx={{ fontWeight: "bold" }}
                >
                  {galleryItems[currentImage].title}
                </Typography>
                <Typography variant="body2" color="white">
                  {galleryItems[currentImage].description}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Modal>
      </Container>
    </Box>
  );
}
