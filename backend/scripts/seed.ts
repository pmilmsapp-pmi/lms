import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import path from 'path';
import { fileURLToPath } from 'url';

// --- FIX: DEFINISI __dirname UNTUK ES MODULE ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- CONFIGURATION: LOAD .ENV SECARA EKSPLISIT ---
const envPath = path.resolve(__dirname, '..', '.env');
dotenv.config({ path: envPath });

// --- IMPORTS MODELS ---
import { User } from '../src/models/User'; 
import { Course } from '../src/models/Course';
// import { Certificate } from '../src/models/Certificate'; // Uncomment jika sudah ada modelnya

const seedData = async () => {
  try {
    console.log('📂 Loading environment from:', envPath);

    // 1. KONEKSI DATABASE
    const dbUri = process.env.MONGODB_URI || process.env.MONGO_URI;
    
    if (!dbUri) {
        throw new Error(`MONGODB_URI tidak ditemukan di .env. Pastikan file ${envPath} ada.`);
    }
    
    await mongoose.connect(dbUri);
    console.log('✅ Connected to MongoDB Cloud');

    // 2. RESET DATABASE
    console.log('🗑️  Resetting database...');
    await User.deleteMany({});
    await Course.deleteMany({});
    // await Certificate.deleteMany({});
    console.log('✨ Database cleared.');

    // 3. SEED USERS
    console.log('👥 Seeding Users...');
    const hashedPassword = await bcrypt.hash('123456', 10);

    // A. Super Admin
    await User.create({
      name: 'Super Admin Humanis',
      email: 'admin@humanis.com',
      password: hashedPassword,
      role: 'SUPER_ADMIN',
      avatarUrl: 'https://ui-avatars.com/api/?name=Super+Admin&background=ef4444&color=fff'
    });

    // B. Fasilitator (5 Orang)
    const facilitatorData = [
      { name: 'Dr. Budi Santoso', email: 'budi@fasilitator.com' },
      { name: 'Siti Aminah, S.Kep', email: 'siti@fasilitator.com' },
      { name: 'Kapten (Purn) Joko', email: 'joko@fasilitator.com' },
      { name: 'Dr. Rina Melati', email: 'rina@fasilitator.com' },
      { name: 'Ahmad Logistik', email: 'ahmad@fasilitator.com' }
    ];

    const facilitators = await User.insertMany(
      facilitatorData.map(f => ({
        ...f,
        password: hashedPassword,
        role: 'FACILITATOR',
        avatarUrl: `https://ui-avatars.com/api/?name=${f.name.replace(' ', '+')}&background=f59e0b&color=fff`
      }))
    );

    // C. Siswa (20 Orang)
    const studentNames = [
        'Andi Pratama', 'Bunga Citra', 'Candra Wijaya', 'Dewi Sartika', 'Eko Purnomo',
        'Fajar Shadiq', 'Gita Gutawa', 'Hendra Setiawan', 'Indah Permata', 'Joni Iskandar',
        'Kartika Putri', 'Lukman Hakim', 'Maya Estianty', 'Nanda Rizky', 'Opick Tombo',
        'Putri Titian', 'Qory Sandioriva', 'Rizky Febian', 'Sule Prikitiw', 'Tukul Arwana'
    ];

    const students = await User.insertMany(
        studentNames.map((name, idx) => ({
            name: name,
            email: `siswa${idx + 1}@humanis.com`,
            password: hashedPassword,
            role: 'STUDENT',
            avatarUrl: `https://ui-avatars.com/api/?name=${name.replace(' ', '+')}&background=random`
        }))
    );

    console.log(`✅ Created: 1 Admin, ${facilitators.length} Facilitators, ${students.length} Students.`);

    // 4. SEED COURSES & TRAININGS
    console.log('📚 Seeding Courses & Trainings...');

    // === KURSUS 1: PELATIHAN (TRAINING) ===
    await Course.create({
        title: 'Diklat Manajemen Tanggap Darurat Bencana (MTDB)',
        // [FIX] Tambahkan slug manual agar tidak duplicate key error
        slug: 'diklat-mtdb', 
        description: 'Pelatihan intensif untuk mempersiapkan relawan dalam menghadapi situasi darurat bencana alam.',
        price: 0, 
        category: 'Disaster',
        programType: 'training',
        isPublished: true,
        thumbnailUrl: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=800&auto=format&fit=crop', 
        facilitatorIds: [facilitators[0]._id, facilitators[2]._id], 
        includeCompetenciesInCertificate: true,
        competencies: [
            'MTDB.001 - Melakukan Kaji Cepat (Rapid Assessment)',
            'MTDB.002 - Mendirikan Hunian Sementara (Shelter)',
            'MTDB.003 - Manajemen Distribusi Logistik'
        ],
        certificateConfig: {
            city: 'Jakarta',
            signatoryName: 'Ketua Umum Humanis',
            signatoryPosition: 'Head of Disaster Response'
        },
        modules: [
            {
                title: 'Pengantar Manajemen Bencana',
                facilitatorId: facilitators[0]._id, 
                isActive: true,
                isMandatory: true,
                lessons: [
                    { title: 'Siklus Penanggulangan Bencana', type: 'video_url', videoUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4', isActive: true, isMandatory: true },
                    { title: 'Prinsip Dasar Kemanusiaan', type: 'lesson', content: 'Materi teks tentang 7 prinsip dasar...', isActive: true, isMandatory: true }
                ]
            },
            {
                title: 'Assessment & Logistik',
                facilitatorId: facilitators[2]._id,
                isActive: true,
                isMandatory: true,
                lessons: [
                    { title: 'Teknik Kaji Cepat', type: 'lesson', content: 'Panduan PDF: Teknik Assessment...', isActive: true, isMandatory: true },
                    { 
                        title: 'Kuis Logistik', 
                        type: 'quiz', 
                        quizDuration: 15,
                        questions: [
                            { question: 'Apa prioritas utama logistik?', options: ['Makanan', 'Pakaian', 'Mainan', 'Uang'], correctIndex: 0 },
                            { question: 'Berapa kalori standar per orang?', options: ['1500', '2100', '3000', '1000'], correctIndex: 1 }
                        ],
                        isActive: true, isMandatory: true 
                    }
                ]
            }
        ]
    });

    // === KURSUS 2: KURSUS ONLINE (COURSE) ===
    await Course.create({
        title: 'Kursus Basic First Aid (Pertolongan Pertama)',
        // [FIX] Tambahkan slug manual agar tidak duplicate key error
        slug: 'basic-first-aid',
        description: 'Kursus mandiri untuk mempelajari dasar-dasar pertolongan pertama.',
        price: 150000,
        category: 'Health',
        programType: 'course',
        isPublished: true,
        thumbnailUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop',
        facilitatorIds: [facilitators[1]._id],
        includeCompetenciesInCertificate: false,
        competencies: [],
        certificateConfig: {
            city: 'Bandung',
            signatoryName: 'Siti Aminah, S.Kep',
            signatoryPosition: 'Medical Coordinator'
        },
        modules: [
            {
                title: 'Dasar Pertolongan Pertama',
                isActive: true,
                isMandatory: true,
                lessons: [
                    { title: 'Penilaian Korban', type: 'video_url', videoUrl: 'https://www.youtube.com/watch?v=EAjL15167FY', isActive: true, isMandatory: true },
                    { title: 'Resusitasi Jantung Paru (RJP)', type: 'lesson', content: 'Panduan melakukan CPR/RJP...', isActive: true, isMandatory: true }
                ]
            },
            {
                title: 'Luka & Pendarahan',
                isActive: true,
                isMandatory: true,
                lessons: [
                    { title: 'Menangani Luka Bakar', type: 'lesson', content: 'Infografis penanganan luka bakar...', isActive: true, isMandatory: true },
                    { 
                        title: 'Evaluasi Akhir', 
                        type: 'quiz', 
                        quizDuration: 10,
                        questions: [
                            { question: 'Langkah pertama saat korban tidak sadar?', options: ['Cek Respon', 'RJP', 'Minum', 'Lari'], correctIndex: 0 }
                        ],
                        isActive: true, isMandatory: true 
                    }
                ]
            }
        ]
    });

    console.log('✅ Seeding completed successfully!');
    process.exit(0);

  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedData();