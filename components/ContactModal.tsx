"use client";

import {
  Modal,
  Box,
  Paper,
  IconButton,
  Typography,
  Grid,
  TextField,
  Button,
  useTheme,
  useMediaQuery,
  Snackbar,
  Alert,
  Divider,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PhoneIcon from "@mui/icons-material/Phone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import { useContactModal } from "../src/contexts/ContactModalContext";
import { useLanguage } from "../src/contexts/LanguageContext";
import { useState, useEffect } from "react";
import { config } from "../src/utils/config";
import { useFirebase } from "../src/hooks/useFirebase";
import { useAnalyticsContext } from "../src/contexts/AnalyticsContext";
import { AnalyticsEvents } from "../src/hooks/useAnalytics";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

export default function ContactModal() {
  const { isOpen, closeModal } = useContactModal();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { t, locale } = useLanguage();
  const firebase = useFirebase();
  const analytics = useAnalyticsContext();

  // Format phone number for WhatsApp URL (remove any non-numeric characters)
  const whatsappNumber = config.contact.phone.replace(/\D/g, "");

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user types
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    let isValid = true;

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
      isValid = false;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      // Track form validation errors
      analytics.trackEvent(AnalyticsEvents.CONTACT_FORM_ERROR, {
        errors: Object.keys(errors),
        language: locale
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Use the firebase hook to add the contact request
      const result = await firebase.addContactRequest(formData);
      
      if (result.success) {
        // Track successful form submission
        analytics.trackEvent(AnalyticsEvents.CONTACT_FORM_SUBMIT, {
          hasPhone: Boolean(formData.phone),
          language: locale,
          formSource: 'modal'
        });

        setSnackbar({
          open: true,
          message: "Your message has been sent successfully!",
          severity: "success",
        });

        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
        });

        // Close modal after a delay
        setTimeout(() => {
          closeModal();
        }, 2000);
      } else {
        throw result.error;
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      
      // Track form submission error
      analytics.trackEvent(AnalyticsEvents.CONTACT_FORM_ERROR, {
        error: error instanceof Error ? error.message : 'Unknown error',
        language: locale
      });
      
      setSnackbar({
        open: true,
        message: "There was an error sending your message. Please try again.",
        severity: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }));
  };

  // Track contact button clicks
  const handleContactClick = (method: string) => {
    switch(method) {
      case 'phone':
        analytics.trackEvent(AnalyticsEvents.CONTACT_PHONE_CALL, {
          source: 'contact_modal',
          language: locale
        });
        break;
      case 'whatsapp':
        analytics.trackEvent(AnalyticsEvents.CONTACT_WHATSAPP_CLICK, {
          source: 'contact_modal', 
          language: locale
        });
        break;
      case 'email':
        analytics.trackEvent(AnalyticsEvents.CONTACT_EMAIL_CLICK, {
          source: 'contact_modal',
          language: locale
        });
        break;
    }
  };

  // Track modal open/close
  useEffect(() => {
    if (isOpen) {
      analytics.trackEvent('contact_modal_open', {
        language: locale
      });
    }
  }, [isOpen, analytics, locale]);

  return (
    <>
      <Modal
        open={isOpen}
        onClose={closeModal}
        aria-labelledby="contact-modal"
        aria-describedby="contact-form-modal"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Paper
          elevation={5}
          sx={{
            position: "relative",
            width: "100%",
            maxWidth: 600,
            maxHeight: "90vh",
            overflow: "auto",
            p: { xs: 3, md: 4 },
            borderRadius: 2,
          }}
        >
          <IconButton
            aria-label="close"
            onClick={closeModal}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>

          <Box sx={{ mb: 4, mt: 1 }}>
            <Typography
              variant="h5"
              component="h2"
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                fontSize: { xs: "1.5rem", md: "1.8rem" },
              }}
            >
              {t("Contact.getAQuote")}
            </Typography>
          </Box>

          {/* Contact Buttons */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="body1"
              sx={{
                textAlign: "center",
                mb: 2,
              }}
            >
              {t("Contact.schedule")}
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              justifyContent="center"
              sx={{ mb: 3 }}
            >
              <Button
                variant="outlined"
                startIcon={<PhoneIcon />}
                href={`tel:${config.contact.phone}`}
                onClick={() => handleContactClick('phone')}
                sx={{
                  borderColor: theme.palette.primary.main,
                  color: theme.palette.primary.main,
                  "&:hover": {
                    backgroundColor: "rgba(255, 0, 0, 0.04)",
                  },
                }}
              >
                {t("Hero.callButton")}
              </Button>

              <Button
                variant="outlined"
                startIcon={<WhatsAppIcon />}
                href={`whatsapp://send?phone=${whatsappNumber}`}
                onClick={() => handleContactClick('whatsapp')}
                sx={{
                  borderColor: "#25D366",
                  color: "#25D366",
                  "&:hover": {
                    backgroundColor: "rgba(37, 211, 102, 0.04)",
                  },
                }}
              >
                {t("Hero.whatsappButton")}
              </Button>

              <Button
                variant="outlined"
                startIcon={<EmailIcon />}
                href={`mailto:${config.contact.email}`}
                onClick={() => handleContactClick('email')}
                sx={{
                  borderColor: theme.palette.primary.main,
                  color: theme.palette.primary.main,
                  "&:hover": {
                    backgroundColor: "rgba(255, 0, 0, 0.04)",
                  },
                }}
              >
                {t("Hero.emailButton")}
              </Button>
            </Stack>

            <Divider sx={{ my: 2 }}>
              <Typography variant="body2" color="text.secondary">
                {t("Common.or")}
              </Typography>
            </Divider>
          </Box>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label={t("Contact.form.firstName")}
                  variant="outlined"
                  required
                  size={isMobile ? "small" : "medium"}
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                  disabled={isSubmitting}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label={t("Contact.form.lastName")}
                  variant="outlined"
                  required
                  size={isMobile ? "small" : "medium"}
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                  disabled={isSubmitting}
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
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  disabled={isSubmitting}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={t("Contact.form.phone")}
                  variant="outlined"
                  size={isMobile ? "small" : "medium"}
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
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
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  error={!!errors.message}
                  helperText={errors.message}
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : t("Contact.form.send")}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Modal>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
