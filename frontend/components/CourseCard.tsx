// 'use client';

// import Link from 'next/link';
// import { getImageUrl } from '@/lib/api';

// // Interface sesuai data kursus Anda
// interface Course {
//   _id: string;
//   title: string;
//   category: string;
//   thumbnailUrl?: string;
//   price: number;
//   facilitatorIds?: any[];
//   programType?: string;
// }

// export default function CourseCard({ course }: { course: Course }) {
//   // 1. Gunakan helper untuk generate URL lengkap
//   const imageUrl = getImageUrl(course.thumbnailUrl);

//   // 2. Format Harga
//   const formatPrice = (price: number) => {
//     if (price === 0) return 'GRATIS';
//     return new Intl.NumberFormat('id-ID', {
//       style: 'currency',
//       currency: 'IDR',
//       minimumFractionDigits: 0,
//     }).format(price);
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col h-full group">
      
//       {/* --- BAGIAN GAMBAR --- */}
//       <div className="relative h-48 w-full bg-gray-200 overflow-hidden">
//         <img
//           src={imageUrl}
//           alt={course.title}
//           className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//           onError={(e) => {
//             // Fallback jika gambar error (404)
//             (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=Image+Error';
//           }}
//         />
        
//         {/* Badge Kategori */}
//         <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider text-gray-700 shadow-sm">
//           {course.category || 'General'}
//         </span>
//       </div>

//       {/* --- BAGIAN KONTEN --- */}
//       <div className="p-5 flex flex-col flex-1">
//         <h3 className="text-lg font-bold text-gray-800 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
//           {course.title}
//         </h3>

//         <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-50">
//           <div>
//             <p className="text-xs text-gray-400 font-medium mb-0.5">Harga</p>
//             <p className={`font-bold ${course.price === 0 ? 'text-green-600' : 'text-blue-600'}`}>
//               {formatPrice(course.price)}
//             </p>
//           </div>

//           <Link 
//             href={`/courses/${course._id}`}
//             className="px-4 py-2 bg-gray-900 text-white text-xs font-bold rounded-lg hover:bg-blue-600 transition-colors"
//           >
//             Akses Kelas →
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }
'use client';

import Link from 'next/link';
import { getImageUrl } from '@/lib/api';

interface Course {
  _id: string;
  title: string;
  category: string;
  thumbnailUrl?: string; // Path relatif dari DB
  price: number;
  facilitatorIds?: any[];
  programType?: string;
  isPublished?: boolean;
}

export default function CourseCard({ course }: { course: Course }) {
  // --- GUNAKAN HELPER DISINI ---
  // Ini akan mengubah "/uploads/file.jpg" menjadi "http://localhost:4000/uploads/file.jpg"
  const imageUrl = getImageUrl(course.thumbnailUrl);

  const formatPrice = (price: number) => {
    if (price === 0) return 'GRATIS';
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col h-full group">
      
      {/* Container Gambar */}
      <div className="relative h-48 w-full bg-gray-200 overflow-hidden">
        <img
          src={imageUrl}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            // Fallback terakhir jika file fisik benar-benar hilang di server
            (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=Image+Error';
          }}
        />
        
        {/* Badge Kategori */}
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider text-gray-700 shadow-sm">
          {course.category || 'Umum'}
        </span>

        {/* Badge Program Type */}
        <span className="absolute top-3 right-3 bg-blue-600/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
          {course.programType === 'training' ? 'Pelatihan' : 'Kursus'}
        </span>
      </div>

      {/* Konten Text */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-gray-800 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
          {course.title}
        </h3>

        <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-50">
          <div>
            <p className="text-xs text-gray-400 font-medium mb-0.5">Biaya Investasi</p>
            <p className={`font-bold ${course.price === 0 ? 'text-green-600' : 'text-blue-600'}`}>
              {formatPrice(course.price)}
            </p>
          </div>

          <Link 
            href={`/courses/${course._id}`}
            className="px-4 py-2 bg-gray-900 text-white text-xs font-bold rounded-lg hover:bg-blue-600 transition-colors"
          >
            Lihat Detail →
          </Link>
        </div>
      </div>
    </div>
  );
}