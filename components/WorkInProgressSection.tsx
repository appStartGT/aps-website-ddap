"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Box,
  Container,
  Typography,
  useTheme,
  useMediaQuery,
  IconButton,
  Stack,
  Modal,
  Fade,
  Backdrop,
} from "@mui/material";
import Image from "next/image";
import { useLanguage } from "../src/contexts/LanguageContext";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";

export default function WorkInProgressSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const { t } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);
  const touchStartX = useRef(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  // State for preview modal
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);

  // Real gallery items with actual images
  const galleryItems = [
    {
      id: 1,
      src: "/img/webp/behind_scene/scene1.webp",
      alt: t("WorkInProgress.scene1Alt"),
    },
    {
      id: 2,
      src: "/img/webp/behind_scene/scene2.webp",
      alt: t("WorkInProgress.scene2Alt"),
    },
    {
      id: 3,
      src: "/img/webp/behind_scene/scene3.webp",
      alt: t("WorkInProgress.scene3Alt"),
    },
    {
      id: 4,
      src: "/img/webp/behind_scene/scene4.webp",
      alt: t("WorkInProgress.scene4Alt"),
    },
    {
      id: 5,
      src: "/img/webp/behind_scene/scene5.webp",
      alt: t("WorkInProgress.scene5Alt"),
    },
    {
      id: 6,
      src: "/img/webp/behind_scene/scene6.webp",
      alt: t("WorkInProgress.scene6Alt"),
    },
  ];

  const maxSteps = galleryItems.length;

  const handleNext = useCallback(() => {
    setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps);
  }, [maxSteps]);

  const handleBack = useCallback(() => {
    setActiveStep(
      (prevActiveStep) => (prevActiveStep - 1 + maxSteps) % maxSteps
    );
  }, [maxSteps]);

  // Preview handlers
  const openPreview = (item: { src: string; alt: string }) => {
    setPreviewImage(item);
    setPreviewOpen(true);
  };

  const closePreview = () => {
    setPreviewOpen(false);
  };

  // Handle preview navigation
  const handlePreviewNext = () => {
    if (!previewImage) return;

    const currentIndex = galleryItems.findIndex(
      (item) => item.src === previewImage.src
    );
    const nextIndex = (currentIndex + 1) % maxSteps;
    setPreviewImage(galleryItems[nextIndex]);
  };

  const handlePreviewBack = () => {
    if (!previewImage) return;

    const currentIndex = galleryItems.findIndex(
      (item) => item.src === previewImage.src
    );
    const prevIndex = (currentIndex - 1 + maxSteps) % maxSteps;
    setPreviewImage(galleryItems[prevIndex]);
  };

  // Update the active slide and scroll to it
  useEffect(() => {
    if (sliderRef.current) {
      const scrollPosition = activeStep * sliderRef.current.offsetWidth;
      sliderRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  }, [activeStep]);

  // Auto rotate the slides every 3 seconds (changed from 5 to 3)
  useEffect(() => {
    const timer = setInterval(() => {
      if (!previewOpen) {
        // Only auto-advance if preview is closed
        handleNext();
      }
    }, 3000);

    return () => {
      clearInterval(timer);
    };
  }, [previewOpen, handleNext]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    // If the swipe is significant enough (more than 50px)
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swiped left
        handleNext();
      } else {
        // Swiped right
        handleBack();
      }
    }
  };

  // Calculate visible slides based on screen size
  const getVisibleSlides = () => {
    if (isMobile) return 1;
    if (isTablet) return 2;
    return 3;
  };

  // Get image height based on screen size
  const getImageHeight = () => {
    if (isMobile) return 300;
    if (isTablet) return 280;
    return 350;
  };

  // Calculate number of pages for desktop/tablet view
  const calculatePageCount = () => {
    const visibleSlides = getVisibleSlides();
    return Math.ceil(galleryItems.length / visibleSlides);
  };

  // Get current page based on active step and visible slides
  const getCurrentPage = () => {
    const visibleSlides = getVisibleSlides();
    return Math.floor(activeStep / visibleSlides);
  };

  // Navigate to a specific page
  const goToPage = (pageIndex: number) => {
    const visibleSlides = getVisibleSlides();
    const newStep = pageIndex * visibleSlides;
    setActiveStep(Math.min(newStep, galleryItems.length - 1));
  };

  // Navigate to next page
  const nextPage = () => {
    const pageCount = calculatePageCount();
    const currentPage = getCurrentPage();
    const nextPageIndex = (currentPage + 1) % pageCount;
    goToPage(nextPageIndex);
  };

  // Navigate to previous page
  const prevPage = () => {
    const pageCount = calculatePageCount();
    const currentPage = getCurrentPage();
    const prevPageIndex = (currentPage - 1 + pageCount) % pageCount;
    goToPage(prevPageIndex);
  };

  // Override handleNext/handleBack for desktop/tablet to use page navigation
  const handleSlideNavigation = (direction: "next" | "prev") => {
    if (!isMobile) {
      // Desktop/tablet: page-based navigation
      if (direction === "next") {
        nextPage();
      } else {
        prevPage();
      }
    } else {
      // Mobile: single image navigation (unchanged)
      if (direction === "next") {
        handleNext();
      } else {
        handleBack();
      }
    }
  };

  const renderSlider = () => (
    <Box sx={{ position: "relative", width: "100%" }}>
      <Box
        ref={sliderRef}
        sx={{
          display: "flex",
          overflowX: "hidden",
          scrollBehavior: "smooth",
          borderRadius: 2,
          boxShadow: 3,
          position: "relative",
          height: getImageHeight(),
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {galleryItems.map((item) => (
          <Box
            key={item.id}
            sx={{
              flex: `0 0 ${100 / getVisibleSlides()}%`,
              position: "relative",
              height: "100%",
              transition: "transform 0.3s ease",
              cursor: "pointer",
            }}
            onClick={() => openPreview(item)}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                p: 1,
                zIndex: 2,
                color: "white",
                bgcolor: "rgba(0, 0, 0, 0.5)",
                borderRadius: "0 0 0 8px",
              }}
            >
              <ZoomOutMapIcon fontSize="small" />
            </Box>

            <Image
              src={item.src}
              alt={item.alt}
              fill
              style={{ objectFit: "cover" }}
              sizes={`${100 / getVisibleSlides()}vw`}
              priority={item.id === 1}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                bgcolor: "rgba(0, 0, 0, 0.6)",
                color: "white",
                p: 1,
              }}
            >
              <Typography variant="body2">{item.alt}</Typography>
            </Box>
          </Box>
        ))}
      </Box>

      <IconButton
        onClick={() => handleSlideNavigation("prev")}
        sx={{
          position: "absolute",
          left: 8,
          top: "50%",
          transform: "translateY(-50%)",
          bgcolor: "rgba(255, 255, 255, 0.8)",
          "&:hover": { bgcolor: "rgba(255, 255, 255, 0.9)" },
          zIndex: 10,
        }}
      >
        <ArrowBackIosNewIcon />
      </IconButton>
      <IconButton
        onClick={() => handleSlideNavigation("next")}
        sx={{
          position: "absolute",
          right: 8,
          top: "50%",
          transform: "translateY(-50%)",
          bgcolor: "rgba(255, 255, 255, 0.8)",
          "&:hover": { bgcolor: "rgba(255, 255, 255, 0.9)" },
          zIndex: 10,
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>

      {isMobile ? (
        // Mobile: One dot per image
        <Stack
          direction="row"
          spacing={1}
          justifyContent="center"
          sx={{ mt: 2 }}
        >
          {galleryItems.map((_, index) => (
            <Box
              key={index}
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                bgcolor: index === activeStep ? "primary.main" : "grey.400",
                mx: 0.5,
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
              onClick={() => setActiveStep(index)}
            />
          ))}
        </Stack>
      ) : (
        // Desktop/Tablet: Two larger dots for pagination
        <Stack
          direction="row"
          spacing={1}
          justifyContent="center"
          sx={{ mt: 2 }}
        >
          <Box
            sx={{
              width: 16,
              height: 16,
              borderRadius: "50%",
              bgcolor: getCurrentPage() === 0 ? "primary.main" : "grey.400",
              mx: 0.5,
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onClick={() => goToPage(0)}
          />
          {calculatePageCount() > 1 && (
            <Box
              sx={{
                width: 16,
                height: 16,
                borderRadius: "50%",
                bgcolor: getCurrentPage() === 1 ? "primary.main" : "grey.400",
                mx: 0.5,
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
              onClick={() => goToPage(1)}
            />
          )}
        </Stack>
      )}
    </Box>
  );

  const renderPreviewModal = () => (
    <Modal
      open={previewOpen}
      onClose={closePreview}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={previewOpen}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "95%", sm: "90%", md: "80%" },
            maxHeight: "90vh",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 1,
            outline: "none",
            borderRadius: 2,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
            <IconButton onClick={closePreview} size="small">
              <CloseIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: { xs: "50vh", sm: "60vh", md: "70vh" },
              overflow: "hidden",
            }}
          >
            {previewImage && (
              <Image
                src={previewImage.src}
                alt={previewImage.alt}
                fill
                style={{ objectFit: "contain" }}
                sizes="(max-width: 600px) 95vw, (max-width: 960px) 90vw, 80vw"
                priority
              />
            )}

            <IconButton
              onClick={handlePreviewBack}
              sx={{
                position: "absolute",
                left: 16,
                top: "50%",
                transform: "translateY(-50%)",
                bgcolor: "rgba(255, 255, 255, 0.8)",
                "&:hover": { bgcolor: "rgba(255, 255, 255, 0.9)" },
              }}
            >
              <ArrowBackIosNewIcon />
            </IconButton>

            <IconButton
              onClick={handlePreviewNext}
              sx={{
                position: "absolute",
                right: 16,
                top: "50%",
                transform: "translateY(-50%)",
                bgcolor: "rgba(255, 255, 255, 0.8)",
                "&:hover": { bgcolor: "rgba(255, 255, 255, 0.9)" },
              }}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>

          {previewImage && (
            <Typography
              variant="body1"
              sx={{ mt: 2, px: 2, pb: 1, textAlign: "center" }}
            >
              {previewImage.alt}
            </Typography>
          )}
        </Box>
      </Fade>
    </Modal>
  );

  return (
    <Box id="work-in-progress-section" sx={{ py: { xs: 6, md: 8 } }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          component="h2"
          align="center"
          sx={{ mb: { xs: 1, md: 2 }, fontWeight: "bold" }}
        >
          {t("BehindTheScenes.subtitle") || "Craftsmanship"}
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
          {t("BehindTheScenes.title") || "Behind The Scenes"}
        </Typography>

        <Typography
          variant="body1"
          align="center"
          sx={{ mb: 5, maxWidth: 800, mx: "auto" }}
        >
          {t("BehindTheScenes.description") ||
            "Get a glimpse into our craftsmen at work. Our skilled team brings years of experience and dedication to every project, ensuring quality results from start to finish."}
        </Typography>

        {renderSlider()}
        {renderPreviewModal()}
      </Container>
    </Box>
  );
}
