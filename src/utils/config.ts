/**
 * Configuration utility to access environment variables
 * Using this approach ensures:
 * 1. Type safety
 * 2. Default values
 * 3. Centralized access
 */

export const config = {
  contact: {
    phone: process.env.NEXT_PUBLIC_COMPANY_PHONE || "(123) 456-7890",
    email: process.env.NEXT_PUBLIC_COMPANY_EMAIL || "contact@danysdrywallandpainting.com",
    address: process.env.NEXT_PUBLIC_COMPANY_ADDRESS || "123 Main Street, City, State 12345",
  },
  social: {
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://facebook.com",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com",
    youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL || "https://youtube.com",
  },
  company: {
    name: process.env.NEXT_PUBLIC_COMPANY_NAME || "Dany's Drywall and Painting",
  },
}; 