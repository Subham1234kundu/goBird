import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/NavbarWrapper";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Grobird - Transforming Ideas into Scalable Digital Solutions",
  description: "Grobird accelerates innovation through IT consulting, software development, and cloud solutions. We build technology that builds businesses.",
  icons: {
    icon: [
      { url: '/Images/logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/Images/logo.png', sizes: '16x16', type: 'image/png' }
    ],
    shortcut: '/Images/logo.png',
    apple: '/Images/logo.png',
  },
  openGraph: {
    title: "Grobird - Transforming Ideas into Scalable Digital Solutions",
    description: "Grobird accelerates innovation through IT consulting, software development, and cloud solutions.",
    images: ['/Images/logo.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Grobird - Transforming Ideas into Scalable Digital Solutions",
    description: "Grobird accelerates innovation through IT consulting, software development, and cloud solutions.",
    images: ['/Images/logo.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} light`} style={{ fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, sans-serif' }}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
        <link rel="icon" href="/Images/logo.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/Images/logo.png" type="image/png" sizes="16x16" />
        <link rel="shortcut icon" href="/Images/logo.png" type="image/png" />
        <meta property="og:image" content="/Images/logo.png" />
        <meta name="twitter:image" content="/Images/logo.png" />
      </head>
      <body
        className={`${montserrat.variable} antialiased`}
        suppressHydrationWarning
        style={{ fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, sans-serif' }}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
