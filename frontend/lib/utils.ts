// frontend/lib/utils.ts

export const getImageUrl = (imagePath: string | null | undefined) => {
  // 1. Jika path kosong, berikan foto default (pastikan file ini ada di folder public/frontend)
  if (!imagePath) return "/default-avatar.png";

  // 2. Jika path sudah berupa URL lengkap (http...), langsung kembalikan
  if (imagePath.startsWith('http')) return imagePath;
  
  // 3. Ambil Base URL dari .env atau default ke port 4000 (sesuai backend Anda)
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  
  // 4. Pastikan path diawali dengan slash / agar tidak double atau kurang slash
  const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  
  return `${baseUrl}${cleanPath}`;
};