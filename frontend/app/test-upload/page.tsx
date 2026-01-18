import UploadTest from '@/components/UploadTest'; // Sesuaikan path import

export default function TestUploadPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Halaman Uji Coba Upload LMS
        </h1>
        
        {/* Panggil Component Disini */}
        <UploadTest />
        
      </div>
    </div>
  );
}