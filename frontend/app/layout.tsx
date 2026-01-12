import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/AuthProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

// [UPDATED] Generate Metadata dengan Support favicon.png
export async function generateMetadata(): Promise<Metadata> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    
    // Fetch data (no-store agar selalu fresh)
    const res = await fetch(`${baseUrl}/api/content`, { cache: 'no-store' });
    
    // [UBAH DISINI] Default fallback diganti ke favicon.png
    const defaultMeta = {
      title: "LMS PMI - Learning Management System",
      description: "Platform Pelatihan Online Palang Merah Indonesia",
      icons: { icon: "/favicon.png" } // <--- Default ke PNG
    };

    if (!res.ok) return defaultMeta;

    const data = await res.json();

    // Logic URL Favicon
    let faviconUrl = "/favicon.png"; // <--- Default ke PNG
    
    if (data.faviconUrl) {
      if (data.faviconUrl.startsWith('http')) {
        faviconUrl = data.faviconUrl;
      } else {
        const cleanPath = data.faviconUrl.startsWith('/') ? data.faviconUrl.substring(1) : data.faviconUrl;
        faviconUrl = `${baseUrl}/${cleanPath}?v=${new Date().getTime()}`;
      }
    }

    return {
      title: data.heroTitle || defaultMeta.title,
      description: data.heroDescription || defaultMeta.description,
      icons: {
        icon: faviconUrl,
        shortcut: faviconUrl,
        apple: faviconUrl,
      }
    };

  } catch (error) {
    console.error("Gagal load metadata:", error);
    return {
      title: "LMS PMI - Learning Management System",
      description: "Platform Pelatihan Online Palang Merah Indonesia",
      icons: { icon: "/favicon.png" } // <--- Default ke PNG
    };
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
export const dynamic = 'force-dynamic';
