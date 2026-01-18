"use client";

import { useState } from 'react';
import axios from 'axios';

export default function UploadTest() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError('');
      setResult(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Pilih file dulu!");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Port disesuaikan ke 4000 (Backend Anda)
      const response = await axios.post('http://localhost:4000/api/materials/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setResult(response.data);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Gagal upload file");
    } finally {
      setUploading(false);
    }
  };

  // Helper untuk menentukan icon/preview berdasarkan tipe file
  const renderPreview = () => {
    if (!result) return null;
    
    const { type, url, originalName } = result.data;

    // 1. Jika Gambar
    if (type.startsWith('image/')) {
      return (
        <div className="mt-2">
          <p className="text-xs text-gray-500 mb-1">Preview Gambar:</p>
          <img src={url} alt="Preview" className="h-40 w-auto rounded border shadow-sm" />
        </div>
      );
    }
    
    // 2. Jika PDF
    if (type === 'application/pdf') {
      return (
        <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded flex items-center gap-3">
          <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">PDF</div>
          <a href={url} target="_blank" rel="noopener noreferrer" className="text-sm text-red-700 underline hover:text-red-900">
             Buka Dokumen PDF ({originalName})
          </a>
        </div>
      );
    }

    // 3. Jika Dokumen Lain (Word/Excel/Video/dll)
    return (
      <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded flex items-center gap-3">
        <div className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">FILE</div>
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-700 underline hover:text-blue-900">
           Download File ({originalName})
        </a>
      </div>
    );
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4 border border-gray-200 mt-10">
      <h2 className="text-xl font-bold text-gray-800">Test Upload System</h2>
      
      <div className="flex flex-col space-y-2">
        {/* ARIA Label Fix */}
        <label htmlFor="file-upload-input" className="text-sm font-medium text-gray-700">
          Pilih File (Dokumen/Gambar/Video)
        </label>
        
        <input 
          id="file-upload-input" 
          type="file" 
          onChange={handleFileChange}
          accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.mp4"
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-indigo-50 file:text-indigo-700
            hover:file:bg-indigo-100"
        />
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-sm">
          {error}
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={uploading || !file}
        className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors
          ${uploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
      >
        {uploading ? 'Sedang Mengupload...' : 'Upload File'}
      </button>

      {result && (
        <div className="mt-4 p-4 bg-green-50 rounded-md border border-green-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-bold text-green-800">Upload Berhasil!</p>
            <span className="text-xs font-mono bg-green-200 text-green-800 px-2 py-0.5 rounded">
              Mode: {result.mode}
            </span>
          </div>
          
          {/* Render Preview Component */}
          {renderPreview()}

          <div className="mt-3 pt-3 border-t border-green-200 text-xs text-gray-500 break-all">
            <p><strong>Raw URL:</strong> {result.data.url}</p>
          </div>
        </div>
      )}
    </div>
  );
}