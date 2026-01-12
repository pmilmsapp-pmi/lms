'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import Link from 'next/link';
// import { useRouter } from 'next/navigation'; // Tidak wajib jika tidak dipakai navigasi programatis

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // State Modal Tambah User
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'STUDENT' });
  const [isSaving, setIsSaving] = useState(false);

  // Load Users saat komponen dimuat
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const res = await api('/api/admin/users');
      setUsers(res.users || []);
    } catch (err: any) {
      console.error(err);
      // Jika error Forbidden, user mungkin bukan Super Admin
      if (err.message?.includes('Forbidden')) {
        alert('Akses ditolak. Halaman ini khusus Super Admin.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Handler: Tambah User Baru
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await api('/api/admin/users', { method: 'POST', body: newUser });
      alert('User berhasil ditambahkan!');
      
      // Reset form dan tutup modal
      setShowAddModal(false);
      setNewUser({ name: '', email: '', password: '', role: 'STUDENT' });
      
      // Refresh list user
      loadUsers(); 
    } catch (err: any) {
      alert(err.message || 'Gagal menambah user');
    } finally {
      setIsSaving(false);
    }
  };

  // Handler: Ubah Role (Langsung dari Dropdown)
  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      // Optimistic update (ubah UI dulu biar cepat)
      setUsers(prev => prev.map(u => u._id === userId ? { ...u, role: newRole } : u));

      // Kirim request ke backend
      await api(`/api/admin/users/${userId}`, {
        method: 'PATCH',
        body: { role: newRole }
      });
    } catch (err: any) {
      alert('Gagal update role: ' + err.message);
      loadUsers(); // Revert/Refresh jika gagal
    }
  };

  // Handler: Hapus User
  const handleDelete = async (userId: string) => {
    if (!confirm('Hapus user ini? Semua data progres dan sertifikat mereka akan hilang permanen.')) return;
    try {
      await api(`/api/admin/users/${userId}`, { method: 'DELETE' });
      setUsers(prev => prev.filter(u => u._id !== userId));
    } catch (err: any) {
      alert('Gagal menghapus user: ' + err.message);
    }
  };

  // Helper untuk warna badge role
  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'SUPER_ADMIN': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'FACILITATOR': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manajemen Pengguna</h1>
        <button 
          onClick={() => setShowAddModal(true)} 
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-medium transition-colors shadow-sm"
        >
          + Tambah User
        </button>
      </div>

      {/* --- MODAL TAMBAH USER --- */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Tambah User Baru</h2>
            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nama Lengkap</label>
                <input 
                  className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" 
                  placeholder="Contoh: Budi Santoso" 
                  required 
                  value={newUser.name}
                  onChange={e => setNewUser({...newUser, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input 
                  className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" 
                  type="email" 
                  placeholder="budi@example.com" 
                  required 
                  value={newUser.email}
                  onChange={e => setNewUser({...newUser, email: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <input 
                  className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" 
                  type="password" 
                  placeholder="Minimal 6 karakter" 
                  required 
                  value={newUser.password}
                  onChange={e => setNewUser({...newUser, password: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Role</label>
                <select 
                  className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  value={newUser.role}
                  onChange={e => setNewUser({...newUser, role: e.target.value})}
                  aria-label="Pilih Role User Baru"
                  title="Pilih Role User Baru"
                >
                  <option value="STUDENT">Student (Siswa)</option>
                  <option value="FACILITATOR">Facilitator (Instruktur)</option>
                  <option value="SUPER_ADMIN">Super Admin</option>
                </select>
              </div>
              
              <div className="flex justify-end gap-2 mt-6">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)} 
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  disabled={isSaving} 
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  {isSaving ? 'Menyimpan...' : 'Simpan User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- TABEL USER --- */}
      {loading ? (
        <div className="p-8 text-center text-gray-500">Memuat data user...</div>
      ) : (
        <div className="bg-white shadow rounded-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 text-xs font-bold text-gray-500 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3 border-b">Nama</th>
                  <th className="px-6 py-3 border-b">Email</th>
                  <th className="px-6 py-3 border-b">Role</th>
                  <th className="px-6 py-3 border-b text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{user.name || 'Tanpa Nama'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {/* DROPDOWN ROLE (Fixed Accessibility Error) */}
                      <select 
                        value={user.role}
                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                        
                        // FIX: Menambahkan accessible name
                        aria-label={`Ubah role untuk user ${user.name}`}
                        title={`Ubah role untuk user ${user.name}`}

                        className={`text-xs font-bold px-2 py-1 rounded border cursor-pointer outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 ${getRoleBadge(user.role)}`}
                      >
                        <option value="STUDENT">STUDENT</option>
                        <option value="FACILITATOR">FACILITATOR</option>
                        <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right space-x-3">
                      <Link 
                        href={`/admin/users/${user._id}`}
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
                      >
                        Detail
                      </Link>
                      <button 
                        onClick={() => handleDelete(user._id)} 
                        className="text-red-600 hover:text-red-800 font-medium text-sm transition-colors"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {users.length === 0 && (
            <div className="p-10 text-center text-gray-500 flex flex-col items-center">
              <p className="text-lg font-medium">Belum ada user.</p>
              <p className="text-sm">Klik tombol "+ Tambah User" untuk membuat akun baru.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}