// // import type { Metadata } from "next";
// // import { Inter } from "next/font/google";
// // import "./globals.css";
// // import { AuthProvider } from "@/lib/AuthProvider";
// // import Header from "@/components/Header";
// // import Footer from "@/components/Footer";

// // const inter = Inter({ subsets: ["latin"] });

// // // [UPDATED] Generate Metadata dengan Support favicon.png
// // export async function generateMetadata(): Promise<Metadata> {
// //   try {
// //     const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    
// //     // Fetch data (no-store agar selalu fresh)
// //     const res = await fetch(`${baseUrl}/api/content`, { cache: 'no-store' });
    
// //     // [UBAH DISINI] Default fallback diganti ke favicon.png
// //     const defaultMeta = {
// //       title: "LMS PMI - Learning Management System",
// //       description: "Platform Pelatihan Online Palang Merah Indonesia",
// //       icons: { icon: "/favicon.png" } // <--- Default ke PNG
// //     };

// //     if (!res.ok) return defaultMeta;

// //     const data = await res.json();

// //     // Logic URL Favicon
// //     let faviconUrl = "/favicon.png"; // <--- Default ke PNG
    
// //     if (data.faviconUrl) {
// //       if (data.faviconUrl.startsWith('http')) {
// //         faviconUrl = data.faviconUrl;
// //       } else {
// //         const cleanPath = data.faviconUrl.startsWith('/') ? data.faviconUrl.substring(1) : data.faviconUrl;
// //         faviconUrl = `${baseUrl}/${cleanPath}?v=${new Date().getTime()}`;
// //       }
// //     }

// //     return {
// //       title: data.heroTitle || defaultMeta.title,
// //       description: data.heroDescription || defaultMeta.description,
// //       icons: {
// //         icon: faviconUrl,
// //         shortcut: faviconUrl,
// //         apple: faviconUrl,
// //       }
// //     };

// //   } catch (error) {
// //     console.error("Gagal load metadata:", error);
// //     return {
// //       title: "LMS PMI - Learning Management System",
// //       description: "Platform Pelatihan Online Palang Merah Indonesia",
// //       icons: { icon: "/favicon.png" } // <--- Default ke PNG
// //     };
// //   }
// // }

// // export default function RootLayout({
// //   children,
// // }: {
// //   children: React.ReactNode;
// // }) {
// //   return (
// //     <html lang="id">
// //       <body className={inter.className}>
// //         <AuthProvider>
// //           <div className="flex flex-col min-h-screen">
// //             <Header />
// //             <main className="flex-grow">
// //               {children}
// //             </main>
// //             <Footer />
// //           </div>
// //         </AuthProvider>
// //       </body>
// //     </html>
// //   );
// // }
// // export const dynamic = 'force-dynamic';



// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "./globals.css";
// import { AuthProvider } from "@/lib/AuthProvider";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";

// const inter = Inter({ subsets: ["latin"] });

// // [UPDATED] Generate Metadata dengan support favicon.png dan metadataBase
// export async function generateMetadata(): Promise<Metadata> {
//   // Gunakan URL backend dari ENV (wajib di-set di Vercel) atau fallback
//   const rawBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
//   const baseUrl = rawBaseUrl.replace(/\/$/, ""); // hapus trailing slash

//   // Endpoint metadata kamu
//   const endpoint = `${baseUrl}/api/content`;

//   // Default metadata (fallback)
//   const defaultMeta: Metadata = {
//     title: "LMS PMI - Learning Management System",
//     description: "Platform Pelatihan Online Palang Merah Indonesia",
//     icons: { icon: "/favicon.png" },
//     // membantu Next membuat URL absolut untuk icon / OG, canonical, dll.
//     metadataBase: (() => {
//       try {
//         return new URL(baseUrl);
//       } catch {
//         // jika baseUrl bukan origin yang valid, abaikan
//         return undefined;
//       }
//     })(),
//   };

//   try {
//     // Fetch data (no-store agar selalu fresh)
//     const res = await fetch(endpoint, { cache: "no-store" });
//     if (!res.ok) return defaultMeta;

//     const data = await res.json();

//     // Bangun URL favicon
//     let faviconUrl = "/favicon.png";
//     if (data?.faviconUrl) {
//       if (data.faviconUrl.startsWith("http")) {
//         faviconUrl = data.faviconUrl;
//       } else {
//         const cleanPath = data.faviconUrl.startsWith("/")
//           ? data.faviconUrl.substring(1)
//           : data.faviconUrl;
//         // gunakan origin API kamu (sesuai requirement)
//         faviconUrl = `${baseUrl}/${cleanPath}?v=${Date.now()}`;
//       }
//     }

//     return {
//       ...defaultMeta, // pertahankan metadataBase jika valid
//       title: data?.heroTitle || defaultMeta.title,
//       description: data?.heroDescription || defaultMeta.description,
//       icons: {
//         icon: faviconUrl,
//         shortcut: faviconUrl,
//         apple: faviconUrl,
//       },
//     };
//   } catch (error) {
//     console.error("Gagal load metadata:", error);
//     return defaultMeta;
//   }
// }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="id">
//       <body className={inter.className}>
//         <AuthProvider>
//           <div className="flex flex-col min-h-screen">
//             <Header />
//             <main className="flex-grow">{children}</main>
//             <Footer />
//           </div>
//         </AuthProvider>
//       </body>
//     </html>
//   );
// }

// // Penting: memaksa segmen root jadi dinamis → mencegah error DYNAMIC_SERVER_USAGE saat build.
// export const dynamic = "force-dynamic";



import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/AuthProvider"; // Pastikan path ini benar sesuai struktur folder
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

// [METADATA DINAMIS] - Logika ini sudah bagus, pertahankan.
export async function generateMetadata(): Promise<Metadata> {
  // Gunakan URL backend dari ENV atau fallback ke localhost backend (biasanya port 5000 atau 4000)
  const rawBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const baseUrl = rawBaseUrl.replace(/\/$/, ""); // hapus trailing slash

  // Endpoint metadata
  const endpoint = `${baseUrl}/api/content`;

  // Default metadata (fallback jika API mati)
  const defaultMeta: Metadata = {
    title: "LMS PMI - Learning Management System",
    description: "Platform Pelatihan Online Palang Merah Indonesia",
    icons: { icon: "/favicon.png" },
    metadataBase: (() => {
      try {
        return new URL(baseUrl);
      } catch {
        return undefined;
      }
    })(),
  };

  try {
    // Fetch data (no-store agar selalu fresh saat refresh halaman)
    const res = await fetch(endpoint, { cache: "no-store" });
    if (!res.ok) return defaultMeta;

    const data = await res.json();

    // Bangun URL favicon
    let faviconUrl = "/favicon.png";
    if (data?.faviconUrl) {
      if (data.faviconUrl.startsWith("http")) {
        faviconUrl = data.faviconUrl;
      } else {
        const cleanPath = data.faviconUrl.startsWith("/")
          ? data.faviconUrl.substring(1)
          : data.faviconUrl;
        faviconUrl = `${baseUrl}/${cleanPath}?v=${Date.now()}`;
      }
    }

    return {
      ...defaultMeta,
      title: data?.heroTitle || defaultMeta.title,
      description: data?.heroDescription || defaultMeta.description,
      icons: {
        icon: faviconUrl,
        shortcut: faviconUrl,
        apple: faviconUrl,
      },
    };
  } catch (error) {
    console.error("Gagal load metadata:", error);
    return defaultMeta;
  }
}

// [ROOT LAYOUT] - Jantung Aplikasi
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={inter.className}>
        {/* PENTING: AuthProvider membungkus segalanya.
            Ini memastikan Header bisa mengecek status login (User Avatar vs Tombol Masuk)
            dan Halaman Dashboard bisa membaca data user.
        */}
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            {/* Header ada di dalam AuthProvider, jadi dia bisa akses user */}
            <Header />
            
            <main className="flex-grow bg-gray-50">
                {children}
            </main>
            
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}

// Penting: Memaksa render dinamis untuk menghindari cache statis pada data user/metadata
export const dynamic = "force-dynamic";