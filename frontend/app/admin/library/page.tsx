'use client';

import { useState, useEffect } from 'react';
import { api, apiUpload, getImageUrl } from '@/lib/api';
import Protected from '@/components/Protected';
import { Plus, Pencil, Trash2, FileText, X, UploadCloud, Book as BookIcon, Send, CheckCircle, FileCheck, Link as LinkIcon } from 'lucide-react';

export default function AdminLibraryPage() {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [cmsCategories, setCmsCategories] = useState<string[]>(['General']);
  
  // MODAL STATE
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState('');
  
  // INPUT TYPE STATE
  const [inputType, setInputType] = useState<'upload' | 'link'>('upload');

  // FORM STATE
  const [formData, setFormData] = useState({
      title: '', description: '', category: '', 
      author: '', year: '', 
      fileUrl: '', coverUrl: ''
  });
  
  const [uploadingFile, setUploadingFile] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [publishingId, setPublishingId] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
        setLoading(true);
        // 1. Load Kategori
        const content = await api('/api/content');
        if (content?.libraryCategories?.length > 0) {
            setCmsCategories(content.libraryCategories);
            if (!isEditing) {
                 setFormData(p => ({...p, category: content.libraryCategories[0]}));
            }
        }

        // 2. Load Buku
        const bookData = await api('/api/library?status=all'); 
        setBooks(Array.isArray(bookData) ? bookData : bookData.books || []);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'fileUrl' | 'coverUrl') => {
      const file = e.target.files?.[0];
      if (!file) return;

      // VALIDASI FILE SIZE (Max 10MB untuk PDF agar tidak error Cloudinary)
      if (field === 'fileUrl') {
          const maxSize = 10 * 1024 * 1024; // 10MB dalam bytes
          if (file.size > maxSize) {
              alert(`File terlalu besar (${(file.size / 1024 / 1024).toFixed(2)} MB).\nMaksimum upload adalah 10 MB.\n\nSilakan kompres PDF Anda atau gunakan opsi "Input Link" dan upload file ke Google Drive.`);
              return;
          }
      }

      const isFile = field === 'fileUrl';
      if(isFile) setUploadingFile(true); else setUploadingCover(true);

      try {
          const fd = new FormData();
          fd.append('file', file);
          const res = await apiUpload('/api/upload', fd);
          const url = res.url || res.file?.url;
          setFormData(prev => ({ ...prev, [field]: url }));
      } catch (e: any) { alert("Upload Gagal: " + e.message); } 
      finally { if(isFile) setUploadingFile(false); else setUploadingCover(false); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if(!formData.fileUrl) return alert("Wajib mengisi dokumen (Upload PDF atau Masukkan Link)!");

      try {
          if (isEditing) {
              await api(`/api/library/${editId}`, { method: 'PATCH', body: formData });
              alert("Buku diperbarui!");
          } else {
              await api('/api/library', { method: 'POST', body: formData });
              alert("Buku ditambahkan sebagai Draft!");
          }
          closeModal();
          loadData();
      } catch (e: any) { alert("Gagal: " + e.message); }
  };

  const handlePublish = async (bookId: string, bookTitle: string) => {
      if(!confirm(`Publikasikan "${bookTitle}"? \n\nIni akan mengirim notifikasi ke SELURUH USER.`)) return;
      try {
          setPublishingId(bookId);
          await api(`/api/library/${bookId}/publish`, { method: 'PATCH' });
          alert("Berhasil! Buku Live & Notifikasi dikirim.");
          loadData(); 
      } catch (e: any) { alert("Gagal publish: " + e.message); } 
      finally { setPublishingId(null); }
  };

  const handleDelete = async (id: string) => {
      if(!confirm("Hapus buku ini?")) return;
      try {
          await api(`/api/library/${id}`, { method: 'DELETE' });
          loadData();
      } catch (e: any) { alert(e.message); }
  };

  const openEdit = (book: any) => {
      setFormData({
          title: book.title, description: book.description, category: book.category,
          author: book.author, year: book.year, fileUrl: book.fileUrl, coverUrl: book.coverUrl
      });
      // Cek apakah fileUrl adalah link eksternal atau file Cloudinary
      if (book.fileUrl && !book.fileUrl.includes('cloudinary')) {
          setInputType('link');
      } else {
          setInputType('upload');
      }

      setEditId(book._id);
      setIsEditing(true);
      setIsModalOpen(true);
  };

  const closeModal = () => {
      setIsModalOpen(false);
      setIsEditing(false);
      setInputType('upload');
      setFormData({ title: '', description: '', category: cmsCategories[0] || 'General', author: '', year: '', fileUrl: '', coverUrl: '' });
  };

  const getFileNameFromUrl = (url: string) => {
      if (!url) return "";
      if (url.length > 50 && !url.includes('cloudinary')) return url.substring(0, 40) + "..."; 
      return url.split('/').pop() || "Dokumen";
  };

  return (
    <Protected roles={['SUPER_ADMIN', 'FACILITATOR']}>
      <div className="max-w-7xl mx-auto p-6 font-sans">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div>
                <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <BookIcon className="text-red-700"/> Manajemen Perpustakaan
                </h1>
                <p className="text-gray-500 text-sm mt-1">Kelola buku, modul, dan referensi digital.</p>
            </div>
            <button 
                onClick={() => setIsModalOpen(true)} 
                className="bg-red-700 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-red-800 transition flex items-center gap-2 shadow-lg shadow-red-100"
                aria-label="Tambah Buku Baru"
            >
                <Plus size={20}/> Tambah Buku
            </button>
        </div>

        {/* LIST BUKU ADMIN */}
        {loading ? <div className="text-center py-20">Memuat...</div> : 
         books.length === 0 ? <div className="text-center py-20 bg-gray-50 rounded-xl border-dashed border-2">Belum ada buku.</div> : 
         <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">
            <table className="w-full text-left">
                <thead className="bg-gray-50 border-b">
                    <tr>
                        <th className="p-4 text-xs font-bold text-gray-500 uppercase">Cover</th>
                        <th className="p-4 text-xs font-bold text-gray-500 uppercase">Info Buku</th>
                        <th className="p-4 text-xs font-bold text-gray-500 uppercase">Status</th>
                        <th className="p-4 text-xs font-bold text-gray-500 uppercase text-right">Aksi</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {books.map(book => (
                        <tr key={book._id} className="hover:bg-gray-50 transition-colors">
                            <td className="p-4 w-20 align-top">
                                <div className="w-12 h-16 bg-gray-200 rounded overflow-hidden shadow-sm">
                                    {book.coverUrl ? (
                                        <img src={getImageUrl(book.coverUrl)} className="w-full h-full object-cover" alt="cover"/>
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-gray-400"><FileText size={16}/></div>
                                    )}
                                </div>
                            </td>
                            <td className="p-4 align-top">
                                <div className="font-bold text-gray-800 text-sm mb-1">{book.title}</div>
                                <div className="text-xs text-gray-500 mb-1">{book.author} • {book.year}</div>
                                <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase">{book.category}</span>
                            </td>
                            <td className="p-4 align-top">
                                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1 ${book.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                    {book.status === 'published' ? <CheckCircle size={10}/> : null}
                                    {book.status || 'Draft'}
                                </span>
                            </td>
                            <td className="p-4 text-right align-top">
                                <div className="flex justify-end gap-2">
                                    {book.status !== 'published' && (
                                        <button 
                                            onClick={() => handlePublish(book._id, book.title)}
                                            disabled={publishingId === book._id}
                                            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg text-xs font-bold flex items-center gap-2 transition disabled:opacity-50"
                                            title="Publish & Blast Notif"
                                            aria-label={`Publikasikan buku ${book.title}`}
                                        >
                                            {publishingId === book._id ? '...' : <><Send size={14}/> Publish</>}
                                        </button>
                                    )}

                                    <button 
                                        onClick={() => openEdit(book)} 
                                        className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-amber-100 hover:text-amber-600 transition"
                                        aria-label={`Edit buku ${book.title}`}
                                    >
                                        <Pencil size={16}/>
                                    </button>
                                    
                                    <button 
                                        onClick={() => handleDelete(book._id)} 
                                        className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-red-100 hover:text-red-600 transition"
                                        aria-label={`Hapus buku ${book.title}`}
                                    >
                                        <Trash2 size={16}/>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
         </div>
        }

        {/* MODAL FORM */}
        {isModalOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
                    <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center sticky top-0 z-10">
                        <h2 className="text-lg font-bold">{isEditing ? 'Edit Buku' : 'Tambah Buku Baru'}</h2>
                        <button onClick={closeModal} aria-label="Tutup Modal">
                            <X className="text-gray-400 hover:text-red-600"/>
                        </button>
                    </div>
                    <form onSubmit={handleSubmit} className="p-6 space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="col-span-2">
                                <label className="block text-xs font-bold text-gray-500 mb-1">Judul Buku</label>
                                <input required className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 outline-none" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="Contoh: Pedoman PPGD" aria-label="Judul Buku"/>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1">Kategori</label>
                                <select className="w-full border rounded-lg px-3 py-2 text-sm bg-white" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} aria-label="Pilih Kategori">
                                    {cmsCategories.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1">Tahun</label>
                                <input className="w-full border rounded-lg px-3 py-2 text-sm" value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} placeholder="2025" aria-label="Tahun Terbit"/>
                            </div>
                            <div className="col-span-2">
                                <label className="block text-xs font-bold text-gray-500 mb-1">Penulis</label>
                                <input className="w-full border rounded-lg px-3 py-2 text-sm" value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} placeholder="Nama Penulis" aria-label="Nama Penulis"/>
                            </div>
                            <div className="col-span-2">
                                <label className="block text-xs font-bold text-gray-500 mb-1">Deskripsi</label>
                                <textarea rows={2} className="w-full border rounded-lg px-3 py-2 text-sm" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Deskripsi isi buku..." aria-label="Deskripsi Buku"/>
                            </div>

                            {/* LOGIKA PEMILIHAN TIPE INPUT */}
                            <div className="col-span-2 border rounded-xl overflow-hidden">
                                {/* TAB HEADER */}
                                <div className="flex border-b bg-gray-50">
                                    <button 
                                        type="button"
                                        onClick={() => { setInputType('upload'); setFormData({...formData, fileUrl: ''}); }}
                                        className={`flex-1 py-3 text-xs font-bold flex items-center justify-center gap-2 ${inputType === 'upload' ? 'bg-white text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                                    >
                                        <UploadCloud size={14} /> Upload PDF (Max 10MB)
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={() => { setInputType('link'); setFormData({...formData, fileUrl: ''}); }}
                                        className={`flex-1 py-3 text-xs font-bold flex items-center justify-center gap-2 ${inputType === 'link' ? 'bg-white text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                                    >
                                        <LinkIcon size={14} /> Input Link Eksternal
                                    </button>
                                </div>

                                <div className="p-6 bg-blue-50/50">
                                    {/* OPSI 1: UPLOAD PDF */}
                                    {inputType === 'upload' && (
                                        <div className="border-2 border-dashed border-blue-200 bg-white p-6 rounded-xl flex flex-col items-center justify-center">
                                            {formData.fileUrl ? (
                                                <div className="text-center w-full">
                                                    <div className="text-green-600 font-bold text-sm mb-1 flex items-center justify-center gap-2">
                                                        <FileCheck className="w-6 h-6" />
                                                        File Terupload!
                                                    </div>
                                                    <p className="text-gray-700 text-xs font-medium break-all mb-3 px-4">
                                                        {getFileNameFromUrl(formData.fileUrl)}
                                                    </p>
                                                    <button 
                                                        type="button" 
                                                        onClick={() => setFormData({...formData, fileUrl: ''})} 
                                                        className="text-xs text-red-500 hover:text-red-700 underline font-semibold"
                                                    >
                                                        Hapus / Ganti File
                                                    </button>
                                                </div>
                                            ) : (
                                                <>
                                                    <label className="block text-xs font-bold text-blue-800 mb-2">File PDF</label>
                                                    <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-blue-700 inline-flex items-center gap-2 transition-transform active:scale-95">
                                                        <UploadCloud size={14}/> 
                                                        {uploadingFile ? 'Mengupload...' : 'Pilih File PDF'}
                                                        <input 
                                                            type="file" 
                                                            accept=".pdf" 
                                                            className="hidden" 
                                                            onChange={(e) => handleUpload(e, 'fileUrl')} 
                                                            disabled={uploadingFile} 
                                                        />
                                                    </label>
                                                    <p className="text-gray-400 text-[10px] mt-2">Maksimal 10MB</p>
                                                </>
                                            )}
                                        </div>
                                    )}

                                    {/* OPSI 2: INPUT URL */}
                                    {inputType === 'link' && (
                                        <div className="bg-white p-6 rounded-xl border border-blue-100">
                                            <label className="block text-xs font-bold text-gray-500 mb-2">URL Dokumen (Google Drive / Dropbox)</label>
                                            <div className="flex gap-2">
                                                <div className="relative flex-1">
                                                    <LinkIcon className="absolute left-3 top-2.5 text-gray-400" size={16} />
                                                    <input 
                                                        type="url" 
                                                        placeholder="https://drive.google.com/file/d/..." 
                                                        className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                                        value={formData.fileUrl}
                                                        onChange={(e) => setFormData({...formData, fileUrl: e.target.value})}
                                                    />
                                                </div>
                                            </div>
                                            {/* PERBAIKAN DI SINI: mengganti > menjadi &gt; */}
                                            <p className="text-[10px] text-gray-500 mt-2">
                                                💡 Gunakan opsi ini untuk file yang berukuran besar (&gt;10MB). Pastikan akses link disetel ke "Anyone with the link" (Publik).
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* UPLOAD COVER */}
                            <div className="col-span-2 border-2 border-dashed border-gray-200 bg-gray-50 p-4 rounded-xl text-center flex flex-col items-center justify-center relative mt-2">
                                <label className="block text-xs font-bold text-gray-500 mb-2">Cover Buku</label>
                                {formData.coverUrl ? (
                                    <div className="relative group">
                                        <img src={getImageUrl(formData.coverUrl)} className="h-20 w-auto rounded shadow-sm" alt="preview"/>
                                        <button type="button" onClick={() => setFormData({...formData, coverUrl: ''})} className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition" aria-label="Hapus Cover"><X size={12}/></button>
                                    </div>
                                ) : (
                                    <label className="cursor-pointer bg-white border border-gray-300 text-gray-600 px-4 py-2 rounded-lg text-xs font-bold hover:bg-gray-100 inline-flex items-center gap-2">
                                        <UploadCloud size={14}/> {uploadingCover ? '...' : 'Upload Img'}
                                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleUpload(e, 'coverUrl')} disabled={uploadingCover} aria-label="Upload Gambar Cover"/>
                                    </label>
                                )}
                            </div>
                        </div>
                        
                        <div className="pt-4 border-t flex justify-end gap-3">
                            <button type="button" onClick={closeModal} className="px-5 py-2.5 text-gray-600 hover:bg-gray-100 rounded-xl font-bold text-sm" aria-label="Batal">Batal</button>
                            <button type="submit" disabled={uploadingFile} className="px-6 py-2.5 bg-red-700 text-white hover:bg-red-800 rounded-xl font-bold text-sm disabled:opacity-50" aria-label="Simpan">
                                {isEditing ? 'Simpan' : 'Simpan Draft'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )}

      </div>
    </Protected>
  );
}