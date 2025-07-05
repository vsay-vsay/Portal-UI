import type React from "react";
import "@/app/globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/context/auth-context";
import ReduxProvider from "./reduxProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  template: "%s | Enterprise ERP System",
  default: "Enterprise ERP System", // a default is required when creating a template
  description: "A modern ERP system with multiple themes",
  generator: "Next.js",
  applicationName: "Enterprise ERP System",
  authors: [
    {
      name: "Your Name",
      url: "https://yourwebsite.com",
    },
  ],
  keywords: [
    "ERP",
    "Enterprise Resource Planning",
    "Business Management",
    "Software",
    "Next.js",
    "React",
    "Tailwind CSS",
    "Theme Provider",
  ],
  openGraph: {
    title: "Enterprise ERP System",
    description: "A modern ERP system with multiple themes",
    url: "https://yourwebsite.com",
    siteName: "Enterprise ERP System",
    images: [
      {
        url: "https://yourwebsite.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Enterprise ERP System",
      },
    ],
    type: "website",
    twitter: {
      card: "summary_large_image",
      title: "Enterprise ERP System",
      description: "A modern ERP system with multiple themes",
      creator: "@yourtwitterhandle",
      images: [
        {
          url: "https://yourwebsite.com/og-image.png",
          width: 1200,
          height: 630,
          alt: "Enterprise ERP System",
        },
      ],
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
    themeColor: [
      { media: "(prefers-color-scheme: light)", color: "#ffffff" },
      { media: "(prefers-color-scheme: dark)", color: "#000000" },
      { media: "(prefers-color-scheme: blue)", color: "#0070f3" },
      { media: "(prefers-color-scheme: green)", color: "#00a400" },
      { media: "(prefers-color-scheme: purple)", color: "#800080" },
    ],
    manifest: "/site.webmanifest",
    appleWebApp: {
      capable: true,
      title: "Enterprise ERP System",
      statusBarStyle: "default",
      startupImage: [
        "/apple-touch-startup-image-640x1136.png",
        "/apple-touch-startup-image-750x1334.png",
        "/apple-touch-startup-image-1242x2208.png",
        "/apple-touch-startup-image-1125x2436.png",
        "/apple-touch-startup-image-828x1792.png",
        "/apple-touch-startup-image-1242x2688.png",
      ],
    },
    viewport:
      "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
    robots: {
      index: true,
      follow: true,
      noarchive: true,
      nosnippet: false,
      noimageindex: false,
      nocache: false,
    },
    alternates: {
      canonical: "https://yourwebsite.com",
      languages: {
        "en-US": "https://yourwebsite.com/en-US",
        "es-ES": "https://yourwebsite.com/es-ES",
        "fr-FR": "https://yourwebsite.com/fr-FR",
      },
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <ReduxProvider>{children}</ReduxProvider>
          </AuthProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
