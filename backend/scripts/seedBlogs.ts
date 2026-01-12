import mongoose from 'mongoose';
import dotenv from 'dotenv';
import slugify from 'slugify';
import { Blog } from '../src/models/Blog'; // Pastikan path model benar
import { User } from '../src/models/User'; // Pastikan path model benar

// Load environment variables
dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lms_db';

const sampleBlogs = [
    {
        title: "Pentingnya Donor Darah Rutin",
        content: `
            <p>Donor darah adalah kegiatan mulia yang dapat menyelamatkan nyawa orang lain. Selain itu, donor darah juga memiliki banyak manfaat kesehatan bagi pendonor, seperti menjaga kesehatan jantung, meningkatkan produksi sel darah merah, dan mendeteksi penyakit serius lebih dini.</p>
            <p>PMI mengajak masyarakat untuk menjadikan donor darah sebagai gaya hidup sehat.</p>
        `,
        tags: ["Kesehatan", "Donor Darah", "PMI"],
        coverUrl: "https://pmi.or.id/wp-content/uploads/2020/07/logo-pmi-2.png", // Gambar placeholder
        status: "approved"
    },
    {
        title: "Kesiapsiagaan Menghadapi Bencana Gempa",
        content: `
            <p>Indonesia berada di wilayah Ring of Fire yang rawan gempa. Kesiapsiagaan adalah kunci keselamatan.</p>
            <ul>
                <li>Kenali jalur evakuasi di rumah/kantor Anda.</li>
                <li>Siapkan tas siaga bencana (obat, senter, makanan instan).</li>
                <li>Jangan panik, lindungi kepala, dan cari tempat aman (bawah meja kokoh).</li>
            </ul>
        `,
        tags: ["Bencana", "Edukasi", "Tips"],
        coverUrl: "https://pmi.or.id/wp-content/uploads/2020/07/logo-pmi-2.png",
        status: "approved"
    },
    {
        title: "Peran Relawan dalam Masyarakat",
        content: `
            <p>Relawan adalah ujung tombak pelayanan kepalangmerahan. Mereka hadir di tengah bencana, konflik, dan krisis kesehatan tanpa membedakan latar belakang korban.</p>
            <p>Menjadi relawan bukan hanya tentang memberi tenaga, tapi juga belajar empati dan kemanusiaan.</p>
        `,
        tags: ["Relawan", "Sosial", "Inspirasi"],
        coverUrl: "",
        status: "approved"
    },
    {
        title: "Panduan Pertolongan Pertama: Luka Bakar",
        content: `
            <p>Jangan oleskan pasta gigi pada luka bakar! Langkah yang benar adalah:</p>
            <ol>
                <li>Aliri area luka dengan air mengalir (suhu ruang) selama 10-20 menit.</li>
                <li>Tutup dengan kain bersih atau kassa steril.</li>
                <li>Segera bawa ke fasilitas kesehatan jika luka luas atau parah.</li>
            </ol>
        `,
        tags: ["Pertolongan Pertama", "Edukasi"],
        coverUrl: "",
        status: "approved"
    },
    {
        title: "Sejarah Singkat Palang Merah Indonesia",
        content: `
            <p>Palang Merah Indonesia (PMI) dibentuk pada tanggal 17 September 1945, tepat satu bulan setelah kemerdekaan Indonesia. Ketua pertama PMI adalah Drs. Moh. Hatta.</p>
            <p>Sejak saat itu, PMI terus berkiprah membantu masyarakat dalam berbagai situasi kemanusiaan.</p>
        `,
        tags: ["Sejarah", "PMI", "Pengetahuan"],
        coverUrl: "https://pmi.or.id/wp-content/uploads/2020/07/logo-pmi-2.png",
        status: "approved"
    }
];

const seedBlogs = async () => {
    try {
        console.log('🔄 Menghubungkan ke Database...');
        await mongoose.connect(MONGO_URI);
        console.log('✅ Terhubung ke MongoDB');

        // 1. Cari User Admin/Fasilitator untuk dijadikan Penulis
        const author = await User.findOne({ 
            role: { $in: ['SUPER_ADMIN', 'FACILITATOR', 'ADMIN'] } 
        });

        if (!author) {
            console.error('❌ GAGAL: Tidak ditemukan user dengan role Admin/Fasilitator di database.');
            console.error('   Harap buat user admin terlebih dahulu sebelum menjalankan seed ini.');
            process.exit(1);
        }

        console.log(`👤 Penulis yang ditetapkan: ${author.name} (${author.role})`);

        let addedCount = 0;
        let skippedCount = 0;

        // 2. Loop dan Simpan Blog
        for (const blogData of sampleBlogs) {
            // Cek apakah judul sudah ada (Case Insensitive)
            const exists = await Blog.findOne({ 
                title: { $regex: new RegExp(`^${blogData.title}$`, 'i') } 
            });

            if (exists) {
                console.log(`⚠️  Skip (Sudah ada): "${blogData.title}"`);
                skippedCount++;
            } else {
                const slug = slugify(blogData.title, { lower: true, strict: true }) + '-' + Date.now();
                
                await Blog.create({
                    ...blogData,
                    slug: slug,
                    author: author._id,
                    createdAt: new Date(),
                    updatedAt: new Date()
                });
                console.log(`✅ Ditambahkan: "${blogData.title}"`);
                addedCount++;
            }
        }

        console.log('\n================================');
        console.log(`🎉 Seed Selesai!`);
        console.log(`   - Ditambahkan : ${addedCount}`);
        console.log(`   - Dilewati    : ${skippedCount}`);
        console.log('================================\n');

        process.exit(0);

    } catch (error) {
        console.error('❌ Terjadi Kesalahan:', error);
        process.exit(1);
    }
};

// Jalankan fungsi
seedBlogs();