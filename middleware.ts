import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./i18n/config";

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "as-needed", // Don't show /en for default locale
});

export const config = {
  // Match all pathnames except for
  // - API routes
  // - Static files (images, etc.)
  // - _next internal paths
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
