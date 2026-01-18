// // // // // 'use client';

// // // // // import { useEffect, useState } from 'react';
// // // // // import { api } from '@/lib/api';
// // // // // import Link from 'next/link';
// // // // // // import { useRouter } from 'next/navigation'; // Tidak wajib jika tidak dipakai navigasi programatis

// // // // // export default function AdminUsersPage() {
// // // // //   const [users, setUsers] = useState<any[]>([]);
// // // // //   const [loading, setLoading] = useState(true);
  
// // // // //   // State Modal Tambah User
// // // // //   const [showAddModal, setShowAddModal] = useState(false);
// // // // //   const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'STUDENT' });
// // // // //   const [isSaving, setIsSaving] = useState(false);

// // // // //   // Load Users saat komponen dimuat
// // // // //   useEffect(() => {
// // // // //     loadUsers();
// // // // //   }, []);

// // // // //   const loadUsers = async () => {
// // // // //     try {
// // // // //       setLoading(true);
// // // // //       const res = await api('/api/admin/users');
// // // // //       setUsers(res.users || []);
// // // // //     } catch (err: any) {
// // // // //       console.error(err);
// // // // //       // Jika error Forbidden, user mungkin bukan Super Admin
// // // // //       if (err.message?.includes('Forbidden')) {
// // // // //         alert('Akses ditolak. Halaman ini khusus Super Admin.');
// // // // //       }
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   // Handler: Tambah User Baru
// // // // //   const handleCreateUser = async (e: React.FormEvent) => {
// // // // //     e.preventDefault();
// // // // //     setIsSaving(true);
// // // // //     try {
// // // // //       await api('/api/admin/users', { method: 'POST', body: newUser });
// // // // //       alert('User berhasil ditambahkan!');
      
// // // // //       // Reset form dan tutup modal
// // // // //       setShowAddModal(false);
// // // // //       setNewUser({ name: '', email: '', password: '', role: 'STUDENT' });
      
// // // // //       // Refresh list user
// // // // //       loadUsers(); 
// // // // //     } catch (err: any) {
// // // // //       alert(err.message || 'Gagal menambah user');
// // // // //     } finally {
// // // // //       setIsSaving(false);
// // // // //     }
// // // // //   };

// // // // //   // Handler: Ubah Role (Langsung dari Dropdown)
// // // // //   const handleRoleChange = async (userId: string, newRole: string) => {
// // // // //     try {
// // // // //       // Optimistic update (ubah UI dulu biar cepat)
// // // // //       setUsers(prev => prev.map(u => u._id === userId ? { ...u, role: newRole } : u));

// // // // //       // Kirim request ke backend
// // // // //       await api(`/api/admin/users/${userId}`, {
// // // // //         method: 'PATCH',
// // // // //         body: { role: newRole }
// // // // //       });
// // // // //     } catch (err: any) {
// // // // //       alert('Gagal update role: ' + err.message);
// // // // //       loadUsers(); // Revert/Refresh jika gagal
// // // // //     }
// // // // //   };

// // // // //   // Handler: Hapus User
// // // // //   const handleDelete = async (userId: string) => {
// // // // //     if (!confirm('Hapus user ini? Semua data progres dan sertifikat mereka akan hilang permanen.')) return;
// // // // //     try {
// // // // //       await api(`/api/admin/users/${userId}`, { method: 'DELETE' });
// // // // //       setUsers(prev => prev.filter(u => u._id !== userId));
// // // // //     } catch (err: any) {
// // // // //       alert('Gagal menghapus user: ' + err.message);
// // // // //     }
// // // // //   };

// // // // //   // Helper untuk warna badge role
// // // // //   const getRoleBadge = (role: string) => {
// // // // //     switch (role) {
// // // // //       case 'SUPER_ADMIN': return 'bg-purple-100 text-purple-800 border-purple-200';
// // // // //       case 'FACILITATOR': return 'bg-blue-100 text-blue-800 border-blue-200';
// // // // //       default: return 'bg-gray-100 text-gray-800 border-gray-200';
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div className="p-6 max-w-7xl mx-auto">
// // // // //       <div className="flex justify-between items-center mb-6">
// // // // //         <h1 className="text-2xl font-bold text-gray-800">Manajemen Pengguna</h1>
// // // // //         <button 
// // // // //           onClick={() => setShowAddModal(true)} 
// // // // //           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-medium transition-colors shadow-sm"
// // // // //         >
// // // // //           + Tambah User
// // // // //         </button>
// // // // //       </div>

// // // // //       {/* --- MODAL TAMBAH USER --- */}
// // // // //       {showAddModal && (
// // // // //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
// // // // //           <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
// // // // //             <h2 className="text-xl font-bold mb-4 text-gray-800">Tambah User Baru</h2>
// // // // //             <form onSubmit={handleCreateUser} className="space-y-4">
// // // // //               <div>
// // // // //                 <label className="block text-sm font-medium mb-1">Nama Lengkap</label>
// // // // //                 <input 
// // // // //                   className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" 
// // // // //                   placeholder="Contoh: Budi Santoso" 
// // // // //                   required 
// // // // //                   value={newUser.name}
// // // // //                   onChange={e => setNewUser({...newUser, name: e.target.value})}
// // // // //                 />
// // // // //               </div>
// // // // //               <div>
// // // // //                 <label className="block text-sm font-medium mb-1">Email</label>
// // // // //                 <input 
// // // // //                   className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" 
// // // // //                   type="email" 
// // // // //                   placeholder="budi@example.com" 
// // // // //                   required 
// // // // //                   value={newUser.email}
// // // // //                   onChange={e => setNewUser({...newUser, email: e.target.value})}
// // // // //                 />
// // // // //               </div>
// // // // //               <div>
// // // // //                 <label className="block text-sm font-medium mb-1">Password</label>
// // // // //                 <input 
// // // // //                   className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" 
// // // // //                   type="password" 
// // // // //                   placeholder="Minimal 6 karakter" 
// // // // //                   required 
// // // // //                   value={newUser.password}
// // // // //                   onChange={e => setNewUser({...newUser, password: e.target.value})}
// // // // //                 />
// // // // //               </div>
// // // // //               <div>
// // // // //                 <label className="block text-sm font-medium mb-1">Role</label>
// // // // //                 <select 
// // // // //                   className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none bg-white"
// // // // //                   value={newUser.role}
// // // // //                   onChange={e => setNewUser({...newUser, role: e.target.value})}
// // // // //                   aria-label="Pilih Role User Baru"
// // // // //                   title="Pilih Role User Baru"
// // // // //                 >
// // // // //                   <option value="STUDENT">Student (Siswa)</option>
// // // // //                   <option value="FACILITATOR">Facilitator (Instruktur)</option>
// // // // //                   <option value="SUPER_ADMIN">Super Admin</option>
// // // // //                 </select>
// // // // //               </div>
              
// // // // //               <div className="flex justify-end gap-2 mt-6">
// // // // //                 <button 
// // // // //                   type="button" 
// // // // //                   onClick={() => setShowAddModal(false)} 
// // // // //                   className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded transition-colors"
// // // // //                 >
// // // // //                   Batal
// // // // //                 </button>
// // // // //                 <button 
// // // // //                   type="submit" 
// // // // //                   disabled={isSaving} 
// // // // //                   className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 transition-colors"
// // // // //                 >
// // // // //                   {isSaving ? 'Menyimpan...' : 'Simpan User'}
// // // // //                 </button>
// // // // //               </div>
// // // // //             </form>
// // // // //           </div>
// // // // //         </div>
// // // // //       )}

// // // // //       {/* --- TABEL USER --- */}
// // // // //       {loading ? (
// // // // //         <div className="p-8 text-center text-gray-500">Memuat data user...</div>
// // // // //       ) : (
// // // // //         <div className="bg-white shadow rounded-lg border overflow-hidden">
// // // // //           <div className="overflow-x-auto">
// // // // //             <table className="w-full text-left border-collapse">
// // // // //               <thead className="bg-gray-50 text-xs font-bold text-gray-500 uppercase tracking-wider">
// // // // //                 <tr>
// // // // //                   <th className="px-6 py-3 border-b">Nama</th>
// // // // //                   <th className="px-6 py-3 border-b">Email</th>
// // // // //                   <th className="px-6 py-3 border-b">Role</th>
// // // // //                   <th className="px-6 py-3 border-b text-right">Aksi</th>
// // // // //                 </tr>
// // // // //               </thead>
// // // // //               <tbody className="divide-y divide-gray-200">
// // // // //                 {users.map((user) => (
// // // // //                   <tr key={user._id} className="hover:bg-gray-50 transition-colors">
// // // // //                     <td className="px-6 py-4 whitespace-nowrap">
// // // // //                       <div className="font-medium text-gray-900">{user.name || 'Tanpa Nama'}</div>
// // // // //                     </td>
// // // // //                     <td className="px-6 py-4 whitespace-nowrap text-gray-500">
// // // // //                       {user.email}
// // // // //                     </td>
// // // // //                     <td className="px-6 py-4 whitespace-nowrap">
// // // // //                       {/* DROPDOWN ROLE (Fixed Accessibility Error) */}
// // // // //                       <select 
// // // // //                         value={user.role}
// // // // //                         onChange={(e) => handleRoleChange(user._id, e.target.value)}
                        
// // // // //                         // FIX: Menambahkan accessible name
// // // // //                         aria-label={`Ubah role untuk user ${user.name}`}
// // // // //                         title={`Ubah role untuk user ${user.name}`}

// // // // //                         className={`text-xs font-bold px-2 py-1 rounded border cursor-pointer outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 ${getRoleBadge(user.role)}`}
// // // // //                       >
// // // // //                         <option value="STUDENT">STUDENT</option>
// // // // //                         <option value="FACILITATOR">FACILITATOR</option>
// // // // //                         <option value="SUPER_ADMIN">SUPER_ADMIN</option>
// // // // //                       </select>
// // // // //                     </td>
// // // // //                     <td className="px-6 py-4 whitespace-nowrap text-right space-x-3">
// // // // //                       <Link 
// // // // //                         href={`/admin/users/${user._id}`}
// // // // //                         className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
// // // // //                       >
// // // // //                         Detail
// // // // //                       </Link>
// // // // //                       <button 
// // // // //                         onClick={() => handleDelete(user._id)} 
// // // // //                         className="text-red-600 hover:text-red-800 font-medium text-sm transition-colors"
// // // // //                       >
// // // // //                         Hapus
// // // // //                       </button>
// // // // //                     </td>
// // // // //                   </tr>
// // // // //                 ))}
// // // // //               </tbody>
// // // // //             </table>
// // // // //           </div>

// // // // //           {users.length === 0 && (
// // // // //             <div className="p-10 text-center text-gray-500 flex flex-col items-center">
// // // // //               <p className="text-lg font-medium">Belum ada user.</p>
// // // // //               <p className="text-sm">Klik tombol "+ Tambah User" untuk membuat akun baru.</p>
// // // // //             </div>
// // // // //           )}
// // // // //         </div>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // }


// // // // // PEMBAHARUAN DENGAN RBAC

// // // // 'use client';

// // // // import { useEffect, useState } from 'react';
// // // // import { api } from '@/lib/api';
// // // // import Link from 'next/link';

// // // // export default function AdminUsersPage() {
// // // //   const [users, setUsers] = useState<any[]>([]);
// // // //   const [loading, setLoading] = useState(true);
  
// // // //   // State Modal Tambah User
// // // //   const [showAddModal, setShowAddModal] = useState(false);
// // // //   const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'STUDENT' });
// // // //   const [isSaving, setIsSaving] = useState(false);

// // // //   // Load Users saat komponen dimuat
// // // //   useEffect(() => {
// // // //     loadUsers();
// // // //   }, []);

// // // //   const loadUsers = async () => {
// // // //     try {
// // // //       setLoading(true);
// // // //       const res = await api('/api/admin/users');
// // // //       setUsers(res.users || []);
// // // //     } catch (err: any) {
// // // //       console.error(err);
// // // //       if (err.message?.includes('Forbidden')) {
// // // //         alert('Akses ditolak. Halaman ini khusus Super Admin.');
// // // //       }
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   // Handler: Tambah User Baru
// // // //   const handleCreateUser = async (e: React.FormEvent) => {
// // // //     e.preventDefault();
// // // //     setIsSaving(true);
// // // //     try {
// // // //       await api('/api/admin/users', { method: 'POST', body: newUser });
// // // //       alert('User berhasil ditambahkan!');
      
// // // //       setShowAddModal(false);
// // // //       setNewUser({ name: '', email: '', password: '', role: 'STUDENT' });
      
// // // //       loadUsers(); 
// // // //     } catch (err: any) {
// // // //       alert(err.message || 'Gagal menambah user');
// // // //     } finally {
// // // //       setIsSaving(false);
// // // //     }
// // // //   };

// // // //   // Handler: Ubah Role
// // // //   const handleRoleChange = async (userId: string, newRole: string) => {
// // // //     try {
// // // //       setUsers(prev => prev.map(u => u._id === userId ? { ...u, role: newRole } : u));

// // // //       await api(`/api/admin/users/${userId}`, {
// // // //         method: 'PATCH',
// // // //         body: { role: newRole }
// // // //       });
// // // //     } catch (err: any) {
// // // //       alert('Gagal update role: ' + err.message);
// // // //       loadUsers(); 
// // // //     }
// // // //   };

// // // //   // Handler: Hapus User
// // // //   const handleDelete = async (userId: string) => {
// // // //     if (!confirm('Hapus user ini? Semua data progres dan sertifikat mereka akan hilang permanen.')) return;
// // // //     try {
// // // //       await api(`/api/admin/users/${userId}`, { method: 'DELETE' });
// // // //       setUsers(prev => prev.filter(u => u._id !== userId));
// // // //     } catch (err: any) {
// // // //       alert('Gagal menghapus user: ' + err.message);
// // // //     }
// // // //   };

// // // //   // Helper untuk warna badge role
// // // //   const getRoleBadge = (role: string) => {
// // // //     switch (role) {
// // // //       case 'SUPER_ADMIN': return 'bg-purple-100 text-purple-800 border-purple-200';
// // // //       case 'ADMIN': return 'bg-orange-100 text-orange-800 border-orange-200'; // [BARU]
// // // //       case 'FACILITATOR': return 'bg-blue-100 text-blue-800 border-blue-200';
// // // //       default: return 'bg-gray-100 text-gray-800 border-gray-200';
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="p-6 max-w-7xl mx-auto">
// // // //       <div className="flex justify-between items-center mb-6">
// // // //         <h1 className="text-2xl font-bold text-gray-800">Manajemen Pengguna</h1>
// // // //         <button 
// // // //           onClick={() => setShowAddModal(true)} 
// // // //           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-medium transition-colors shadow-sm"
// // // //         >
// // // //           + Tambah User
// // // //         </button>
// // // //       </div>

// // // //       {/* --- MODAL TAMBAH USER --- */}
// // // //       {showAddModal && (
// // // //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
// // // //           <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
// // // //             <h2 className="text-xl font-bold mb-4 text-gray-800">Tambah User Baru</h2>
// // // //             <form onSubmit={handleCreateUser} className="space-y-4">
// // // //               <div>
// // // //                 <label className="block text-sm font-medium mb-1">Nama Lengkap</label>
// // // //                 <input 
// // // //                   className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" 
// // // //                   placeholder="Contoh: Budi Santoso" 
// // // //                   required 
// // // //                   value={newUser.name}
// // // //                   onChange={e => setNewUser({...newUser, name: e.target.value})}
// // // //                 />
// // // //               </div>
// // // //               <div>
// // // //                 <label className="block text-sm font-medium mb-1">Email</label>
// // // //                 <input 
// // // //                   className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" 
// // // //                   type="email" 
// // // //                   placeholder="budi@example.com" 
// // // //                   required 
// // // //                   value={newUser.email}
// // // //                   onChange={e => setNewUser({...newUser, email: e.target.value})}
// // // //                 />
// // // //               </div>
// // // //               <div>
// // // //                 <label className="block text-sm font-medium mb-1">Password</label>
// // // //                 <input 
// // // //                   className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" 
// // // //                   type="password" 
// // // //                   placeholder="Minimal 6 karakter" 
// // // //                   required 
// // // //                   value={newUser.password}
// // // //                   onChange={e => setNewUser({...newUser, password: e.target.value})}
// // // //                 />
// // // //               </div>
// // // //               <div>
// // // //                 <label className="block text-sm font-medium mb-1">Role</label>
// // // //                 <select 
// // // //                   className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none bg-white"
// // // //                   value={newUser.role}
// // // //                   onChange={e => setNewUser({...newUser, role: e.target.value})}
// // // //                   aria-label="Pilih Role User Baru"
// // // //                   title="Pilih Role User Baru"
// // // //                 >
// // // //                   <option value="STUDENT">Student (Siswa)</option>
// // // //                   <option value="FACILITATOR">Facilitator (Instruktur)</option>
// // // //                   <option value="ADMIN">Admin (Wilayah/Konten)</option> {/* [BARU] */}
// // // //                   <option value="SUPER_ADMIN">Super Admin</option>
// // // //                 </select>
// // // //               </div>
              
// // // //               <div className="flex justify-end gap-2 mt-6">
// // // //                 <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded transition-colors">Batal</button>
// // // //                 <button type="submit" disabled={isSaving} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 transition-colors">
// // // //                   {isSaving ? 'Menyimpan...' : 'Simpan User'}
// // // //                 </button>
// // // //               </div>
// // // //             </form>
// // // //           </div>
// // // //         </div>
// // // //       )}

// // // //       {/* --- TABEL USER --- */}
// // // //       {loading ? (
// // // //         <div className="p-8 text-center text-gray-500">Memuat data user...</div>
// // // //       ) : (
// // // //         <div className="bg-white shadow rounded-lg border overflow-hidden">
// // // //           <div className="overflow-x-auto">
// // // //             <table className="w-full text-left border-collapse">
// // // //               <thead className="bg-gray-50 text-xs font-bold text-gray-500 uppercase tracking-wider">
// // // //                 <tr>
// // // //                   <th className="px-6 py-3 border-b">Nama</th>
// // // //                   <th className="px-6 py-3 border-b">Email</th>
// // // //                   <th className="px-6 py-3 border-b">Role</th>
// // // //                   <th className="px-6 py-3 border-b text-right">Aksi</th>
// // // //                 </tr>
// // // //               </thead>
// // // //               <tbody className="divide-y divide-gray-200">
// // // //                 {users.map((user) => (
// // // //                   <tr key={user._id} className="hover:bg-gray-50 transition-colors">
// // // //                     <td className="px-6 py-4 whitespace-nowrap">
// // // //                       <div className="font-medium text-gray-900">{user.name || 'Tanpa Nama'}</div>
// // // //                     </td>
// // // //                     <td className="px-6 py-4 whitespace-nowrap text-gray-500">
// // // //                       {user.email}
// // // //                     </td>
// // // //                     <td className="px-6 py-4 whitespace-nowrap">
// // // //                       <select 
// // // //                         value={user.role}
// // // //                         onChange={(e) => handleRoleChange(user._id, e.target.value)}
// // // //                         aria-label={`Ubah role untuk user ${user.name}`}
// // // //                         title={`Ubah role untuk user ${user.name}`}
// // // //                         className={`text-xs font-bold px-2 py-1 rounded border cursor-pointer outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 ${getRoleBadge(user.role)}`}
// // // //                       >
// // // //                         <option value="STUDENT">STUDENT</option>
// // // //                         <option value="FACILITATOR">FACILITATOR</option>
// // // //                         <option value="ADMIN">ADMIN</option> {/* [BARU] */}
// // // //                         <option value="SUPER_ADMIN">SUPER_ADMIN</option>
// // // //                       </select>
// // // //                     </td>
// // // //                     <td className="px-6 py-4 whitespace-nowrap text-right space-x-3">
// // // //                       <Link href={`/admin/users/${user._id}`} className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors">Detail</Link>
// // // //                       <button onClick={() => handleDelete(user._id)} className="text-red-600 hover:text-red-800 font-medium text-sm transition-colors">Hapus</button>
// // // //                     </td>
// // // //                   </tr>
// // // //                 ))}
// // // //               </tbody>
// // // //             </table>
// // // //           </div>
// // // //           {users.length === 0 && (
// // // //             <div className="p-10 text-center text-gray-500 flex flex-col items-center">
// // // //               <p className="text-lg font-medium">Belum ada user.</p>
// // // //               <p className="text-sm">Klik tombol "+ Tambah User" untuk membuat akun baru.</p>
// // // //             </div>
// // // //           )}
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // }



// // // 'use client';

// // // import { useEffect, useState } from 'react';
// // // import { api } from '@/lib/api';
// // // import Link from 'next/link';
// // // import { Loader2, Plus, Trash2, Search, MapPin } from 'lucide-react';
// // // import RegionSelector from '@/components/admin/RegionSelector';

// // // // [FIX TS] Definisi Tipe untuk Region Config agar sesuai dengan komponen anak
// // // interface RegionConfig {
// // //   scope: 'national' | 'province' | 'regency';
// // //   provinces: string[];
// // //   regencies: string[];
// // // }

// // // export default function AdminUsersPage() {
// // //   const [users, setUsers] = useState<any[]>([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [search, setSearch] = useState('');
  
// // //   // --- STATE MODAL & FORM ---
// // //   const [showAddModal, setShowAddModal] = useState(false);
// // //   const [isSaving, setIsSaving] = useState(false);

// // //   // State Data User Baru
// // //   const [newUser, setNewUser] = useState({ 
// // //     name: '', 
// // //     email: '', 
// // //     password: '', 
// // //     role: 'STUDENT' 
// // //   });

// // //   // [FIX TS] Gunakan interface RegionConfig saat inisialisasi state
// // //   const [regionConfig, setRegionConfig] = useState<RegionConfig>({
// // //     scope: 'national', 
// // //     provinces: [],
// // //     regencies: []
// // //   });

// // //   // Load Users
// // //   useEffect(() => {
// // //     loadUsers();
// // //   }, []);

// // //   const loadUsers = async () => {
// // //     try {
// // //       setLoading(true);
// // //       const res = await api('/api/admin/users');
// // //       setUsers(res.users || []);
// // //     } catch (err: any) {
// // //       console.error(err);
// // //       if (err.message?.includes('Forbidden')) {
// // //         alert('Akses ditolak. Halaman ini khusus Super Admin.');
// // //       }
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   // Handler: Tambah User Baru
// // //   const handleCreateUser = async (e: React.FormEvent) => {
// // //     e.preventDefault();
// // //     setIsSaving(true);

// // //     try {
// // //       // 1. Siapkan Payload Dasar
// // //       const payload: any = { ...newUser };

// // //       // 2. Jika Role ADMIN, Masukkan Data Wilayah
// // //       if (newUser.role === 'ADMIN') {
// // //         payload.regionScope = regionConfig.scope;
        
// // //         // Validasi sederhana
// // //         if (regionConfig.scope === 'province' && regionConfig.provinces.length === 0) {
// // //           throw new Error("Pilih minimal satu provinsi untuk Admin Provinsi.");
// // //         }
// // //         if (regionConfig.scope === 'regency' && regionConfig.regencies.length === 0) {
// // //           throw new Error("Pilih minimal satu kabupaten untuk Admin Kabupaten.");
// // //         }

// // //         payload.managedProvinces = regionConfig.provinces;
// // //         payload.managedRegencies = regionConfig.regencies;
// // //       } else {
// // //         // Reset jika bukan admin (jaga-jaga)
// // //         payload.regionScope = 'national';
// // //         payload.managedProvinces = [];
// // //         payload.managedRegencies = [];
// // //       }

// // //       // 3. Kirim ke Backend
// // //       await api('/api/admin/users', { method: 'POST', body: payload });
      
// // //       alert('User berhasil ditambahkan!');
      
// // //       // Reset Form
// // //       setShowAddModal(false);
// // //       setNewUser({ name: '', email: '', password: '', role: 'STUDENT' });
// // //       setRegionConfig({ scope: 'national', provinces: [], regencies: [] });
      
// // //       loadUsers(); 
// // //     } catch (err: any) {
// // //       alert(err.message || 'Gagal menambah user');
// // //     } finally {
// // //       setIsSaving(false);
// // //     }
// // //   };

// // //   // Handler: Ubah Role (Dropdown di Tabel)
// // //   const handleRoleChange = async (userId: string, newRole: string) => {
// // //     if (newRole === 'ADMIN') {
// // //         if(!confirm("Anda mengubah user ini menjadi ADMIN. Pastikan untuk masuk ke menu 'Detail' user ini nanti untuk mengatur Wilayah Kerjanya.")) return;
// // //     }

// // //     try {
// // //       setUsers(prev => prev.map(u => u._id === userId ? { ...u, role: newRole } : u));
// // //       await api(`/api/admin/users/${userId}`, { method: 'PATCH', body: { role: newRole } });
// // //     } catch (err: any) {
// // //       alert('Gagal update role: ' + err.message);
// // //       loadUsers(); 
// // //     }
// // //   };

// // //   const handleDelete = async (userId: string) => {
// // //     if (!confirm('Hapus user ini? Data tidak bisa dikembalikan.')) return;
// // //     try {
// // //       await api(`/api/admin/users/${userId}`, { method: 'DELETE' });
// // //       setUsers(prev => prev.filter(u => u._id !== userId));
// // //     } catch (err: any) {
// // //       alert('Gagal: ' + err.message);
// // //     }
// // //   };

// // //   // Filter Search
// // //   const filteredUsers = users.filter(u => 
// // //     u.name.toLowerCase().includes(search.toLowerCase()) || 
// // //     u.email.toLowerCase().includes(search.toLowerCase())
// // //   );

// // //   const getRoleBadge = (role: string) => {
// // //     switch (role) {
// // //       case 'SUPER_ADMIN': return 'bg-purple-100 text-purple-800 border-purple-200';
// // //       case 'ADMIN': return 'bg-orange-100 text-orange-800 border-orange-200';
// // //       case 'FACILITATOR': return 'bg-blue-100 text-blue-800 border-blue-200';
// // //       default: return 'bg-gray-100 text-gray-800 border-gray-200';
// // //     }
// // //   };

// // //   return (
// // //     <div className="p-6 max-w-7xl mx-auto">
// // //       {/* HEADER */}
// // //       <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
// // //         <div>
// // //             <h1 className="text-2xl font-bold text-gray-800">Manajemen Pengguna</h1>
// // //             <p className="text-sm text-gray-500">Kelola akses, role, dan wilayah kerja admin.</p>
// // //         </div>
// // //         <button 
// // //           onClick={() => setShowAddModal(true)} 
// // //           className="bg-red-600 text-white px-5 py-2.5 rounded-xl hover:bg-red-700 font-bold transition-colors shadow-lg shadow-red-100 flex items-center gap-2"
// // //         >
// // //           <Plus size={18}/> Tambah User
// // //         </button>
// // //       </div>

// // //       {/* SEARCH BAR */}
// // //       <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex items-center gap-3">
// // //         <Search className="text-gray-400" size={20}/>
// // //         <input 
// // //             type="text" 
// // //             placeholder="Cari nama atau email..." 
// // //             className="flex-1 outline-none text-sm"
// // //             value={search}
// // //             onChange={(e) => setSearch(e.target.value)}
// // //         />
// // //       </div>

// // //       {/* MODAL TAMBAH USER */}
// // //       {showAddModal && (
// // //         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
// // //           <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl flex flex-col max-h-[90vh]">
// // //             <div className="p-6 border-b">
// // //                 <h2 className="text-xl font-bold text-gray-800">Tambah User Baru</h2>
// // //             </div>
            
// // //             <div className="p-6 overflow-y-auto custom-scrollbar">
// // //                 <form id="addUserForm" onSubmit={handleCreateUser} className="space-y-5">
// // //                 <div>
// // //                     <label className="block text-xs font-bold text-gray-700 mb-1 uppercase">Nama Lengkap</label>
// // //                     <input className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-red-500 outline-none text-sm" placeholder="Contoh: Budi Santoso" required value={newUser.name} onChange={e => setNewUser({...newUser, name: e.target.value})}/>
// // //                 </div>
// // //                 <div>
// // //                     <label className="block text-xs font-bold text-gray-700 mb-1 uppercase">Email</label>
// // //                     <input className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-red-500 outline-none text-sm" type="email" placeholder="budi@example.com" required value={newUser.email} onChange={e => setNewUser({...newUser, email: e.target.value})}/>
// // //                 </div>
// // //                 <div>
// // //                     <label className="block text-xs font-bold text-gray-700 mb-1 uppercase">Password</label>
// // //                     <input className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-red-500 outline-none text-sm" type="password" placeholder="Minimal 6 karakter" required value={newUser.password} onChange={e => setNewUser({...newUser, password: e.target.value})}/>
// // //                 </div>
                
// // //                 <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
// // //                     <label className="block text-xs font-bold text-gray-700 mb-2 uppercase">Role / Peran</label>
// // //                     <select 
// // //                         className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-red-500 outline-none bg-white text-sm font-bold"
// // //                         value={newUser.role}
// // //                         onChange={e => setNewUser({...newUser, role: e.target.value})}
// // //                         // [FIX AXE] Tambahkan label aksesibilitas
// // //                         aria-label="Pilih Peran User Baru"
// // //                         title="Pilih Peran User Baru"
// // //                     >
// // //                         <option value="STUDENT">STUDENT (Peserta)</option>
// // //                         <option value="FACILITATOR">FACILITATOR (Pengajar)</option>
// // //                         <option value="ADMIN">ADMIN (Wilayah/Konten)</option>
// // //                         <option value="SUPER_ADMIN">SUPER ADMIN</option>
// // //                     </select>

// // //                     {/* REGION SELECTOR (Hanya jika Role ADMIN) */}
// // //                     {newUser.role === 'ADMIN' && (
// // //                         <div className="mt-4 animate-in slide-in-from-top-2">
// // //                             <div className="flex items-center gap-2 mb-2 text-orange-700 bg-orange-50 p-2 rounded-lg text-xs">
// // //                                 <MapPin size={14}/> Konfigurasi Wilayah Kerja
// // //                             </div>
// // //                             <RegionSelector 
// // //                                 value={regionConfig} 
// // //                                 onChange={(val) => setRegionConfig(val)} 
// // //                             />
// // //                         </div>
// // //                     )}
// // //                 </div>
// // //                 </form>
// // //             </div>

// // //             <div className="p-4 border-t bg-gray-50 rounded-b-2xl flex justify-end gap-3">
// // //                 <button type="button" onClick={() => setShowAddModal(false)} className="px-5 py-2.5 text-gray-600 font-bold hover:bg-gray-200 rounded-xl transition-colors text-sm">Batal</button>
// // //                 <button type="submit" form="addUserForm" disabled={isSaving} className="px-6 py-2.5 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 disabled:opacity-50 transition-colors shadow-lg shadow-red-200 text-sm flex items-center gap-2">
// // //                     {isSaving ? <Loader2 className="animate-spin" size={16}/> : <Plus size={16}/>} Simpan User
// // //                 </button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}

// // //       {/* --- TABEL USER --- */}
// // //       {loading ? (
// // //         <div className="flex flex-col items-center justify-center py-20 text-gray-400">
// // //             <Loader2 className="animate-spin mb-2" size={32}/>
// // //             <p>Memuat data...</p>
// // //         </div>
// // //       ) : (
// // //         <div className="bg-white shadow-xl shadow-gray-100 rounded-2xl border border-gray-100 overflow-hidden">
// // //           <div className="overflow-x-auto">
// // //             <table className="w-full text-left border-collapse">
// // //               <thead className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
// // //                 <tr>
// // //                   <th className="px-6 py-4 border-b border-gray-100">Nama User</th>
// // //                   <th className="px-6 py-4 border-b border-gray-100">Email</th>
// // //                   <th className="px-6 py-4 border-b border-gray-100">Role</th>
// // //                   <th className="px-6 py-4 border-b border-gray-100">Wilayah / Scope</th>
// // //                   <th className="px-6 py-4 border-b border-gray-100 text-right">Aksi</th>
// // //                 </tr>
// // //               </thead>
// // //               <tbody className="divide-y divide-gray-50">
// // //                 {filteredUsers.map((user) => (
// // //                   <tr key={user._id} className="hover:bg-gray-50/80 transition-colors group">
// // //                     <td className="px-6 py-4">
// // //                       <div>
// // //                           <p className="font-bold text-gray-900 text-sm">{user.name}</p>
// // //                       </div>
// // //                     </td>
// // //                     <td className="px-6 py-4 text-xs text-gray-500">
// // //                         {user.email}
// // //                     </td>
// // //                     <td className="px-6 py-4">
// // //                       <select 
// // //                         value={user.role}
// // //                         onChange={(e) => handleRoleChange(user._id, e.target.value)}
// // //                         className={`text-[10px] font-black px-2 py-1.5 rounded-lg border cursor-pointer outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-500 ${getRoleBadge(user.role)}`}
                        
// // //                         // [FIX AXE] Tambahkan aria-label yang unik per baris
// // //                         aria-label={`Ubah role untuk ${user.name}`}
// // //                         title={`Ubah role untuk ${user.name}`}
// // //                       >
// // //                         <option value="STUDENT">STUDENT</option>
// // //                         <option value="FACILITATOR">FACILITATOR</option>
// // //                         <option value="ADMIN">ADMIN</option>
// // //                         <option value="SUPER_ADMIN">SUPER ADMIN</option>
// // //                       </select>
// // //                     </td>
// // //                     <td className="px-6 py-4">
// // //                         {user.role === 'ADMIN' ? (
// // //                             <div className="text-xs">
// // //                                 {user.regionScope === 'national' && <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded font-bold">NASIONAL</span>}
// // //                                 {user.regionScope === 'province' && (
// // //                                     <div>
// // //                                         <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded font-bold mb-1 inline-block">PROVINSI</span>
// // //                                         <p className="text-[10px] text-gray-500 mt-1 max-w-[150px] truncate" title={user.managedProvinces?.join(', ')}>
// // //                                             {user.managedProvinces?.length || 0} Wilayah
// // //                                         </p>
// // //                                     </div>
// // //                                 )}
// // //                                 {user.regionScope === 'regency' && (
// // //                                     <div>
// // //                                         <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded font-bold mb-1 inline-block">KABUPATEN</span>
// // //                                         <p className="text-[10px] text-gray-500 mt-1 max-w-[150px] truncate" title={user.managedRegencies?.join(', ')}>
// // //                                             {user.managedRegencies?.length || 0} Wilayah
// // //                                         </p>
// // //                                     </div>
// // //                                 )}
// // //                             </div>
// // //                         ) : (
// // //                             <span className="text-gray-300 text-xs">-</span>
// // //                         )}
// // //                     </td>
// // //                     <td className="px-6 py-4 text-right space-x-2">
// // //                       <Link href={`/admin/users/${user._id}`} className="inline-block bg-white border border-gray-200 text-gray-600 hover:text-blue-600 hover:border-blue-200 px-3 py-1.5 rounded-lg text-xs font-bold transition-all" aria-label={`Detail user ${user.name}`}>
// // //                         Detail
// // //                       </Link>
// // //                       <button onClick={() => handleDelete(user._id)} className="bg-white border border-gray-200 text-gray-400 hover:text-red-600 hover:border-red-200 px-3 py-1.5 rounded-lg text-xs font-bold transition-all" aria-label={`Hapus user ${user.name}`} title="Hapus User">
// // //                         <Trash2 size={14}/>
// // //                       </button>
// // //                     </td>
// // //                   </tr>
// // //                 ))}
// // //               </tbody>
// // //             </table>
// // //           </div>
// // //           {filteredUsers.length === 0 && (
// // //             <div className="p-10 text-center text-gray-500 flex flex-col items-center">
// // //               <p className="text-lg font-bold text-gray-400">Tidak ada user ditemukan.</p>
// // //             </div>
// // //           )}
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }


// // 'use client';

// // import { useEffect, useState } from 'react';
// // import { api, getImageUrl } from '@/lib/api';
// // import Link from 'next/link';
// // import { Loader2, Plus, Trash2, Search, MapPin, KeyRound, Shield, Eye } from 'lucide-react';
// // import RegionSelector from '@/components/admin/RegionSelector';

// // interface RegionConfig {
// //   scope: 'national' | 'province' | 'regency';
// //   provinces: string[];
// //   regencies: string[];
// // }

// // export default function AdminUsersPage() {
// //   const [users, setUsers] = useState<any[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [search, setSearch] = useState('');
// //   const [roleFilter, setRoleFilter] = useState('ALL');
  
// //   // Modal & Form State
// //   const [showAddModal, setShowAddModal] = useState(false);
// //   const [isSaving, setIsSaving] = useState(false);
// //   const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'STUDENT' });
// //   const [regionConfig, setRegionConfig] = useState<RegionConfig>({ scope: 'national', provinces: [], regencies: [] });

// //   useEffect(() => { loadUsers(); }, []);

// //   const loadUsers = async () => {
// //     try {
// //       setLoading(true);
// //       const res = await api('/api/admin/users');
// //       setUsers(res.users || []);
// //     } catch (err: any) {
// //       console.error(err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleCreateUser = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setIsSaving(true);
// //     try {
// //       const payload: any = { ...newUser };
// //       if (newUser.role === 'ADMIN') {
// //         payload.regionScope = regionConfig.scope;
// //         payload.managedProvinces = regionConfig.provinces;
// //         payload.managedRegencies = regionConfig.regencies;
// //       }
// //       await api('/api/admin/users', { method: 'POST', body: payload });
// //       alert('User berhasil dibuat!');
// //       setShowAddModal(false);
// //       loadUsers();
// //     } catch (err: any) {
// //       alert(err.message || 'Gagal buat user');
// //     } finally { setIsSaving(false); }
// //   };

// //   const handleDelete = async (userId: string) => {
// //     if (!confirm('Hapus user ini?')) return;
// //     try {
// //       await api(`/api/admin/users/${userId}`, { method: 'DELETE' });
// //       setUsers(prev => prev.filter(u => u._id !== userId));
// //     } catch (e) { alert('Gagal hapus'); }
// //   };

// //   const handleResetPassword = async (userId: string, userName: string) => {
// //       if (!confirm(`Reset password "${userName}" menjadi "123456"?`)) return;
// //       try {
// //           await api(`/api/admin/users/${userId}/reset-password`, { method: 'PATCH' });
// //           alert(`✅ Sukses! Password ${userName} sekarang: 123456`);
// //       } catch (e: any) {
// //           alert(`Gagal: ${e.message}`);
// //       }
// //   };

// //   // Logic Filter
// //   const filteredUsers = users.filter(u => {
// //       const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
// //       const matchRole = roleFilter === 'ALL' || u.role === roleFilter;
// //       return matchSearch && matchRole;
// //   });

// //   const getRoleBadge = (role: string) => {
// //     switch (role) {
// //       case 'SUPER_ADMIN': return 'bg-purple-100 text-purple-800 border-purple-200';
// //       case 'ADMIN': return 'bg-orange-100 text-orange-800 border-orange-200';
// //       case 'FACILITATOR': return 'bg-blue-100 text-blue-800 border-blue-200';
// //       default: return 'bg-gray-100 text-gray-800 border-gray-200';
// //     }
// //   };

// //   return (
// //     <div className="p-6 max-w-7xl mx-auto min-h-screen bg-gray-50/50">
      
// //       {/* HEADER */}
// //       <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
// //         <div>
// //             <h1 className="text-2xl font-bold text-gray-800">Manajemen Pengguna</h1>
// //             <p className="text-sm text-gray-500">Total: {users.length} User Terdaftar</p>
// //         </div>
// //         <button onClick={() => setShowAddModal(true)} className="bg-red-600 text-white px-5 py-2.5 rounded-xl hover:bg-red-700 font-bold shadow-lg flex items-center gap-2">
// //           <Plus size={18}/> Tambah User
// //         </button>
// //       </div>

// //       {/* FILTER BAR */}
// //       <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row gap-4">
// //         <div className="relative flex-1">
// //             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
// //             <input 
// //                 type="text" 
// //                 placeholder="Cari nama, email, atau NIK..." 
// //                 className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none text-sm"
// //                 value={search}
// //                 onChange={(e) => setSearch(e.target.value)}
// //             />
// //         </div>
        
// //         {/* [FIX 1] Menambahkan aria-label untuk Select Filter */}
// //         <select 
// //             className="p-2 border rounded-lg bg-gray-50 text-sm font-medium focus:ring-2 focus:ring-red-500 outline-none"
// //             value={roleFilter}
// //             onChange={(e) => setRoleFilter(e.target.value)}
// //             aria-label="Filter berdasarkan Role"
// //             title="Filter berdasarkan Role"
// //         >
// //             <option value="ALL">Semua Role</option>
// //             <option value="STUDENT">Peserta (Student)</option>
// //             <option value="FACILITATOR">Fasilitator</option>
// //             <option value="ADMIN">Admin Wilayah</option>
// //             <option value="SUPER_ADMIN">Super Admin</option>
// //         </select>
// //       </div>

// //       {/* MODAL TAMBAH (Singkat) */}
// //       {showAddModal && (
// //         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
// //           <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95">
// //             <div className="p-6 border-b"><h2 className="font-bold text-lg">Tambah User Baru</h2></div>
// //             <form onSubmit={handleCreateUser} className="p-6 space-y-4">
// //                 <input className="w-full border p-3 rounded-lg" placeholder="Nama Lengkap" required value={newUser.name} onChange={e => setNewUser({...newUser, name: e.target.value})}/>
// //                 <input className="w-full border p-3 rounded-lg" type="email" placeholder="Email" required value={newUser.email} onChange={e => setNewUser({...newUser, email: e.target.value})}/>
// //                 <input className="w-full border p-3 rounded-lg" type="password" placeholder="Password" required value={newUser.password} onChange={e => setNewUser({...newUser, password: e.target.value})}/>
                
// //                 {/* [FIX 2] Menambahkan aria-label untuk Select di Modal */}
// //                 <select 
// //                     className="w-full border p-3 rounded-lg bg-white" 
// //                     value={newUser.role} 
// //                     onChange={e => setNewUser({...newUser, role: e.target.value})}
// //                     aria-label="Pilih Role User Baru"
// //                     title="Pilih Role User Baru"
// //                 >
// //                     <option value="STUDENT">STUDENT</option>
// //                     <option value="FACILITATOR">FACILITATOR</option>
// //                     <option value="ADMIN">ADMIN</option>
// //                 </select>

// //                 {/* Region Selector Component Here (Jika Admin) */}
// //                 <div className="flex justify-end gap-2 pt-4">
// //                     <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 text-gray-600 font-bold">Batal</button>
// //                     <button type="submit" disabled={isSaving} className="px-6 py-2 bg-red-600 text-white rounded-lg font-bold">{isSaving ? 'Menyimpan...' : 'Simpan'}</button>
// //                 </div>
// //             </form>
// //           </div>
// //         </div>
// //       )}

// //       {/* TABEL USER */}
// //       {loading ? <div className="text-center py-20"><Loader2 className="animate-spin mx-auto"/></div> : (
// //         <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
// //           <table className="w-full text-left text-sm">
// //             <thead className="bg-gray-50 text-gray-500 font-bold text-xs uppercase">
// //                 <tr>
// //                     <th className="px-6 py-4">User</th>
// //                     <th className="px-6 py-4">Role</th>
// //                     <th className="px-6 py-4">Wilayah</th>
// //                     <th className="px-6 py-4 text-right">Aksi</th>
// //                 </tr>
// //             </thead>
// //             <tbody className="divide-y divide-gray-100">
// //                 {filteredUsers.map((user) => (
// //                     <tr key={user._id} className="hover:bg-gray-50 transition">
// //                         <td className="px-6 py-4">
// //                             <div className="flex items-center gap-3">
// //                                 <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
// //                                     <img src={getImageUrl(user.avatarUrl) || `https://ui-avatars.com/api/?name=${user.name}`} className="w-full h-full object-cover" alt=""/>
// //                                 </div>
// //                                 <div>
// //                                     <p className="font-bold text-gray-900">{user.name}</p>
// //                                     <p className="text-xs text-gray-500">{user.email}</p>
// //                                 </div>
// //                             </div>
// //                         </td>
// //                         <td className="px-6 py-4">
// //                             <span className={`px-2 py-1 rounded text-xs font-bold border ${getRoleBadge(user.role)}`}>{user.role}</span>
// //                         </td>
// //                         <td className="px-6 py-4">
// //                             {user.regionScope !== 'national' ? (
// //                                 <div className="text-xs text-gray-600 flex items-center gap-1">
// //                                     <Shield size={12}/> 
// //                                     {user.regionScope === 'province' ? 'Provinsi' : 'Kabupaten'}
// //                                 </div>
// //                             ) : <span className="text-gray-300 text-xs">-</span>}
// //                         </td>
// //                         <td className="px-6 py-4 text-right">
// //                             <div className="flex items-center justify-end gap-2">
// //                                 <button 
// //                                     onClick={() => handleResetPassword(user._id, user.name)}
// //                                     className="p-2 text-orange-600 bg-orange-50 hover:bg-orange-100 rounded-lg tooltip-trigger" 
// //                                     title="Reset Password ke 123456"
// //                                     aria-label={`Reset password untuk ${user.name}`}
// //                                 >
// //                                     <KeyRound size={16}/>
// //                                 </button>
// //                                 <Link href={`/admin/users/${user._id}`} className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg" title="Detail" aria-label={`Detail user ${user.name}`}>
// //                                     <Eye size={16}/>
// //                                 </Link>
// //                                 <button onClick={() => handleDelete(user._id)} className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg" title="Hapus" aria-label={`Hapus user ${user.name}`}>
// //                                     <Trash2 size={16}/>
// //                                 </button>
// //                             </div>
// //                         </td>
// //                     </tr>
// //                 ))}
// //             </tbody>
// //           </table>
// //           {filteredUsers.length === 0 && <div className="p-10 text-center text-gray-400">Tidak ada user ditemukan.</div>}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// 'use client';

// import { useEffect, useState } from 'react';
// import { api, getImageUrl } from '@/lib/api';
// import Link from 'next/link';
// import { 
//     Loader2, Plus, Trash2, Search, MapPin, KeyRound, Shield, Eye, 
//     ChevronDown, ChevronRight, LayoutList, Layers 
// } from 'lucide-react';
// import RegionSelector from '@/components/admin/RegionSelector'; 

// interface RegionConfig {
//   scope: 'national' | 'province' | 'regency';
//   provinces: string[];
//   regencies: string[];
// }

// export default function AdminUsersPage() {
//   const [users, setUsers] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState('');
  
//   // View Mode: 'list' = Tabel Biasa (Legacy), 'cluster' = Kelompok Wilayah (New)
//   const [viewMode, setViewMode] = useState<'list' | 'cluster'>('cluster');
  
//   // State untuk Accordion UI
//   const [expandedProvinces, setExpandedProvinces] = useState<Record<string, boolean>>({});
//   const [expandedRegencies, setExpandedRegencies] = useState<Record<string, boolean>>({});

//   // Modal & Form State (Logic Lama Tetap Utuh)
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);
//   const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'STUDENT' });
//   const [regionConfig, setRegionConfig] = useState<RegionConfig>({ scope: 'national', provinces: [], regencies: [] });

//   useEffect(() => { loadUsers(); }, []);

//   const loadUsers = async () => {
//     try {
//       setLoading(true);
//       const res = await api('/api/admin/users');
//       setUsers(res.users || []);
//     } catch (err: any) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --- LOGIC GROUPING (KLASTERISASI - UI ONLY) ---
//   // Ini hanya logika transform data untuk tampilan, tidak mengubah data asli
//   const getClusteredUsers = () => {
//     const groups: Record<string, Record<string, any[]>> = {};

//     const filtered = users.filter(u => 
//         u.name.toLowerCase().includes(search.toLowerCase()) || 
//         u.email.toLowerCase().includes(search.toLowerCase()) ||
//         (u.memberData?.nia || '').includes(search)
//     );

//     filtered.forEach(user => {
//         // Fallback Logic agar tidak 'undefined'
//         let prov = user.memberData?.province || user.managedProvinces?.[0] || 'LAINNYA';
//         let kab = user.memberData?.regency || user.managedRegencies?.[0] || 'UMUM / PUSAT';

//         // Normalisasi String
//         prov = (prov || 'LAINNYA').toUpperCase().trim();
//         kab = (kab || 'UMUM').toUpperCase().trim();

//         if (!groups[prov]) groups[prov] = {};
//         if (!groups[prov][kab]) groups[prov][kab] = [];
        
//         groups[prov][kab].push(user);
//     });

//     return groups;
//   };

//   const clusteredData = getClusteredUsers();

//   // --- HANDLERS (LOGIKA LAMA - TETAP UTUH) ---
//   const handleCreateUser = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSaving(true);
//     try {
//       const payload: any = { ...newUser };
//       if (newUser.role === 'ADMIN') {
//         payload.regionScope = regionConfig.scope;
//         payload.managedProvinces = regionConfig.provinces;
//         payload.managedRegencies = regionConfig.regencies;
//       }
//       await api('/api/admin/users', { method: 'POST', body: payload });
//       alert('User berhasil dibuat!');
//       setShowAddModal(false);
//       loadUsers();
//     } catch (err: any) {
//       alert(err.message || 'Gagal buat user');
//     } finally { setIsSaving(false); }
//   };

//   const handleDelete = async (userId: string) => {
//     if (!confirm('Hapus user ini?')) return;
//     try {
//       await api(`/api/admin/users/${userId}`, { method: 'DELETE' });
//       setUsers(prev => prev.filter(u => u._id !== userId));
//     } catch (e) { alert('Gagal hapus'); }
//   };

//   const handleResetPassword = async (userId: string, userName: string) => {
//       if (!confirm(`Reset password "${userName}" menjadi "123456"?`)) return;
//       try {
//           await api(`/api/admin/users/${userId}/reset-password`, { method: 'PATCH' });
//           alert(`✅ Sukses! Password ${userName} sekarang: 123456`);
//       } catch (e: any) {
//           alert(`Gagal: ${e.message}`);
//       }
//   };

//   // --- UI ACTIONS ---
//   const toggleProvince = (prov: string) => {
//       setExpandedProvinces(prev => ({...prev, [prov]: !prev[prov]}));
//   };

//   const toggleRegency = (kabId: string) => {
//       setExpandedRegencies(prev => ({...prev, [kabId]: !prev[kabId]}));
//   };

//   // --- SUB-COMPONENT: TABEL USER (REUSABLE) ---
//   const UserTable = ({ data }: { data: any[] }) => (
//     <table className="w-full text-left text-sm bg-white rounded-lg overflow-hidden">
//         <thead className="bg-gray-50 text-gray-500 font-bold text-[10px] uppercase border-b border-gray-100">
//             <tr>
//                 <th className="px-4 py-3">Nama Anggota</th>
//                 <th className="px-4 py-3">Role</th>
//                 <th className="px-4 py-3">Unit / Asal</th>
//                 <th className="px-4 py-3 text-right">Aksi</th>
//             </tr>
//         </thead>
//         <tbody className="divide-y divide-gray-50">
//             {data.map(user => (
//                 <tr key={user._id} className="hover:bg-gray-50 transition-colors">
//                     <td className="px-4 py-3">
//                         <div className="flex items-center gap-3">
//                             <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden border border-gray-100">
//                                 <img src={getImageUrl(user.avatarUrl)} className="w-full h-full object-cover" alt=""/>
//                             </div>
//                             <div>
//                                 <p className="font-bold text-gray-900 text-sm">{user.name}</p>
//                                 <p className="text-[10px] text-gray-400">{user.email}</p>
//                             </div>
//                         </div>
//                     </td>
//                     <td className="px-4 py-3">
//                         <span className={`text-[10px] px-2 py-0.5 rounded font-bold border ${
//                             user.role === 'ADMIN' ? 'bg-orange-50 border-orange-200 text-orange-700' : 
//                             user.role === 'SUPER_ADMIN' ? 'bg-purple-50 border-purple-200 text-purple-700' :
//                             user.role === 'FACILITATOR' ? 'bg-blue-50 border-blue-200 text-blue-700' :
//                             'bg-gray-50 border-gray-200 text-gray-600'
//                         }`}>
//                             {user.role}
//                         </span>
//                     </td>
//                     <td className="px-4 py-3 text-xs text-gray-600">
//                         {user.memberData?.unit || '-'}
//                     </td>
//                     <td className="px-4 py-3 text-right flex justify-end gap-1">
//                          <button onClick={() => handleResetPassword(user._id, user.name)} className="p-1.5 text-orange-600 bg-orange-50 rounded hover:bg-orange-100 transition" title="Reset Password" aria-label={`Reset pass ${user.name}`}><KeyRound size={14}/></button>
//                          <Link href={`/admin/users/${user._id}`} className="p-1.5 text-blue-600 bg-blue-50 rounded hover:bg-blue-100 transition" title="Detail" aria-label={`Detail ${user.name}`}><Eye size={14}/></Link>
//                          <button onClick={() => handleDelete(user._id)} className="p-1.5 text-red-600 bg-red-50 rounded hover:bg-red-100 transition" title="Hapus" aria-label={`Hapus ${user.name}`}><Trash2 size={14}/></button>
//                     </td>
//                 </tr>
//             ))}
//         </tbody>
//     </table>
//   );

//   return (
//     <div className="p-6 max-w-7xl mx-auto min-h-screen bg-gray-50/30">
      
//       {/* HEADER UTAMA */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
//         <div>
//             <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Data Anggota & Pengguna</h1>
//             <p className="text-sm text-gray-500 mt-1">Kelola seluruh data anggota KSR, PMR, dan Admin dalam satu tempat.</p>
//         </div>
//         <div className="flex gap-3">
//              {/* VIEW TOGGLE */}
//             <div className="flex bg-white p-1 rounded-xl border border-gray-200 shadow-sm">
//                 <button 
//                     onClick={() => setViewMode('cluster')}
//                     className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${viewMode === 'cluster' ? 'bg-red-50 text-red-700' : 'text-gray-500 hover:bg-gray-50'}`}
//                 >
//                     <Layers size={14}/> Wilayah
//                 </button>
//                 <button 
//                     onClick={() => setViewMode('list')}
//                     className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${viewMode === 'list' ? 'bg-red-50 text-red-700' : 'text-gray-500 hover:bg-gray-50'}`}
//                 >
//                     <LayoutList size={14}/> Tabel
//                 </button>
//             </div>

//             <button onClick={() => setShowAddModal(true)} className="bg-red-700 text-white px-5 py-2.5 rounded-xl hover:bg-red-800 font-bold shadow-lg shadow-red-200 flex items-center gap-2 transition-all active:scale-95">
//                 <Plus size={18}/> Tambah User
//             </button>
//         </div>
//       </div>

//       {/* SEARCH BAR */}
//       <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6 flex items-center gap-3 sticky top-4 z-30">
//         <Search className="text-gray-400" size={20}/>
//         <input 
//             type="text" 
//             placeholder="Cari nama, email, NIA, atau Unit..." 
//             className="flex-1 outline-none text-sm font-medium"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//         />
//         {search && <button onClick={() => setSearch('')} className="text-xs font-bold text-gray-400 hover:text-red-600">RESET</button>}
//       </div>

//       {/* CONTENT AREA */}
//       {loading ? (
//           <div className="text-center py-20"><Loader2 className="animate-spin mx-auto text-red-600" size={32}/></div>
//       ) : (
//           <div>
//             {/* TAMPILAN CLUSTER (ACCORDION) */}
//             {viewMode === 'cluster' && (
//                 <div className="space-y-4">
//                     {Object.keys(clusteredData).length === 0 && (
//                         <div className="text-center py-10 text-gray-400 bg-white rounded-2xl border border-dashed">Tidak ada data ditemukan.</div>
//                     )}

//                     {Object.keys(clusteredData).sort().map(prov => {
//                         const totalUsersInProv = Object.values(clusteredData[prov]).flat().length;
//                         const isProvOpen = expandedProvinces[prov] || search !== ''; // Auto open jika sedang search

//                         return (
//                             <div key={prov} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm transition-all hover:shadow-md">
//                                 {/* HEADER PROVINSI */}
//                                 <div 
//                                     onClick={() => toggleProvince(prov)}
//                                     className="p-4 flex justify-between items-center cursor-pointer bg-gray-50/50 hover:bg-gray-50 transition-colors"
//                                 >
//                                     <div className="flex items-center gap-3">
//                                         <div className={`p-2 rounded-lg transition-transform duration-300 ${isProvOpen ? 'rotate-90 bg-red-100 text-red-600' : 'bg-white text-gray-400 border border-gray-200'}`}>
//                                             <ChevronRight size={18}/>
//                                         </div>
//                                         <div>
//                                             <h3 className="font-bold text-gray-800 text-lg">{prov}</h3>
//                                             <p className="text-xs text-gray-500 flex items-center gap-1">
//                                                 <MapPin size={10}/> {Object.keys(clusteredData[prov]).length} Kabupaten/Kota
//                                             </p>
//                                         </div>
//                                     </div>
//                                     <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
//                                         {totalUsersInProv} Anggota
//                                     </span>
//                                 </div>

//                                 {/* LIST KABUPATEN (ISI PROVINSI) */}
//                                 {isProvOpen && (
//                                     <div className="p-4 bg-white border-t border-gray-100 space-y-3 animate-in slide-in-from-top-2">
//                                         {Object.keys(clusteredData[prov]).sort().map(kab => {
//                                             const kabUsers = clusteredData[prov][kab];
//                                             const kabId = `${prov}-${kab}`;
//                                             const isKabOpen = expandedRegencies[kabId] || search !== '';

//                                             return (
//                                                 <div key={kabId} className="border border-gray-200 rounded-xl overflow-hidden">
//                                                     <div 
//                                                         onClick={() => toggleRegency(kabId)}
//                                                         className="px-4 py-3 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors"
//                                                     >
//                                                         <div className="flex items-center gap-2">
//                                                             <ChevronDown size={14} className={`transition-transform ${isKabOpen ? 'rotate-180 text-blue-600' : 'text-gray-400'}`}/>
//                                                             <span className="font-bold text-sm text-gray-700">{kab}</span>
//                                                         </div>
//                                                         <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
//                                                             {kabUsers.length} User
//                                                         </span>
//                                                     </div>

//                                                     {/* TABEL USER (ISI KABUPATEN) */}
//                                                     {isKabOpen && (
//                                                         <div className="border-t border-gray-100 p-2 bg-gray-50/30">
//                                                             <UserTable data={kabUsers} />
//                                                         </div>
//                                                     )}
//                                                 </div>
//                                             );
//                                         })}
//                                     </div>
//                                 )}
//                             </div>
//                         );
//                     })}
//                 </div>
//             )}

//             {/* TAMPILAN LIST (FLAT TABLE - FALLBACK) */}
//             {viewMode === 'list' && (
//                  <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
//                     <UserTable data={users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()))} />
//                  </div>
//             )}
//           </div>
//       )}

//       {/* MODAL TAMBAH USER (SAMA SEPERTI SEBELUMNYA) */}
//       {showAddModal && (
//         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
//           <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl animate-in zoom-in-95 overflow-hidden">
//             <div className="p-6 border-b bg-gray-50">
//                 <h2 className="font-bold text-lg text-gray-800">Tambah User Baru</h2>
//                 <p className="text-xs text-gray-500">Buat akun untuk Admin, Fasilitator, atau Peserta.</p>
//             </div>
//             <form onSubmit={handleCreateUser} className="p-6 space-y-4">
//                 <div>
//                     <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Nama</label>
//                     <input className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-red-500 outline-none" placeholder="Nama Lengkap" required value={newUser.name} onChange={e => setNewUser({...newUser, name: e.target.value})}/>
//                 </div>
//                 <div>
//                     <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Email</label>
//                     <input className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-red-500 outline-none" type="email" placeholder="Email" required value={newUser.email} onChange={e => setNewUser({...newUser, email: e.target.value})}/>
//                 </div>
//                 <div>
//                     <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Password</label>
//                     <input className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-red-500 outline-none" type="password" placeholder="Password" required value={newUser.password} onChange={e => setNewUser({...newUser, password: e.target.value})}/>
//                 </div>
//                 <div>
//                     <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Role</label>
//                     <select 
//                         className="w-full border p-3 rounded-xl bg-white focus:ring-2 focus:ring-red-500 outline-none" 
//                         value={newUser.role} 
//                         onChange={e => setNewUser({...newUser, role: e.target.value})}
//                         aria-label="Pilih Role"
//                     >
//                         <option value="STUDENT">STUDENT (Peserta)</option>
//                         <option value="FACILITATOR">FACILITATOR (Pengajar)</option>
//                         <option value="ADMIN">ADMIN (Wilayah)</option>
//                     </select>
//                 </div>
                
//                 {newUser.role === 'ADMIN' && (
//                     <div className="bg-orange-50 p-4 rounded-xl border border-orange-200">
//                         <p className="text-xs font-bold text-orange-800 mb-2 flex items-center gap-1"><MapPin size={12}/> Konfigurasi Wilayah</p>
//                         <RegionSelector value={regionConfig} onChange={setRegionConfig} />
//                     </div>
//                 )}

//                 <div className="flex justify-end gap-2 pt-4 border-t">
//                     <button type="button" onClick={() => setShowAddModal(false)} className="px-5 py-2.5 text-gray-600 font-bold hover:bg-gray-100 rounded-xl text-sm">Batal</button>
//                     <button type="submit" disabled={isSaving} className="px-6 py-2.5 bg-red-700 text-white rounded-xl font-bold hover:bg-red-800 shadow-lg text-sm flex items-center gap-2">
//                         {isSaving ? <Loader2 className="animate-spin" size={16}/> : <Plus size={16}/>} Simpan User
//                     </button>
//                 </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



'use client';

import { useEffect, useState } from 'react';
import { api, getImageUrl } from '@/lib/api';
import Link from 'next/link';
import { 
    Loader2, Plus, Trash2, Search, MapPin, KeyRound, Shield, Eye, 
    ChevronDown, ChevronRight, LayoutList, Layers 
} from 'lucide-react';
import RegionSelector from '@/components/admin/RegionSelector'; 
import { usePermission } from '@/hooks/usePermission';

interface RegionConfig {
  scope: 'national' | 'province' | 'regency';
  provinces: string[];
  regencies: string[];
}

export default function AdminUsersPage() {
  const { hasPermission } = usePermission();
  const canManageUsers = hasPermission('manage_users');

  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  const [viewMode, setViewMode] = useState<'list' | 'cluster'>('cluster');
  
  const [expandedProvinces, setExpandedProvinces] = useState<Record<string, boolean>>({});
  const [expandedRegencies, setExpandedRegencies] = useState<Record<string, boolean>>({});

  const [showAddModal, setShowAddModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'STUDENT' });
  const [regionConfig, setRegionConfig] = useState<RegionConfig>({ scope: 'national', provinces: [], regencies: [] });

  useEffect(() => { loadUsers(); }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const res = await api('/api/admin/users');
      setUsers(res.users || []);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getClusteredUsers = () => {
    const groups: Record<string, Record<string, any[]>> = {};

    const filtered = users.filter(u => 
        u.name.toLowerCase().includes(search.toLowerCase()) || 
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        (u.memberData?.nia || '').includes(search)
    );

    filtered.forEach(user => {
        let prov = user.memberData?.province || user.managedProvinces?.[0] || 'LAINNYA';
        let kab = user.memberData?.regency || user.managedRegencies?.[0] || 'UMUM / PUSAT';

        prov = (prov || 'LAINNYA').toUpperCase().trim();
        kab = (kab || 'UMUM').toUpperCase().trim();

        if (!groups[prov]) groups[prov] = {};
        if (!groups[prov][kab]) groups[prov][kab] = [];
        
        groups[prov][kab].push(user);
    });

    return groups;
  };

  const clusteredData = getClusteredUsers();

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const payload: any = { ...newUser };
      if (newUser.role === 'ADMIN') {
        payload.regionScope = regionConfig.scope;
        payload.managedProvinces = regionConfig.provinces;
        payload.managedRegencies = regionConfig.regencies;
        payload.permissions = []; 
      }
      await api('/api/admin/users', { method: 'POST', body: payload });
      alert('User berhasil dibuat!');
      setShowAddModal(false);
      loadUsers();
    } catch (err: any) {
      alert(err.message || 'Gagal buat user');
    } finally { setIsSaving(false); }
  };

  const handleDelete = async (userId: string) => {
    if (!confirm('Hapus user ini?')) return;
    try {
      await api(`/api/admin/users/${userId}`, { method: 'DELETE' });
      setUsers(prev => prev.filter(u => u._id !== userId));
    } catch (e) { alert('Gagal hapus'); }
  };

  const handleResetPassword = async (userId: string, userName: string) => {
      if (!confirm(`Reset password "${userName}" menjadi "123456"?`)) return;
      try {
          await api(`/api/admin/users/${userId}/reset-password`, { method: 'PATCH' });
          alert(`✅ Sukses! Password ${userName} sekarang: 123456`);
      } catch (e: any) {
          alert(`Gagal: ${e.message}`);
      }
  };

  const toggleProvince = (prov: string) => {
      setExpandedProvinces(prev => ({...prev, [prov]: !prev[prov]}));
  };

  const toggleRegency = (kabId: string) => {
      setExpandedRegencies(prev => ({...prev, [kabId]: !prev[kabId]}));
  };

  const UserTable = ({ data }: { data: any[] }) => (
    <table className="w-full text-left text-sm bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-50 text-gray-500 font-bold text-[10px] uppercase border-b border-gray-100">
            <tr>
                <th className="px-4 py-3">Nama Anggota</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Unit / Asal</th>
                <th className="px-4 py-3 text-right">Aksi</th>
            </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
            {data.map(user => (
                <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden border border-gray-100">
                                <img src={getImageUrl(user.avatarUrl)} className="w-full h-full object-cover" alt=""/>
                            </div>
                            <div>
                                <p className="font-bold text-gray-900 text-sm">{user.name}</p>
                                <p className="text-[10px] text-gray-400">{user.email}</p>
                            </div>
                        </div>
                    </td>
                    <td className="px-4 py-3">
                        <span className={`text-[10px] px-2 py-0.5 rounded font-bold border ${
                            user.role === 'ADMIN' ? 'bg-orange-50 border-orange-200 text-orange-700' : 
                            user.role === 'SUPER_ADMIN' ? 'bg-purple-50 border-purple-200 text-purple-700' :
                            user.role === 'FACILITATOR' ? 'bg-blue-50 border-blue-200 text-blue-700' :
                            'bg-gray-50 border-gray-200 text-gray-600'
                        }`}>
                            {user.role}
                        </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-600">
                        {user.memberData?.unit || user.managedProvinces?.[0] || '-'}
                    </td>
                    <td className="px-4 py-3 text-right flex justify-end gap-1">
                         {canManageUsers && (
                             <>
                                <button onClick={() => handleResetPassword(user._id, user.name)} className="p-1.5 text-orange-600 bg-orange-50 rounded hover:bg-orange-100 transition" title="Reset Password" aria-label="Reset Password"><KeyRound size={14}/></button>
                                <button onClick={() => handleDelete(user._id)} className="p-1.5 text-red-600 bg-red-50 rounded hover:bg-red-100 transition" title="Hapus" aria-label="Hapus User"><Trash2 size={14}/></button>
                             </>
                         )}
                         <Link href={`/admin/users/${user._id}`} className="p-1.5 text-blue-600 bg-blue-50 rounded hover:bg-blue-100 transition" title="Detail" aria-label="Lihat Detail"><Eye size={14}/></Link>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen bg-gray-50/30">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
            <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Data Anggota & Pengguna</h1>
            <p className="text-sm text-gray-500 mt-1">Kelola seluruh data anggota KSR, PMR, dan Admin dalam satu tempat.</p>
        </div>
        <div className="flex gap-3">
            <div className="flex bg-white p-1 rounded-xl border border-gray-200 shadow-sm">
                <button onClick={() => setViewMode('cluster')} className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${viewMode === 'cluster' ? 'bg-red-50 text-red-700' : 'text-gray-500 hover:bg-gray-50'}`}>
                    <Layers size={14}/> Wilayah
                </button>
                <button onClick={() => setViewMode('list')} className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${viewMode === 'list' ? 'bg-red-50 text-red-700' : 'text-gray-500 hover:bg-gray-50'}`}>
                    <LayoutList size={14}/> Tabel
                </button>
            </div>

            {canManageUsers && (
                <button onClick={() => setShowAddModal(true)} className="bg-red-700 text-white px-5 py-2.5 rounded-xl hover:bg-red-800 font-bold shadow-lg shadow-red-200 flex items-center gap-2 transition-all active:scale-95">
                    <Plus size={18}/> Tambah User
                </button>
            )}
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6 flex items-center gap-3 sticky top-4 z-30">
        <Search className="text-gray-400" size={20}/>
        <input 
            type="text" 
            placeholder="Cari nama, email, NIA, atau Unit..." 
            className="flex-1 outline-none text-sm font-medium"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
        {search && <button onClick={() => setSearch('')} className="text-xs font-bold text-gray-400 hover:text-red-600">RESET</button>}
      </div>

      {loading ? (
          <div className="text-center py-20"><Loader2 className="animate-spin mx-auto text-red-600" size={32}/></div>
      ) : (
          <div>
            {viewMode === 'cluster' && (
                <div className="space-y-4">
                    {Object.keys(clusteredData).length === 0 && (
                        <div className="text-center py-10 text-gray-400 bg-white rounded-2xl border border-dashed">Tidak ada data ditemukan.</div>
                    )}
                    {Object.keys(clusteredData).sort().map(prov => {
                        const totalUsersInProv = Object.values(clusteredData[prov]).flat().length;
                        const isProvOpen = expandedProvinces[prov] || search !== '';
                        return (
                            <div key={prov} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm transition-all hover:shadow-md">
                                <div onClick={() => toggleProvince(prov)} className="p-4 flex justify-between items-center cursor-pointer bg-gray-50/50 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg transition-transform duration-300 ${isProvOpen ? 'rotate-90 bg-red-100 text-red-600' : 'bg-white text-gray-400 border border-gray-200'}`}><ChevronRight size={18}/></div>
                                        <div><h3 className="font-bold text-gray-800 text-lg">{prov}</h3><p className="text-xs text-gray-500 flex items-center gap-1"><MapPin size={10}/> {Object.keys(clusteredData[prov]).length} Kabupaten/Kota</p></div>
                                    </div>
                                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">{totalUsersInProv} Anggota</span>
                                </div>
                                {isProvOpen && (
                                    <div className="p-4 bg-white border-t border-gray-100 space-y-3 animate-in slide-in-from-top-2">
                                            {Object.keys(clusteredData[prov]).sort().map(kab => {
                                                const kabUsers = clusteredData[prov][kab];
                                                const kabId = `${prov}-${kab}`;
                                                const isKabOpen = expandedRegencies[kabId] || search !== '';
                                                return (
                                                    <div key={kabId} className="border border-gray-200 rounded-xl overflow-hidden">
                                                        <div onClick={() => toggleRegency(kabId)} className="px-4 py-3 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors">
                                                            <div className="flex items-center gap-2"><ChevronDown size={14} className={`transition-transform ${isKabOpen ? 'rotate-180 text-blue-600' : 'text-gray-400'}`}/><span className="font-bold text-sm text-gray-700">{kab}</span></div>
                                                            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{kabUsers.length} User</span>
                                                        </div>
                                                        {isKabOpen && <div className="border-t border-gray-100 p-2 bg-gray-50/30"><UserTable data={kabUsers} /></div>}
                                                    </div>
                                                );
                                            })}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {viewMode === 'list' && (
                 <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
                    <UserTable data={users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()))} />
                 </div>
            )}
          </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl animate-in zoom-in-95 overflow-hidden">
            <div className="p-6 border-b bg-gray-50">
                <h2 className="font-bold text-lg text-gray-800">Tambah User Baru</h2>
                <p className="text-xs text-gray-500">Buat akun untuk Admin, Fasilitator, atau Peserta.</p>
            </div>
            <form onSubmit={handleCreateUser} className="p-6 space-y-4">
                <div><label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Nama</label><input className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-red-500 outline-none" placeholder="Nama Lengkap" required value={newUser.name} onChange={e => setNewUser({...newUser, name: e.target.value})}/></div>
                <div><label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Email</label><input className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-red-500 outline-none" type="email" placeholder="Email" required value={newUser.email} onChange={e => setNewUser({...newUser, email: e.target.value})}/></div>
                <div><label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Password</label><input className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-red-500 outline-none" type="password" placeholder="Password" required value={newUser.password} onChange={e => setNewUser({...newUser, password: e.target.value})}/></div>
                <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Role</label>
                    {/* [FIX] Accessibility Axe Error: Select Name */}
                    <select 
                        className="w-full border p-3 rounded-xl bg-white focus:ring-2 focus:ring-red-500 outline-none" 
                        value={newUser.role} 
                        onChange={e => setNewUser({...newUser, role: e.target.value})}
                        aria-label="Pilih Role Pengguna"
                        title="Pilih Role Pengguna"
                    >
                        <option value="STUDENT">STUDENT (Peserta)</option>
                        <option value="FACILITATOR">FACILITATOR (Pengajar)</option>
                        <option value="ADMIN">ADMIN (Wilayah)</option>
                    </select>
                </div>
                {newUser.role === 'ADMIN' && (
                    <div className="bg-orange-50 p-4 rounded-xl border border-orange-200">
                        <p className="text-xs font-bold text-orange-800 mb-2 flex items-center gap-1"><MapPin size={12}/> Konfigurasi Wilayah</p>
                        <RegionSelector value={regionConfig} onChange={setRegionConfig} />
                    </div>
                )}
                <div className="flex justify-end gap-2 pt-4 border-t">
                    <button type="button" onClick={() => setShowAddModal(false)} className="px-5 py-2.5 text-gray-600 font-bold hover:bg-gray-100 rounded-xl text-sm">Batal</button>
                    <button type="submit" disabled={isSaving} className="px-6 py-2.5 bg-red-700 text-white rounded-xl font-bold hover:bg-red-800 shadow-lg text-sm flex items-center gap-2">
                        {isSaving ? <Loader2 className="animate-spin" size={16}/> : <Plus size={16}/>} Simpan User
                    </button>
                </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}