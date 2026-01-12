
// // // // frontend/app/layout.tsx
// // // import './globals.css';
// // // import Header from '@/components/Header';
// // // import { AuthProvider } from '@/lib/AuthProvider';

// // // export default function RootLayout({ children }: { children: React.ReactNode }) {
// // //   return (
// // //     <html lang="id">
// // //       <body>
// // //         <AuthProvider>
// // //           <Header />
// // //           <main className="container py-6">{children}</main>
// // //         </AuthProvider>
// // //       </body>
// // //     </html>
// // //   );
// // // }
// // // frontend/app/layout.tsx
// // import './globals.css';
// // import Header from '@/components/Header';
// // import { AuthProvider } from '@/lib/AuthProvider';
// // import Footer from '@/components/Footer';

// // export const metadata = {
// //   title: 'LMS Pelatihan Online',
// //   description: 'Platform belajar mandiri',
// // };

// // export default function RootLayout({ children }: { children: React.ReactNode }) {
// //   return (
// //     <html lang="id">
// //       <body className="bg-gray-50 min-h-screen text-gray-900">
// //         <AuthProvider>
// //           {/* Header akan mengakses AuthContext untuk menampilkan Nama User / Logout */}
// //           <Header />
// //           <main className="container mx-auto py-6 px-4">
// //             {children}
// //           </main>
// //         </AuthProvider>
// //       </body>
// //     </html>
// //   );
// // }
// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "./globals.css";
// import { AuthProvider } from "@/lib/AuthProvider";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "LMS PMI - Learning Management System",
//   description: "Platform Pelatihan Online Palang Merah Indonesia",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="id">
//       <body className={inter.className}>
//         <AuthProvider>
//           {/* Pembungkus utama dengan flex agar footer tetap di bawah */}
//           <div className="flex flex-col min-h-screen">
            
//             {/* Navigasi Atas */}
//             <Header />

//             {/* Area Konten Utama - flex-grow agar mengisi sisa ruang */}
//             <main className="flex-grow">
//               {children}
//             </main>

//             {/* Footer Merah PMI */}
//             <Footer />
            
//           </div>
//         </AuthProvider>
//       </body>
//     </html>
//   );
// }
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