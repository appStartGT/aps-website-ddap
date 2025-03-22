"use client";

import { Button, ButtonProps } from "@mui/material";
import { useContactModal } from "../src/contexts/ContactModalContext";
import { useLanguage } from "../src/contexts/LanguageContext";

interface GetQuoteButtonProps extends Omit<ButtonProps, "onClick"> {
  variant?: "text" | "outlined" | "contained";
  size?: "small" | "medium" | "large";
  customColor?: string;
}

export default function GetQuoteButton({
  variant = "contained",
  size = "medium",
  customColor,
  sx,
  ...props
}: GetQuoteButtonProps) {
  const { openModal } = useContactModal();
  const { t } = useLanguage();

  return (
    <Button
      variant={variant}
      size={size}
      onClick={openModal}
      sx={{
        bgcolor: customColor || "#ff0000",
        "&:hover": {
          bgcolor: customColor ? undefined : "#cc0000",
        },
        ...sx,
      }}
      {...props}
    >
      {t("Common.getAQuote")}
    </Button>
  );
}
