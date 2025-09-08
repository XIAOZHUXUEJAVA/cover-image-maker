import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cover Maker",
  description:
    "专业的封面图片制作工具，轻松创建精美的社交媒体封面、文档封面和海报",
  keywords: ["封面制作", "图片设计", "社交媒体", "海报设计", "Cover Maker"],
  authors: [{ name: "Cover Maker Team" }],
  creator: "Cover Maker",
  publisher: "Cover Maker",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", type: "image/svg+xml", sizes: "64x64" },
    ],
    shortcut: "/favicon.svg",
    apple: "/icon.svg",
  },
  manifest: "/manifest.json",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://cover-maker.app",
    title: "Cover Maker - 专业封面制作工具",
    description:
      "专业的封面图片制作工具，轻松创建精美的社交媒体封面、文档封面和海报",
    siteName: "Cover Maker",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cover Maker - 专业封面制作工具",
    description:
      "专业的封面图片制作工具，轻松创建精美的社交媒体封面、文档封面和海报",
    creator: "@covermaker",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          {children}
          <Toaster position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
