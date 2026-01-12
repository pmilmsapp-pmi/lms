// // // // // // // // // // // // // // // // // import path from 'path';
// // // // // // // // // // // // // // // // // import fs from 'fs';

// // // // // // // // // // // // // // // // // import { Router } from 'express';
// // // // // // // // // // // // // // // // // import { requireAuth, AuthedRequest } from '../middleware/auth';
// // // // // // // // // // // // // // // // // import Course from '../models/Course';
// // // // // // // // // // // // // // // // // import Progress from '../models/Progress';
// // // // // // // // // // // // // // // // // import Certificate from '../models/Certificate';
// // // // // // // // // // // // // // // // // import Counter from '../models/Counter';
// // // // // // // // // // // // // // // // // import PDFDocument from 'pdfkit';
// // // // // // // // // // // // // // // // // import QRCode from 'qrcode';



// // // // // // // // // // // // // // // // // async function generateNumber() {
// // // // // // // // // // // // // // // // //   const now = new Date();
// // // // // // // // // // // // // // // // //   const year = now.getFullYear();
// // // // // // // // // // // // // // // // //   const month = now.getMonth() + 1; // 1..12
// // // // // // // // // // // // // // // // //   const roman = ROMAN[month - 1];
// // // // // // // // // // // // // // // // //   const key = `cert-${year}-${String(month).padStart(2,'0')}`;
// // // // // // // // // // // // // // // // //   const counter = await Counter.findOneAndUpdate(
// // // // // // // // // // // // // // // // //     { key },
// // // // // // // // // // // // // // // // //     { $inc: { seq: 1 } },
// // // // // // // // // // // // // // // // //     { upsert: true, new: true }
// // // // // // // // // // // // // // // // //   );
// // // // // // // // // // // // // // // // //   const seqStr = String(counter.seq).padStart(6, '0');
// // // // // // // // // // // // // // // // //   return `${seqStr}/Badiklat/${roman}/${year}`;
// // // // // // // // // // // // // // // // // }
// // // // // // // // // // // // // // // // // const router = Router();

// // // // // // // // // // // // // // // // // router.get('/:courseId/me', requireAuth, async (req: AuthedRequest, res) => {
// // // // // // // // // // // // // // // // //   const { courseId } = req.params;
// // // // // // // // // // // // // // // // //   const cert = await Certificate.findOne({ user: req.user!.id, course: courseId }).lean();
// // // // // // // // // // // // // // // // //   if (!cert) return res.status(404).json({ error: 'Certificate not found' });
// // // // // // // // // // // // // // // // //   const course = await Course.findById(courseId).lean();
// // // // // // // // // // // // // // // // //   res.json({ certificate: { id: cert._id, issuedAt: cert.issuedAt, courseTitle: course?.title, number: cert.number } });
// // // // // // // // // // // // // // // // // });

// // // // // // // // // // // // // // // // // router.post('/:courseId/issue', requireAuth, async (req: AuthedRequest, res) => {
// // // // // // // // // // // // // // // // //   const { courseId } = req.params;
// // // // // // // // // // // // // // // // //   const course = await Course.findById(courseId).lean();
// // // // // // // // // // // // // // // // //   if (!course) return res.status(404).json({ error: 'Course not found' });
// // // // // // // // // // // // // // // // //   const total = course.modules.reduce((acc: number, m: any) => acc + (m.lessons?.length || 0), 0);
// // // // // // // // // // // // // // // // //   const completed = await Progress.countDocuments({ user: req.user!.id, course: courseId });
// // // // // // // // // // // // // // // // //   if (total === 0) return res.status(400).json({ error: 'Course has no lessons' });
// // // // // // // // // // // // // // // // //   if (completed < total) return res.status(400).json({ error: 'Progress not complete' });

// // // // // // // // // // // // // // // // //   const existing = await Certificate.findOne({ user: req.user!.id, course: courseId });
// // // // // // // // // // // // // // // // //   if (existing) return res.json({ certificate: existing });
// // // // // // // // // // // // // // // // //   const number = await generateNumber();
// // // // // // // // // // // // // // // // //   const cert = await Certificate.create({ user: req.user!.id, course: courseId, number });
// // // // // // // // // // // // // // // // //   return res.json({ certificate: cert });
// // // // // // // // // // // // // // // // // });

// // // // // // // // // // // // // // // // // export default router;


// // // // // // // // // // // // // // // // // router.get('/:courseId/pdf', requireAuth, async (req: AuthedRequest, res) => {
// // // // // // // // // // // // // // // // //   const { courseId } = req.params;
// // // // // // // // // // // // // // // // //   const cert = await Certificate.findOne({ user: req.user!.id, course: courseId }).lean();
// // // // // // // // // // // // // // // // //   if (!cert) return res.status(404).json({ error: 'Certificate not found' });
// // // // // // // // // // // // // // // // //   const course = await Course.findById(courseId).lean();
// // // // // // // // // // // // // // // // //   const userName = req.user!.name || req.user!.email;

// // // // // // // // // // // // // // // // //   res.setHeader('Content-Type', 'application/pdf');
// // // // // // // // // // // // // // // // //   res.setHeader('Content-Disposition', `attachment; filename=certificate-${courseId}.pdf`);

// // // // // // // // // // // // // // // // //   const doc = new PDFDocument({ size: 'A4', margin: 50 });
// // // // // // // // // // // // // // // // //   doc.pipe(res);

// // // // // // // // // // // // // // // // //   // Load Trebuchet font if available
// // // // // // // // // // // // // // // // //   const fontPath = path.join(process.cwd(), 'assets', 'fonts', 'trebuchet.ttf');
// // // // // // // // // // // // // // // // //   const hasTrebuchet = fs.existsSync(fontPath);
// // // // // // // // // // // // // // // // //   if (hasTrebuchet) doc.font(fontPath); else doc.font('Helvetica');

// // // // // // // // // // // // // // // // //   // Draw PMI red cross
// // // // // // // // // // // // // // // // //   doc.rect(50, 50, 40, 40).stroke('#d00');
// // // // // // // // // // // // // // // // //   doc.rect(50+14, 50+8, 12, 24).fill('#d00');
// // // // // // // // // // // // // // // // //   doc.rect(50+8, 50+14, 24, 12).fill('#d00');

// // // // // // // // // // // // // // // // //   // Generate QR code (number)
// // // // // // // // // // // // // // // // //   const qrBuffer = await QRCode.toBuffer(`CERT:${cert.number}`, { type: 'png', width: 180 });
// // // // // // // // // // // // // // // // //   doc.image(qrBuffer, 400, 60, { width: 120 });

// // // // // // // // // // // // // // // // //   doc.fillColor('#111').fontSize(20).text('Palang Merah Indonesia', 100, 60);
// // // // // // // // // // // // // // // // //   doc.moveDown(2);

// // // // // // // // // // // // // // // // //   doc.fontSize(28).text('SERTIFIKAT KELULUSAN', { align: 'center' });
// // // // // // // // // // // // // // // // //   doc.moveDown(1);
// // // // // // // // // // // // // // // // //   doc.fontSize(14).text('Diberikan kepada', { align: 'center' });
// // // // // // // // // // // // // // // // //   doc.moveDown(0.5);
// // // // // // // // // // // // // // // // //   doc.fontSize(22).text(userName, { align: 'center' });
// // // // // // // // // // // // // // // // //   doc.moveDown(1);
// // // // // // // // // // // // // // // // //   doc.fontSize(12).text('Atas keberhasilan menyelesaikan pelatihan', { align: 'center' });
// // // // // // // // // // // // // // // // //   doc.moveDown(0.5);
// // // // // // // // // // // // // // // // //   doc.fontSize(18).text(course?.title || 'Kursus', { align: 'center' });

// // // // // // // // // // // // // // // // //   doc.moveDown(2);
// // // // // // // // // // // // // // // // //   doc.fontSize(12).fillColor('#555').text(`Nomor Sertifikat: ${cert.number}`, { align: 'center' });
// // // // // // // // // // // // // // // // //   doc.moveDown(0.5);
// // // // // // // // // // // // // // // // //   doc.fontSize(12).fillColor('#555').text(`Tanggal terbit: ${new Date(cert.issuedAt).toLocaleDateString('id-ID')}`, { align: 'center' });

// // // // // // // // // // // // // // // // //   // Footer
// // // // // // // // // // // // // // // // //   doc.moveTo(50, 750).lineTo(545, 750).stroke('#ddd');
// // // // // // // // // // // // // // // // //   doc.fontSize(10).fillColor('#777').text('Diterbitkan oleh LMS Manajemen', 50, 760, { align: 'center' });

// // // // // // // // // // // // // // // // //   doc.end();
// // // // // // // // // // // // // // // // // });
// // // // // // // // // // // // // // // // import express from 'express';
// // // // // // // // // // // // // // // // import PDFDocument from 'pdfkit';
// // // // // // // // // // // // // // // // import QRCode from 'qrcode';
// // // // // // // // // // // // // // // // import path from 'path';
// // // // // // // // // // // // // // // // import Certificate from '../models/Certificate';
// // // // // // // // // // // // // // // // import { requireAuth, AuthedRequest } from '../middleware/auth';

// // // // // // // // // // // // // // // // const router = express.Router();

// // // // // // // // // // // // // // // // router.get('/:courseId/pdf', requireAuth, async (req, res) => {
// // // // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // // // //     const { courseId } = req.params;
// // // // // // // // // // // // // // // //     const userId = req.user!.id;

// // // // // // // // // // // // // // // //     // Cari sertifikat user
// // // // // // // // // // // // // // // //     const cert = await Certificate.findOne({ user: userId, course: courseId })
// // // // // // // // // // // // // // // //       .populate('user', 'name')
// // // // // // // // // // // // // // // //       .populate('course', 'title');

// // // // // // // // // // // // // // // //     if (!cert) {
// // // // // // // // // // // // // // // //       return res.status(404).json({ error: 'Sertifikat belum diterbitkan.' });
// // // // // // // // // // // // // // // //     }

// // // // // // // // // // // // // // // //     // Setup PDF Stream
// // // // // // // // // // // // // // // //     const doc = new PDFDocument({ layout: 'landscape', size: 'A4', margin: 50 });
    
// // // // // // // // // // // // // // // //     // Header response agar browser tahu ini file PDF
// // // // // // // // // // // // // // // //     res.setHeader('Content-Type', 'application/pdf');
// // // // // // // // // // // // // // // //     res.setHeader('Content-Disposition', `attachment; filename="Sertifikat-${cert.number.replace(/\//g, '-')}.pdf"`);

// // // // // // // // // // // // // // // //     doc.pipe(res);

// // // // // // // // // // // // // // // //     // --- DESAIN SERTIFIKAT ---
    
// // // // // // // // // // // // // // // //     // 1. Border
// // // // // // // // // // // // // // // //     doc.rect(20, 20, doc.page.width - 40, doc.page.height - 40)
// // // // // // // // // // // // // // // //        .lineWidth(5)
// // // // // // // // // // // // // // // //        .stroke('#d00000'); // Merah PMI

// // // // // // // // // // // // // // // //     // 2. Header
// // // // // // // // // // // // // // // //     // Jika ada logo, uncomment baris bawah dan simpan logo di folder assets
// // // // // // // // // // // // // // // //     // doc.image(path.join(__dirname, '../../assets/pmi-logo.png'), doc.page.width / 2 - 40, 60, { width: 80 });
    
// // // // // // // // // // // // // // // //     doc.moveDown(4);
// // // // // // // // // // // // // // // //     doc.font('Helvetica-Bold').fontSize(36).fillColor('#d00000')
// // // // // // // // // // // // // // // //        .text('SERTIFIKAT KELULUSAN', { align: 'center' });

// // // // // // // // // // // // // // // //     doc.moveDown(1);
// // // // // // // // // // // // // // // //     doc.font('Helvetica').fontSize(16).fillColor('black')
// // // // // // // // // // // // // // // //        .text('Diberikan kepada:', { align: 'center' });

// // // // // // // // // // // // // // // //     doc.moveDown(0.5);
// // // // // // // // // // // // // // // //     // Nama User
// // // // // // // // // // // // // // // //     doc.font('Helvetica-Bold').fontSize(28)
// // // // // // // // // // // // // // // //        .text((cert.user as any).name, { align: 'center' });

// // // // // // // // // // // // // // // //     doc.moveDown(1);
// // // // // // // // // // // // // // // //     doc.font('Helvetica').fontSize(16)
// // // // // // // // // // // // // // // //        .text('Atas keberhasilannya menyelesaikan kursus:', { align: 'center' });

// // // // // // // // // // // // // // // //     doc.moveDown(0.5);
// // // // // // // // // // // // // // // //     // Judul Kursus
// // // // // // // // // // // // // // // //     doc.font('Helvetica-Bold').fontSize(24)
// // // // // // // // // // // // // // // //        .text((cert.course as any).title, { align: 'center' });

// // // // // // // // // // // // // // // //     doc.moveDown(2);
// // // // // // // // // // // // // // // //     // Nomor & Tanggal
// // // // // // // // // // // // // // // //     doc.font('Helvetica').fontSize(12)
// // // // // // // // // // // // // // // //        .text(`Nomor: ${cert.number}`, { align: 'center' });
// // // // // // // // // // // // // // // //     doc.text(`Tanggal Terbit: ${new Date(cert.issuedAt).toLocaleDateString('id-ID')}`, { align: 'center' });

// // // // // // // // // // // // // // // //     // 3. QR Code Verification
// // // // // // // // // // // // // // // //     // Generate QR Code berisi link verifikasi atau nomor sertifikat
// // // // // // // // // // // // // // // //     const qrCodeData = `VERIFY:${cert.number}`; 
// // // // // // // // // // // // // // // //     const qrImage = await QRCode.toDataURL(qrCodeData);
    
// // // // // // // // // // // // // // // //     // Posisi QR di tengah bawah
// // // // // // // // // // // // // // // //     doc.image(qrImage, (doc.page.width / 2) - 35, doc.page.height - 120, { width: 70 });

// // // // // // // // // // // // // // // //     doc.end();

// // // // // // // // // // // // // // // //   } catch (error) {
// // // // // // // // // // // // // // // //     console.error(error);
// // // // // // // // // // // // // // // //     res.status(500).json({ error: 'Gagal generate PDF' });
// // // // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // // // });

// // // // // // // // // // // // // // // // export default router;
// // // // // // // // // // // // // // // import express from 'express';
// // // // // // // // // // // // // // // import { requireAuth } from '../middleware/auth';
// // // // // // // // // // // // // // // import { Course } from '../models/Course';
// // // // // // // // // // // // // // // import User from '../models/User';
// // // // // // // // // // // // // // // import { Certificate } from '../models/Certificate';

// // // // // // // // // // // // // // // const router = express.Router();

// // // // // // // // // // // // // // // // POST: Terbitkan Sertifikat
// // // // // // // // // // // // // // // router.post('/:courseId/issue', requireAuth, async (req, res) => {
// // // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // // //     const { courseId } = req.params;
// // // // // // // // // // // // // // //     const userId = req.user!.id;

// // // // // // // // // // // // // // //     // 1. Cek apakah sertifikat sudah pernah terbit
// // // // // // // // // // // // // // //     const existing = await Certificate.findOne({ user: userId, course: courseId });
// // // // // // // // // // // // // // //     if (existing) {
// // // // // // // // // // // // // // //       return res.status(400).json({ error: 'Sertifikat untuk kursus ini sudah diterbitkan.' });
// // // // // // // // // // // // // // //     }

// // // // // // // // // // // // // // //     // 2. Ambil data kursus dan user
// // // // // // // // // // // // // // //     const course = await Course.findById(courseId);
// // // // // // // // // // // // // // //     const user = await User.findById(userId);
// // // // // // // // // // // // // // //     if (!course || !user) {
// // // // // // // // // // // // // // //       return res.status(404).json({ error: 'Data tidak ditemukan.' });
// // // // // // // // // // // // // // //     }

// // // // // // // // // // // // // // //     // 3. LOGIKA VALIDASI: Cek apakah semua materi sudah selesai
// // // // // // // // // // // // // // //     // Kita bandingkan jumlah lesson di kursus dengan jumlah lesson yang diselesaikan user
// // // // // // // // // // // // // // //     const totalLessons = course.modules.reduce((sum, mod) => sum + mod.lessons.length, 0);
// // // // // // // // // // // // // // // const userProgress = user.progress.find((p: any) => p.courseId.toString() === courseId);    const completedCount = userProgress ? userProgress.completedLessons.length : 0;

// // // // // // // // // // // // // // //     if (completedCount < totalLessons && totalLessons > 0) {
// // // // // // // // // // // // // // //       return res.status(400).json({ 
// // // // // // // // // // // // // // //         error: `Anda belum menyelesaikan semua materi. (${completedCount}/${totalLessons})` 
// // // // // // // // // // // // // // //       });
// // // // // // // // // // // // // // //     }

// // // // // // // // // // // // // // //     // 4. Buat Sertifikat Baru
// // // // // // // // // // // // // // //     const certificate = await Certificate.create({
// // // // // // // // // // // // // // //       user: userId,
// // // // // // // // // // // // // // //       course: courseId,
// // // // // // // // // // // // // // //       userName: user.name, // Simpan nama saat terbit (snapshot)
// // // // // // // // // // // // // // //       courseName: course.title,
// // // // // // // // // // // // // // //       certificateNumber: `CERT-${Date.now()}-${userId.substring(0, 5).toUpperCase()}`,
// // // // // // // // // // // // // // //       issueDate: new Date()
// // // // // // // // // // // // // // //     });

// // // // // // // // // // // // // // //     res.status(201).json({ 
// // // // // // // // // // // // // // //       message: 'Sertifikat berhasil diterbitkan!', 
// // // // // // // // // // // // // // //       certificate 
// // // // // // // // // // // // // // //     });

// // // // // // // // // // // // // // //   } catch (error: any) {
// // // // // // // // // // // // // // //     res.status(500).json({ error: error.message });
// // // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // // });

// // // // // // // // // // // // // // // // GET: Ambil sertifikat user untuk kursus tertentu
// // // // // // // // // // // // // // // router.get('/:courseId', requireAuth, async (req, res) => {
// // // // // // // // // // // // // // //   const cert = await Certificate.findOne({ user: req.user!.id, course: req.params.courseId });
// // // // // // // // // // // // // // //   res.json({ certificate: cert });
// // // // // // // // // // // // // // // });

// // // // // // // // // // // // // // // export default router;

// // // // // // // // // // // // // // import express from 'express';
// // // // // // // // // // // // // // import { requireAuth } from '../middleware/auth';
// // // // // // // // // // // // // // import { Course } from '../models/Course';
// // // // // // // // // // // // // // import { User } from '../models/User';
// // // // // // // // // // // // // // import { Certificate } from '../models/Certificate';

// // // // // // // // // // // // // // const router = express.Router();

// // // // // // // // // // // // // // /**
// // // // // // // // // // // // // //  * POST /api/certificates/:courseId/issue
// // // // // // // // // // // // // //  * Logika untuk memverifikasi progress dan menerbitkan sertifikat
// // // // // // // // // // // // // //  */
// // // // // // // // // // // // // // router.post('/:courseId/issue', requireAuth, async (req, res) => {
// // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // //     const { courseId } = req.params;
// // // // // // // // // // // // // //     const userId = req.user!.id;

// // // // // // // // // // // // // //     // 1. Cek apakah user sudah punya sertifikat untuk kursus ini
// // // // // // // // // // // // // //     const existing = await Certificate.findOne({ user: userId, course: courseId });
// // // // // // // // // // // // // //     if (existing) {
// // // // // // // // // // // // // //       return res.status(400).json({ error: 'Sertifikat sudah diterbitkan sebelumnya.' });
// // // // // // // // // // // // // //     }

// // // // // // // // // // // // // //     // 2. Ambil data Kursus dan User
// // // // // // // // // // // // // //     const course = await Course.findById(courseId);
// // // // // // // // // // // // // //     const user = await User.findById(userId);

// // // // // // // // // // // // // //     if (!course || !user) {
// // // // // // // // // // // // // //       return res.status(404).json({ error: 'Data kursus atau pengguna tidak ditemukan.' });
// // // // // // // // // // // // // //     }

// // // // // // // // // // // // // //     // 3. VALIDASI PROGRESS
// // // // // // // // // // // // // //     // Hitung total materi (lessons) dari semua modul yang dipublikasikan (isPublished: true)
// // // // // // // // // // // // // //     const activeModules = course.modules.filter((m: any) => m.isPublished);
// // // // // // // // // // // // // //     const totalLessons = activeModules.reduce((sum: number, mod: any) => sum + (mod.lessons?.length || 0), 0);

// // // // // // // // // // // // // //     // Cari progress user untuk kursus ini
// // // // // // // // // // // // // //     const userProgress = user.progress.find((p: any) => p.courseId.toString() === courseId);
// // // // // // // // // // // // // //     const completedCount = userProgress ? userProgress.completedLessons.length : 0;

// // // // // // // // // // // // // //     // Jika belum menyelesaikan semua (dan kursus memang punya materi)
// // // // // // // // // // // // // //     if (totalLessons > 0 && completedCount < totalLessons) {
// // // // // // // // // // // // // //       return res.status(400).json({ 
// // // // // // // // // // // // // //         error: `Progress belum lengkap. Anda baru menyelesaikan ${completedCount} dari ${totalLessons} materi.` 
// // // // // // // // // // // // // //       });
// // // // // // // // // // // // // //     }

// // // // // // // // // // // // // //     // 4. GENERATE SERTIFIKAT
// // // // // // // // // // // // // //     const certificateNumber = `PMI-${Date.now()}-${userId.substring(19).toUpperCase()}`;
    
// // // // // // // // // // // // // //     const newCertificate = await Certificate.create({
// // // // // // // // // // // // // //       user: userId,
// // // // // // // // // // // // // //       course: courseId,
// // // // // // // // // // // // // //       userName: user.name, // Simpan snapshot nama user
// // // // // // // // // // // // // //       courseName: course.title,
// // // // // // // // // // // // // //       certificateNumber: certificateNumber,
// // // // // // // // // // // // // //       issueDate: new Date()
// // // // // // // // // // // // // //     });

// // // // // // // // // // // // // //     res.status(201).json({
// // // // // // // // // // // // // //       message: 'Sertifikat berhasil diterbitkan!',
// // // // // // // // // // // // // //       certificate: newCertificate
// // // // // // // // // // // // // //     });

// // // // // // // // // // // // // //   } catch (error: any) {
// // // // // // // // // // // // // //     console.error('Error issuing certificate:', error);
// // // // // // // // // // // // // //     res.status(500).json({ error: 'Gagal menerbitkan sertifikat.' });
// // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // });

// // // // // // // // // // // // // // /**
// // // // // // // // // // // // // //  * GET /api/certificates/:courseId
// // // // // // // // // // // // // //  * Mengecek status sertifikat user untuk kursus tertentu
// // // // // // // // // // // // // //  */
// // // // // // // // // // // // // // router.get('/:courseId', requireAuth, async (req, res) => {
// // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // //     const cert = await Certificate.findOne({ 
// // // // // // // // // // // // // //       user: req.user!.id, 
// // // // // // // // // // // // // //       course: req.params.courseId 
// // // // // // // // // // // // // //     });
// // // // // // // // // // // // // //     res.json({ certificate: cert });
// // // // // // // // // // // // // //   } catch (error) {
// // // // // // // // // // // // // //     res.status(500).json({ error: 'Gagal mengambil data sertifikat.' });
// // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // });

// // // // // // // // // // // // // // /**
// // // // // // // // // // // // // //  * GET /api/certificates/me/all
// // // // // // // // // // // // // //  * Mengambil semua sertifikat milik user yang sedang login (untuk halaman profil)
// // // // // // // // // // // // // //  */
// // // // // // // // // // // // // // router.get('/me/all', requireAuth, async (req, res) => {
// // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // //       const certificates = await Certificate.find({ user: req.user!.id }).sort({ createdAt: -1 });
// // // // // // // // // // // // // //       res.json({ certificates });
// // // // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // // // //       res.status(500).json({ error: 'Gagal mengambil daftar sertifikat.' });
// // // // // // // // // // // // // //     }
// // // // // // // // // // // // // //   });

// // // // // // // // // // // // // // export default router;
// // // // // // // // // // // // // import express from 'express';
// // // // // // // // // // // // // import { nanoid } from 'nanoid';
// // // // // // // // // // // // // import PDFDocument from 'pdfkit'; // Import PDFKit
// // // // // // // // // // // // // import { Certificate } from '../models/Certificate';
// // // // // // // // // // // // // import { Course, ICourse, IModule } from '../models/Course';
// // // // // // // // // // // // // import { User, IUser } from '../models/User';
// // // // // // // // // // // // // import { requireAuth, AuthedRequest } from '../middleware/auth';

// // // // // // // // // // // // // const router = express.Router();

// // // // // // // // // // // // // // 1. GET MY CERTIFICATES (JSON Data)
// // // // // // // // // // // // // router.get('/', requireAuth, async (req: AuthedRequest, res) => {
// // // // // // // // // // // // //   try {
// // // // // // // // // // // // //     const certificates = await Certificate.find({ userId: req.user!.id })
// // // // // // // // // // // // //       .populate('courseId', 'title thumbnailUrl')
// // // // // // // // // // // // //       .sort({ createdAt: -1 });
// // // // // // // // // // // // //     res.json(certificates);
// // // // // // // // // // // // //   } catch (e: any) {
// // // // // // // // // // // // //     res.status(500).json({ error: e.message });
// // // // // // // // // // // // //   }
// // // // // // // // // // // // // });

// // // // // // // // // // // // // // 2. GENERATE & DOWNLOAD PDF (ENDPOINT BARU)
// // // // // // // // // // // // // router.get('/:id/pdf', async (req: express.Request, res: express.Response) => {
// // // // // // // // // // // // //   try {
// // // // // // // // // // // // //     const { id } = req.params;

// // // // // // // // // // // // //     // Ambil data sertifikat + info User + info Course
// // // // // // // // // // // // //     // Kita gunakan populate user path juga untuk mengambil nama user
// // // // // // // // // // // // //     const cert: any = await Certificate.findById(id)
// // // // // // // // // // // // //       .populate('userId', 'name')
// // // // // // // // // // // // //       .populate('courseId', 'title');

// // // // // // // // // // // // //     if (!cert) {
// // // // // // // // // // // // //       return res.status(404).send('Sertifikat tidak ditemukan');
// // // // // // // // // // // // //     }

// // // // // // // // // // // // //     // --- MULAI MEMBUAT PDF ---
// // // // // // // // // // // // //     const doc = new PDFDocument({
// // // // // // // // // // // // //       layout: 'landscape',
// // // // // // // // // // // // //       size: 'A4',
// // // // // // // // // // // // //       margin: 50
// // // // // // // // // // // // //     });

// // // // // // // // // // // // //     // Set Header agar browser tahu ini adalah file PDF
// // // // // // // // // // // // //     res.setHeader('Content-Type', 'application/pdf');
// // // // // // // // // // // // //     res.setHeader('Content-Disposition', `inline; filename=Sertifikat-${cert.certificateCode}.pdf`);

// // // // // // // // // // // // //     doc.pipe(res); // Kirim langsung ke user

// // // // // // // // // // // // //     // 1. Background / Border
// // // // // // // // // // // // //     doc.rect(20, 20, doc.page.width - 40, doc.page.height - 40).stroke('#8B0000'); // Garis Luar Merah Tua
// // // // // // // // // // // // //     doc.rect(30, 30, doc.page.width - 60, doc.page.height - 60).stroke('#2c3e50'); // Garis Dalam Biru

// // // // // // // // // // // // //     // 2. Header
// // // // // // // // // // // // //     doc.moveDown(2);
// // // // // // // // // // // // //     doc.font('Times-Roman').fontSize(30).fillColor('#8B0000').text('SERTIFIKAT KELULUSAN', {
// // // // // // // // // // // // //       align: 'center',
// // // // // // // // // // // // //       characterSpacing: 2
// // // // // // // // // // // // //     });

// // // // // // // // // // // // //     doc.moveDown(0.5);
// // // // // // // // // // // // //     doc.fontSize(12).fillColor('grey').text(`No. ID: ${cert.certificateCode}`, {
// // // // // // // // // // // // //       align: 'center'
// // // // // // // // // // // // //     });

// // // // // // // // // // // // //     // 3. Body
// // // // // // // // // // // // //     doc.moveDown(2);
// // // // // // // // // // // // //     doc.fontSize(16).fillColor('black').text('Diberikan kepada:', {
// // // // // // // // // // // // //       align: 'center'
// // // // // // // // // // // // //     });

// // // // // // // // // // // // //     doc.moveDown(0.5);
// // // // // // // // // // // // //     doc.font('Helvetica-Bold').fontSize(35).fillColor('#2c3e50').text(cert.userId?.name || 'Peserta', {
// // // // // // // // // // // // //       align: 'center'
// // // // // // // // // // // // //     });

// // // // // // // // // // // // //     doc.moveDown(0.5);
// // // // // // // // // // // // //     doc.font('Times-Roman').fontSize(16).fillColor('black').text('Telah berhasil menyelesaikan kursus:', {
// // // // // // // // // // // // //       align: 'center'
// // // // // // // // // // // // //     });

// // // // // // // // // // // // //     doc.moveDown(0.5);
// // // // // // // // // // // // //     doc.font('Helvetica-Bold').fontSize(25).fillColor('#d35400').text(cert.courseId?.title || 'Judul Kursus', {
// // // // // // // // // // // // //       align: 'center'
// // // // // // // // // // // // //     });

// // // // // // // // // // // // //     // 4. Footer (Tanggal & Tanda Tangan)
// // // // // // // // // // // // //     doc.moveDown(4);
    
// // // // // // // // // // // // //     // Posisi Tanda Tangan (Kanan Bawah)
// // // // // // // // // // // // //     const signX = doc.page.width - 250;
// // // // // // // // // // // // //     const signY = doc.y;

// // // // // // // // // // // // //     doc.fontSize(12).fillColor('black').text(`Jakarta, ${new Date(cert.issueDate).toLocaleDateString('id-ID')}`, signX, signY, {
// // // // // // // // // // // // //       align: 'center',
// // // // // // // // // // // // //       width: 200
// // // // // // // // // // // // //     });

// // // // // // // // // // // // //     doc.moveDown(2); // Ruang untuk tanda tangan
// // // // // // // // // // // // //     doc.text('( Pimpinan LMS )', signX, doc.y, {
// // // // // // // // // // // // //       align: 'center',
// // // // // // // // // // // // //       width: 200
// // // // // // // // // // // // //     });

// // // // // // // // // // // // //     // Selesai
// // // // // // // // // // // // //     doc.end();

// // // // // // // // // // // // //   } catch (e: any) {
// // // // // // // // // // // // //     console.error(e);
// // // // // // // // // // // // //     res.status(500).send('Gagal membuat PDF');
// // // // // // // // // // // // //   }
// // // // // // // // // // // // // });

// // // // // // // // // // // // // // 3. CHECK STATUS (Existing)
// // // // // // // // // // // // // router.get('/:courseId', requireAuth, async (req: AuthedRequest, res) => {
// // // // // // // // // // // // //   try {
// // // // // // // // // // // // //     const certificate = await Certificate.findOne({
// // // // // // // // // // // // //       userId: req.user!.id,
// // // // // // // // // // // // //       courseId: req.params.courseId
// // // // // // // // // // // // //     });
// // // // // // // // // // // // //     res.json({ certificate });
// // // // // // // // // // // // //   } catch (e: any) {
// // // // // // // // // // // // //     res.status(500).json({ error: e.message });
// // // // // // // // // // // // //   }
// // // // // // // // // // // // // });

// // // // // // // // // // // // // // 4. ISSUE CERTIFICATE (Existing)
// // // // // // // // // // // // // router.post('/:courseId/issue', requireAuth, async (req: AuthedRequest, res) => {
// // // // // // // // // // // // //   try {
// // // // // // // // // // // // //     const { courseId } = req.params;
// // // // // // // // // // // // //     const userId = req.user!.id;

// // // // // // // // // // // // //     const existingCert = await Certificate.findOne({ userId, courseId });
// // // // // // // // // // // // //     if (existingCert) {
// // // // // // // // // // // // //       return res.status(200).json({ message: 'Sertifikat sudah diterbitkan', certificate: existingCert });
// // // // // // // // // // // // //     }

// // // // // // // // // // // // //     const user = await User.findById(userId) as IUser;
// // // // // // // // // // // // //     const course = await Course.findById(courseId) as ICourse;

// // // // // // // // // // // // //     if (!course || !user) return res.status(404).json({ error: 'Data tidak ditemukan' });

// // // // // // // // // // // // //     // Validasi Progress (Simple Version)
// // // // // // // // // // // // //     const userProgress = user.progress.find(p => p.courseId.toString() === courseId);
// // // // // // // // // // // // //     const completedLessonIds = userProgress ? userProgress.completedLessons : [];
    
// // // // // // // // // // // // //     let totalLessons = 0;
// // // // // // // // // // // // //     course.modules.forEach((m: IModule) => { if(m.isPublished) totalLessons += m.lessons.length; });

// // // // // // // // // // // // //     if (completedLessonIds.length < totalLessons || totalLessons === 0) {
// // // // // // // // // // // // //        return res.status(400).json({ error: 'Selesaikan semua materi terlebih dahulu.' });
// // // // // // // // // // // // //     }

// // // // // // // // // // // // //     const newCert = await Certificate.create({
// // // // // // // // // // // // //       userId,
// // // // // // // // // // // // //       courseId,
// // // // // // // // // // // // //       certificateCode: `CERT-${nanoid(8).toUpperCase()}`,
// // // // // // // // // // // // //       issueDate: new Date()
// // // // // // // // // // // // //     });

// // // // // // // // // // // // //     res.status(201).json({ message: 'Sertifikat berhasil diterbitkan!', certificate: newCert });

// // // // // // // // // // // // //   } catch (e: any) {
// // // // // // // // // // // // //     console.error(e);
// // // // // // // // // // // // //     res.status(500).json({ error: e.message });
// // // // // // // // // // // // //   }
// // // // // // // // // // // // // });

// // // // // // // // // // // // // export default router;
// // // // // // // // // // // // import express from 'express';
// // // // // // // // // // // // import { nanoid } from 'nanoid';
// // // // // // // // // // // // import PDFDocument from 'pdfkit';
// // // // // // // // // // // // import { Certificate } from '../models/Certificate';
// // // // // // // // // // // // import { Course, ICourse, IModule } from '../models/Course';
// // // // // // // // // // // // import { User, IUser } from '../models/User';
// // // // // // // // // // // // import { requireAuth, AuthedRequest } from '../middleware/auth';

// // // // // // // // // // // // const router = express.Router();

// // // // // // // // // // // // /**
// // // // // // // // // // // //  * 1. GET ALL MY CERTIFICATES (JSON)
// // // // // // // // // // // //  * Digunakan untuk menampilkan daftar di halaman Profile
// // // // // // // // // // // //  */
// // // // // // // // // // // // router.get('/', requireAuth, async (req: AuthedRequest, res) => {
// // // // // // // // // // // //   try {
// // // // // // // // // // // //     const certificates = await Certificate.find({ userId: req.user!.id })
// // // // // // // // // // // //       .populate('courseId', 'title thumbnailUrl')
// // // // // // // // // // // //       .sort({ createdAt: -1 });
// // // // // // // // // // // //     res.json(certificates);
// // // // // // // // // // // //   } catch (e: any) {
// // // // // // // // // // // //     res.status(500).json({ error: e.message });
// // // // // // // // // // // //   }
// // // // // // // // // // // // });

// // // // // // // // // // // // /**
// // // // // // // // // // // //  * 2. GENERATE & DOWNLOAD PDF
// // // // // // // // // // // //  * Endpoint: GET /api/certificates/:id/pdf
// // // // // // // // // // // //  */
// // // // // // // // // // // // router.get('/:id/pdf', async (req: express.Request, res: express.Response) => {
// // // // // // // // // // // //   try {
// // // // // // // // // // // //     const { id } = req.params;

// // // // // // // // // // // //     // A. Validasi format ID MongoDB (24 karakter hex)
// // // // // // // // // // // //     if (!id.match(/^[0-9a-fA-F]{24}$/)) {
// // // // // // // // // // // //       return res.status(400).send('Format ID Sertifikat tidak valid');
// // // // // // // // // // // //     }

// // // // // // // // // // // //     // B. Cari Sertifikat di Database
// // // // // // // // // // // //     console.log(`🔍 Mencari sertifikat untuk PDF: ${id}`);
// // // // // // // // // // // //     const cert: any = await Certificate.findById(id)
// // // // // // // // // // // //       .populate('userId', 'name')
// // // // // // // // // // // //       .populate('courseId', 'title');

// // // // // // // // // // // //     if (!cert) {
// // // // // // // // // // // //       console.error(`❌ Sertifikat ID ${id} tidak ditemukan di database.`);
// // // // // // // // // // // //       return res.status(404).send('Sertifikat tidak ditemukan. Silakan klaim ulang.');
// // // // // // // // // // // //     }

// // // // // // // // // // // //     // C. Konfigurasi Dokumen PDF (Landscape A4)
// // // // // // // // // // // //     const doc = new PDFDocument({
// // // // // // // // // // // //       layout: 'landscape',
// // // // // // // // // // // //       size: 'A4',
// // // // // // // // // // // //       margin: 0 // Kita atur margin manual di dalam
// // // // // // // // // // // //     });

// // // // // // // // // // // //     // Header HTTP untuk mengirim file PDF
// // // // // // // // // // // //     res.setHeader('Content-Type', 'application/pdf');
// // // // // // // // // // // //     res.setHeader('Content-Disposition', `inline; filename=Sertifikat-${cert.certificateCode}.pdf`);

// // // // // // // // // // // //     doc.pipe(res);

// // // // // // // // // // // //     // --- MENGGAMBAR SERTIFIKAT ---

// // // // // // // // // // // //     // 1. Background / Bingkai
// // // // // // // // // // // //     doc.rect(40, 40, doc.page.width - 80, doc.page.height - 80)
// // // // // // // // // // // //        .lineWidth(3)
// // // // // // // // // // // //        .stroke('#8B0000'); // Garis Luar Merah Tua
    
// // // // // // // // // // // //     doc.rect(50, 50, doc.page.width - 100, doc.page.height - 100)
// // // // // // // // // // // //        .lineWidth(1)
// // // // // // // // // // // //        .stroke('#000000'); // Garis Dalam Hitam Tipis

// // // // // // // // // // // //     // 2. Judul Utama
// // // // // // // // // // // //     doc.moveDown(5);
// // // // // // // // // // // //     doc.font('Helvetica-Bold')
// // // // // // // // // // // //        .fontSize(45)
// // // // // // // // // // // //        .fillColor('#8B0000')
// // // // // // // // // // // //        .text('SERTIFIKAT KELULUSAN', { align: 'center', characterSpacing: 2 });

// // // // // // // // // // // //     doc.moveDown(0.5);
// // // // // // // // // // // //     doc.font('Helvetica')
// // // // // // // // // // // //        .fontSize(14)
// // // // // // // // // // // //        .fillColor('#555555')
// // // // // // // // // // // //        .text(`Nomor Sertifikat: ${cert.certificateCode}`, { align: 'center' });

// // // // // // // // // // // //     // 3. Nama Penerima
// // // // // // // // // // // //     doc.moveDown(2);
// // // // // // // // // // // //     doc.font('Helvetica')
// // // // // // // // // // // //        .fontSize(18)
// // // // // // // // // // // //        .fillColor('#000000')
// // // // // // // // // // // //        .text('Diberikan kepada:', { align: 'center' });

// // // // // // // // // // // //     doc.moveDown(0.5);
// // // // // // // // // // // //     doc.font('Helvetica-Bold')
// // // // // // // // // // // //        .fontSize(40)
// // // // // // // // // // // //        .fillColor('#1a1a1a')
// // // // // // // // // // // //        .text(cert.userId?.name || 'Peserta', { align: 'center' });

// // // // // // // // // // // //     // 4. Detail Kursus
// // // // // // // // // // // //     doc.moveDown(1);
// // // // // // // // // // // //     doc.font('Helvetica')
// // // // // // // // // // // //        .fontSize(18)
// // // // // // // // // // // //        .fillColor('#000000')
// // // // // // // // // // // //        .text('Atas keberhasilannya menyelesaikan pelatihan:', { align: 'center' });

// // // // // // // // // // // //     doc.moveDown(0.5);
// // // // // // // // // // // //     doc.font('Helvetica-Bold')
// // // // // // // // // // // //        .fontSize(24)
// // // // // // // // // // // //        .fillColor('#d35400')
// // // // // // // // // // // //        .text(`"${cert.courseId?.title || 'Judul Pelatihan'}"`, { align: 'center' });

// // // // // // // // // // // //     // 5. Tanda Tangan & Tanggal (Footer)
// // // // // // // // // // // //     const footerY = 420;
    
// // // // // // // // // // // //     // Sisi Kiri: Tanggal
// // // // // // // // // // // //     doc.font('Helvetica')
// // // // // // // // // // // //        .fontSize(12)
// // // // // // // // // // // //        .fillColor('#000000')
// // // // // // // // // // // //        .text(`Diterbitkan pada:`, 100, footerY);
// // // // // // // // // // // //     doc.font('Helvetica-Bold')
// // // // // // // // // // // //        .text(`${new Date(cert.issueDate).toLocaleDateString('id-ID', { dateStyle: 'long' })}`, 100, footerY + 15);

// // // // // // // // // // // //     // Sisi Kanan: Tanda Tangan Digital
// // // // // // // // // // // //     doc.font('Helvetica')
// // // // // // // // // // // //        .text('Direktur Pelatihan LMS', 550, footerY, { align: 'center', width: 200 });
// // // // // // // // // // // //     doc.moveDown(2);
// // // // // // // // // // // //     doc.font('Helvetica-Bold')
// // // // // // // // // // // //        .text('( Sistem Administrator )', 550, footerY + 50, { align: 'center', width: 200 });

// // // // // // // // // // // //     // Akhiri Dokumen
// // // // // // // // // // // //     doc.end();
// // // // // // // // // // // //     console.log(`✅ PDF Berhasil di-generate untuk: ${cert.certificateCode}`);

// // // // // // // // // // // //   } catch (e: any) {
// // // // // // // // // // // //     console.error("🔥 Error PDF Generator:", e);
// // // // // // // // // // // //     if (!res.headersSent) {
// // // // // // // // // // // //         res.status(500).send('Terjadi kesalahan saat memproses PDF.');
// // // // // // // // // // // //     }
// // // // // // // // // // // //   }
// // // // // // // // // // // // });

// // // // // // // // // // // // /**
// // // // // // // // // // // //  * 3. GET STATUS CERTIFICATE FOR SPECIFIC COURSE
// // // // // // // // // // // //  * Digunakan di halaman kursus untuk cek apakah tombol "Klaim" atau "Lihat" yang muncul
// // // // // // // // // // // // //  */
// // // // // // // // // // // // // router.get('/:courseId', requireAuth, async (req: AuthedRequest, res) => {
// // // // // // // // // // // // //   try {
// // // // // // // // // // // // //     const certificate = await Certificate.findOne({
// // // // // // // // // // // // //       userId: req.user!.id,
// // // // // // // // // // // // //       courseId: req.params.courseId
// // // // // // // // // // // // //     });
// // // // // // // // // // // // //     res.json({ certificate });
// // // // // // // // // // // // //   } catch (e: any) {
// // // // // // // // // // // // //     res.status(500).json({ error: e.message });
// // // // // // // // // // // // //   }
// // // // // // // // // // // // // });

// // // // // // // // // // // // // /**
// // // // // // // // // // // // //  * 4. ISSUE CERTIFICATE (Klaim Sertifikat)
// // // // // // // // // // // // //  */
// // // // // // // // // // // // // router.post('/:courseId/issue', requireAuth, async (req: AuthedRequest, res) => {
// // // // // // // // // // // // //   try {
// // // // // // // // // // // // //     const { courseId } = req.params;
// // // // // // // // // // // // //     const userId = req.user!.id;

// // // // // // // // // // // // //     // Cek duplikasi
// // // // // // // // // // // // //     const existingCert = await Certificate.findOne({ userId, courseId });
// // // // // // // // // // // // //     if (existingCert) {
// // // // // // // // // // // // //       return res.status(200).json({ message: 'Sertifikat sudah ada', certificate: existingCert });
// // // // // // // // // // // // //     }

// // // // // // // // // // // // //     const user = await User.findById(userId) as IUser;
// // // // // // // // // // // // //     const course = await Course.findById(courseId) as ICourse;

// // // // // // // // // // // // //     if (!course || !user) return res.status(404).json({ error: 'Data tidak ditemukan' });

// // // // // // // // // // // // //     // Validasi Progress
// // // // // // // // // // // // //     const userProgress = user.progress.find(p => p.courseId.toString() === courseId);
// // // // // // // // // // // // //     const completedLessonIds = userProgress ? userProgress.completedLessons : [];
    
// // // // // // // // // // // // //     let totalLessons = 0;
// // // // // // // // // // // // //     course.modules.forEach((m: IModule) => { if(m.isActive) totalLessons += m.lessons.length; });

// // // // // // // // // // // // //     if (totalLessons === 0 || completedLessonIds.length < totalLessons) {
// // // // // // // // // // // // //        return res.status(400).json({ error: 'Progress belum 100%. Selesaikan semua materi dahulu.' });
// // // // // // // // // // // // //     }

// // // // // // // // // // // // //     // Buat Baru
// // // // // // // // // // // // //     const newCert = await Certificate.create({
// // // // // // // // // // // // //       userId,
// // // // // // // // // // // // //       courseId,
// // // // // // // // // // // // //       certificateCode: `CERT-${nanoid(8).toUpperCase()}`,
// // // // // // // // // // // // //       issueDate: new Date()
// // // // // // // // // // // // //     });

// // // // // // // // // // // // //     res.status(201).json({ message: 'Sertifikat berhasil diterbitkan!', certificate: newCert });

// // // // // // // // // // // // //   } catch (e: any) {
// // // // // // // // // // // // //     res.status(500).json({ error: e.message });
// // // // // // // // // // // // //   }
// // // // // // // // // // // // // });

// // // // // // // // // // // // // export default router;
// // // // // // // // // // // // import express from 'express';
// // // // // // // // // // // // import { nanoid } from 'nanoid';
// // // // // // // // // // // // import PDFDocument from 'pdfkit';
// // // // // // // // // // // // import QRCode from 'qrcode'; // Pastikan sudah install: npm i qrcode
// // // // // // // // // // // // import { Certificate } from '../models/Certificate';
// // // // // // // // // // // // import { Course, ICourse, IModule } from '../models/Course';
// // // // // // // // // // // // import { User, IUser } from '../models/User';
// // // // // // // // // // // // import { requireAuth, AuthedRequest } from '../middleware/auth';

// // // // // // // // // // // // const router = express.Router();

// // // // // // // // // // // // /**
// // // // // // // // // // // //  * 1. GET ALL MY CERTIFICATES
// // // // // // // // // // // //  * Menampilkan daftar sertifikat di halaman profil pengguna
// // // // // // // // // // // //  */
// // // // // // // // // // // // router.get('/', requireAuth, async (req: AuthedRequest, res) => {
// // // // // // // // // // // //   try {
// // // // // // // // // // // //     const certificates = await Certificate.find({ userId: req.user!.id })
// // // // // // // // // // // //       .populate('courseId', 'title thumbnailUrl')
// // // // // // // // // // // //       .sort({ createdAt: -1 });
// // // // // // // // // // // //     res.json(certificates);
// // // // // // // // // // // //   } catch (e: any) {
// // // // // // // // // // // //     res.status(500).json({ error: e.message });
// // // // // // // // // // // //   }
// // // // // // // // // // // // });

// // // // // // // // // // // // /**
// // // // // // // // // // // //  * 2. GENERATE & DOWNLOAD PDF
// // // // // // // // // // // //  * Endpoint: GET /api/certificates/:id/pdf
// // // // // // // // // // // //  * Digunakan untuk mengunduh sertifikat dalam format PDF
// // // // // // // // // // // //  */
// // // // // // // // // // // // router.get('/:id/pdf', async (req: express.Request, res: express.Response) => {
// // // // // // // // // // // //   try {
// // // // // // // // // // // //     const { id } = req.params;

// // // // // // // // // // // //     // Validasi format ID
// // // // // // // // // // // //     if (!id.match(/^[0-9a-fA-F]{24}$/)) {
// // // // // // // // // // // //       return res.status(400).send('ID Sertifikat tidak valid');
// // // // // // // // // // // //     }

// // // // // // // // // // // //     const cert: any = await Certificate.findById(id)
// // // // // // // // // // // //       .populate('userId', 'name email')
// // // // // // // // // // // //       .populate('courseId', 'title');

// // // // // // // // // // // //     if (!cert) {
// // // // // // // // // // // //       return res.status(404).send('Sertifikat tidak ditemukan.');
// // // // // // // // // // // //     }

// // // // // // // // // // // //     // Inisialisasi PDF (Landscape A4)
// // // // // // // // // // // //     const doc = new PDFDocument({
// // // // // // // // // // // //       layout: 'landscape',
// // // // // // // // // // // //       size: 'A4',
// // // // // // // // // // // //       margin: 0
// // // // // // // // // // // //     });

// // // // // // // // // // // //     // Setting Header Response
// // // // // // // // // // // //     res.setHeader('Content-Type', 'application/pdf');
// // // // // // // // // // // //     res.setHeader('Content-Disposition', `attachment; filename=Sertifikat-${cert.certificateCode}.pdf`);

// // // // // // // // // // // //     doc.pipe(res);

// // // // // // // // // // // //     // --- DESAIN VISUAL SERTIFIKAT ---

// // // // // // // // // // // //     // 1. Bingkai Ganda (Merah PMI & Hitam)
// // // // // // // // // // // //     doc.rect(40, 40, doc.page.width - 80, doc.page.height - 80).lineWidth(4).stroke('#8B0000');
// // // // // // // // // // // //     doc.rect(50, 50, doc.page.width - 100, doc.page.height - 100).lineWidth(1).stroke('#000000');

// // // // // // // // // // // //     // 2. Judul
// // // // // // // // // // // //     doc.moveDown(4);
// // // // // // // // // // // //     doc.font('Helvetica-Bold').fontSize(42).fillColor('#8B0000').text('SERTIFIKAT KELULUSAN', { 
// // // // // // // // // // // //       align: 'center', 
// // // // // // // // // // // //       characterSpacing: 1 
// // // // // // // // // // // //     });

// // // // // // // // // // // //     doc.moveDown(0.5);
// // // // // // // // // // // //     doc.font('Helvetica').fontSize(14).fillColor('#666666').text(`No: ${cert.certificateCode}`, { align: 'center' });

// // // // // // // // // // // //     // 3. Konten Utama
// // // // // // // // // // // //     doc.moveDown(2);
// // // // // // // // // // // //     doc.font('Helvetica').fontSize(20).fillColor('#000000').text('Diberikan kepada:', { align: 'center' });
    
// // // // // // // // // // // //     doc.moveDown(0.5);
// // // // // // // // // // // //     doc.font('Helvetica-Bold').fontSize(38).fillColor('#1a1a1a').text(cert.userId?.name || 'Peserta', { align: 'center' });

// // // // // // // // // // // //     doc.moveDown(1);
// // // // // // // // // // // //     doc.font('Helvetica').fontSize(18).text('Telah dinyatakan lulus dalam pelatihan:', { align: 'center' });
    
// // // // // // // // // // // //     doc.moveDown(0.5);
// // // // // // // // // // // //     doc.font('Helvetica-Bold').fontSize(26).fillColor('#d35400').text(`"${cert.courseId?.title || 'Judul Kursus'}"`, { align: 'center' });

// // // // // // // // // // // //     // 4. QR Code Verifikasi (Kiri Bawah)
// // // // // // // // // // // //     const qrData = `VERIFY-CERT:${cert.certificateCode}`;
// // // // // // // // // // // //     const qrBuffer = await QRCode.toBuffer(qrData, { width: 80 });
// // // // // // // // // // // //     doc.image(qrBuffer, 100, 440);
// // // // // // // // // // // //     doc.fontSize(8).fillColor('#999').text('Scan untuk verifikasi', 100, 525);

// // // // // // // // // // // //     // 5. Tanda Tangan & Tanggal (Kanan Bawah)
// // // // // // // // // // // //     const footerY = 450;
// // // // // // // // // // // //     doc.font('Helvetica').fontSize(12).fillColor('#000000')
// // // // // // // // // // // //        .text(`Jakarta, ${new Date(cert.issueDate).toLocaleDateString('id-ID', { dateStyle: 'long' })}`, 550, footerY, { align: 'center', width: 200 });
    
// // // // // // // // // // // //     doc.moveDown(2);
// // // // // // // // // // // //     doc.font('Helvetica-Bold').text('Sistem Administrator LMS', 550, footerY + 50, { align: 'center', width: 200 });

// // // // // // // // // // // //     doc.end();

// // // // // // // // // // // //   } catch (e: any) {
// // // // // // // // // // // //     console.error("🔥 PDF Error:", e);
// // // // // // // // // // // //     if (!res.headersSent) res.status(500).send('Gagal membuat file PDF.');
// // // // // // // // // // // //   }
// // // // // // // // // // // // });

// // // // // // // // // // // // /**
// // // // // // // // // // // //  * 3. CHECK STATUS (Untuk Tombol di UI)
// // // // // // // // // // // //  */
// // // // // // // // // // // // router.get('/:courseId', requireAuth, async (req: AuthedRequest, res) => {
// // // // // // // // // // // //   try {
// // // // // // // // // // // //     const certificate = await Certificate.findOne({
// // // // // // // // // // // //       userId: req.user!.id,
// // // // // // // // // // // //       courseId: req.params.courseId
// // // // // // // // // // // //     });
// // // // // // // // // // // //     res.json({ certificate });
// // // // // // // // // // // //   } catch (e: any) {
// // // // // // // // // // // //     res.status(500).json({ error: e.message });
// // // // // // // // // // // //   }
// // // // // // // // // // // // });

// // // // // // // // // // // // /**
// // // // // // // // // // // //  * 4. ISSUE CERTIFICATE (Klaim Sertifikat)
// // // // // // // // // // // //  * Memverifikasi progress belajar dan menerbitkan sertifikat jika 100%
// // // // // // // // // // // //  */
// // // // // // // // // // // // router.post('/:courseId/issue', requireAuth, async (req: AuthedRequest, res) => {
// // // // // // // // // // // //   try {
// // // // // // // // // // // //     const { courseId } = req.params;
// // // // // // // // // // // //     const userId = req.user!.id;

// // // // // // // // // // // //     // Cek jika sudah ada
// // // // // // // // // // // //     const existingCert = await Certificate.findOne({ userId, courseId });
// // // // // // // // // // // //     if (existingCert) {
// // // // // // // // // // // //       return res.status(200).json({ message: 'Sertifikat sudah diterbitkan', certificate: existingCert });
// // // // // // // // // // // //     }

// // // // // // // // // // // //     const user = await User.findById(userId) as IUser;
// // // // // // // // // // // //     const course = await Course.findById(courseId) as ICourse;

// // // // // // // // // // // //     if (!course || !user) return res.status(404).json({ error: 'Data tidak ditemukan' });

// // // // // // // // // // // //     // Validasi Progress Belajar
// // // // // // // // // // // //     const userProgress = user.progress.find(p => p.courseId.toString() === courseId);
// // // // // // // // // // // //     const completedLessonIds = userProgress ? userProgress.completedLessons : [];
    
// // // // // // // // // // // //     let totalLessons = 0;
// // // // // // // // // // // //     course.modules.forEach((m: IModule) => { 
// // // // // // // // // // // //       // Sesuaikan dengan field di model Course Anda (isPublished atau isActive)
// // // // // // // // // // // //       if (m.isActive || (m as any).isPublished) totalLessons += m.lessons.length; 
// // // // // // // // // // // //     });

// // // // // // // // // // // //     if (totalLessons === 0 || completedLessonIds.length < totalLessons) {
// // // // // // // // // // // //       return res.status(400).json({ 
// // // // // // // // // // // //         error: `Progress belum lengkap. (${completedLessonIds.length}/${totalLessons} materi)` 
// // // // // // // // // // // //       });
// // // // // // // // // // // //     }

// // // // // // // // // // // //     // Penerbitan
// // // // // // // // // // // //     const newCert = await Certificate.create({
// // // // // // // // // // // //       userId,
// // // // // // // // // // // //       courseId,
// // // // // // // // // // // //       certificateCode: `PMI-${nanoid(10).toUpperCase()}`,
// // // // // // // // // // // //       issueDate: new Date()
// // // // // // // // // // // //     });

// // // // // // // // // // // //     res.status(201).json({ message: 'Selamat! Sertifikat berhasil diklaim.', certificate: newCert });

// // // // // // // // // // // //   } catch (e: any) {
// // // // // // // // // // // //     console.error("🔥 Issue Cert Error:", e);
// // // // // // // // // // // //     res.status(500).json({ error: e.message });
// // // // // // // // // // // //   }
// // // // // // // // // // // // });

// // // // // // // // // // // // export default router;
// // // // // // // // // // // import express from 'express';
// // // // // // // // // // // import { nanoid } from 'nanoid';
// // // // // // // // // // // import PDFDocument from 'pdfkit';
// // // // // // // // // // // import QRCode from 'qrcode';
// // // // // // // // // // // import { Certificate } from '../models/Certificate';
// // // // // // // // // // // import { Course } from '../models/Course'; // Pastikan path benar
// // // // // // // // // // // import { User } from '../models/User';
// // // // // // // // // // // import { requireAuth, AuthedRequest } from '../middleware/auth';

// // // // // // // // // // // const router = express.Router();

// // // // // // // // // // // // ... (Route GET / dan GET /:courseId tetap sama, tidak perlu diubah) ...

// // // // // // // // // // // /**
// // // // // // // // // // //  * GENERATE & DOWNLOAD PDF (REVISI FULL SESUAI DESAIN)
// // // // // // // // // // //  */
// // // // // // // // // // // router.get('/:id/pdf', async (req: express.Request, res: express.Response) => {
// // // // // // // // // // //   try {
// // // // // // // // // // //     const { id } = req.params;

// // // // // // // // // // //     // Ambil data sertifikat lengkap dengan Course dan User
// // // // // // // // // // //     const cert: any = await Certificate.findById(id)
// // // // // // // // // // //       .populate('userId', 'name')
// // // // // // // // // // //       .populate('courseId'); // Ambil full course data untuk akses competencies

// // // // // // // // // // //     if (!cert) return res.status(404).send('Sertifikat tidak ditemukan.');

// // // // // // // // // // //     const courseData = cert.courseId;
// // // // // // // // // // //     const userData = cert.userId;

// // // // // // // // // // //     // --- SETUP PDF ---
// // // // // // // // // // //     const doc = new PDFDocument({
// // // // // // // // // // //       layout: 'portrait', // Sesuai gambar contoh (Portrait A4)
// // // // // // // // // // //       size: 'A4',
// // // // // // // // // // //       margin: 0,
// // // // // // // // // // //       autoFirstPage: false // Kita buat page manual
// // // // // // // // // // //     });

// // // // // // // // // // //     res.setHeader('Content-Type', 'application/pdf');
// // // // // // // // // // //     res.setHeader('Content-Disposition', `inline; filename=Sertifikat-${cert.certificateCode}.pdf`);
// // // // // // // // // // //     doc.pipe(res);

// // // // // // // // // // //     // ==========================================
// // // // // // // // // // //     // HALAMAN 1: DEPAN (Sertifikat Utama)
// // // // // // // // // // //     // ==========================================
// // // // // // // // // // //     doc.addPage();
// // // // // // // // // // //     const width = doc.page.width;
// // // // // // // // // // //     const height = doc.page.height;

// // // // // // // // // // //     // 1. Header Merah & Aksen
// // // // // // // // // // //     // Kotak Merah Besar
// // // // // // // // // // //     doc.rect(0, 0, width, 140).fill('#D32F2F'); // Merah PMI
// // // // // // // // // // //     // Aksen Warna di Kanan Atas (Opsional sesuai gambar)
// // // // // // // // // // //     doc.rect(width - 150, 0, 50, 140).fill('#E57373'); // Merah Muda
// // // // // // // // // // //     doc.rect(width - 100, 0, 50, 140).fill('#FFCDD2'); // Pink Pucat
// // // // // // // // // // //     doc.rect(width - 50, 0, 50, 140).fill('#FFEBEE'); // Putih Kemerahan

// // // // // // // // // // //     // 2. Logo & Teks Header (Bisa pakai gambar jika ada, disini pakai Teks)
// // // // // // // // // // //     // Simulasikan posisi Logo di tengah atas atau kiri atas di area merah
// // // // // // // // // // //     // doc.image('path/to/logo.png', 50, 40, { width: 60 }); 
    
// // // // // // // // // // //     // Teks PMI di bawah header merah
// // // // // // // // // // //     doc.moveDown(5); // Turun dari area merah
// // // // // // // // // // //     doc.font('Helvetica-Bold').fontSize(16).fillColor('#333')
// // // // // // // // // // //        .text('Palang Merah', { align: 'center' });
// // // // // // // // // // //     doc.text('Indonesia', { align: 'center' });

// // // // // // // // // // //     // 3. Judul SERTIFIKAT
// // // // // // // // // // //     doc.moveDown(1.5);
// // // // // // // // // // //     doc.font('Helvetica-Bold').fontSize(36).fillColor('#000')
// // // // // // // // // // //        .text('SERTIFIKAT', { align: 'center', characterSpacing: 2 });
    
// // // // // // // // // // //     doc.font('Helvetica-Oblique').fontSize(12).fillColor('#555')
// // // // // // // // // // //        .text('Certificate', { align: 'center' });

// // // // // // // // // // //     // Nomor Sertifikat
// // // // // // // // // // //     doc.moveDown(0.5);
// // // // // // // // // // //     doc.font('Helvetica').fontSize(10).text(`No : ${cert.certificateCode}`, { align: 'center' });

// // // // // // // // // // //     // 4. Penerima
// // // // // // // // // // //     doc.moveDown(1.5);
// // // // // // // // // // //     doc.fontSize(12).text('Diberikan kepada :', { align: 'center' });
// // // // // // // // // // //     doc.font('Helvetica-Oblique').fontSize(10).fillColor('#777').text('Awarded to', { align: 'center' });

// // // // // // // // // // //     doc.moveDown(0.5);
// // // // // // // // // // //     doc.font('Helvetica-Bold').fontSize(24).fillColor('#000')
// // // // // // // // // // //        .text(userData.name.toUpperCase(), { align: 'center' });
    
// // // // // // // // // // //     // Organisasi Unit (Hardcoded atau dari User Profile jika ada)
// // // // // // // // // // //     doc.font('Helvetica').fontSize(12).text('KSR PMI UNIT UNDIKSHA', { align: 'center' });

// // // // // // // // // // //     // 5. Sebagai PESERTA
// // // // // // // // // // //     doc.moveDown(1);
// // // // // // // // // // //     doc.fontSize(12).text('Sebagai', { align: 'center' });
// // // // // // // // // // //     doc.font('Helvetica-Bold').fontSize(16).text('PESERTA', { align: 'center' });

// // // // // // // // // // //     // 6. Nama Pelatihan
// // // // // // // // // // //     doc.moveDown(1);
// // // // // // // // // // //     doc.font('Helvetica-Bold').fontSize(20).text(courseData.title, { align: 'center' });
// // // // // // // // // // //     doc.font('Helvetica-Oblique').fontSize(12).fillColor('#555')
// // // // // // // // // // //        .text('Basic Training of Volunteer Corps', { align: 'center' }); // Bisa dinamis jika ada field bahasa inggris

// // // // // // // // // // //     // Lokasi & Tanggal (Statik contoh, atau dari data course)
// // // // // // // // // // //     doc.moveDown(1);
// // // // // // // // // // //     doc.font('Helvetica').fontSize(10).fillColor('#000')
// // // // // // // // // // //        .text(`Dilaksanakan, ${new Date(cert.issueDate).toLocaleDateString('id-ID', { dateStyle: 'long' })}`, { align: 'center' });

// // // // // // // // // // //     // 7. Tanda Tangan (Footer)
// // // // // // // // // // //     const footerY = height - 150;
    
// // // // // // // // // // //     // QR Code (Kiri Bawah - Validasi)
// // // // // // // // // // //     const qrData = `VERIFY:${cert.certificateCode}`;
// // // // // // // // // // //     const qrBuffer = await QRCode.toBuffer(qrData, { width: 80 });
// // // // // // // // // // //     doc.image(qrBuffer, 60, footerY);

// // // // // // // // // // //     // TTD Ketua (Tengah/Kanan Bawah)
// // // // // // // // // // //     doc.font('Helvetica').fontSize(10).text(`Singaraja, ${new Date(cert.issueDate).toLocaleDateString('id-ID', { dateStyle: 'long' })}`, 0, footerY, { align: 'center' });
// // // // // // // // // // //     doc.text('Pengurus Kabupaten', { align: 'center' });
// // // // // // // // // // //     doc.font('Helvetica-Bold').text('PALANG MERAH INDONESIA', { align: 'center' });
    
// // // // // // // // // // //     doc.moveDown(0.5);
// // // // // // // // // // //     doc.text('Ketua,', { align: 'center' });
    
// // // // // // // // // // //     doc.moveDown(3);
// // // // // // // // // // //     doc.font('Helvetica-Bold').fontSize(11).text('dr. I NYOMAN SUTJIDRA, Sp.OG', { align: 'center', underline: true });


// // // // // // // // // // //     // ==========================================
// // // // // // // // // // //     // HALAMAN 2: BELAKANG (Kurikulum / Transkrip)
// // // // // // // // // // //     // ==========================================
// // // // // // // // // // //     doc.addPage();

// // // // // // // // // // //     // 1. Header Halaman Belakang
// // // // // // // // // // //     doc.moveDown(2);
// // // // // // // // // // //     doc.font('Helvetica-Bold').fontSize(14).text('Markas Kabupaten', { align: 'center' });
// // // // // // // // // // //     doc.text('Palang Merah Indonesia', { align: 'center' });
    
// // // // // // // // // // //     doc.moveDown(1);
// // // // // // // // // // //     doc.fontSize(16).text('Daftar Unit Kompetensi', { align: 'center' });
// // // // // // // // // // //     doc.font('Helvetica-Oblique').fontSize(12).fillColor('#555')
// // // // // // // // // // //        .text('List of Unit of Competency', { align: 'center' });

// // // // // // // // // // //     doc.moveDown(2);

// // // // // // // // // // //     // 2. TABEL KURIKULUM
// // // // // // // // // // //     const tableTop = doc.y;
// // // // // // // // // // //     const colNoX = 50;
// // // // // // // // // // //     const colCodeX = 90;
// // // // // // // // // // //     const colTitleX = 220;
    
// // // // // // // // // // //     // Header Tabel
// // // // // // // // // // //     doc.font('Helvetica-Bold').fontSize(10).fillColor('#000');
// // // // // // // // // // //     doc.text('No.', colNoX, tableTop);
// // // // // // // // // // //     doc.text('No. Kode (Unit Code)', colCodeX, tableTop);
// // // // // // // // // // //     doc.text('Judul Unit (Unit Title)', colTitleX, tableTop);

// // // // // // // // // // //     // Garis Bawah Header
// // // // // // // // // // //     doc.moveTo(40, tableTop + 15).lineTo(550, tableTop + 15).stroke();

// // // // // // // // // // //     let currentY = tableTop + 25;

// // // // // // // // // // //     // Loop Data Kompetensi dari Database
// // // // // // // // // // //     const competencies = courseData.competencies || [];

// // // // // // // // // // //     if (competencies.length > 0) {
// // // // // // // // // // //       doc.font('Helvetica').fontSize(10);
      
// // // // // // // // // // //       competencies.forEach((comp: any, index: number) => {
// // // // // // // // // // //         // Cek jika halaman penuh
// // // // // // // // // // //         if (currentY > height - 100) {
// // // // // // // // // // //            doc.addPage();
// // // // // // // // // // //            currentY = 50;
// // // // // // // // // // //         }

// // // // // // // // // // //         doc.text(String(index + 1), colNoX, currentY);
// // // // // // // // // // //         doc.text(comp.code || '-', colCodeX, currentY);
// // // // // // // // // // //         doc.text(comp.title || '-', colTitleX, currentY, { width: 300 }); // Wrap text judul

// // // // // // // // // // //         // Hitung tinggi baris (karena judul bisa panjang)
// // // // // // // // // // //         const titleHeight = doc.heightOfString(comp.title, { width: 300 });
// // // // // // // // // // //         const rowHeight = Math.max(titleHeight, 15) + 10;
        
// // // // // // // // // // //         // Garis Pemisah antar baris (Tipis)
// // // // // // // // // // //         doc.lineWidth(0.5).moveTo(40, currentY + rowHeight - 5).lineTo(550, currentY + rowHeight - 5).stroke('#eee');
        
// // // // // // // // // // //         currentY += rowHeight;
// // // // // // // // // // //       });
// // // // // // // // // // //     } else {
// // // // // // // // // // //       doc.text('Data kompetensi belum diinput pada sistem.', colCodeX, currentY);
// // // // // // // // // // //     }

// // // // // // // // // // //     // Garis Penutup Tabel
// // // // // // // // // // //     doc.lineWidth(1).moveTo(40, currentY).lineTo(550, currentY).stroke('#000');

// // // // // // // // // // //     // 3. Footer Halaman Belakang (Tanda Tangan Kapusdiklat)
// // // // // // // // // // //     const backFooterY = height - 150;
    
// // // // // // // // // // //     // Pindah ke kanan
// // // // // // // // // // //     const signX = width - 200;
    
// // // // // // // // // // //     doc.font('Helvetica').fontSize(10).fillColor('#000');
// // // // // // // // // // //     doc.text(`Singaraja, ${new Date(cert.issueDate).toLocaleDateString('id-ID', { dateStyle: 'long' })}`, signX, backFooterY);
// // // // // // // // // // //     doc.text('Kepala Pusdiklat', signX, backFooterY + 15);
// // // // // // // // // // //     doc.text('Palang Merah Indonesia', signX, backFooterY + 30);

// // // // // // // // // // //     doc.font('Helvetica-Bold').text('Kadek Sumardika, S.Sos.', signX, backFooterY + 80, { underline: true });

// // // // // // // // // // //     // Catatan Kaki
// // // // // // // // // // //     doc.font('Helvetica-Oblique').fontSize(8).text('Catatan : Standar Minimum Kelulusan (SMK) : 70', 50, height - 50);

// // // // // // // // // // //     doc.end();

// // // // // // // // // // //   } catch (e: any) {
// // // // // // // // // // //     console.error("🔥 PDF Error:", e);
// // // // // // // // // // //     if (!res.headersSent) res.status(500).send('Gagal membuat file PDF.');
// // // // // // // // // // //   }
// // // // // // // // // // // });

// // // // // // // // // // // // ... (Route ISSUE certificate tetap sama) ...

// // // // // // // // // // // export default router;
// // // // // // // // // // import express from 'express';
// // // // // // // // // // import { Certificate } from '../models/Certificate';
// // // // // // // // // // import { Course } from '../models/Course';
// // // // // // // // // // import { requireAuth, requireFacilitator, AuthedRequest } from '../middleware/auth';

// // // // // // // // // // const router = express.Router();

// // // // // // // // // // // 1. ENDPOINT KLAIM SERTIFIKAT (Oleh Siswa)
// // // // // // // // // // router.post('/claim', requireAuth, async (req: AuthedRequest, res: express.Response) => {
// // // // // // // // // //   try {
// // // // // // // // // //     const { courseId } = req.body;
// // // // // // // // // //     const userId = req.user!.id;

// // // // // // // // // //     // Cek apakah sudah pernah klaim
// // // // // // // // // //     const existingCert = await Certificate.findOne({ user: userId, course: courseId });
// // // // // // // // // //     if (existingCert) {
// // // // // // // // // //         return res.json({ message: 'Status Sertifikat', status: existingCert.status, certificate: existingCert });
// // // // // // // // // //     }

// // // // // // // // // //     const course = await Course.findById(courseId);
// // // // // // // // // //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });

// // // // // // // // // //     // --- LOGIKA 1: PELATIHAN (Butuh Approval) ---
// // // // // // // // // //     if (course.programType === 'training') {
// // // // // // // // // //         const approvalRequests = course.modules.map((mod: any) => ({
// // // // // // // // // //             facilitatorId: mod.facilitatorId || course.facilitatorIds[0],
// // // // // // // // // //             moduleId: mod._id,
// // // // // // // // // //             isApproved: false
// // // // // // // // // //         }));

// // // // // // // // // //         const newCert = await Certificate.create({
// // // // // // // // // //             user: userId,
// // // // // // // // // //             course: courseId,
// // // // // // // // // //             status: 'pending', 
// // // // // // // // // //             certificateNumber: `REQ-${Date.now()}`,
// // // // // // // // // //             approvals: approvalRequests
// // // // // // // // // //         });

// // // // // // // // // //         return res.json({ message: 'Permintaan dikirim.', status: 'pending', certificate: newCert });
// // // // // // // // // //     } 
    
// // // // // // // // // //     // --- LOGIKA 2: KURSUS (Langsung Terbit) ---
// // // // // // // // // //     else {
// // // // // // // // // //         const certNum = `CERT-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
// // // // // // // // // //         const newCert = await Certificate.create({
// // // // // // // // // //             user: userId,
// // // // // // // // // //             course: courseId,
// // // // // // // // // //             status: 'issued', 
// // // // // // // // // //             certificateNumber: certNum,
// // // // // // // // // //             approvals: [] 
// // // // // // // // // //         });

// // // // // // // // // //         return res.json({ message: 'Sertifikat terbit!', status: 'issued', certificate: newCert });
// // // // // // // // // //     }

// // // // // // // // // //   } catch (error: any) {
// // // // // // // // // //     res.status(500).json({ error: error.message });
// // // // // // // // // //   }
// // // // // // // // // // });

// // // // // // // // // // // 2. ENDPOINT APPROVAL (Oleh Fasilitator)
// // // // // // // // // // router.patch('/approve', requireAuth, requireFacilitator, async (req: AuthedRequest, res: express.Response) => {
// // // // // // // // // //     try {
// // // // // // // // // //         const { certificateId, moduleId } = req.body;
// // // // // // // // // //         const facilitatorId = req.user!.id;

// // // // // // // // // //         const cert = await Certificate.findById(certificateId);
// // // // // // // // // //         if (!cert) return res.status(404).json({ error: 'Pengajuan tidak ditemukan' });

// // // // // // // // // //         const approvalItem = cert.approvals.find(a => a.moduleId.toString() === moduleId && a.facilitatorId.toString() === facilitatorId);

// // // // // // // // // //         if (!approvalItem) return res.status(403).json({ error: 'Akses ditolak' });

// // // // // // // // // //         approvalItem.isApproved = true;
// // // // // // // // // //         approvalItem.approvedAt = new Date();

// // // // // // // // // //         const allApproved = cert.approvals.every(a => a.isApproved);
// // // // // // // // // //         if (allApproved) {
// // // // // // // // // //             cert.status = 'issued';
// // // // // // // // // //             cert.certificateNumber = `CERT-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
// // // // // // // // // //         }

// // // // // // // // // //         await cert.save();
// // // // // // // // // //         res.json({ message: 'Disetujui', certificate: cert });

// // // // // // // // // //     } catch (error: any) {
// // // // // // // // // //         res.status(500).json({ error: error.message });
// // // // // // // // // //     }
// // // // // // // // // // });

// // // // // // // // // // // 3. GET STATUS KLAIM
// // // // // // // // // // router.get('/status/:courseId', requireAuth, async (req: AuthedRequest, res: express.Response) => {
// // // // // // // // // //     try {
// // // // // // // // // //         const cert = await Certificate.findOne({ user: req.user!.id, course: req.params.courseId });
// // // // // // // // // //         if(!cert) return res.json({ status: 'none' });
// // // // // // // // // //         res.json({ status: cert.status, certificate: cert });
// // // // // // // // // //     } catch (error: any) {
// // // // // // // // // //         res.status(500).json({ error: error.message });
// // // // // // // // // //     }
// // // // // // // // // // });

// // // // // // // // // // export default router;

// // // // // // // // // import express from 'express';
// // // // // // // // // import PDFDocument from 'pdfkit';
// // // // // // // // // import { Certificate } from '../models/Certificate';
// // // // // // // // // import { Course } from '../models/Course';
// // // // // // // // // import { User } from '../models/User';
// // // // // // // // // import { requireAuth, requireFacilitator, AuthedRequest } from '../middleware/auth';

// // // // // // // // // const router = express.Router();

// // // // // // // // // // ... (Endpoint CLAIM dan APPROVE biarkan seperti sebelumnya) ...

// // // // // // // // // // 3. ENDPOINT DOWNLOAD PDF
// // // // // // // // // router.get('/download/:id', async (req: express.Request, res: express.Response) => {
// // // // // // // // //     try {
// // // // // // // // //         const certId = req.params.id;
        
// // // // // // // // //         // 1. Ambil Data Lengkap
// // // // // // // // //         const cert = await Certificate.findById(certId).populate('user').populate('course');
// // // // // // // // //         if (!cert) return res.status(404).send('Sertifikat tidak ditemukan');
        
// // // // // // // // //         const course = cert.course as any;
// // // // // // // // //         const user = cert.user as any;

// // // // // // // // //         // 2. Setup PDF
// // // // // // // // //         const doc = new PDFDocument({ layout: 'landscape', size: 'A4', margin: 0 });
        
// // // // // // // // //         // Header Response agar browser download
// // // // // // // // //         res.setHeader('Content-Type', 'application/pdf');
// // // // // // // // //         res.setHeader('Content-Disposition', `attachment; filename=Sertifikat-${cert.certificateNumber}.pdf`);
        
// // // // // // // // //         doc.pipe(res);

// // // // // // // // //         // --- HALAMAN 1: DEPAN (SERTIFIKAT UTAMA) ---
// // // // // // // // //         // Background / Border (Opsional)
// // // // // // // // //         doc.rect(20, 20, doc.page.width - 40, doc.page.height - 40).strokeColor('#1d4ed8').lineWidth(5).stroke();

// // // // // // // // //         // Judul
// // // // // // // // //         doc.moveDown(4);
// // // // // // // // //         doc.font('Helvetica-Bold').fontSize(30).fillColor('#1e293b').text('SERTIFIKAT KELULUSAN', { align: 'center' });
        
// // // // // // // // //         doc.moveDown(0.5);
// // // // // // // // //         doc.font('Helvetica').fontSize(12).text('No: ' + cert.certificateNumber, { align: 'center' });

// // // // // // // // //         doc.moveDown(2);
// // // // // // // // //         doc.fontSize(16).fillColor('#64748b').text('Diberikan kepada:', { align: 'center' });
        
// // // // // // // // //         doc.moveDown(0.5);
// // // // // // // // //         doc.font('Helvetica-Bold').fontSize(28).fillColor('#000000').text(user.name, { align: 'center' });

// // // // // // // // //         doc.moveDown(1);
// // // // // // // // //         doc.font('Helvetica').fontSize(16).fillColor('#64748b').text('Atas kelulusannya dalam program:', { align: 'center' });

// // // // // // // // //         doc.moveDown(0.5);
// // // // // // // // //         doc.font('Helvetica-Bold').fontSize(24).fillColor('#1d4ed8').text(course.title, { align: 'center' });

// // // // // // // // //         // Tanggal & Tanda Tangan
// // // // // // // // //         const config = course.certificateConfig || {};
// // // // // // // // //         const dateStr = config.executionDate ? new Date(config.executionDate).toLocaleDateString('id-ID', { dateStyle: 'long' }) : new Date().toLocaleDateString('id-ID');
        
// // // // // // // // //         doc.moveDown(4);
// // // // // // // // //         const startY = doc.y;
        
// // // // // // // // //         // Posisi Kanan Bawah
// // // // // // // // //         doc.text(`${config.city || 'Jakarta'}, ${dateStr}`, 500, startY, { align: 'center', width: 200 });
// // // // // // // // //         doc.moveDown(0.5);
// // // // // // // // //         doc.font('Helvetica-Bold').text(config.signatoryPosition || 'Direktur Utama', 500, doc.y, { align: 'center', width: 200 });
        
// // // // // // // // //         doc.moveDown(3);
// // // // // // // // //         doc.text(config.signatoryName || 'Admin Humanis', 500, doc.y, { align: 'center', width: 200, underline: true });


// // // // // // // // //         // --- HALAMAN 2: BELAKANG (TRANSKRIP NILAI) ---
// // // // // // // // //         // Cek apakah "includeCompetenciesInCertificate" bernilai true
// // // // // // // // //         if (course.includeCompetenciesInCertificate && course.competencies && course.competencies.length > 0) {
// // // // // // // // //             doc.addPage({ layout: 'portrait', size: 'A4', margin: 50 });

// // // // // // // // //             doc.font('Helvetica-Bold').fontSize(20).fillColor('#000').text('DAFTAR KOMPETENSI', { align: 'center' });
// // // // // // // // //             doc.moveDown(0.5);
// // // // // // // // //             doc.fontSize(12).text(`Lampiran Sertifikat: ${course.title}`, { align: 'center' });
// // // // // // // // //             doc.moveDown(2);

// // // // // // // // //             // Header Tabel
// // // // // // // // //             const tableTop = doc.y;
// // // // // // // // //             const col1 = 50;  // No
// // // // // // // // //             const col2 = 100; // Kode
// // // // // // // // //             const col3 = 250; // Judul

// // // // // // // // //             doc.fontSize(10).font('Helvetica-Bold');
// // // // // // // // //             doc.text('NO', col1, tableTop);
// // // // // // // // //             doc.text('KODE UNIT', col2, tableTop);
// // // // // // // // //             doc.text('JUDUL UNIT KOMPETENSI', col3, tableTop);
            
// // // // // // // // //             doc.moveTo(50, tableTop + 15).lineTo(550, tableTop + 15).stroke();

// // // // // // // // //             // Isi Tabel
// // // // // // // // //             let currentY = tableTop + 25;
// // // // // // // // //             doc.font('Helvetica').fontSize(10);

// // // // // // // // //             course.competencies.forEach((comp: any, index: number) => {
// // // // // // // // //                 doc.text(`${index + 1}.`, col1, currentY);
// // // // // // // // //                 doc.text(comp.code, col2, currentY);
// // // // // // // // //                 doc.text(comp.title, col3, currentY, { width: 300 });
                
// // // // // // // // //                 // Hitung tinggi baris berdasarkan panjang teks judul
// // // // // // // // //                 const height = doc.heightOfString(comp.title, { width: 300 });
// // // // // // // // //                 currentY += height + 10;
// // // // // // // // //             });
// // // // // // // // //         }

// // // // // // // // //         doc.end();

// // // // // // // // //     } catch (error: any) {
// // // // // // // // //         res.status(500).send("Gagal generate PDF: " + error.message);
// // // // // // // // //     }
// // // // // // // // // });

// // // // // // // // // // Pastikan endpoint claim, approve, status tetap ada di sini (seperti script sebelumnya)
// // // // // // // // // // ...

// // // // // // // // // export default router;
// // // // // // // // import express from 'express';
// // // // // // // // import PDFDocument from 'pdfkit';
// // // // // // // // import { Certificate } from '../models/Certificate';
// // // // // // // // import { Course } from '../models/Course';
// // // // // // // // import { User } from '../models/User';
// // // // // // // // import { requireAuth, requireFacilitator, AuthedRequest } from '../middleware/auth';

// // // // // // // // const router = express.Router();

// // // // // // // // // 1. ENDPOINT KLAIM SERTIFIKAT
// // // // // // // // router.post('/claim', requireAuth, async (req: AuthedRequest, res: express.Response) => {
// // // // // // // //   try {
// // // // // // // //     const { courseId } = req.body;
// // // // // // // //     const userId = req.user!.id;

// // // // // // // //     // Cek Duplikasi
// // // // // // // //     const existingCert = await Certificate.findOne({ user: userId, course: courseId });
// // // // // // // //     if (existingCert) {
// // // // // // // //         return res.json({ message: 'Status Sertifikat', status: existingCert.status, certificate: existingCert });
// // // // // // // //     }

// // // // // // // //     const course = await Course.findById(courseId);
// // // // // // // //     if (!course) return res.status(404).json({ error: 'Kursus tidak ditemukan' });

// // // // // // // //     // Generate Unique Number untuk request
// // // // // // // //     const uniqueSuffix = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;

// // // // // // // //     if (course.programType === 'training') {
// // // // // // // //         // Logika Approval Bertingkat
// // // // // // // //         const approvalRequests = course.modules.map((mod: any) => ({
// // // // // // // //             facilitatorId: mod.facilitatorId || course.facilitatorIds[0],
// // // // // // // //             moduleId: mod._id,
// // // // // // // //             isApproved: false
// // // // // // // //         }));

// // // // // // // //         const newCert = await Certificate.create({
// // // // // // // //             user: userId,
// // // // // // // //             course: courseId,
// // // // // // // //             status: 'pending', 
// // // // // // // //             certificateNumber: `REQ-${uniqueSuffix}`,
// // // // // // // //             approvals: approvalRequests
// // // // // // // //         });

// // // // // // // //         return res.json({ message: 'Permintaan dikirim.', status: 'pending', certificate: newCert });
// // // // // // // //     } 
// // // // // // // //     else {
// // // // // // // //         // Logika Kursus (Langsung Terbit)
// // // // // // // //         const certNum = `CERT-${uniqueSuffix}`;
// // // // // // // //         const newCert = await Certificate.create({
// // // // // // // //             user: userId,
// // // // // // // //             course: courseId,
// // // // // // // //             status: 'issued', 
// // // // // // // //             certificateNumber: certNum,
// // // // // // // //             approvals: [] 
// // // // // // // //         });

// // // // // // // //         return res.json({ message: 'Sertifikat terbit!', status: 'issued', certificate: newCert });
// // // // // // // //     }

// // // // // // // //   } catch (error: any) {
// // // // // // // //     if (error.code === 11000) {
// // // // // // // //         return res.status(400).json({ error: 'Sedang memproses permintaan. Coba lagi nanti.' });
// // // // // // // //     }
// // // // // // // //     res.status(500).json({ error: error.message });
// // // // // // // //   }
// // // // // // // // });

// // // // // // // // // 2. ENDPOINT APPROVAL
// // // // // // // // router.patch('/approve', requireAuth, requireFacilitator, async (req: AuthedRequest, res: express.Response) => {
// // // // // // // //     try {
// // // // // // // //         const { certificateId, moduleId } = req.body;
// // // // // // // //         const facilitatorId = req.user!.id;

// // // // // // // //         const cert = await Certificate.findById(certificateId);
// // // // // // // //         if (!cert) return res.status(404).json({ error: 'Pengajuan tidak ditemukan' });

// // // // // // // //         const approvalItem = cert.approvals.find(a => a.moduleId.toString() === moduleId && a.facilitatorId.toString() === facilitatorId);

// // // // // // // //         if (!approvalItem) return res.status(403).json({ error: 'Akses ditolak untuk modul ini' });

// // // // // // // //         approvalItem.isApproved = true;
// // // // // // // //         approvalItem.approvedAt = new Date();

// // // // // // // //         const allApproved = cert.approvals.every(a => a.isApproved);
// // // // // // // //         if (allApproved) {
// // // // // // // //             cert.status = 'issued';
// // // // // // // //             cert.certificateNumber = `CERT-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
// // // // // // // //         }

// // // // // // // //         await cert.save();
// // // // // // // //         res.json({ message: 'Disetujui', certificate: cert });

// // // // // // // //     } catch (error: any) {
// // // // // // // //         res.status(500).json({ error: error.message });
// // // // // // // //     }
// // // // // // // // });

// // // // // // // // // 3. ENDPOINT STATUS
// // // // // // // // router.get('/status/:courseId', requireAuth, async (req: AuthedRequest, res: express.Response) => {
// // // // // // // //     try {
// // // // // // // //         const cert = await Certificate.findOne({ user: req.user!.id, course: req.params.courseId });
// // // // // // // //         if(!cert) return res.json({ status: 'none' });
// // // // // // // //         res.json({ status: cert.status, certificate: cert });
// // // // // // // //     } catch (error: any) {
// // // // // // // //         res.status(500).json({ error: error.message });
// // // // // // // //     }
// // // // // // // // });

// // // // // // // // // 4. ENDPOINT DOWNLOAD PDF
// // // // // // // // router.get('/download/:id', async (req: express.Request, res: express.Response) => {
// // // // // // // //     try {
// // // // // // // //         const certId = req.params.id;
// // // // // // // //         const cert = await Certificate.findById(certId).populate('user').populate('course');
// // // // // // // //         if (!cert) return res.status(404).send('Sertifikat tidak ditemukan');
        
// // // // // // // //         const course = cert.course as any;
// // // // // // // //         const user = cert.user as any;

// // // // // // // //         const doc = new PDFDocument({ layout: 'landscape', size: 'A4', margin: 0 });
        
// // // // // // // //         res.setHeader('Content-Type', 'application/pdf');
// // // // // // // //         res.setHeader('Content-Disposition', `attachment; filename=Sertifikat-${cert.certificateNumber}.pdf`);
// // // // // // // //         doc.pipe(res);

// // // // // // // //         // --- HALAMAN DEPAN ---
// // // // // // // //         doc.rect(20, 20, doc.page.width - 40, doc.page.height - 40).strokeColor('#1d4ed8').lineWidth(5).stroke();
// // // // // // // //         doc.moveDown(4);
// // // // // // // //         doc.font('Helvetica-Bold').fontSize(30).fillColor('#1e293b').text('SERTIFIKAT KELULUSAN', { align: 'center' });
// // // // // // // //         doc.moveDown(0.5);
// // // // // // // //         doc.font('Helvetica').fontSize(12).text('No: ' + cert.certificateNumber, { align: 'center' });
// // // // // // // //         doc.moveDown(2);
// // // // // // // //         doc.fontSize(16).fillColor('#64748b').text('Diberikan kepada:', { align: 'center' });
// // // // // // // //         doc.moveDown(0.5);
// // // // // // // //         doc.font('Helvetica-Bold').fontSize(28).fillColor('#000000').text(user.name, { align: 'center' });
// // // // // // // //         doc.moveDown(1);
// // // // // // // //         doc.font('Helvetica').fontSize(16).fillColor('#64748b').text('Atas kelulusannya dalam program:', { align: 'center' });
// // // // // // // //         doc.moveDown(0.5);
// // // // // // // //         doc.font('Helvetica-Bold').fontSize(24).fillColor('#1d4ed8').text(course.title, { align: 'center' });

// // // // // // // //         const config = course.certificateConfig || {};
// // // // // // // //         const dateStr = config.executionDate ? new Date(config.executionDate).toLocaleDateString('id-ID', { dateStyle: 'long' }) : new Date().toLocaleDateString('id-ID');
        
// // // // // // // //         doc.moveDown(4);
// // // // // // // //         doc.text(`${config.city || 'Jakarta'}, ${dateStr}`, 500, doc.y, { align: 'center', width: 200 });
// // // // // // // //         doc.moveDown(0.5);
// // // // // // // //         doc.font('Helvetica-Bold').text(config.signatoryPosition || 'Direktur', 500, doc.y, { align: 'center', width: 200 });
// // // // // // // //         doc.moveDown(3);
// // // // // // // //         doc.text(config.signatoryName || 'Admin', 500, doc.y, { align: 'center', width: 200, underline: true });

// // // // // // // //         // --- HALAMAN BELAKANG (KOMPETENSI) ---
// // // // // // // //         if (course.includeCompetenciesInCertificate && course.competencies && course.competencies.length > 0) {
// // // // // // // //             doc.addPage({ layout: 'portrait', size: 'A4', margin: 50 });
// // // // // // // //             doc.font('Helvetica-Bold').fontSize(20).fillColor('#000').text('DAFTAR KOMPETENSI', { align: 'center' });
// // // // // // // //             doc.moveDown(0.5);
// // // // // // // //             doc.fontSize(12).text(`Lampiran Sertifikat: ${course.title}`, { align: 'center' });
// // // // // // // //             doc.moveDown(2);

// // // // // // // //             const tableTop = doc.y;
// // // // // // // //             const col1 = 50; const col2 = 100; const col3 = 250;

// // // // // // // //             doc.fontSize(10).font('Helvetica-Bold');
// // // // // // // //             doc.text('NO', col1, tableTop); doc.text('KODE UNIT', col2, tableTop); doc.text('JUDUL UNIT KOMPETENSI', col3, tableTop);
// // // // // // // //             doc.moveTo(50, tableTop + 15).lineTo(550, tableTop + 15).stroke();

// // // // // // // //             let currentY = tableTop + 25;
// // // // // // // //             doc.font('Helvetica').fontSize(10);

// // // // // // // //             course.competencies.forEach((comp: any, index: number) => {
// // // // // // // //                 doc.text(`${index + 1}.`, col1, currentY);
// // // // // // // //                 doc.text(comp.code, col2, currentY);
// // // // // // // //                 doc.text(comp.title, col3, currentY, { width: 300 });
// // // // // // // //                 const height = doc.heightOfString(comp.title, { width: 300 });
// // // // // // // //                 currentY += height + 10;
// // // // // // // //             });
// // // // // // // //         }

// // // // // // // //         doc.end();

// // // // // // // //     } catch (error: any) {
// // // // // // // //         res.status(500).send("Gagal generate PDF: " + error.message);
// // // // // // // //     }
// // // // // // // // });

// // // // // // // // export default router;
// // // // // // // import express from 'express';
// // // // // // // import PDFDocument from 'pdfkit';
// // // // // // // import { Certificate } from '../models/Certificate';
// // // // // // // import { Course } from '../models/Course';
// // // // // // // import { requireAuth, requireFacilitator, AuthedRequest } from '../middleware/auth';

// // // // // // // const router = express.Router();

// // // // // // // // ==========================================
// // // // // // // // 1. ENDPOINT PREVIEW (SAFE MODE)
// // // // // // // // ==========================================
// // // // // // // router.post('/preview', requireAuth, async (req: AuthedRequest, res: express.Response) => {
// // // // // // //     try {
// // // // // // //         console.log(">>> [DEBUG] HIT PREVIEW ENDPOINT");
        
// // // // // // //         // 1. Ambil Body dengan Fallback Aman
// // // // // // //         const body = req.body || {};
// // // // // // //         const config = body.certificateConfig || {};
// // // // // // //         const competencies = body.competencies || [];
// // // // // // //         const showComp = body.includeCompetenciesInCertificate === true;

// // // // // // //         console.log(">>> [DEBUG] DATA DITERIMA SERVER:", JSON.stringify(body, null, 2));

// // // // // // //         // 2. Setup PDF
// // // // // // //         const doc = new PDFDocument({ layout: 'landscape', size: 'A4', margin: 0 });
// // // // // // //         res.setHeader('Content-Type', 'application/pdf');
// // // // // // //         res.setHeader('Content-Disposition', 'inline; filename=preview_debug.pdf');
// // // // // // //         doc.pipe(res);

// // // // // // //         // --- BACKGROUND HEADER (Supaya terlihat ada isinya) ---
// // // // // // //         doc.rect(0, 0, doc.page.width, 100).fill('#b91c1c');

// // // // // // //         // --- DEBUG INFO DI PDF (Pojok Kiri Atas - Warna Putih) ---
// // // // // // //         // Jika data tidak masuk, teks ini akan memberitahu kita
// // // // // // //         doc.fontSize(10).fillColor('#ffffff');
// // // // // // //         doc.text(`DEBUG STATUS:`, 10, 10);
// // // // // // //         if (!body.certificateConfig) {
// // // // // // //             doc.text("⚠ DATA KOSONG! Cek 'app.use(express.json())' di index.ts", 10, 25);
// // // // // // //         } else {
// // // // // // //             doc.text(`✔ Data Diterima. Nama: ${config.signatoryName || '-'}`, 10, 25);
// // // // // // //         }

// // // // // // //         // --- LOGO & JUDUL ---
// // // // // // //         const centerX = doc.page.width / 2;
        
// // // // // // //         // Logo Dummy
// // // // // // //         doc.circle(centerX, 100, 30).fill('#ffffff');
// // // // // // //         doc.fontSize(20).fillColor('#b91c1c').text('+', centerX - 8, 92);
        
// // // // // // //         doc.moveDown(4);
// // // // // // //         const titleY = 180;
// // // // // // //         doc.fillColor('#000000');
// // // // // // //         doc.font('Helvetica-Bold').fontSize(36).text('SERTIFIKAT', 0, titleY, { align: 'center' });
// // // // // // //         doc.font('Helvetica').fontSize(14).text('Certificate', 0, titleY + 40, { align: 'center' });

// // // // // // //         // --- DATA DINAMIS (Dengan Pengecekan Aman) ---
// // // // // // //         const nomor = config.certificateNumber ? String(config.certificateNumber) : '[NOMOR KOSONG]';
// // // // // // //         const namaPeserta = '[NAMA PESERTA PREVIEW]';
// // // // // // //         const judulTraining = '[JUDUL PELATIHAN]';

// // // // // // //         doc.fontSize(12).text(`Nomor: ${nomor}`, 0, titleY + 70, { align: 'center' });

// // // // // // //         // Body Text
// // // // // // //         doc.fontSize(14).fillColor('#555555');
// // // // // // //         doc.text('Diberikan kepada:', 0, titleY + 110, { align: 'center' });
        
// // // // // // //         doc.font('Helvetica-Bold').fontSize(30).fillColor('#000000');
// // // // // // //         doc.text(namaPeserta, 0, titleY + 140, { align: 'center' });

// // // // // // //         doc.font('Helvetica').fontSize(14).fillColor('#555555');
// // // // // // //         doc.text('Telah menyelesaikan pelatihan:', 0, titleY + 190, { align: 'center' });

// // // // // // //         doc.font('Helvetica-Bold').fontSize(24).fillColor('#b91c1c');
// // // // // // //         doc.text(judulTraining, 0, titleY + 220, { align: 'center' });

// // // // // // //         // --- TANDA TANGAN ---
// // // // // // //         const signX = 500;
// // // // // // //         const signY = 450;
// // // // // // //         const kota = config.city ? String(config.city) : 'Jakarta';
// // // // // // //         const namaTTD = config.signatoryName ? String(config.signatoryName) : 'Admin';
// // // // // // //         const jabatan = config.signatoryPosition ? String(config.signatoryPosition) : 'Instruktur';
        
// // // // // // //         // Tanggal
// // // // // // //         let tgl = 'Sekarang';
// // // // // // //         if(config.executionDate) {
// // // // // // //             try { tgl = new Date(config.executionDate).toLocaleDateString(); } catch(e) {}
// // // // // // //         }

// // // // // // //         doc.fontSize(12).fillColor('#000000');
// // // // // // //         doc.text(`${kota}, ${tgl}`, signX, signY, { width: 250, align: 'center' });
// // // // // // //         doc.font('Helvetica-Bold').text(jabatan, signX, signY + 20, { width: 250, align: 'center' });
        
// // // // // // //         // Garis
// // // // // // //         doc.moveTo(signX + 20, signY + 100).lineTo(signX + 230, signY + 100).strokeColor('#000').lineWidth(1).stroke();
        
// // // // // // //         doc.text(namaTTD, signX, signY + 80, { width: 250, align: 'center' });


// // // // // // //         // --- HALAMAN 2: KOMPETENSI ---
// // // // // // //         if (showComp && competencies.length > 0) {
// // // // // // //             doc.addPage({ layout: 'portrait', margin: 50 });
// // // // // // //             doc.font('Helvetica-Bold').fontSize(18).text('DAFTAR KOMPETENSI', { align: 'center' });
// // // // // // //             doc.moveDown(2);

// // // // // // //             let y = 150;
// // // // // // //             doc.fontSize(10);
            
// // // // // // //             // Header Table
// // // // // // //             doc.text('NO', 50, y);
// // // // // // //             doc.text('KODE', 100, y);
// // // // // // //             doc.text('JUDUL', 250, y);
// // // // // // //             y += 20;
// // // // // // //             doc.moveTo(50, y).lineTo(550, y).stroke();
// // // // // // //             y += 10;

// // // // // // //             competencies.forEach((c: any, i: number) => {
// // // // // // //                 const kode = c.code || c.unitCode || '-';
// // // // // // //                 const judul = c.title || c.unitTitle || '-';
// // // // // // //                 doc.text(`${i+1}.`, 50, y);
// // // // // // //                 doc.text(String(kode), 100, y);
// // // // // // //                 doc.text(String(judul), 250, y, { width: 300 });
// // // // // // //                 y += 30;
// // // // // // //             });
// // // // // // //         } else {
// // // // // // //             // Debugging jika halaman 2 tidak muncul
// // // // // // //             doc.fontSize(10).fillColor('red').text('Info: Halaman kompetensi tidak muncul karena checkbox mati atau data kosong.', 10, doc.page.height - 20);
// // // // // // //         }

// // // // // // //         doc.end();

// // // // // // //     } catch (error: any) {
// // // // // // //         console.error("PDF ERROR:", error);
// // // // // // //         // Pastikan response error dikirim
// // // // // // //         if(!res.headersSent) res.status(500).json({ error: error.message });
// // // // // // //     }
// // // // // // // });

// // // // // // // // --- RESTORE ENDPOINT LAMA (JANGAN DIHAPUS) ---
// // // // // // // router.post('/claim', async (req, res) => { res.json({ msg: "Claim OK" }) }); 
// // // // // // // router.patch('/approve', async (req, res) => { res.json({ msg: "Approve OK" }) });
// // // // // // // router.get('/status/:courseId', async (req, res) => { res.json({ msg: "Status OK" }) });
// // // // // // // router.get('/download/:id', async (req, res) => { res.json({ msg: "Download OK" }) });

// // // // // // // export default router;
// // // // // // import express from 'express';
// // // // // // import PDFDocument from 'pdfkit';
// // // // // // import { Certificate } from '../models/Certificate';
// // // // // // import { Course } from '../models/Course';
// // // // // // import { requireAuth, requireFacilitator, AuthedRequest } from '../middleware/auth';
// // // // // // import path from 'path';
// // // // // // import fs from 'fs';

// // // // // // // --- HELPER LOGO & ASSETS ---
// // // // // // const drawVectorLogo = (doc: PDFKit.PDFDocument, x: number, y: number, size: number) => {
// // // // // //     doc.save();
// // // // // //     const barWidth = size / 3;
// // // // // //     const barLength = size;
// // // // // //     const offset = (size - barWidth) / 2;
// // // // // //     doc.fillColor('#CE2029'); // Merah PMI
// // // // // //     doc.rect(x + offset, y, barWidth, barLength).fill();
// // // // // //     doc.rect(x, y + offset, barLength, barWidth).fill();
// // // // // //     doc.restore();
// // // // // // };

// // // // // // const drawImageLogo = (doc: PDFKit.PDFDocument, x: number, y: number, width: number) => {
// // // // // //     const possiblePaths = [
// // // // // //         path.join(process.cwd(), '../frontend/public/pmi-logo.png'),
// // // // // //         path.join(process.cwd(), 'public/pmi-logo.png'),
// // // // // //         path.join(process.cwd(), 'uploads/pmi-logo.png')
// // // // // //     ];

// // // // // //     let imageLoaded = false;
// // // // // //     for (const p of possiblePaths) {
// // // // // //         if (fs.existsSync(p)) {
// // // // // //             try {
// // // // // //                 doc.image(p, x, y, { width: width });
// // // // // //                 imageLoaded = true;
// // // // // //                 break;
// // // // // //             } catch (e) { console.error("Error loading image:", e); }
// // // // // //         }
// // // // // //     }
// // // // // //     if (!imageLoaded) drawVectorLogo(doc, x + 5, y, width - 10);
// // // // // // };

// // // // // // const router = express.Router();

// // // // // // // =========================================================================
// // // // // // // FUNGSI GENERATOR PDF (SHARED LOGIC)
// // // // // // // =========================================================================
// // // // // // const generatePDF = (res: express.Response, data: any) => {
// // // // // //     const { isPreview, config, competencies, showCompetencies, participantName, courseTitle, certNumber, filename } = data;

// // // // // //     const doc = new PDFDocument({ layout: 'portrait', size: 'A4', margin: 0 });
    
// // // // // //     res.setHeader('Content-Type', 'application/pdf');
// // // // // //     res.setHeader('Content-Disposition', `inline; filename=${filename || 'preview.pdf'}`);
    
// // // // // //     doc.pipe(res);

// // // // // //     const pageWidth = doc.page.width;
// // // // // //     const pageHeight = doc.page.height;
// // // // // //     const centerX = pageWidth / 2;

// // // // // //     // --- HALAMAN 1: DEPAN ---

// // // // // //     // 1. HEADER DEGRADASI (4 Warna)
// // // // // //     const headerH = 70; // Sedikit dirapikan tingginya
// // // // // //     doc.rect(0, 0, pageWidth * 0.25, headerH).fill('#D9001B'); // Merah
// // // // // //     doc.rect(pageWidth * 0.25, 0, pageWidth * 0.25, headerH).fill('#E45525'); // Oranye Tua
// // // // // //     doc.rect(pageWidth * 0.5, 0, pageWidth * 0.25, headerH).fill('#F28E63'); // Oranye Muda
// // // // // //     doc.rect(pageWidth * 0.75, 0, pageWidth * 0.25, headerH).fill('#FADAC6'); // Krem
    
// // // // // //     // 2. LOGO (Posisi Tengah & Ukuran Proporsional)
// // // // // //     const logoY = headerH + 25; 
// // // // // //     const logoWidth = 80; // Ukuran logo yang pas
// // // // // //     const logoX = centerX - (logoWidth / 2); // Rumus agar PASTI di tengah
    
// // // // // //     drawImageLogo(doc, logoX, logoY, logoWidth);

// // // // // //     // Teks Bawah Logo (Palang Merah Indonesia)
// // // // // //     // Kita turunkan secukupnya dari posisi logo
// // // // // //     doc.moveDown(8); 
// // // // // //     doc.fillColor('#000000');
// // // // // //     // Jika ingin teks "Palang Merah" ada, uncomment baris ini:
// // // // // //     // doc.font('Helvetica-Bold').fontSize(14).text('Palang Merah Indonesia', { align: 'center' });
    
// // // // // //     // 3. JUDUL & NOMOR
// // // // // //     // [FIX] Tambahkan jarak lebih banyak agar "SERTIFIKAT" turun
// // // // // //     doc.moveDown(3); 
    
// // // // // //     doc.font('Helvetica-Bold').fontSize(36).text('SERTIFIKAT', 0, doc.y, { align: 'center', width: pageWidth });
// // // // // //     doc.moveDown(0.2);
// // // // // //     doc.font('Helvetica-Oblique').fontSize(12).text('Certificate', { align: 'center' });

// // // // // //     doc.moveDown(0.5);
// // // // // //     const displayNum = certNumber.toLowerCase().startsWith('no') ? certNumber : `No : ${certNumber}`;
// // // // // //     doc.font('Helvetica').fontSize(12).text(displayNum, { align: 'center' });

// // // // // //     // 4. PENERIMA
// // // // // //     doc.moveDown(1.5);
// // // // // //     doc.font('Helvetica').fontSize(12).text('Diberikan kepada :', { align: 'center' });
// // // // // //     doc.font('Helvetica-Oblique').fontSize(10).text('Awarded to', { align: 'center' });

// // // // // //     // 5. NAMA PESERTA
// // // // // //     doc.moveDown(0.5);
// // // // // //     const pName = (participantName && participantName !== '[NAMA PESERTA PREVIEW]') ? participantName : 'NAMA PESERTA';
// // // // // //     doc.font('Helvetica-Bold').fontSize(26).text(pName, { align: 'center' });

// // // // // //     // 6. PERAN
// // // // // //     doc.moveDown(1);
// // // // // //     doc.font('Helvetica').fontSize(12).text('Sebagai', { align: 'center' });
// // // // // //     doc.font('Helvetica-Bold').fontSize(18).text('PESERTA', { align: 'center' });

// // // // // //     // 7. JUDUL PELATIHAN
// // // // // //     doc.moveDown(0.5);
// // // // // //     const cTitle = (courseTitle && courseTitle !== '[JUDUL PELATIHAN]') ? courseTitle : 'PELATIHAN DASAR';
// // // // // //     doc.font('Helvetica-Bold').fontSize(20).text(cTitle, { align: 'center' });
// // // // // //     doc.font('Helvetica-Oblique').fontSize(12).text('Basic Training of Volunteer Corps', { align: 'center' });

// // // // // //     // 8. TANGGAL & LOKASI
// // // // // //     doc.moveDown(1);
// // // // // //     const city = config.city || 'Jakarta';
// // // // // //     let dateExec = '...';
// // // // // //     if (config.executionDate) {
// // // // // //         try {
// // // // // //             const d = new Date(config.executionDate);
// // // // // //             const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
// // // // // //             dateExec = `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
// // // // // //         } catch(e) {}
// // // // // //     }
// // // // // //     doc.font('Helvetica').fontSize(12).text(`Dilaksanakan di ${city}, ${dateExec}`, { align: 'center' });

// // // // // //     // 9. TANDA TANGAN (POSISI TENGAH BAWAH)
// // // // // //     const signY = pageHeight - 190;
    
// // // // // //     doc.fontSize(11).font('Helvetica');
// // // // // //     // Kota, Tanggal
// // // // // //     doc.text(`${city}, ${dateExec}`, 0, signY - 20, { align: 'center', width: pageWidth });

// // // // // //     // Header Jabatan
// // // // // //     doc.font('Helvetica-Bold').text('Pengurus Pusat', { align: 'center' }); 
// // // // // //     doc.font('Helvetica-Oblique').fontSize(9).text('District Board Member', { align: 'center' });
    
// // // // // //     doc.moveDown(0.2);
// // // // // //     doc.font('Helvetica-Bold').fontSize(11).text('PALANG MERAH INDONESIA', { align: 'center' });
// // // // // //     doc.font('Helvetica-Oblique').fontSize(9).text('Indonesian Red Cross', { align: 'center' });

// // // // // //     doc.moveDown(0.5);
// // // // // //     // Jabatan
// // // // // //     doc.font('Helvetica-Bold').fontSize(11).text(config.signatoryPosition || 'Ketua', { align: 'center' });
// // // // // //     doc.font('Helvetica-Oblique').fontSize(9).text('Chairman', { align: 'center' });

// // // // // //     doc.moveDown(3);
// // // // // //     // Nama
// // // // // //     doc.font('Helvetica-Bold').fontSize(12).text(config.signatoryName || 'Admin', { align: 'center', underline: true });


// // // // // //     // --- HALAMAN 2: KOMPETENSI ---
// // // // // //     if (showCompetencies && competencies && competencies.length > 0) {
// // // // // //         doc.addPage({ layout: 'portrait', size: 'A4', margin: 50 });

// // // // // //         // Header Belakang
// // // // // //         doc.fontSize(11).font('Helvetica-Bold');
// // // // // //         doc.text('Markas Pusat', 50, 50);
// // // // // //         doc.text('Palang Merah Indonesia', 50, 65);

// // // // // //         // Judul Tabel
// // // // // //         doc.font('Helvetica-Bold').fontSize(14).text('Daftar Unit Kompetensi', 0, 100, { align: 'center', width: pageWidth });
// // // // // //         doc.font('Helvetica-Oblique').fontSize(12).text('List of Unit(s) of Competency', { align: 'center', width: pageWidth });
        
// // // // // //         doc.y = 140; 
// // // // // //         const startX = 60; 
// // // // // //         let currentY = 150;
// // // // // //         const colNoW = 30;
// // // // // //         const colCodeW = 120;
// // // // // //         const colTitleW = 330;
// // // // // //         const tableW = colNoW + colCodeW + colTitleW;

// // // // // //         // Header Table
// // // // // //         doc.lineWidth(1);
// // // // // //         doc.moveTo(startX, currentY).lineTo(startX + tableW, currentY).stroke();
// // // // // //         doc.fillColor('black').font('Helvetica-Bold').fontSize(10);
        
// // // // // //         doc.text('No.', startX, currentY + 5, { width: colNoW, align: 'center' });
// // // // // //         doc.text('No Kode', startX + colNoW, currentY + 5, { width: colCodeW, align: 'center' });
// // // // // //         doc.text('Judul Unit', startX + colNoW + colCodeW, currentY + 5, { width: colTitleW, align: 'center' });

// // // // // //         doc.font('Helvetica-Oblique').fontSize(9);
// // // // // //         doc.text('Unit Code', startX + colNoW, currentY + 18, { width: colCodeW, align: 'center' });
// // // // // //         doc.text('Unit Title', startX + colNoW + colCodeW, currentY + 18, { width: colTitleW, align: 'center' });

// // // // // //         currentY += 35;
// // // // // //         doc.moveTo(startX, currentY).lineTo(startX + tableW, currentY).stroke();

// // // // // //         // Garis Vertikal Header
// // // // // //         const headerTop = 150;
// // // // // //         doc.moveTo(startX, headerTop).lineTo(startX, currentY).stroke();
// // // // // //         doc.moveTo(startX + colNoW, headerTop).lineTo(startX + colNoW, currentY).stroke();
// // // // // //         doc.moveTo(startX + colNoW + colCodeW, headerTop).lineTo(startX + colNoW + colCodeW, currentY).stroke();
// // // // // //         doc.moveTo(startX + tableW, headerTop).lineTo(startX + tableW, currentY).stroke();

// // // // // //         // Body Table
// // // // // //         doc.font('Helvetica').fontSize(10);
        
// // // // // //         competencies.forEach((comp: any, idx: number) => {
// // // // // //             const no = `${idx + 1}`;
// // // // // //             const code = comp.code || comp.unitCode || '-';
// // // // // //             const titleIndo = comp.title || comp.unitTitle || '-';
            
// // // // // //             const textOptions = { width: colTitleW - 10, align: 'left' as const };
// // // // // //             const heightIndo = doc.heightOfString(titleIndo, textOptions);
// // // // // //             const rowHeight = Math.max(25, heightIndo + 10);

// // // // // //             if (currentY + rowHeight > pageHeight - 150) {
// // // // // //                 doc.moveTo(startX, currentY).lineTo(startX + tableW, currentY).stroke();
// // // // // //                 doc.addPage({ layout: 'portrait', size: 'A4', margin: 50 });
// // // // // //                 currentY = 50; 
// // // // // //                 doc.moveTo(startX, currentY).lineTo(startX + tableW, currentY).stroke();
// // // // // //             }

// // // // // //             const textY = currentY + 5;
// // // // // //             doc.font('Helvetica').fontSize(10).fillColor('black');
// // // // // //             doc.text(no, startX, textY, { width: colNoW, align: 'center' });
// // // // // //             doc.text(code, startX + colNoW + 5, textY, { width: colCodeW - 10 });
// // // // // //             doc.font('Helvetica').text(titleIndo, startX + colNoW + colCodeW + 5, textY, textOptions);
            
// // // // // //             // Garis Grid
// // // // // //             doc.moveTo(startX, currentY).lineTo(startX, currentY + rowHeight).stroke();
// // // // // //             doc.moveTo(startX + colNoW, currentY).lineTo(startX + colNoW, currentY + rowHeight).stroke();
// // // // // //             doc.moveTo(startX + colNoW + colCodeW, currentY).lineTo(startX + colNoW + colCodeW, currentY + rowHeight).stroke();
// // // // // //             doc.moveTo(startX + tableW, currentY).lineTo(startX + tableW, currentY + rowHeight).stroke();

// // // // // //             currentY += rowHeight;
// // // // // //             doc.moveTo(startX, currentY).lineTo(startX + tableW, currentY).stroke();
// // // // // //         });

// // // // // //         // TTD Belakang
// // // // // //         let footerY = Math.max(currentY + 30, pageHeight - 200);
// // // // // //         if (footerY > pageHeight - 100) {
// // // // // //             doc.addPage();
// // // // // //             footerY = 100;
// // // // // //         }
// // // // // //         const footerX = pageWidth - 250;

// // // // // //         doc.font('Helvetica').fontSize(11).fillColor('black');
// // // // // //         doc.text(`${city}, ${dateExec}`, footerX, footerY, { align: 'left', width: 200 });
// // // // // //         doc.text('Kepala Badiklat', footerX, footerY + 15, { align: 'left', width: 200 }); 
// // // // // //         doc.font('Helvetica-Bold').fontSize(11).text('Palang Merah Indonesia', footerX, footerY + 40, { align: 'left', width: 200 });

// // // // // //         doc.moveDown(4);
// // // // // //         doc.text(config.signatoryName || "Kadek Sumardika, S.Sos.", footerX, footerY + 100, { align: 'left', width: 200 });

// // // // // //         const noteY = pageHeight - 50;
// // // // // //         doc.font('Helvetica-Oblique').fontSize(10);
// // // // // //         doc.text('Catatan : Standar Minimum Kelulusan (SMK) : 70', 50, noteY);
// // // // // //     }

// // // // // //     doc.end();
// // // // // // };

// // // // // // // =========================================================================
// // // // // // // 1. ENDPOINT PREVIEW (DRAFT)
// // // // // // // =========================================================================
// // // // // // router.post('/preview', requireAuth, async (req: AuthedRequest, res: express.Response) => {
// // // // // //     try {
// // // // // //         const { certificateConfig = {}, competencies = [], includeCompetenciesInCertificate = false } = req.body;
        
// // // // // //         generatePDF(res, {
// // // // // //             isPreview: true,
// // // // // //             config: certificateConfig,
// // // // // //             competencies: competencies,
// // // // // //             showCompetencies: includeCompetenciesInCertificate,
// // // // // //             participantName: 'NAMA PESERTA', 
// // // // // //             courseTitle: 'JUDUL PELATIHAN',  
// // // // // //             certNumber: certificateConfig.certificateNumber ? certificateConfig.certificateNumber.replace('{NO}', certificateConfig.startNumber || '001') : '[NOMOR]'
// // // // // //         });

// // // // // //     } catch (error: any) {
// // // // // //         if(!res.headersSent) res.status(500).send("Gagal membuat Preview: " + error.message);
// // // // // //     }
// // // // // // });

// // // // // // // =========================================================================
// // // // // // // 2. ENDPOINT DOWNLOAD FINAL
// // // // // // // =========================================================================
// // // // // // router.get('/download/:id', async (req: express.Request, res: express.Response) => {
// // // // // //     try {
// // // // // //         const cert = await Certificate.findById(req.params.id)
// // // // // //             .populate('user')   
// // // // // //             .populate('course'); 

// // // // // //         if (!cert) return res.status(404).send('Sertifikat tidak ditemukan');

// // // // // //         const course = cert.course as any;
// // // // // //         const user = cert.user as any;
// // // // // //         const config = course.certificateConfig || {};
        
// // // // // //         // Nomor Otomatis
// // // // // //         let finalCertNumber = cert.certificateNumber;
// // // // // //         if (config.certificateNumber && config.certificateNumber.includes('{NO}')) {
// // // // // //             const startNo = config.startNumber || 1; 
// // // // // //             finalCertNumber = config.certificateNumber.replace('{NO}', String(startNo));
// // // // // //         }

// // // // // //         // Generate PDF dengan Data Asli
// // // // // //         generatePDF(res, {
// // // // // //             isPreview: false,
// // // // // //             config: config,
// // // // // //             competencies: course.competencies || [],
// // // // // //             showCompetencies: course.includeCompetenciesInCertificate,
// // // // // //             participantName: user.name, 
// // // // // //             courseTitle: course.title,  
// // // // // //             certNumber: finalCertNumber,
// // // // // //             filename: `Sertifikat-${user.name.replace(/\s+/g, '-')}.pdf`
// // // // // //         });

// // // // // //     } catch (e: any) {
// // // // // //         if(!res.headersSent) res.status(500).send("Gagal download: " + e.message);
// // // // // //     }
// // // // // // });

// // // // // // // --- ENDPOINT LAINNYA ---
// // // // // // router.post('/claim', requireAuth, async (req: AuthedRequest, res: express.Response) => {
// // // // // //     try {
// // // // // //         const { courseId } = req.body;
// // // // // //         const userId = req.user!.id;
// // // // // //         const existing = await Certificate.findOne({ user: userId, course: courseId });
// // // // // //         if(existing) return res.json({ status: existing.status, certificate: existing });

// // // // // //         const newCert = await Certificate.create({
// // // // // //             user: userId,
// // // // // //             course: courseId,
// // // // // //             status: 'issued', 
// // // // // //             certificateNumber: `CERT-${Date.now()}`,
// // // // // //             approvals: []
// // // // // //         });
// // // // // //         res.json({ status: 'issued', certificate: newCert });
// // // // // //     } catch(e:any) { res.status(500).json({error: e.message}); }
// // // // // // });

// // // // // // router.patch('/approve', async (req, res) => { res.json({ msg: "Approve OK" }) });
// // // // // // router.get('/status/:courseId', async (req, res) => { res.json({ msg: "Status OK" }) });

// // // // // // export default router;
// // // // // import express from 'express';
// // // // // import PDFDocument from 'pdfkit';
// // // // // import { Certificate } from '../models/Certificate';
// // // // // import { Course } from '../models/Course';
// // // // // import { requireAuth, requireFacilitator, AuthedRequest } from '../middleware/auth';
// // // // // import path from 'path';
// // // // // import fs from 'fs';

// // // // // // --- HELPER LOGO & ASSETS ---
// // // // // const drawVectorLogo = (doc: PDFKit.PDFDocument, x: number, y: number, size: number) => {
// // // // //     doc.save();
// // // // //     const barWidth = size / 3;
// // // // //     const barLength = size;
// // // // //     const offset = (size - barWidth) / 2;
// // // // //     doc.fillColor('#CE2029'); // Merah PMI
// // // // //     doc.rect(x + offset, y, barWidth, barLength).fill();
// // // // //     doc.rect(x, y + offset, barLength, barWidth).fill();
// // // // //     doc.restore();
// // // // // };

// // // // // const drawImageLogo = (doc: PDFKit.PDFDocument, x: number, y: number, width: number) => {
// // // // //     const possiblePaths = [
// // // // //         path.join(process.cwd(), '../frontend/public/pmi-logo.png'),
// // // // //         path.join(process.cwd(), 'public/pmi-logo.png'),
// // // // //         path.join(process.cwd(), 'uploads/pmi-logo.png')
// // // // //     ];

// // // // //     let imageLoaded = false;
// // // // //     for (const p of possiblePaths) {
// // // // //         if (fs.existsSync(p)) {
// // // // //             try {
// // // // //                 doc.image(p, x, y, { width: width });
// // // // //                 imageLoaded = true;
// // // // //                 break;
// // // // //             } catch (e) { console.error("Error loading image:", e); }
// // // // //         }
// // // // //     }
// // // // //     if (!imageLoaded) drawVectorLogo(doc, x + 5, y, width - 10);
// // // // // };

// // // // // const router = express.Router();

// // // // // // =========================================================================
// // // // // // FUNGSI GENERATOR PDF (SHARED LOGIC)
// // // // // // =========================================================================
// // // // // const generatePDF = (res: express.Response, data: any) => {
// // // // //     const { isPreview, config, competencies, showCompetencies, participantName, courseTitle, certNumber, filename } = data;

// // // // //     const doc = new PDFDocument({ layout: 'portrait', size: 'A4', margin: 0 });
    
// // // // //     res.setHeader('Content-Type', 'application/pdf');
// // // // //     res.setHeader('Content-Disposition', `inline; filename=${filename || 'preview.pdf'}`);
    
// // // // //     doc.pipe(res);

// // // // //     const pageWidth = doc.page.width;
// // // // //     const pageHeight = doc.page.height;
// // // // //     const centerX = pageWidth / 2;

// // // // //     // --- HALAMAN 1: DEPAN ---

// // // // //     // 1. HEADER DEGRADASI
// // // // //     const headerH = 70;
// // // // //     doc.rect(0, 0, pageWidth * 0.25, headerH).fill('#D9001B'); // Merah
// // // // //     doc.rect(pageWidth * 0.25, 0, pageWidth * 0.25, headerH).fill('#E45525'); // Oranye Tua
// // // // //     doc.rect(pageWidth * 0.5, 0, pageWidth * 0.25, headerH).fill('#F28E63'); // Oranye Muda
// // // // //     doc.rect(pageWidth * 0.75, 0, pageWidth * 0.25, headerH).fill('#FADAC6'); // Krem
    
// // // // //     // 2. LOGO
// // // // //     const logoY = headerH + 25; 
// // // // //     const logoWidth = 80;
// // // // //     const logoX = centerX - (logoWidth / 2);
// // // // //     drawImageLogo(doc, logoX, logoY, logoWidth);

// // // // //     // Teks Logo
// // // // //     doc.moveDown(8); 
// // // // //     doc.fillColor('#000000');
// // // // //     // doc.font('Helvetica-Bold').fontSize(14).text('Palang Merah Indonesia', { align: 'center' }); // Opsional
    
// // // // //     // 3. JUDUL & NOMOR
// // // // //     doc.moveDown(3); 
    
// // // // //     doc.font('Helvetica-Bold').fontSize(36).text('SERTIFIKAT', 0, doc.y, { align: 'center', width: pageWidth });
// // // // //     doc.moveDown(0.2);
// // // // //     doc.font('Helvetica-Oblique').fontSize(12).text('Certificate', { align: 'center' });

// // // // //     doc.moveDown(0.5);
// // // // //     const displayNum = certNumber.toLowerCase().startsWith('no') ? certNumber : `No : ${certNumber}`;
// // // // //     doc.font('Helvetica').fontSize(12).text(displayNum, { align: 'center' });

// // // // //     // 4. PENERIMA
// // // // //     doc.moveDown(1.5);
// // // // //     doc.font('Helvetica').fontSize(12).text('Diberikan kepada :', { align: 'center' });
// // // // //     doc.font('Helvetica-Oblique').fontSize(10).text('Awarded to', { align: 'center' });

// // // // //     // 5. NAMA PESERTA
// // // // //     doc.moveDown(0.5);
// // // // //     const pName = (participantName && participantName !== '[NAMA PESERTA PREVIEW]') ? participantName : 'NAMA PESERTA';
// // // // //     doc.font('Helvetica-Bold').fontSize(26).text(pName, { align: 'center' });

// // // // //     // 6. PERAN
// // // // //     doc.moveDown(1);
// // // // //     doc.font('Helvetica').fontSize(12).text('Sebagai', { align: 'center' });
// // // // //     doc.font('Helvetica-Bold').fontSize(18).text('PESERTA', { align: 'center' });

// // // // //     // 7. JUDUL PELATIHAN (DYNAMIC FROM CONFIG)
// // // // //     doc.moveDown(0.5);
    
// // // // //     // Logic: Gunakan Judul Override dari Config jika ada, jika tidak pakai judul asli course
// // // // //     const titleIndo = config.courseNameIndo || courseTitle || 'PELATIHAN DASAR';
// // // // //     doc.font('Helvetica-Bold').fontSize(20).text(titleIndo, { align: 'center' });
    
// // // // //     // Judul Inggris dari Config
// // // // //     const titleEng = config.courseNameEng || 'Basic Training';
// // // // //     doc.font('Helvetica-Oblique').fontSize(12).text(titleEng, { align: 'center' });

// // // // //     // 8. TANGGAL & LOKASI
// // // // //     doc.moveDown(1);
// // // // //     const city = config.city || 'Jakarta';
// // // // //     let dateExec = '...';
// // // // //     if (config.executionDate) {
// // // // //         try {
// // // // //             const d = new Date(config.executionDate);
// // // // //             const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
// // // // //             dateExec = `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
// // // // //         } catch(e) {}
// // // // //     }
// // // // //     doc.font('Helvetica').fontSize(12).text(`Dilaksanakan di ${city}, ${dateExec}`, { align: 'center' });

// // // // //     // 9. TANDA TANGAN (DYNAMIC FROM CONFIG)
// // // // //     const signY = pageHeight - 190;
    
// // // // //     doc.fontSize(11).font('Helvetica');
// // // // //     // Kota, Tanggal
// // // // //     doc.text(`${city}, ${dateExec}`, 0, signY - 20, { align: 'center', width: pageWidth });

// // // // //     // Pelaksana (Executor)
// // // // //     const execIndo = config.executorIndo || 'Pengurus Pusat';
// // // // //     const execEng = config.executorEng || 'Central Board Member';
    
// // // // //     doc.font('Helvetica-Bold').text(execIndo, { align: 'center' }); 
// // // // //     doc.font('Helvetica-Oblique').fontSize(9).text(execEng, { align: 'center' });
    
// // // // //     doc.moveDown(0.2);
// // // // //     doc.font('Helvetica-Bold').fontSize(11).text('PALANG MERAH INDONESIA', { align: 'center' });
// // // // //     doc.font('Helvetica-Oblique').fontSize(9).text('Indonesian Red Cross', { align: 'center' });

// // // // //     doc.moveDown(0.5);
// // // // //     // Jabatan (Job Title)
// // // // //     const jobIndo = config.signatoryPosition || 'Ketua';
// // // // //     const jobEng = config.signatoryPositionEng || 'Chairman';

// // // // //     doc.font('Helvetica-Bold').fontSize(11).text(jobIndo, { align: 'center' });
// // // // //     doc.font('Helvetica-Oblique').fontSize(9).text(jobEng, { align: 'center' });

// // // // //     doc.moveDown(3);
// // // // //     // Nama
// // // // //     doc.font('Helvetica-Bold').fontSize(12).text(config.signatoryName || 'Admin', { align: 'center', underline: true });


// // // // //     // --- HALAMAN 2: KOMPETENSI ---
// // // // //     if (showCompetencies && competencies && competencies.length > 0) {
// // // // //         doc.addPage({ layout: 'portrait', size: 'A4', margin: 50 });

// // // // //         // Header Belakang
// // // // //         doc.fontSize(11).font('Helvetica-Bold');
// // // // //         doc.text('Markas Pusat', 50, 50);
// // // // //         doc.text('Palang Merah Indonesia', 50, 65);

// // // // //         // Judul Tabel
// // // // //         doc.font('Helvetica-Bold').fontSize(14).text('Daftar Unit Kompetensi', 0, 100, { align: 'center', width: pageWidth });
// // // // //         doc.font('Helvetica-Oblique').fontSize(12).text('List of Unit(s) of Competency', { align: 'center', width: pageWidth });
        
// // // // //         doc.y = 140; 
// // // // //         const startX = 60; 
// // // // //         let currentY = 150;
// // // // //         const colNoW = 30;
// // // // //         const colCodeW = 120;
// // // // //         const colTitleW = 330;
// // // // //         const tableW = colNoW + colCodeW + colTitleW;

// // // // //         // Header Table
// // // // //         doc.lineWidth(1);
// // // // //         doc.moveTo(startX, currentY).lineTo(startX + tableW, currentY).stroke();
// // // // //         doc.fillColor('black').font('Helvetica-Bold').fontSize(10);
        
// // // // //         doc.text('No.', startX, currentY + 5, { width: colNoW, align: 'center' });
// // // // //         doc.text('No Kode', startX + colNoW, currentY + 5, { width: colCodeW, align: 'center' });
// // // // //         doc.text('Judul Unit', startX + colNoW + colCodeW, currentY + 5, { width: colTitleW, align: 'center' });

// // // // //         doc.font('Helvetica-Oblique').fontSize(9);
// // // // //         doc.text('Unit Code', startX + colNoW, currentY + 18, { width: colCodeW, align: 'center' });
// // // // //         doc.text('Unit Title', startX + colNoW + colCodeW, currentY + 18, { width: colTitleW, align: 'center' });

// // // // //         currentY += 35;
// // // // //         doc.moveTo(startX, currentY).lineTo(startX + tableW, currentY).stroke();

// // // // //         // Garis Vertikal Header
// // // // //         const headerTop = 150;
// // // // //         doc.moveTo(startX, headerTop).lineTo(startX, currentY).stroke();
// // // // //         doc.moveTo(startX + colNoW, headerTop).lineTo(startX + colNoW, currentY).stroke();
// // // // //         doc.moveTo(startX + colNoW + colCodeW, headerTop).lineTo(startX + colNoW + colCodeW, currentY).stroke();
// // // // //         doc.moveTo(startX + tableW, headerTop).lineTo(startX + tableW, currentY).stroke();

// // // // //         // Body Table
// // // // //         doc.font('Helvetica').fontSize(10);
        
// // // // //         competencies.forEach((comp: any, idx: number) => {
// // // // //             const no = `${idx + 1}`;
// // // // //             const code = comp.code || comp.unitCode || '-';
// // // // //             const titleIndo = comp.title || comp.unitTitle || '-';
            
// // // // //             const textOptions = { width: colTitleW - 10, align: 'left' as const };
// // // // //             const heightIndo = doc.heightOfString(titleIndo, textOptions);
// // // // //             const rowHeight = Math.max(25, heightIndo + 10);

// // // // //             if (currentY + rowHeight > pageHeight - 150) {
// // // // //                 doc.moveTo(startX, currentY).lineTo(startX + tableW, currentY).stroke();
// // // // //                 doc.addPage({ layout: 'portrait', size: 'A4', margin: 50 });
// // // // //                 currentY = 50; 
// // // // //                 doc.moveTo(startX, currentY).lineTo(startX + tableW, currentY).stroke();
// // // // //             }

// // // // //             const textY = currentY + 5;
// // // // //             doc.font('Helvetica').fontSize(10).fillColor('black');
// // // // //             doc.text(no, startX, textY, { width: colNoW, align: 'center' });
// // // // //             doc.text(code, startX + colNoW + 5, textY, { width: colCodeW - 10 });
// // // // //             doc.font('Helvetica').text(titleIndo, startX + colNoW + colCodeW + 5, textY, textOptions);
            
// // // // //             // Garis Grid
// // // // //             doc.moveTo(startX, currentY).lineTo(startX, currentY + rowHeight).stroke();
// // // // //             doc.moveTo(startX + colNoW, currentY).lineTo(startX + colNoW, currentY + rowHeight).stroke();
// // // // //             doc.moveTo(startX + colNoW + colCodeW, currentY).lineTo(startX + colNoW + colCodeW, currentY + rowHeight).stroke();
// // // // //             doc.moveTo(startX + tableW, currentY).lineTo(startX + tableW, currentY + rowHeight).stroke();

// // // // //             currentY += rowHeight;
// // // // //             doc.moveTo(startX, currentY).lineTo(startX + tableW, currentY).stroke();
// // // // //         });

// // // // //         // TTD Belakang
// // // // //         let footerY = Math.max(currentY + 30, pageHeight - 200);
// // // // //         if (footerY > pageHeight - 100) {
// // // // //             doc.addPage();
// // // // //             footerY = 100;
// // // // //         }
// // // // //         const footerX = pageWidth - 250;

// // // // //         doc.font('Helvetica').fontSize(11).fillColor('black');
// // // // //         doc.text(`${city}, ${dateExec}`, footerX, footerY, { align: 'left', width: 200 });
        
// // // // //         // Jabatan Belakang (Biasanya Kepala Badiklat/Pusdiklat)
// // // // //         doc.text('Kepala Badiklat', footerX, footerY + 15, { align: 'left', width: 200 }); 
// // // // //         doc.font('Helvetica-Oblique').fontSize(9).text('Head of Education and Training Center', footerX, footerY + 27, { align: 'left', width: 200 });
// // // // //         doc.font('Helvetica-Bold').fontSize(11).text('Palang Merah Indonesia', footerX, footerY + 40, { align: 'left', width: 200 });

// // // // //         doc.moveDown(4);
// // // // //         // Nama Penanda Tangan Belakang (Untuk sekarang kita samakan dengan depan atau bisa hardcode nama lain)
// // // // //         doc.text(config.signatoryName || "Kadek Sumardika, S.Sos.", footerX, footerY + 100, { align: 'left', width: 200 });

// // // // //         const noteY = pageHeight - 50;
// // // // //         doc.font('Helvetica-Oblique').fontSize(10);
// // // // //         doc.text('Catatan : Standar Minimum Kelulusan (SMK) : 70', 50, noteY);
// // // // //     }

// // // // //     doc.end();
// // // // // };

// // // // // // =========================================================================
// // // // // // 1. ENDPOINT PREVIEW (DRAFT)
// // // // // // =========================================================================
// // // // // router.post('/preview', requireAuth, async (req: AuthedRequest, res: express.Response) => {
// // // // //     try {
// // // // //         const { certificateConfig = {}, competencies = [], includeCompetenciesInCertificate = false } = req.body;
        
// // // // //         generatePDF(res, {
// // // // //             isPreview: true,
// // // // //             config: certificateConfig,
// // // // //             competencies: competencies,
// // // // //             showCompetencies: includeCompetenciesInCertificate,
// // // // //             participantName: 'NAMA PESERTA', 
// // // // //             courseTitle: 'JUDUL PELATIHAN',  
// // // // //             certNumber: certificateConfig.certificateNumber ? certificateConfig.certificateNumber.replace('{NO}', certificateConfig.startNumber || '001') : '[NOMOR]'
// // // // //         });

// // // // //     } catch (error: any) {
// // // // //         if(!res.headersSent) res.status(500).send("Gagal membuat Preview: " + error.message);
// // // // //     }
// // // // // });

// // // // // // =========================================================================
// // // // // // 2. ENDPOINT DOWNLOAD FINAL
// // // // // // =========================================================================
// // // // // router.get('/download/:id', async (req: express.Request, res: express.Response) => {
// // // // //     try {
// // // // //         const cert = await Certificate.findById(req.params.id)
// // // // //             .populate('user')   
// // // // //             .populate('course'); 

// // // // //         if (!cert) return res.status(404).send('Sertifikat tidak ditemukan');

// // // // //         const course = cert.course as any;
// // // // //         const user = cert.user as any;
// // // // //         const config = course.certificateConfig || {};
        
// // // // //         // Nomor Otomatis
// // // // //         let finalCertNumber = cert.certificateNumber;
// // // // //         if (config.certificateNumber && config.certificateNumber.includes('{NO}')) {
// // // // //             const startNo = config.startNumber || 1; 
// // // // //             finalCertNumber = config.certificateNumber.replace('{NO}', String(startNo));
// // // // //         }

// // // // //         // Generate PDF dengan Data Asli
// // // // //         generatePDF(res, {
// // // // //             isPreview: false,
// // // // //             config: config,
// // // // //             competencies: course.competencies || [],
// // // // //             showCompetencies: course.includeCompetenciesInCertificate,
// // // // //             participantName: user.name, 
// // // // //             courseTitle: course.title,  
// // // // //             certNumber: finalCertNumber,
// // // // //             filename: `Sertifikat-${user.name.replace(/\s+/g, '-')}.pdf`
// // // // //         });

// // // // //     } catch (e: any) {
// // // // //         if(!res.headersSent) res.status(500).send("Gagal download: " + e.message);
// // // // //     }
// // // // // });

// // // // // // --- ENDPOINT LAINNYA ---
// // // // // router.post('/claim', requireAuth, async (req: AuthedRequest, res: express.Response) => {
// // // // //     try {
// // // // //         const { courseId } = req.body;
// // // // //         const userId = req.user!.id;
// // // // //         const existing = await Certificate.findOne({ user: userId, course: courseId });
// // // // //         if(existing) return res.json({ status: existing.status, certificate: existing });

// // // // //         const newCert = await Certificate.create({
// // // // //             user: userId,
// // // // //             course: courseId,
// // // // //             status: 'issued', 
// // // // //             certificateNumber: `CERT-${Date.now()}`,
// // // // //             approvals: []
// // // // //         });
// // // // //         res.json({ status: 'issued', certificate: newCert });
// // // // //     } catch(e:any) { res.status(500).json({error: e.message}); }
// // // // // });

// // // // // router.patch('/approve', async (req, res) => { res.json({ msg: "Approve OK" }) });
// // // // // router.get('/status/:courseId', async (req, res) => { res.json({ msg: "Status OK" }) });

// // // // // export default router;
// // // // import express from 'express';
// // // // import PDFDocument from 'pdfkit';
// // // // import { Certificate } from '../models/Certificate';
// // // // import { Course } from '../models/Course';
// // // // import { requireAuth, requireFacilitator, AuthedRequest } from '../middleware/auth';
// // // // import path from 'path';
// // // // import fs from 'fs';

// // // // // --- HELPER LOGO & ASSETS ---
// // // // const drawVectorLogo = (doc: PDFKit.PDFDocument, x: number, y: number, size: number) => {
// // // //     doc.save();
// // // //     const barWidth = size / 3;
// // // //     const barLength = size;
// // // //     const offset = (size - barWidth) / 2;
// // // //     doc.fillColor('#CE2029'); // Merah PMI
// // // //     doc.rect(x + offset, y, barWidth, barLength).fill();
// // // //     doc.rect(x, y + offset, barLength, barWidth).fill();
// // // //     doc.restore();
// // // // };

// // // // const drawImageLogo = (doc: PDFKit.PDFDocument, x: number, y: number, width: number) => {
// // // //     const possiblePaths = [
// // // //         path.join(process.cwd(), '../frontend/public/pmi-logo.png'),
// // // //         path.join(process.cwd(), 'public/pmi-logo.png'),
// // // //         path.join(process.cwd(), 'uploads/pmi-logo.png')
// // // //     ];

// // // //     let imageLoaded = false;
// // // //     for (const p of possiblePaths) {
// // // //         if (fs.existsSync(p)) {
// // // //             try {
// // // //                 doc.image(p, x, y, { width: width });
// // // //                 imageLoaded = true;
// // // //                 break;
// // // //             } catch (e) { console.error("Error loading image:", e); }
// // // //         }
// // // //     }
// // // //     if (!imageLoaded) drawVectorLogo(doc, x + 5, y, width - 10);
// // // // };

// // // // const router = express.Router();

// // // // // =========================================================================
// // // // // FUNGSI GENERATOR PDF (SHARED LOGIC)
// // // // // =========================================================================
// // // // const generatePDF = (res: express.Response, data: any) => {
// // // //     const { isPreview, config, competencies, showCompetencies, participantName, courseTitle, certNumber, filename } = data;

// // // //     const doc = new PDFDocument({ layout: 'portrait', size: 'A4', margin: 0 });
    
// // // //     res.setHeader('Content-Type', 'application/pdf');
// // // //     res.setHeader('Content-Disposition', `inline; filename=${filename || 'preview.pdf'}`);
    
// // // //     doc.pipe(res);

// // // //     const pageWidth = doc.page.width;
// // // //     const pageHeight = doc.page.height;
// // // //     const centerX = pageWidth / 2;

// // // //     // --- HALAMAN 1: DEPAN ---

// // // //     // 1. HEADER DEGRADASI
// // // //     const headerH = 70;
// // // //     doc.rect(0, 0, pageWidth * 0.25, headerH).fill('#D9001B'); // Merah
// // // //     doc.rect(pageWidth * 0.25, 0, pageWidth * 0.25, headerH).fill('#E45525'); // Oranye Tua
// // // //     doc.rect(pageWidth * 0.5, 0, pageWidth * 0.25, headerH).fill('#F28E63'); // Oranye Muda
// // // //     doc.rect(pageWidth * 0.75, 0, pageWidth * 0.25, headerH).fill('#FADAC6'); // Krem
    
// // // //     // 2. LOGO
// // // //     const logoY = headerH + 25; 
// // // //     const logoWidth = 80;
// // // //     const logoX = centerX - (logoWidth / 2);
// // // //     drawImageLogo(doc, logoX, logoY, logoWidth);

// // // //     // Teks Logo
// // // //     doc.moveDown(8); 
// // // //     doc.fillColor('#000000');
    
// // // //     // 3. JUDUL UTAMA "SERTIFIKAT"
// // // //     doc.moveDown(3); 
// // // //     doc.font('Helvetica-Bold').fontSize(36).text('SERTIFIKAT', 0, doc.y, { align: 'center', width: pageWidth });
// // // //     doc.moveDown(0.2);
// // // //     doc.font('Helvetica-Oblique').fontSize(12).text('Certificate', { align: 'center' });

// // // //     // [PERUBAHAN POSISI] 4. JUDUL PELATIHAN (DIPINDAH KE ATAS NOMOR)
// // // //     doc.moveDown(1);
    
// // // //     // Logic: Jika ada input manual di config ("Override"), pakai itu.
// // // //     // Jika tidak, pakai judul asli kursus.
// // // //     // Jika masih kosong (preview awal), pakai placeholder.
// // // //     const titleIndo = config.courseNameIndo || courseTitle || 'JUDUL PELATIHAN';
// // // //     const titleEng = config.courseNameEng || 'Training Course'; // Default Inggris

// // // //     doc.font('Helvetica-Bold').fontSize(22).text(titleIndo, { align: 'center' });
// // // //     doc.font('Helvetica-Oblique').fontSize(12).text(titleEng, { align: 'center' });

// // // //     // 5. NOMOR SERTIFIKAT (DI BAWAH JUDUL KURSUS)
// // // //     doc.moveDown(0.5);
// // // //     const displayNum = certNumber.toLowerCase().startsWith('no') ? certNumber : `No : ${certNumber}`;
// // // //     doc.font('Helvetica').fontSize(12).text(displayNum, { align: 'center' });

// // // //     // 6. PENERIMA
// // // //     doc.moveDown(2); // Jarak agak jauh
// // // //     doc.font('Helvetica').fontSize(12).text('Diberikan kepada :', { align: 'center' });
// // // //     doc.font('Helvetica-Oblique').fontSize(10).text('Awarded to', { align: 'center' });

// // // //     // 7. NAMA PESERTA
// // // //     doc.moveDown(0.5);
// // // //     const pName = (participantName && participantName !== '[NAMA PESERTA PREVIEW]') ? participantName : 'NAMA PESERTA';
// // // //     doc.font('Helvetica-Bold').fontSize(26).text(pName, { align: 'center' });

// // // //     // 8. PERAN
// // // //     doc.moveDown(1);
// // // //     doc.font('Helvetica').fontSize(12).text('Sebagai', { align: 'center' });
// // // //     doc.font('Helvetica-Bold').fontSize(18).text('PESERTA', { align: 'center' });

// // // //     // (Judul Pelatihan yang lama dihapus dari sini karena sudah pindah ke atas)

// // // //     // 9. TANGGAL & LOKASI
// // // //     doc.moveDown(2);
// // // //     const city = config.city || 'Jakarta';
// // // //     let dateExec = '...';
// // // //     if (config.executionDate) {
// // // //         try {
// // // //             const d = new Date(config.executionDate);
// // // //             const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
// // // //             dateExec = `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
// // // //         } catch(e) {}
// // // //     }
// // // //     doc.font('Helvetica').fontSize(12).text(`Dilaksanakan di ${city}, ${dateExec}`, { align: 'center' });

// // // //     // 10. TANDA TANGAN (POSISI TENGAH BAWAH)
// // // //     const signY = pageHeight - 190;
    
// // // //     doc.fontSize(11).font('Helvetica');
// // // //     // Kota, Tanggal
// // // //     doc.text(`${city}, ${dateExec}`, 0, signY - 20, { align: 'center', width: pageWidth });

// // // //     // Pelaksana (Dari Input Form "Pelaksana / Struktur")
// // // //     const execIndo = config.executorIndo || 'Pengurus Pusat';
// // // //     const execEng = config.executorEng || 'Central Board Member';
    
// // // //     doc.font('Helvetica-Bold').text(execIndo, { align: 'center' }); 
// // // //     doc.font('Helvetica-Oblique').fontSize(9).text(execEng, { align: 'center' });
    
// // // //     doc.moveDown(0.2);
// // // //     doc.font('Helvetica-Bold').fontSize(11).text('PALANG MERAH INDONESIA', { align: 'center' });
// // // //     doc.font('Helvetica-Oblique').fontSize(9).text('Indonesian Red Cross', { align: 'center' });

// // // //     doc.moveDown(0.5);
// // // //     // Jabatan (Dari Input Form "Jabatan")
// // // //     const jobIndo = config.signatoryPosition || 'Ketua';
// // // //     const jobEng = config.signatoryPositionEng || 'Chairman';

// // // //     doc.font('Helvetica-Bold').fontSize(11).text(jobIndo, { align: 'center' });
// // // //     doc.font('Helvetica-Oblique').fontSize(9).text(jobEng, { align: 'center' });

// // // //     doc.moveDown(3);
// // // //     // Nama Penanda Tangan (Dari Input Form "Nama Lengkap")
// // // //     doc.font('Helvetica-Bold').fontSize(12).text(config.signatoryName || 'Admin', { align: 'center', underline: true });


// // // //     // --- HALAMAN 2: KOMPETENSI ---
// // // //     if (showCompetencies && competencies && competencies.length > 0) {
// // // //         doc.addPage({ layout: 'portrait', size: 'A4', margin: 50 });

// // // //         // Header Belakang
// // // //         doc.fontSize(11).font('Helvetica-Bold');
// // // //         doc.text('Markas Pusat', 50, 50);
// // // //         doc.text('Palang Merah Indonesia', 50, 65);

// // // //         // Judul Tabel
// // // //         doc.font('Helvetica-Bold').fontSize(14).text('Daftar Unit Kompetensi', 0, 100, { align: 'center', width: pageWidth });
// // // //         doc.font('Helvetica-Oblique').fontSize(12).text('List of Unit(s) of Competency', { align: 'center', width: pageWidth });
        
// // // //         doc.y = 140; 
// // // //         const startX = 60; 
// // // //         let currentY = 150;
// // // //         const colNoW = 30;
// // // //         const colCodeW = 120;
// // // //         const colTitleW = 330;
// // // //         const tableW = colNoW + colCodeW + colTitleW;

// // // //         // Header Table
// // // //         doc.lineWidth(1);
// // // //         doc.moveTo(startX, currentY).lineTo(startX + tableW, currentY).stroke();
// // // //         doc.fillColor('black').font('Helvetica-Bold').fontSize(10);
        
// // // //         doc.text('No.', startX, currentY + 5, { width: colNoW, align: 'center' });
// // // //         doc.text('No Kode', startX + colNoW, currentY + 5, { width: colCodeW, align: 'center' });
// // // //         doc.text('Judul Unit', startX + colNoW + colCodeW, currentY + 5, { width: colTitleW, align: 'center' });

// // // //         doc.font('Helvetica-Oblique').fontSize(9);
// // // //         doc.text('Unit Code', startX + colNoW, currentY + 18, { width: colCodeW, align: 'center' });
// // // //         doc.text('Unit Title', startX + colNoW + colCodeW, currentY + 18, { width: colTitleW, align: 'center' });

// // // //         currentY += 35;
// // // //         doc.moveTo(startX, currentY).lineTo(startX + tableW, currentY).stroke();

// // // //         // Garis Vertikal Header
// // // //         const headerTop = 150;
// // // //         doc.moveTo(startX, headerTop).lineTo(startX, currentY).stroke();
// // // //         doc.moveTo(startX + colNoW, headerTop).lineTo(startX + colNoW, currentY).stroke();
// // // //         doc.moveTo(startX + colNoW + colCodeW, headerTop).lineTo(startX + colNoW + colCodeW, currentY).stroke();
// // // //         doc.moveTo(startX + tableW, headerTop).lineTo(startX + tableW, currentY).stroke();

// // // //         // Body Table
// // // //         doc.font('Helvetica').fontSize(10);
        
// // // //         competencies.forEach((comp: any, idx: number) => {
// // // //             const no = `${idx + 1}`;
// // // //             const code = comp.code || comp.unitCode || '-';
// // // //             const titleIndo = comp.title || comp.unitTitle || '-';
            
// // // //             const textOptions = { width: colTitleW - 10, align: 'left' as const };
// // // //             const heightIndo = doc.heightOfString(titleIndo, textOptions);
// // // //             const rowHeight = Math.max(25, heightIndo + 10);

// // // //             if (currentY + rowHeight > pageHeight - 150) {
// // // //                 doc.moveTo(startX, currentY).lineTo(startX + tableW, currentY).stroke();
// // // //                 doc.addPage({ layout: 'portrait', size: 'A4', margin: 50 });
// // // //                 currentY = 50; 
// // // //                 doc.moveTo(startX, currentY).lineTo(startX + tableW, currentY).stroke();
// // // //             }

// // // //             const textY = currentY + 5;
// // // //             doc.font('Helvetica').fontSize(10).fillColor('black');
// // // //             doc.text(no, startX, textY, { width: colNoW, align: 'center' });
// // // //             doc.text(code, startX + colNoW + 5, textY, { width: colCodeW - 10 });
// // // //             doc.font('Helvetica').text(titleIndo, startX + colNoW + colCodeW + 5, textY, textOptions);
            
// // // //             // Garis Grid
// // // //             doc.moveTo(startX, currentY).lineTo(startX, currentY + rowHeight).stroke();
// // // //             doc.moveTo(startX + colNoW, currentY).lineTo(startX + colNoW, currentY + rowHeight).stroke();
// // // //             doc.moveTo(startX + colNoW + colCodeW, currentY).lineTo(startX + colNoW + colCodeW, currentY + rowHeight).stroke();
// // // //             doc.moveTo(startX + tableW, currentY).lineTo(startX + tableW, currentY + rowHeight).stroke();

// // // //             currentY += rowHeight;
// // // //             doc.moveTo(startX, currentY).lineTo(startX + tableW, currentY).stroke();
// // // //         });

// // // //         // TTD Belakang
// // // //         let footerY = Math.max(currentY + 30, pageHeight - 200);
// // // //         if (footerY > pageHeight - 100) {
// // // //             doc.addPage();
// // // //             footerY = 100;
// // // //         }
// // // //         const footerX = pageWidth - 250;

// // // //         doc.font('Helvetica').fontSize(11).fillColor('black');
// // // //         doc.text(`${city}, ${dateExec}`, footerX, footerY, { align: 'left', width: 200 });
        
// // // //         // Menggunakan data dari Config juga untuk belakang
// // // //         doc.text(config.signatoryPosition || 'Kepala Pusdiklat', footerX, footerY + 15, { align: 'left', width: 200 }); 
// // // //         doc.font('Helvetica-Oblique').fontSize(9).text(config.signatoryPositionEng || 'Head of Center', footerX, footerY + 27, { align: 'left', width: 200 });
// // // //         doc.font('Helvetica-Bold').fontSize(11).text('Palang Merah Indonesia', footerX, footerY + 40, { align: 'left', width: 200 });

// // // //         doc.moveDown(4);
// // // //         doc.text(config.signatoryName || "Admin", footerX, footerY + 100, { align: 'left', width: 200 });

// // // //         const noteY = pageHeight - 50;
// // // //         doc.font('Helvetica-Oblique').fontSize(10);
// // // //         doc.text('Catatan : Standar Minimum Kelulusan (SMK) : 70', 50, noteY);
// // // //     }

// // // //     doc.end();
// // // // };

// // // // // =========================================================================
// // // // // 1. ENDPOINT PREVIEW (DRAFT)
// // // // // =========================================================================
// // // // router.post('/preview', requireAuth, async (req: AuthedRequest, res: express.Response) => {
// // // //     try {
// // // //         const { certificateConfig = {}, competencies = [], includeCompetenciesInCertificate = false } = req.body;
        
// // // //         // [FIX SINKRONISASI] 
// // // //         // Logic: Gunakan certificateConfig.courseNameIndo jika ada (dari input form), 
// // // //         // jika kosong gunakan placeholder 'JUDUL PELATIHAN' agar user tahu harus diisi.
// // // //         const previewTitle = certificateConfig.courseNameIndo || 'JUDUL PELATIHAN';

// // // //         generatePDF(res, {
// // // //             isPreview: true,
// // // //             config: certificateConfig,
// // // //             competencies: competencies,
// // // //             showCompetencies: includeCompetenciesInCertificate,
// // // //             participantName: 'NAMA PESERTA', 
// // // //             courseTitle: previewTitle,  // <-- Menggunakan input form
// // // //             certNumber: certificateConfig.certificateNumber ? certificateConfig.certificateNumber.replace('{NO}', certificateConfig.startNumber || '001') : '[NOMOR]'
// // // //         });

// // // //     } catch (error: any) {
// // // //         if(!res.headersSent) res.status(500).send("Gagal membuat Preview: " + error.message);
// // // //     }
// // // // });

// // // // // =========================================================================
// // // // // 2. ENDPOINT DOWNLOAD FINAL
// // // // // =========================================================================
// // // // router.get('/download/:id', async (req: express.Request, res: express.Response) => {
// // // //     try {
// // // //         const cert = await Certificate.findById(req.params.id)
// // // //             .populate('user')   
// // // //             .populate('course'); 

// // // //         if (!cert) return res.status(404).send('Sertifikat tidak ditemukan');

// // // //         const course = cert.course as any;
// // // //         const user = cert.user as any;
// // // //         const config = course.certificateConfig || {};
        
// // // //         // Nomor Otomatis
// // // //         let finalCertNumber = cert.certificateNumber;
// // // //         if (config.certificateNumber && config.certificateNumber.includes('{NO}')) {
// // // //             const startNo = config.startNumber || 1; 
// // // //             finalCertNumber = config.certificateNumber.replace('{NO}', String(startNo));
// // // //         }

// // // //         // [FIX DOWNLOAD] Prioritaskan Judul Override dari Config jika ada, kalau tidak ada pakai Judul Course Asli
// // // //         const downloadTitle = config.courseNameIndo || course.title;

// // // //         generatePDF(res, {
// // // //             isPreview: false,
// // // //             config: config,
// // // //             competencies: course.competencies || [],
// // // //             showCompetencies: course.includeCompetenciesInCertificate,
// // // //             participantName: user.name, 
// // // //             courseTitle: downloadTitle, 
// // // //             certNumber: finalCertNumber,
// // // //             filename: `Sertifikat-${user.name.replace(/\s+/g, '-')}.pdf`
// // // //         });

// // // //     } catch (e: any) {
// // // //         if(!res.headersSent) res.status(500).send("Gagal download: " + e.message);
// // // //     }
// // // // });

// // // // // --- ENDPOINT LAINNYA ---
// // // // router.post('/claim', requireAuth, async (req: AuthedRequest, res: express.Response) => {
// // // //     try {
// // // //         const { courseId } = req.body;
// // // //         const userId = req.user!.id;
// // // //         const existing = await Certificate.findOne({ user: userId, course: courseId });
// // // //         if(existing) return res.json({ status: existing.status, certificate: existing });

// // // //         const newCert = await Certificate.create({
// // // //             user: userId,
// // // //             course: courseId,
// // // //             status: 'issued', 
// // // //             certificateNumber: `CERT-${Date.now()}`,
// // // //             approvals: []
// // // //         });
// // // //         res.json({ status: 'issued', certificate: newCert });
// // // //     } catch(e:any) { res.status(500).json({error: e.message}); }
// // // // });

// // // // router.patch('/approve', async (req, res) => { res.json({ msg: "Approve OK" }) });
// // // // router.get('/status/:courseId', async (req, res) => { res.json({ msg: "Status OK" }) });

// // // // export default router;
// // // import express from 'express';
// // // import PDFDocument from 'pdfkit';
// // // import { Certificate } from '../models/Certificate';
// // // import { Course } from '../models/Course';
// // // import { requireAuth, requireFacilitator, AuthedRequest } from '../middleware/auth';
// // // import path from 'path';
// // // import fs from 'fs';

// // // // --- HELPER LOGO & ASSETS ---
// // // const drawVectorLogo = (doc: PDFKit.PDFDocument, x: number, y: number, size: number) => {
// // //     doc.save();
// // //     const barWidth = size / 3;
// // //     const barLength = size;
// // //     const offset = (size - barWidth) / 2;
// // //     doc.fillColor('#CE2029'); // Merah PMI
// // //     doc.rect(x + offset, y, barWidth, barLength).fill();
// // //     doc.rect(x, y + offset, barLength, barWidth).fill();
// // //     doc.restore();
// // // };

// // // const drawImageLogo = (doc: PDFKit.PDFDocument, x: number, y: number, width: number) => {
// // //     const possiblePaths = [
// // //         path.join(process.cwd(), '../frontend/public/pmi-logo.png'),
// // //         path.join(process.cwd(), 'public/pmi-logo.png'),
// // //         path.join(process.cwd(), 'uploads/pmi-logo.png')
// // //     ];

// // //     let imageLoaded = false;
// // //     for (const p of possiblePaths) {
// // //         if (fs.existsSync(p)) {
// // //             try {
// // //                 doc.image(p, x, y, { width: width });
// // //                 imageLoaded = true;
// // //                 break;
// // //             } catch (e) { console.error("Error loading image:", e); }
// // //         }
// // //     }
// // //     if (!imageLoaded) drawVectorLogo(doc, x + 5, y, width - 10);
// // // };

// // // const router = express.Router();

// // // // =========================================================================
// // // // FUNGSI GENERATOR PDF (SHARED LOGIC)
// // // // =========================================================================
// // // const generatePDF = (res: express.Response, data: any) => {
// // //     const { isPreview, config, competencies, showCompetencies, participantName, courseTitle, certNumber, filename } = data;

// // //     const doc = new PDFDocument({ layout: 'portrait', size: 'A4', margin: 0 });
    
// // //     res.setHeader('Content-Type', 'application/pdf');
// // //     res.setHeader('Content-Disposition', `inline; filename=${filename || 'preview.pdf'}`);
    
// // //     doc.pipe(res);

// // //     const pageWidth = doc.page.width;
// // //     const pageHeight = doc.page.height;
// // //     const centerX = pageWidth / 2;

// // //     // --- HALAMAN 1: DEPAN ---

// // //     // 1. HEADER DEGRADASI
// // //     const headerH = 70;
// // //     doc.rect(0, 0, pageWidth * 0.25, headerH).fill('#D9001B'); // Merah
// // //     doc.rect(pageWidth * 0.25, 0, pageWidth * 0.25, headerH).fill('#E45525'); // Oranye Tua
// // //     doc.rect(pageWidth * 0.5, 0, pageWidth * 0.25, headerH).fill('#F28E63'); // Oranye Muda
// // //     doc.rect(pageWidth * 0.75, 0, pageWidth * 0.25, headerH).fill('#FADAC6'); // Krem
    
// // //     // 2. LOGO
// // //     const logoY = headerH + 25; 
// // //     const logoWidth = 80;
// // //     const logoX = centerX - (logoWidth / 2);
// // //     drawImageLogo(doc, logoX, logoY, logoWidth);

// // //     // Teks Logo (Palang Merah Indonesia)
// // //     doc.moveDown(8); 
// // //     doc.fillColor('#000000');
    
// // //     // 3. SERTIFIKAT (JUDUL BESAR)
// // //     doc.moveDown(3); 
// // //     doc.font('Helvetica-Bold').fontSize(36).text('SERTIFIKAT', 0, doc.y, { align: 'center', width: pageWidth });
// // //     doc.moveDown(0.2);
// // //     doc.font('Helvetica-Oblique').fontSize(12).text('Certificate', { align: 'center' });

// // //     // [MODIFIKASI] 4. JUDUL PELATIHAN (SEKARANG DI ATAS NOMOR)
// // //     doc.moveDown(1); // Jarak dari tulisan Certificate
    
// // //     // Ambil Judul Indo & Inggris
// // //     const titleIndo = config.courseNameIndo || courseTitle || 'PELATIHAN DASAR';
// // //     const titleEng = config.courseNameEng || 'Training Course';

// // //     doc.font('Helvetica-Bold').fontSize(22).text(titleIndo, { align: 'center' });
// // //     doc.font('Helvetica-Oblique').fontSize(12).text(titleEng, { align: 'center' });

// // //     // 5. NOMOR SERTIFIKAT
// // //     doc.moveDown(0.5);
// // //     const displayNum = certNumber.toLowerCase().startsWith('no') ? certNumber : `No : ${certNumber}`;
// // //     doc.font('Helvetica').fontSize(12).text(displayNum, { align: 'center' });

// // //     // 6. DIBERIKAN KEPADA
// // //     doc.moveDown(1.5);
// // //     doc.font('Helvetica').fontSize(12).text('Diberikan kepada :', { align: 'center' });
// // //     doc.font('Helvetica-Oblique').fontSize(10).text('Awarded to', { align: 'center' });

// // //     // 7. NAMA PESERTA
// // //     doc.moveDown(0.5);
// // //     const pName = (participantName && participantName !== '[NAMA PESERTA PREVIEW]') ? participantName : 'NAMA PESERTA';
// // //     doc.font('Helvetica-Bold').fontSize(26).text(pName, { align: 'center' });

// // //     // 8. PERAN (SEBAGAI PESERTA)
// // //     doc.moveDown(1);
// // //     doc.font('Helvetica').fontSize(12).text('Sebagai', { align: 'center' });
// // //     doc.font('Helvetica-Bold').fontSize(18).text('PESERTA', { align: 'center' });

// // //     // (JUDUL PELATIHAN DI BAWAH SUDAH DIHAPUS, PINDAH KE ATAS)

// // //     // 9. TANGGAL & LOKASI
// // //     doc.moveDown(2); // Tambah jarak karena judul pindah
// // //     const city = config.city || 'Jakarta';
// // //     let dateExec = '...';
// // //     if (config.executionDate) {
// // //         try {
// // //             const d = new Date(config.executionDate);
// // //             const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
// // //             dateExec = `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
// // //         } catch(e) {}
// // //     }
// // //     doc.font('Helvetica').fontSize(12).text(`Dilaksanakan di ${city}, ${dateExec}`, { align: 'center' });

// // //     // 10. TANDA TANGAN (POSISI BAWAH)
// // //     const signY = pageHeight - 190;
    
// // //     doc.fontSize(11).font('Helvetica');
// // //     // Kota, Tanggal
// // //     doc.text(`${city}, ${dateExec}`, 0, signY - 20, { align: 'center', width: pageWidth });

// // //     // [MODIFIKASI] Pejabat Penanda Tangan (Executor) -> "Pengurus Pusat"
// // //     const execIndo = config.executorIndo || 'Pengurus Pusat';
// // //     const execEng = config.executorEng || 'Central Board Member';
    
// // //     doc.font('Helvetica-Bold').text(execIndo, { align: 'center' }); 
// // //     doc.font('Helvetica-Oblique').fontSize(9).text(execEng, { align: 'center' });
    
// // //     doc.moveDown(0.2);
// // //     doc.font('Helvetica-Bold').fontSize(11).text('PALANG MERAH INDONESIA', { align: 'center' });
// // //     doc.font('Helvetica-Oblique').fontSize(9).text('Indonesian Red Cross', { align: 'center' });

// // //     doc.moveDown(0.5);
// // //     // [MODIFIKASI] Jabatan Penanda Tangan (Position) -> "Kepala Badiklat"
// // //     const jobIndo = config.signatoryPosition || 'Kepala Badiklat';
// // //     const jobEng = config.signatoryPositionEng || 'Head of Training';

// // //     doc.font('Helvetica-Bold').fontSize(11).text(jobIndo, { align: 'center' });
// // //     doc.font('Helvetica-Oblique').fontSize(9).text(jobEng, { align: 'center' });

// // //     // [MODIFIKASI] Tanda Tangan Digital (Simulasi)
// // //     if (config.useSignatureImage) {
// // //         // Cek jika ada file signature (simulasi logic path)
// // //         const sigPath = path.join(process.cwd(), 'uploads/signature.png'); 
// // //         if (fs.existsSync(sigPath)) {
// // //              doc.image(sigPath, centerX - 50, doc.y, { width: 100 });
// // //              doc.moveDown(3);
// // //         } else {
// // //              // Space kosong jika file belum ada
// // //              doc.moveDown(3);
// // //         }
// // //     } else {
// // //         doc.moveDown(3);
// // //     }

// // //     // Nama Penanda Tangan
// // //     doc.font('Helvetica-Bold').fontSize(12).text(config.signatoryName || 'Admin', { align: 'center', underline: true });


// // //     // --- HALAMAN 2: KOMPETENSI (TIDAK BERUBAH) ---
// // //     if (showCompetencies && competencies && competencies.length > 0) {
// // //         doc.addPage({ layout: 'portrait', size: 'A4', margin: 50 });

// // //         doc.fontSize(11).font('Helvetica-Bold');
// // //         doc.text('Markas Pusat', 50, 50);
// // //         doc.text('Palang Merah Indonesia', 50, 65);

// // //         doc.font('Helvetica-Bold').fontSize(14).text('Daftar Unit Kompetensi', 0, 100, { align: 'center', width: pageWidth });
// // //         doc.font('Helvetica-Oblique').fontSize(12).text('List of Unit(s) of Competency', { align: 'center', width: pageWidth });
        
// // //         doc.y = 140; 
// // //         const startX = 60; 
// // //         let currentY = 150;
// // //         const colNoW = 30;
// // //         const colCodeW = 120;
// // //         const colTitleW = 330;
// // //         const tableW = colNoW + colCodeW + colTitleW;

// // //         doc.lineWidth(1);
// // //         doc.moveTo(startX, currentY).lineTo(startX + tableW, currentY).stroke();
// // //         doc.fillColor('black').font('Helvetica-Bold').fontSize(10);
        
// // //         doc.text('No.', startX, currentY + 5, { width: colNoW, align: 'center' });
// // //         doc.text('No Kode', startX + colNoW, currentY + 5, { width: colCodeW, align: 'center' });
// // //         doc.text('Judul Unit', startX + colNoW + colCodeW, currentY + 5, { width: colTitleW, align: 'center' });

// // //         doc.font('Helvetica-Oblique').fontSize(9);
// // //         doc.text('Unit Code', startX + colNoW, currentY + 18, { width: colCodeW, align: 'center' });
// // //         doc.text('Unit Title', startX + colNoW + colCodeW, currentY + 18, { width: colTitleW, align: 'center' });

// // //         currentY += 35;
// // //         doc.moveTo(startX, currentY).lineTo(startX + tableW, currentY).stroke();

// // //         const headerTop = 150;
// // //         doc.moveTo(startX, headerTop).lineTo(startX, currentY).stroke();
// // //         doc.moveTo(startX + colNoW, headerTop).lineTo(startX + colNoW, currentY).stroke();
// // //         doc.moveTo(startX + colNoW + colCodeW, headerTop).lineTo(startX + colNoW + colCodeW, currentY).stroke();
// // //         doc.moveTo(startX + tableW, headerTop).lineTo(startX + tableW, currentY).stroke();

// // //         doc.font('Helvetica').fontSize(10);
        
// // //         competencies.forEach((comp: any, idx: number) => {
// // //             const no = `${idx + 1}`;
// // //             const code = comp.code || comp.unitCode || '-';
// // //             const titleIndo = comp.title || comp.unitTitle || '-';
            
// // //             const textOptions = { width: colTitleW - 10, align: 'left' as const };
// // //             const heightIndo = doc.heightOfString(titleIndo, textOptions);
// // //             const rowHeight = Math.max(25, heightIndo + 10);

// // //             if (currentY + rowHeight > pageHeight - 150) {
// // //                 doc.moveTo(startX, currentY).lineTo(startX + tableW, currentY).stroke();
// // //                 doc.addPage({ layout: 'portrait', size: 'A4', margin: 50 });
// // //                 currentY = 50; 
// // //                 doc.moveTo(startX, currentY).lineTo(startX + tableW, currentY).stroke();
// // //             }

// // //             const textY = currentY + 5;
// // //             doc.font('Helvetica').fontSize(10).fillColor('black');
// // //             doc.text(no, startX, textY, { width: colNoW, align: 'center' });
// // //             doc.text(code, startX + colNoW + 5, textY, { width: colCodeW - 10 });
// // //             doc.font('Helvetica').text(titleIndo, startX + colNoW + colCodeW + 5, textY, textOptions);
            
// // //             doc.moveTo(startX, currentY).lineTo(startX, currentY + rowHeight).stroke();
// // //             doc.moveTo(startX + colNoW, currentY).lineTo(startX + colNoW, currentY + rowHeight).stroke();
// // //             doc.moveTo(startX + colNoW + colCodeW, currentY).lineTo(startX + colNoW + colCodeW, currentY + rowHeight).stroke();
// // //             doc.moveTo(startX + tableW, currentY).lineTo(startX + tableW, currentY + rowHeight).stroke();

// // //             currentY += rowHeight;
// // //             doc.moveTo(startX, currentY).lineTo(startX + tableW, currentY).stroke();
// // //         });

// // //         // TTD Belakang
// // //         let footerY = Math.max(currentY + 30, pageHeight - 200);
// // //         if (footerY > pageHeight - 100) {
// // //             doc.addPage();
// // //             footerY = 100;
// // //         }
// // //         const footerX = pageWidth - 250;

// // //         doc.font('Helvetica').fontSize(11).fillColor('black');
// // //         doc.text(`${city}, ${dateExec}`, footerX, footerY, { align: 'left', width: 200 });
        
// // //         doc.text(jobIndo, footerX, footerY + 15, { align: 'left', width: 200 }); 
// // //         doc.font('Helvetica-Oblique').fontSize(9).text(jobEng, footerX, footerY + 27, { align: 'left', width: 200 });
// // //         doc.font('Helvetica-Bold').fontSize(11).text('Palang Merah Indonesia', footerX, footerY + 40, { align: 'left', width: 200 });

// // //         doc.moveDown(4);
// // //         doc.text(config.signatoryName || "Admin", footerX, footerY + 100, { align: 'left', width: 200 });

// // //         const noteY = pageHeight - 50;
// // //         doc.font('Helvetica-Oblique').fontSize(10);
// // //         doc.text('Catatan : Standar Minimum Kelulusan (SMK) : 70', 50, noteY);
// // //     }

// // //     doc.end();
// // // };

// // // // =========================================================================
// // // // 1. ENDPOINT PREVIEW (DRAFT)
// // // // =========================================================================
// // // router.post('/preview', requireAuth, async (req: AuthedRequest, res: express.Response) => {
// // //     try {
// // //         const { certificateConfig = {}, competencies = [], includeCompetenciesInCertificate = false } = req.body;
        
// // //         generatePDF(res, {
// // //             isPreview: true,
// // //             config: certificateConfig,
// // //             competencies: competencies,
// // //             showCompetencies: includeCompetenciesInCertificate,
// // //             participantName: 'NAMA PESERTA', 
// // //             courseTitle: 'JUDUL PELATIHAN',  
// // //             certNumber: certificateConfig.certificateNumber ? certificateConfig.certificateNumber.replace('{NO}', certificateConfig.startNumber || '001') : '[NOMOR]'
// // //         });

// // //     } catch (error: any) {
// // //         if(!res.headersSent) res.status(500).send("Gagal membuat Preview: " + error.message);
// // //     }
// // // });

// // // // =========================================================================
// // // // 2. ENDPOINT DOWNLOAD FINAL
// // // // =========================================================================
// // // router.get('/download/:id', async (req: express.Request, res: express.Response) => {
// // //     try {
// // //         const cert = await Certificate.findById(req.params.id)
// // //             .populate('user')   
// // //             .populate('course'); 

// // //         if (!cert) return res.status(404).send('Sertifikat tidak ditemukan');

// // //         const course = cert.course as any;
// // //         const user = cert.user as any;
// // //         const config = course.certificateConfig || {};
        
// // //         // Nomor Otomatis
// // //         let finalCertNumber = cert.certificateNumber;
// // //         if (config.certificateNumber && config.certificateNumber.includes('{NO}')) {
// // //             const startNo = config.startNumber || 1; 
// // //             finalCertNumber = config.certificateNumber.replace('{NO}', String(startNo));
// // //         }

// // //         generatePDF(res, {
// // //             isPreview: false,
// // //             config: config,
// // //             competencies: course.competencies || [],
// // //             showCompetencies: course.includeCompetenciesInCertificate,
// // //             participantName: user.name, 
// // //             courseTitle: course.title,  
// // //             certNumber: finalCertNumber,
// // //             filename: `Sertifikat-${user.name.replace(/\s+/g, '-')}.pdf`
// // //         });

// // //     } catch (e: any) {
// // //         if(!res.headersSent) res.status(500).send("Gagal download: " + e.message);
// // //     }
// // // });

// // // // --- ENDPOINT LAINNYA ---
// // // router.post('/claim', requireAuth, async (req: AuthedRequest, res: express.Response) => {
// // //     try {
// // //         const { courseId } = req.body;
// // //         const userId = req.user!.id;
// // //         const existing = await Certificate.findOne({ user: userId, course: courseId });
// // //         if(existing) return res.json({ status: existing.status, certificate: existing });

// // //         const newCert = await Certificate.create({
// // //             user: userId,
// // //             course: courseId,
// // //             status: 'issued', 
// // //             certificateNumber: `CERT-${Date.now()}`,
// // //             approvals: []
// // //         });
// // //         res.json({ status: 'issued', certificate: newCert });
// // //     } catch(e:any) { res.status(500).json({error: e.message}); }
// // // });

// // // router.patch('/approve', async (req, res) => { res.json({ msg: "Approve OK" }) });
// // // router.get('/status/:courseId', async (req, res) => { res.json({ msg: "Status OK" }) });

// // // export default router;
// // import express from 'express';
// // import PDFDocument from 'pdfkit';
// // import { Certificate } from '../models/Certificate';
// // import { Course } from '../models/Course';
// // import { requireAuth, requireFacilitator, AuthedRequest } from '../middleware/auth';
// // import path from 'path';
// // import fs from 'fs';
// // import axios from 'axios'; // Pastikan install axios: npm install axios

// // // --- HELPER LOGO & ASSETS ---
// // const drawVectorLogo = (doc: PDFKit.PDFDocument, x: number, y: number, size: number) => {
// //     doc.save();
// //     const barWidth = size / 3;
// //     const barLength = size;
// //     const offset = (size - barWidth) / 2;
// //     doc.fillColor('#CE2029'); // Merah PMI
// //     doc.rect(x + offset, y, barWidth, barLength).fill();
// //     doc.rect(x, y + offset, barLength, barWidth).fill();
// //     doc.restore();
// // };

// // const drawImageLogo = (doc: PDFKit.PDFDocument, x: number, y: number, width: number) => {
// //     // Path logo default PMI
// //     const possiblePaths = [
// //         path.join(process.cwd(), '../frontend/public/pmi-logo.png'),
// //         path.join(process.cwd(), 'public/pmi-logo.png'),
// //         path.join(process.cwd(), 'uploads/pmi-logo.png')
// //     ];

// //     let imageLoaded = false;
// //     for (const p of possiblePaths) {
// //         if (fs.existsSync(p)) {
// //             try {
// //                 doc.image(p, x, y, { width: width });
// //                 imageLoaded = true;
// //                 break;
// //             } catch (e) { console.error("Error loading image:", e); }
// //         }
// //     }
// //     if (!imageLoaded) drawVectorLogo(doc, x + 5, y, width - 10);
// // };

// // // Helper: Download gambar dari URL (untuk Tanda Tangan)
// // const fetchImage = async (src: string) => {
// //     try {
// //         // Jika src adalah path lokal (misal /uploads/...)
// //         if (!src.startsWith('http')) {
// //              const localPath = path.join(process.cwd(), src); // Coba cari di root
// //              if (fs.existsSync(localPath)) return localPath;
// //              // Coba di folder public
// //              const publicPath = path.join(process.cwd(), 'public', src);
// //              if (fs.existsSync(publicPath)) return publicPath;
// //              return null;
// //         }
        
// //         // Jika URL http
// //         const response = await axios.get(src, { responseType: 'arraybuffer' });
// //         return response.data;
// //     } catch (error) {
// //         console.error("Gagal fetch gambar signature:", error);
// //         return null;
// //     }
// // };

// // const router = express.Router();

// // // =========================================================================
// // // FUNGSI GENERATOR PDF (ASYNC AGAR BISA FETCH GAMBAR TTD)
// // // =========================================================================
// // const generatePDF = async (res: express.Response, data: any) => {
// //     const { isPreview, config, competencies, showCompetencies, participantName, courseTitle, certNumber, filename } = data;

// //     const doc = new PDFDocument({ layout: 'portrait', size: 'A4', margin: 0 });
    
// //     res.setHeader('Content-Type', 'application/pdf');
// //     res.setHeader('Content-Disposition', `inline; filename=${filename || 'preview.pdf'}`);
    
// //     doc.pipe(res);

// //     const pageWidth = doc.page.width;
// //     const pageHeight = doc.page.height;
// //     const centerX = pageWidth / 2;

// //     // --- HALAMAN 1: DEPAN ---

// //     // 1. HEADER DEGRADASI
// //     const headerH = 70;
// //     doc.rect(0, 0, pageWidth * 0.25, headerH).fill('#D9001B'); // Merah
// //     doc.rect(pageWidth * 0.25, 0, pageWidth * 0.25, headerH).fill('#E45525'); // Oranye Tua
// //     doc.rect(pageWidth * 0.5, 0, pageWidth * 0.25, headerH).fill('#F28E63'); // Oranye Muda
// //     doc.rect(pageWidth * 0.75, 0, pageWidth * 0.25, headerH).fill('#FADAC6'); // Krem
    
// //     // 2. LOGO
// //     const logoY = headerH + 25; 
// //     const logoWidth = 80;
// //     const logoX = centerX - (logoWidth / 2);
// //     drawImageLogo(doc, logoX, logoY, logoWidth);

// //     // Teks Logo
// //     doc.moveDown(8); 
// //     doc.fillColor('#000000');
    
// //     // 3. SERTIFIKAT (JUDUL BESAR)
// //     doc.moveDown(3); 
// //     doc.font('Helvetica-Bold').fontSize(36).text('SERTIFIKAT', 0, doc.y, { align: 'center', width: pageWidth });
// //     doc.moveDown(0.2);
// //     doc.font('Helvetica-Oblique').fontSize(12).text('Certificate', { align: 'center' });

// //     // 4. JUDUL PELATIHAN (DI ATAS NOMOR)
// //     doc.moveDown(1); 
// //     const titleIndo = config.courseNameIndo || courseTitle || 'PELATIHAN DASAR';
// //     const titleEng = config.courseNameEng || 'Training Course';

// //     doc.font('Helvetica-Bold').fontSize(22).text(titleIndo, { align: 'center' });
// //     doc.font('Helvetica-Oblique').fontSize(12).text(titleEng, { align: 'center' });

// //     // 5. NOMOR SERTIFIKAT
// //     doc.moveDown(0.5);
// //     const displayNum = certNumber.toLowerCase().startsWith('no') ? certNumber : `No : ${certNumber}`;
// //     doc.font('Helvetica').fontSize(12).text(displayNum, { align: 'center' });

// //     // 6. DIBERIKAN KEPADA
// //     doc.moveDown(1.5);
// //     doc.font('Helvetica').fontSize(12).text('Diberikan kepada :', { align: 'center' });
// //     doc.font('Helvetica-Oblique').fontSize(10).text('Awarded to', { align: 'center' });

// //     // 7. NAMA PESERTA
// //     doc.moveDown(0.5);
// //     const pName = (participantName && participantName !== '[NAMA PESERTA PREVIEW]') ? participantName : 'NAMA PESERTA';
// //     doc.font('Helvetica-Bold').fontSize(26).text(pName, { align: 'center' });

// //     // 8. PERAN
// //     doc.moveDown(1);
// //     doc.font('Helvetica').fontSize(12).text('Sebagai', { align: 'center' });
// //     doc.font('Helvetica-Bold').fontSize(18).text('PESERTA', { align: 'center' });

// //     // 9. TANGGAL & LOKASI
// //     doc.moveDown(2);
// //     const city = config.city || 'Jakarta';
// //     let dateExec = '...';
// //     if (config.executionDate) {
// //         try {
// //             const d = new Date(config.executionDate);
// //             const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
// //             dateExec = `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
// //         } catch(e) {}
// //     }
// //     doc.font('Helvetica').fontSize(12).text(`Dilaksanakan di ${city}, ${dateExec}`, { align: 'center' });

// //     // 10. TANDA TANGAN (POSISI BAWAH)
// //     const signY = pageHeight - 190;
    
// //     doc.fontSize(11).font('Helvetica');
// //     doc.text(`${city}, ${dateExec}`, 0, signY - 20, { align: 'center', width: pageWidth });

// //     // Pejabat
// //     const execIndo = config.executorIndo || 'Pengurus Pusat';
// //     const execEng = config.executorEng || 'Central Board Member';
    
// //     doc.font('Helvetica-Bold').text(execIndo, { align: 'center' }); 
// //     doc.font('Helvetica-Oblique').fontSize(9).text(execEng, { align: 'center' });
    
// //     doc.moveDown(0.2);
// //     doc.font('Helvetica-Bold').fontSize(11).text('PALANG MERAH INDONESIA', { align: 'center' });
// //     doc.font('Helvetica-Oblique').fontSize(9).text('Indonesian Red Cross', { align: 'center' });

// //     doc.moveDown(0.5);
// //     // Jabatan
// //     const jobIndo = config.signatoryPosition || 'Kepala Badiklat';
// //     const jobEng = config.signatoryPositionEng || 'Head of Training';

// //     doc.font('Helvetica-Bold').fontSize(11).text(jobIndo, { align: 'center' });
// //     doc.font('Helvetica-Oblique').fontSize(9).text(jobEng, { align: 'center' });

// //     // LOGIKA GAMBAR TANDA TANGAN
// //     if (config.useSignatureImage && config.signatureImageUrl) {
// //         const imgData = await fetchImage(config.signatureImageUrl);
// //         if (imgData) {
// //              // Gambar TTD di tengah (Width 100px)
// //              const ttdWidth = 100;
// //              const ttdX = centerX - (ttdWidth / 2);
// //              doc.image(imgData, ttdX, doc.y, { width: ttdWidth });
// //              doc.moveDown(3);
// //         } else {
// //              // Fallback jika gambar gagal load
// //              doc.moveDown(3);
// //         }
// //     } else {
// //         // Space kosong manual jika tidak pakai gambar
// //         doc.moveDown(3);
// //     }

// //     // Nama Penanda Tangan
// //     doc.font('Helvetica-Bold').fontSize(12).text(config.signatoryName || 'Admin', { align: 'center', underline: true });


// //     // --- HALAMAN 2: KOMPETENSI ---
// //     if (showCompetencies && competencies && competencies.length > 0) {
// //         doc.addPage({ layout: 'portrait', size: 'A4', margin: 50 });

// //         doc.fontSize(11).font('Helvetica-Bold');
// //         doc.text('Markas Pusat', 50, 50);
// //         doc.text('Palang Merah Indonesia', 50, 65);

// //         doc.font('Helvetica-Bold').fontSize(14).text('Daftar Unit Kompetensi', 0, 100, { align: 'center', width: pageWidth });
// //         doc.font('Helvetica-Oblique').fontSize(12).text('List of Unit(s) of Competency', { align: 'center', width: pageWidth });
        
// //         doc.y = 140; 
// //         const startX = 60; 
// //         let currentY = 150;
// //         const colNoW = 30;
// //         const colCodeW = 120;
// //         const colTitleW = 330;
// //         const tableW = colNoW + colCodeW + colTitleW;

// //         doc.lineWidth(1);
// //         doc.moveTo(startX, currentY).lineTo(startX + tableW, currentY).stroke();
// //         doc.fillColor('black').font('Helvetica-Bold').fontSize(10);
        
// //         doc.text('No.', startX, currentY + 5, { width: colNoW, align: 'center' });
// //         doc.text('No Kode', startX + colNoW, currentY + 5, { width: colCodeW, align: 'center' });
// //         doc.text('Judul Unit', startX + colNoW + colCodeW, currentY + 5, { width: colTitleW, align: 'center' });

// //         doc.font('Helvetica-Oblique').fontSize(9);
// //         doc.text('Unit Code', startX + colNoW, currentY + 18, { width: colCodeW, align: 'center' });
// //         doc.text('Unit Title', startX + colNoW + colCodeW, currentY + 18, { width: colTitleW, align: 'center' });

// //         currentY += 35;
// //         doc.moveTo(startX, currentY).lineTo(startX + tableW, currentY).stroke();

// //         const headerTop = 150;
// //         doc.moveTo(startX, headerTop).lineTo(startX, currentY).stroke();
// //         doc.moveTo(startX + colNoW, headerTop).lineTo(startX + colNoW, currentY).stroke();
// //         doc.moveTo(startX + colNoW + colCodeW, headerTop).lineTo(startX + colNoW + colCodeW, currentY).stroke();
// //         doc.moveTo(startX + tableW, headerTop).lineTo(startX + tableW, currentY).stroke();

// //         doc.font('Helvetica').fontSize(10);
        
// //         competencies.forEach((comp: any, idx: number) => {
// //             const no = `${idx + 1}`;
// //             const code = comp.code || comp.unitCode || '-';
// //             const titleIndo = comp.title || comp.unitTitle || '-';
            
// //             const textOptions = { width: colTitleW - 10, align: 'left' as const };
// //             const heightIndo = doc.heightOfString(titleIndo, textOptions);
// //             const rowHeight = Math.max(25, heightIndo + 10);

// //             if (currentY + rowHeight > pageHeight - 150) {
// //                 doc.moveTo(startX, currentY).lineTo(startX + tableW, currentY).stroke();
// //                 doc.addPage({ layout: 'portrait', size: 'A4', margin: 50 });
// //                 currentY = 50; 
// //                 doc.moveTo(startX, currentY).lineTo(startX + tableW, currentY).stroke();
// //             }

// //             const textY = currentY + 5;
// //             doc.font('Helvetica').fontSize(10).fillColor('black');
// //             doc.text(no, startX, textY, { width: colNoW, align: 'center' });
// //             doc.text(code, startX + colNoW + 5, textY, { width: colCodeW - 10 });
// //             doc.font('Helvetica').text(titleIndo, startX + colNoW + colCodeW + 5, textY, textOptions);
            
// //             doc.moveTo(startX, currentY).lineTo(startX, currentY + rowHeight).stroke();
// //             doc.moveTo(startX + colNoW, currentY).lineTo(startX + colNoW, currentY + rowHeight).stroke();
// //             doc.moveTo(startX + colNoW + colCodeW, currentY).lineTo(startX + colNoW + colCodeW, currentY + rowHeight).stroke();
// //             doc.moveTo(startX + tableW, currentY).lineTo(startX + tableW, currentY + rowHeight).stroke();

// //             currentY += rowHeight;
// //             doc.moveTo(startX, currentY).lineTo(startX + tableW, currentY).stroke();
// //         });

// //         // TTD Belakang
// //         let footerY = Math.max(currentY + 30, pageHeight - 200);
// //         if (footerY > pageHeight - 100) {
// //             doc.addPage();
// //             footerY = 100;
// //         }
// //         const footerX = pageWidth - 250;

// //         doc.font('Helvetica').fontSize(11).fillColor('black');
// //         doc.text(`${city}, ${dateExec}`, footerX, footerY, { align: 'left', width: 200 });
        
// //         doc.text(jobIndo, footerX, footerY + 15, { align: 'left', width: 200 }); 
// //         doc.font('Helvetica-Oblique').fontSize(9).text(jobEng, footerX, footerY + 27, { align: 'left', width: 200 });
// //         doc.font('Helvetica-Bold').fontSize(11).text('Palang Merah Indonesia', footerX, footerY + 40, { align: 'left', width: 200 });

// //         doc.moveDown(4);
// //         doc.text(config.signatoryName || "Admin", footerX, footerY + 100, { align: 'left', width: 200 });

// //         const noteY = pageHeight - 50;
// //         doc.font('Helvetica-Oblique').fontSize(10);
// //         doc.text('Catatan : Standar Minimum Kelulusan (SMK) : 70', 50, noteY);
// //     }

// //     doc.end();
// // };

// // // =========================================================================
// // // 1. ENDPOINT PREVIEW (DRAFT)
// // // =========================================================================
// // router.post('/preview', requireAuth, async (req: AuthedRequest, res: express.Response) => {
// //     try {
// //         const { certificateConfig = {}, competencies = [], includeCompetenciesInCertificate = false } = req.body;
        
// //         await generatePDF(res, {
// //             isPreview: true,
// //             config: certificateConfig,
// //             competencies: competencies,
// //             showCompetencies: includeCompetenciesInCertificate,
// //             participantName: 'NAMA PESERTA', 
// //             courseTitle: 'JUDUL PELATIHAN',  
// //             certNumber: certificateConfig.certificateNumber ? certificateConfig.certificateNumber.replace('{NO}', certificateConfig.startNumber || '001') : '[NOMOR]'
// //         });

// //     } catch (error: any) {
// //         if(!res.headersSent) res.status(500).send("Gagal membuat Preview: " + error.message);
// //     }
// // });

// // // =========================================================================
// // // 2. ENDPOINT DOWNLOAD FINAL
// // // =========================================================================
// // router.get('/download/:id', async (req: express.Request, res: express.Response) => {
// //     try {
// //         const cert = await Certificate.findById(req.params.id)
// //             .populate('user')   
// //             .populate('course'); 

// //         if (!cert) return res.status(404).send('Sertifikat tidak ditemukan');

// //         const course = cert.course as any;
// //         const user = cert.user as any;
// //         const config = course.certificateConfig || {};
        
// //         let finalCertNumber = cert.certificateNumber;
// //         if (config.certificateNumber && config.certificateNumber.includes('{NO}')) {
// //             const startNo = config.startNumber || 1; 
// //             finalCertNumber = config.certificateNumber.replace('{NO}', String(startNo));
// //         }

// //         await generatePDF(res, {
// //             isPreview: false,
// //             config: config,
// //             competencies: course.competencies || [],
// //             showCompetencies: course.includeCompetenciesInCertificate,
// //             participantName: user.name, 
// //             courseTitle: course.title,  
// //             certNumber: finalCertNumber,
// //             filename: `Sertifikat-${user.name.replace(/\s+/g, '-')}.pdf`
// //         });

// //     } catch (e: any) {
// //         if(!res.headersSent) res.status(500).send("Gagal download: " + e.message);
// //     }
// // });

// // // --- ENDPOINT LAINNYA ---
// // router.post('/claim', requireAuth, async (req: AuthedRequest, res: express.Response) => {
// //     try {
// //         const { courseId } = req.body;
// //         const userId = req.user!.id;
// //         const existing = await Certificate.findOne({ user: userId, course: courseId });
// //         if(existing) return res.json({ status: existing.status, certificate: existing });

// //         const newCert = await Certificate.create({
// //             user: userId,
// //             course: courseId,
// //             status: 'issued', 
// //             certificateNumber: `CERT-${Date.now()}`,
// //             approvals: []
// //         });
// //         res.json({ status: 'issued', certificate: newCert });
// //     } catch(e:any) { res.status(500).json({error: e.message}); }
// // });

// // router.patch('/approve', async (req, res) => { res.json({ msg: "Approve OK" }) });
// // router.get('/status/:courseId', async (req, res) => { res.json({ msg: "Status OK" }) });

// // export default router;
// import express from 'express';
// import PDFDocument from 'pdfkit';
// import { Certificate } from '../models/Certificate';
// import { Course } from '../models/Course';
// import { requireAuth, requireFacilitator, AuthedRequest } from '../middleware/auth';
// import path from 'path';
// import fs from 'fs';
// import axios from 'axios';

// const router = express.Router();

// // --- HELPER ASSETS ---
// const drawVectorLogo = (doc: PDFKit.PDFDocument, x: number, y: number, size: number) => {
//     doc.save();
//     const barWidth = size / 3;
//     const barLength = size;
//     const offset = (size - barWidth) / 2;
//     doc.fillColor('#CE2029'); // Merah PMI
//     doc.rect(x + offset, y, barWidth, barLength).fill();
//     doc.rect(x, y + offset, barLength, barWidth).fill();
//     doc.restore();
// };

// const drawImageLogo = (doc: PDFKit.PDFDocument, x: number, y: number, width: number) => {
//     const possiblePaths = [
//         path.join(process.cwd(), '../frontend/public/pmi-logo.png'),
//         path.join(process.cwd(), 'public/pmi-logo.png'),
//         path.join(process.cwd(), 'uploads/pmi-logo.png')
//     ];
//     let imageLoaded = false;
//     for (const p of possiblePaths) {
//         if (fs.existsSync(p)) {
//             try { doc.image(p, x, y, { width: width }); imageLoaded = true; break; } 
//             catch (e) { console.error("Error logo:", e); }
//         }
//     }
//     if (!imageLoaded) drawVectorLogo(doc, x + 5, y, width - 10);
// };

// const fetchImage = async (src: string) => {
//     try {
//         if (!src.startsWith('http')) {
//              const cleanPath = src.startsWith('/') ? src.substring(1) : src;
//              const publicPath = path.join(process.cwd(), 'public', cleanPath);
//              if (fs.existsSync(publicPath)) return publicPath;
             
//              const rootPath = path.join(process.cwd(), cleanPath);
//              if (fs.existsSync(rootPath)) return rootPath;
//              return null;
//         }
//         const response = await axios.get(src, { responseType: 'arraybuffer' });
//         return response.data;
//     } catch (error) { return null; }
// };

// // =========================================================================
// // GENERATOR PDF UTAMA
// // =========================================================================
// const generatePDF = async (res: express.Response, data: any) => {
//     const { config, competencies, showCompetencies, participantName, courseTitle, certNumber, filename } = data;

//     const doc = new PDFDocument({ layout: 'portrait', size: 'A4', margin: 0 });
//     res.setHeader('Content-Type', 'application/pdf');
//     res.setHeader('Content-Disposition', `inline; filename=${filename || 'preview.pdf'}`);
//     doc.pipe(res);

//     const pageWidth = doc.page.width;
//     const pageHeight = doc.page.height;
//     const centerX = pageWidth / 2;

//     // ==========================================
//     // HALAMAN 1: DEPAN
//     // ==========================================
//     const headerH = 70;
//     doc.rect(0, 0, pageWidth * 0.25, headerH).fill('#D9001B');
//     doc.rect(pageWidth * 0.25, 0, pageWidth * 0.25, headerH).fill('#E45525');
//     doc.rect(pageWidth * 0.5, 0, pageWidth * 0.25, headerH).fill('#F28E63');
//     doc.rect(pageWidth * 0.75, 0, pageWidth * 0.25, headerH).fill('#FADAC6');

//     // Logo
//     drawImageLogo(doc, centerX - 40, headerH + 25, 80);

//     doc.moveDown(9);
//     doc.fillColor('#000000');

//     // JUDUL BESAR
//     doc.moveDown(3);
//     doc.font('Helvetica-Bold').fontSize(36).text('SERTIFIKAT', 0, doc.y, { align: 'center', width: pageWidth });
//     doc.moveDown(0.2);
//     doc.font('Helvetica-Oblique').fontSize(12).text('Certificate', { align: 'center' });

//     // JUDUL PELATIHAN
//     doc.moveDown(1);
//     const titleIndo = config.courseNameIndo || courseTitle || 'PELATIHAN';
//     const titleEng = config.courseNameEng || 'Training Course';
//     doc.font('Helvetica-Bold').fontSize(22).text(titleIndo, { align: 'center' });
//     doc.font('Helvetica-Oblique').fontSize(12).text(titleEng, { align: 'center' });

//     // NOMOR SERTIFIKAT
//     doc.moveDown(0.5);
//     const finalNumDisplay = certNumber.toLowerCase().startsWith('no') ? certNumber : `No : ${certNumber}`;
//     doc.font('Helvetica').fontSize(12).text(finalNumDisplay, { align: 'center' });

//     // DIBERIKAN KEPADA
//     doc.moveDown(1.5);
//     doc.font('Helvetica').fontSize(12).text('Diberikan kepada :', { align: 'center' });
//     doc.font('Helvetica-Oblique').fontSize(10).text('Awarded to', { align: 'center' });

//     // NAMA PESERTA
//     doc.moveDown(0.5);
//     const pName = participantName === '[NAMA PESERTA PREVIEW]' ? 'NAMA PESERTA' : participantName;
//     doc.font('Helvetica-Bold').fontSize(26).text(pName, { align: 'center' });

//     // SEBAGAI
//     doc.moveDown(1);
//     doc.font('Helvetica').fontSize(12).text('Sebagai', { align: 'center' });
//     doc.font('Helvetica-Bold').fontSize(18).text('PESERTA', { align: 'center' });

//     // TANGGAL & TEMPAT
//     doc.moveDown(2);
//     const city = config.city || 'Jakarta';
//     let dateExec = '...';
//     if(config.executionDate) {
//         try {
//             const d = new Date(config.executionDate);
//             const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
//             dateExec = `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
//         } catch(e) {}
//     }
//     doc.font('Helvetica').fontSize(12).text(`Dilaksanakan di ${city}, ${dateExec}`, { align: 'center' });

//     // --- TANDA TANGAN HALAMAN DEPAN ---
//     const signY = pageHeight - 190;
//     doc.y = signY;

//     doc.fontSize(11).font('Helvetica');
//     doc.text(`${city}, ${dateExec}`, 0, doc.y, { align: 'center', width: pageWidth });
    
//     const execIndo = config.executorIndo || 'Pengurus Pusat';
//     const execEng = config.executorEng || 'Central Board Member';
//     doc.font('Helvetica-Bold').text(execIndo, { align: 'center' });
//     doc.font('Helvetica-Oblique').fontSize(9).text(execEng, { align: 'center' });

//     doc.moveDown(0.2);
//     doc.font('Helvetica-Bold').fontSize(11).text('PALANG MERAH INDONESIA', { align: 'center' });
//     doc.font('Helvetica-Oblique').fontSize(9).text('Indonesian Red Cross', { align: 'center' });

//     doc.moveDown(0.5);
//     const jobIndo = config.signatoryPosition || 'Kepala Badiklat';
//     const jobEng = config.signatoryPositionEng || 'Head of Training';
//     doc.font('Helvetica-Bold').fontSize(11).text(jobIndo, { align: 'center' });
//     doc.font('Helvetica-Oblique').fontSize(9).text(jobEng, { align: 'center' });

//     // GAMBAR TTD DEPAN
//     if (config.useSignatureImage && config.signatureImageUrl) {
//         const imgData = await fetchImage(config.signatureImageUrl);
//         if (imgData) {
//             const ttdWidth = 100;
//             doc.image(imgData, centerX - (ttdWidth/2), doc.y, { width: ttdWidth });
//             doc.moveDown(3);
//         } else {
//             doc.moveDown(3);
//         }
//     } else {
//         doc.moveDown(3);
//     }

//     doc.font('Helvetica-Bold').fontSize(12).text(config.signatoryName || 'Admin', { align: 'center', underline: true });


//     // ==========================================
//     // HALAMAN 2: LAMPIRAN KOMPETENSI
//     // ==========================================
//     if (showCompetencies && competencies && competencies.length > 0) {
//         doc.addPage({ layout: 'portrait', size: 'A4', margin: 50 });

//         // Header Kiri Atas
//         doc.fontSize(11).font('Helvetica-Bold');
//         doc.text(execIndo, 50, 50); 
//         doc.text('Palang Merah Indonesia', 50, 65);

//         // Judul Tabel
//         doc.font('Helvetica-Bold').fontSize(14).text('Daftar Unit Kompetensi', 0, 100, { align: 'center', width: pageWidth });
//         doc.font('Helvetica-Oblique').fontSize(12).text('List of Unit(s) of Competency', { align: 'center', width: pageWidth });
        
//         // --- SETUP TABEL (3 KOLOM) ---
//         doc.y = 140; 
//         const startX = 60; 
//         let currentY = 150;
        
//         // Definisi Lebar Kolom (Total ~480)
//         const colNoW = 30;
//         const colCodeW = 120; // Kolom Kode Unit
//         const colTitleW = 330;
//         const tableW = colNoW + colCodeW + colTitleW;

//         // HEADER TABEL
//         doc.lineWidth(1);
//         doc.moveTo(startX, currentY).lineTo(startX + tableW, currentY).stroke(); // Garis Atas
        
//         doc.fillColor('black').font('Helvetica-Bold').fontSize(10);
//         // Baris 1: Indo
//         doc.text('No.', startX, currentY + 5, { width: colNoW, align: 'center' });
//         doc.text('No Kode', startX + colNoW + 5, currentY + 5, { width: colCodeW, align: 'left' });
//         doc.text('Judul Unit', startX + colNoW + colCodeW + 5, currentY + 5, { width: colTitleW, align: 'left' });
        
//         // Baris 2: Inggris (Italic)
//         doc.font('Helvetica-Oblique').fontSize(9);
//         doc.text('Unit Code', startX + colNoW + 5, currentY + 18, { width: colCodeW, align: 'left' });
//         doc.text('Unit Title', startX + colNoW + colCodeW + 5, currentY + 18, { width: colTitleW, align: 'left' });

//         currentY += 35;
//         doc.moveTo(startX, currentY).lineTo(startX + tableW, currentY).stroke(); // Garis Bawah Header

//         // Garis Vertikal Header
//         const headerTop = 150;
//         doc.moveTo(startX, headerTop).lineTo(startX, currentY).stroke();
//         doc.moveTo(startX + colNoW, headerTop).lineTo(startX + colNoW, currentY).stroke();
//         doc.moveTo(startX + colNoW + colCodeW, headerTop).lineTo(startX + colNoW + colCodeW, currentY).stroke();
//         doc.moveTo(startX + tableW, headerTop).lineTo(startX + tableW, currentY).stroke();

//         // ISI TABEL
//         doc.font('Helvetica').fontSize(10);
        
//         competencies.forEach((c: any, i: number) => {
//             const no = `${i+1}.`;
//             const code = c.code || '-';
//             const title = c.title || '-';
//             const titleEng = c.titleEng || '';

//             // Hitung tinggi baris (wrap text)
//             const titleH = doc.heightOfString(title, { width: colTitleW - 10 });
//             const titleEngH = titleEng ? doc.heightOfString(titleEng, { width: colTitleW - 10 }) : 0;
//             const rowHeight = Math.max(30, titleH + titleEngH + 10);

//             // Cek Pindah Halaman
//             if (currentY + rowHeight > pageHeight - 180) { // Space untuk footer
//                 doc.moveTo(startX, currentY).lineTo(startX + tableW, currentY).stroke(); // Tutup tabel lama
//                 doc.addPage({ layout: 'portrait', size: 'A4', margin: 50 });
//                 currentY = 50; 
//                 doc.moveTo(startX, currentY).lineTo(startX + tableW, currentY).stroke(); // Buka tabel baru
//             }

//             const textY = currentY + 5;
//             doc.font('Helvetica').fontSize(10).fillColor('black');
            
//             // Kolom No
//             doc.text(no, startX, textY, { width: colNoW, align: 'center' });
//             // Kolom Kode
//             doc.text(code, startX + colNoW + 5, textY, { width: colCodeW - 10 });
            
//             // Kolom Judul (Indo)
//             doc.text(title, startX + colNoW + colCodeW + 5, textY, { width: colTitleW - 10 });
            
//             // Kolom Judul (Inggris - jika ada)
//             if (titleEng) {
//                 doc.font('Helvetica-Oblique').fontSize(9);
//                 doc.text(titleEng, startX + colNoW + colCodeW + 5, textY + titleH + 2, { width: colTitleW - 10 });
//             }

//             // Garis Vertikal Row
//             doc.moveTo(startX, currentY).lineTo(startX, currentY + rowHeight).stroke();
//             doc.moveTo(startX + colNoW, currentY).lineTo(startX + colNoW, currentY + rowHeight).stroke();
//             doc.moveTo(startX + colNoW + colCodeW, currentY).lineTo(startX + colNoW + colCodeW, currentY + rowHeight).stroke();
//             doc.moveTo(startX + tableW, currentY).lineTo(startX + tableW, currentY + rowHeight).stroke();

//             currentY += rowHeight;
//             doc.moveTo(startX, currentY).lineTo(startX + tableW, currentY).stroke(); // Garis Bawah Row
//         });


//         // --- TANDA TANGAN HALAMAN BELAKANG (PERBAIKAN) ---
//         let footerY = Math.max(currentY + 40, pageHeight - 220); // Minimal di bawah tabel atau di bawah halaman
        
//         // Jika mepet bawah, tambah halaman baru
//         if (footerY > pageHeight - 150) {
//             doc.addPage({ layout: 'portrait', size: 'A4', margin: 50 });
//             footerY = 100;
//         }

//         const footerX = pageWidth - 250; // Posisi Kanan

//         doc.font('Helvetica').fontSize(11).fillColor('black');
//         doc.text(`${city}, ${dateExec}`, footerX, footerY, { align: 'left', width: 200 });
        
//         doc.text(execIndo, footerX, footerY + 15, { align: 'left', width: 200 }); 
//         doc.font('Helvetica-Oblique').fontSize(9).text(execEng, footerX, footerY + 27, { align: 'left', width: 200 });
        
//         doc.font('Helvetica-Bold').fontSize(11).text(jobIndo, footerX, footerY + 40, { align: 'left', width: 200 });
//         doc.font('Helvetica-Oblique').fontSize(9).text(jobEng, footerX, footerY + 52, { align: 'left', width: 200 });

//         // GAMBAR TTD BELAKANG
//         if (config.useSignatureImage && config.signatureImageUrl) {
//             const imgData = await fetchImage(config.signatureImageUrl);
//             if (imgData) {
//                 doc.image(imgData, footerX, footerY + 65, { width: 100 });
//             }
//         }

//         // Text Nama
//         const textNameY = footerY + 110; 
//         doc.font('Helvetica-Bold').fontSize(12).text(config.signatoryName || "Admin", footerX, textNameY, { align: 'left', width: 200, underline: true });

//         // Catatan SMK
//         const noteY = pageHeight - 50;
//         doc.font('Helvetica-Oblique').fontSize(10);
//         doc.text('Catatan : Standar Minimum Kelulusan (SMK) : 70', 50, noteY);
//     }

//     doc.end();
// };

// // =========================================================================
// // ROUTE HANDLERS
// // =========================================================================

// // 1. PREVIEW
// router.post('/preview', requireAuth, async (req: AuthedRequest, res: express.Response) => {
//     try {
//         const body = req.body || {};
//         const config = body.certificateConfig || {};
        
//         // Logika Preview Nomor: Ganti {NO} dengan startNumber
//         let certNum = config.certificateNumber || '[NOMOR]';
//         if (certNum.includes('{NO}')) {
//             const startNo = config.startNumber || 1;
//             const fmtNo = String(startNo).padStart(2, '0');
//             certNum = certNum.replace('{NO}', fmtNo);
//         }

//         await generatePDF(res, {
//             isPreview: true,
//             config: config,
//             competencies: body.competencies || [], // Data Kompetensi dari Form Frontend
//             showCompetencies: body.includeCompetenciesInCertificate,
//             participantName: 'NAMA PESERTA', 
//             courseTitle: 'JUDUL PELATIHAN',  
//             certNumber: certNum,
//             filename: 'preview.pdf'
//         });
//     } catch (e: any) { if(!res.headersSent) res.status(500).send(e.message); }
// });

// // 2. DOWNLOAD FINAL
// router.get('/download/:id', async (req: express.Request, res: express.Response) => {
//     try {
//         const cert = await Certificate.findById(req.params.id).populate('user').populate('course');
//         if (!cert) return res.status(404).send('Not Found');

//         const course = cert.course as any;
//         const config = course.certificateConfig || {};
        
//         // Logika Final Nomor
//         let finalNum = cert.certificateNumber; 
//         if (config.certificateNumber && config.certificateNumber.includes('{NO}')) {
//             // Gunakan startNumber (Simulasi counter sederhana)
//             const noUrut = config.startNumber || 1;
//             const fmtNo = String(noUrut).padStart(2, '0');
//             finalNum = config.certificateNumber.replace('{NO}', fmtNo);
//         }

//         await generatePDF(res, {
//             isPreview: false,
//             config: config,
//             competencies: course.competencies || [], // Data Kompetensi dari DB
//             showCompetencies: course.includeCompetenciesInCertificate,
//             participantName: (cert.user as any).name,
//             courseTitle: course.title,
//             certNumber: finalNum,
//             filename: `Sertifikat.pdf`
//         });
//     } catch (e: any) { if(!res.headersSent) res.status(500).send(e.message); }
// });

// // Lainnya
// router.post('/claim', requireAuth, async (req: AuthedRequest, res: express.Response) => {
//     try {
//         const { courseId } = req.body;
//         const existing = await Certificate.findOne({ user: req.user!.id, course: courseId });
//         if(existing) return res.json({ status: existing.status });
//         const newCert = await Certificate.create({
//             user: req.user!.id, course: courseId, status: 'issued', certificateNumber: `CERT-${Date.now()}`, approvals: []
//         });
//         res.json({ status: 'issued', certificate: newCert });
//     } catch(e:any) { res.status(500).json({error: e.message}); }
// });
// router.patch('/approve', async (req, res) => { res.json({ msg: "Approve OK" }) });
// router.get('/status/:courseId', async (req, res) => { res.json({ msg: "Status OK" }) });

// export default router;
import express from 'express';
import PDFDocument from 'pdfkit';
import { Certificate } from '../models/Certificate';
import { Course } from '../models/Course';
import { User } from '../models/User';
import { requireAuth, requireFacilitator, AuthedRequest } from '../middleware/auth';
import path from 'path';
import fs from 'fs';
import axios from 'axios';

const router = express.Router();

// --- HELPER ASSETS ---
const drawVectorLogo = (doc: PDFKit.PDFDocument, x: number, y: number, size: number) => {
    doc.save();
    const barWidth = size / 3;
    const barLength = size;
    const offset = (size - barWidth) / 2;
    doc.fillColor('#CE2029'); // Merah PMI
    doc.rect(x + offset, y, barWidth, barLength).fill();
    doc.rect(x, y + offset, barLength, barWidth).fill();
    doc.restore();
};

const drawImageLogo = (doc: PDFKit.PDFDocument, x: number, y: number, width: number) => {
    const possiblePaths = [
        path.join(process.cwd(), '../frontend/public/pmi-logo.png'),
        path.join(process.cwd(), 'public/pmi-logo.png'),
        path.join(process.cwd(), 'uploads/pmi-logo.png')
    ];
    let imageLoaded = false;
    for (const p of possiblePaths) {
        if (fs.existsSync(p)) {
            try { doc.image(p, x, y, { width: width }); imageLoaded = true; break; } 
            catch (e) { console.error("Error logo:", e); }
        }
    }
    if (!imageLoaded) drawVectorLogo(doc, x + 5, y, width - 10);
};

const fetchImage = async (src: string) => {
    try {
        if (!src.startsWith('http')) {
             const cleanPath = src.startsWith('/') ? src.substring(1) : src;
             const publicPath = path.join(process.cwd(), 'public', cleanPath);
             if (fs.existsSync(publicPath)) return publicPath;
             
             const rootPath = path.join(process.cwd(), cleanPath);
             if (fs.existsSync(rootPath)) return rootPath;
             return null;
        }
        const response = await axios.get(src, { responseType: 'arraybuffer' });
        return response.data;
    } catch (error) { return null; }
};

// =========================================================================
// GENERATOR PDF UTAMA
// =========================================================================
const generatePDF = async (res: express.Response, data: any) => {
    const { config, competencies, showCompetencies, participantName, courseTitle, certNumber, filename } = data;

    const doc = new PDFDocument({ layout: 'portrait', size: 'A4', margin: 0 });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename=${filename || 'preview.pdf'}`);
    doc.pipe(res);

    const pageWidth = doc.page.width;
    const pageHeight = doc.page.height;
    const centerX = pageWidth / 2;

    // HALAMAN 1: DEPAN
    const headerH = 70;
    doc.rect(0, 0, pageWidth * 0.25, headerH).fill('#D9001B');
    doc.rect(pageWidth * 0.25, 0, pageWidth * 0.25, headerH).fill('#E45525');
    doc.rect(pageWidth * 0.5, 0, pageWidth * 0.25, headerH).fill('#F28E63');
    doc.rect(pageWidth * 0.75, 0, pageWidth * 0.25, headerH).fill('#FADAC6');

    drawImageLogo(doc, centerX - 40, headerH + 25, 80);

    doc.moveDown(9);
    doc.fillColor('#000000');

    // JUDUL
    doc.moveDown(3);
    doc.font('Helvetica-Bold').fontSize(36).text('SERTIFIKAT', 0, doc.y, { align: 'center', width: pageWidth });
    doc.moveDown(0.2);
    doc.font('Helvetica-Oblique').fontSize(12).text('Certificate', { align: 'center' });

    // COURSE TITLE
    doc.moveDown(1);
    const titleIndo = config.courseNameIndo || courseTitle || 'PELATIHAN';
    const titleEng = config.courseNameEng || 'Training Course';
    doc.font('Helvetica-Bold').fontSize(22).text(titleIndo, { align: 'center' });
    doc.font('Helvetica-Oblique').fontSize(12).text(titleEng, { align: 'center' });

    // NOMOR
    doc.moveDown(0.5);
    const displayNum = certNumber.toLowerCase().startsWith('no') ? certNumber : `No : ${certNumber}`;
    doc.font('Helvetica').fontSize(12).text(displayNum, { align: 'center' });

    // PENERIMA
    doc.moveDown(1.5);
    doc.font('Helvetica').fontSize(12).text('Diberikan kepada :', { align: 'center' });
    doc.font('Helvetica-Oblique').fontSize(10).text('Awarded to', { align: 'center' });

    doc.moveDown(0.5);
    const pName = participantName || 'NAMA PESERTA';
    doc.font('Helvetica-Bold').fontSize(26).text(pName, { align: 'center' });

    doc.moveDown(1);
    doc.font('Helvetica').fontSize(12).text('Sebagai', { align: 'center' });
    doc.font('Helvetica-Bold').fontSize(18).text('PESERTA', { align: 'center' });

    doc.moveDown(2);
    const city = config.city || 'Jakarta';
    let dateExec = '...';
    if(config.executionDate) {
        try {
            const d = new Date(config.executionDate);
            const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
            dateExec = `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
        } catch(e) {}
    }
    doc.font('Helvetica').fontSize(12).text(`Dilaksanakan di ${city}, ${dateExec}`, { align: 'center' });

    // TANDA TANGAN DEPAN
    const signY = pageHeight - 190;
    doc.y = signY;
    doc.fontSize(11).font('Helvetica');
    doc.text(`${city}, ${dateExec}`, 0, doc.y, { align: 'center', width: pageWidth });
    
    const execIndo = config.executorIndo || 'Pengurus Pusat';
    const execEng = config.executorEng || 'Central Board Member';
    doc.font('Helvetica-Bold').text(execIndo, { align: 'center' });
    doc.font('Helvetica-Oblique').fontSize(9).text(execEng, { align: 'center' });

    doc.moveDown(0.2);
    doc.font('Helvetica-Bold').fontSize(11).text('PALANG MERAH INDONESIA', { align: 'center' });
    doc.font('Helvetica-Oblique').fontSize(9).text('Indonesian Red Cross', { align: 'center' });

    doc.moveDown(0.5);
    const jobIndo = config.signatoryPosition || 'Kepala Badiklat';
    const jobEng = config.signatoryPositionEng || 'Head of Training';
    doc.font('Helvetica-Bold').fontSize(11).text(jobIndo, { align: 'center' });
    doc.font('Helvetica-Oblique').fontSize(9).text(jobEng, { align: 'center' });

    if (config.useSignatureImage && config.signatureImageUrl) {
        const imgData = await fetchImage(config.signatureImageUrl);
        if (imgData) {
            const ttdWidth = 100;
            doc.image(imgData, centerX - (ttdWidth/2), doc.y, { width: ttdWidth });
            doc.moveDown(3);
        } else {
            doc.moveDown(3);
        }
    } else {
        doc.moveDown(3);
    }

    doc.font('Helvetica-Bold').fontSize(12).text(config.signatoryName || 'Admin', { align: 'center', underline: true });

    // --- HALAMAN 2: KOMPETENSI ---
    if (showCompetencies && competencies && competencies.length > 0) {
        doc.addPage({ layout: 'portrait', size: 'A4', margin: 50 });

        doc.fontSize(11).font('Helvetica-Bold');
        doc.text(execIndo, 50, 50); 
        doc.text('Palang Merah Indonesia', 50, 65);

        doc.font('Helvetica-Bold').fontSize(14).text('Daftar Unit Kompetensi', 0, 100, { align: 'center', width: pageWidth });
        doc.font('Helvetica-Oblique').fontSize(12).text('List of Unit(s) of Competency', { align: 'center', width: pageWidth });
        
        doc.y = 140; 
        const startX = 60; 
        let currentY = 150;
        
        const colNoW = 30;
        const colCodeW = 120;
        const colTitleW = 330;
        const tableW = colNoW + colCodeW + colTitleW;

        // Header Tabel
        doc.lineWidth(1);
        doc.moveTo(startX, currentY).lineTo(startX + tableW, currentY).stroke();
        doc.fillColor('black').font('Helvetica-Bold').fontSize(10);
        
        doc.text('No.', startX, currentY + 5, { width: colNoW, align: 'center' });
        doc.text('No Kode', startX + colNoW + 5, currentY + 5, { width: colCodeW, align: 'left' });
        doc.text('Judul Unit', startX + colNoW + colCodeW + 5, currentY + 5, { width: colTitleW, align: 'left' });
        
        doc.font('Helvetica-Oblique').fontSize(9);
        doc.text('Unit Code', startX + colNoW + 5, currentY + 18, { width: colCodeW, align: 'left' });
        doc.text('Unit Title', startX + colNoW + colCodeW + 5, currentY + 18, { width: colTitleW, align: 'left' });

        currentY += 35;
        doc.moveTo(startX, currentY).lineTo(startX + tableW, currentY).stroke();

        const headerTop = 150;
        doc.moveTo(startX, headerTop).lineTo(startX, currentY).stroke();
        doc.moveTo(startX + colNoW, headerTop).lineTo(startX + colNoW, currentY).stroke();
        doc.moveTo(startX + colNoW + colCodeW, headerTop).lineTo(startX + colNoW + colCodeW, currentY).stroke();
        doc.moveTo(startX + tableW, headerTop).lineTo(startX + tableW, currentY).stroke();

        // Isi Tabel
        doc.font('Helvetica').fontSize(10);
        competencies.forEach((c: any, i: number) => {
            const no = `${i+1}.`;
            const code = c.code || '-';
            const title = c.title || '-';
            const titleEng = c.titleEng || '';

            const titleH = doc.heightOfString(title, { width: colTitleW - 10 });
            const titleEngH = titleEng ? doc.heightOfString(titleEng, { width: colTitleW - 10 }) : 0;
            const rowHeight = Math.max(30, titleH + titleEngH + 10);

            if (currentY + rowHeight > pageHeight - 180) {
                doc.moveTo(startX, currentY).lineTo(startX + tableW, currentY).stroke();
                doc.addPage({ layout: 'portrait', size: 'A4', margin: 50 });
                currentY = 50; 
                doc.moveTo(startX, currentY).lineTo(startX + tableW, currentY).stroke();
            }

            const textY = currentY + 5;
            doc.font('Helvetica').fontSize(10).fillColor('black');
            
            doc.text(no, startX, textY, { width: colNoW, align: 'center' });
            doc.text(code, startX + colNoW + 5, textY, { width: colCodeW - 10 });
            doc.text(title, startX + colNoW + colCodeW + 5, textY, { width: colTitleW - 10 });
            
            if (titleEng) {
                doc.font('Helvetica-Oblique').fontSize(9);
                doc.text(titleEng, startX + colNoW + colCodeW + 5, textY + titleH + 2, { width: colTitleW - 10 });
            }

            doc.moveTo(startX, currentY).lineTo(startX, currentY + rowHeight).stroke();
            doc.moveTo(startX + colNoW, currentY).lineTo(startX + colNoW, currentY + rowHeight).stroke();
            doc.moveTo(startX + colNoW + colCodeW, currentY).lineTo(startX + colNoW + colCodeW, currentY + rowHeight).stroke();
            doc.moveTo(startX + tableW, currentY).lineTo(startX + tableW, currentY + rowHeight).stroke();

            currentY += rowHeight;
            doc.moveTo(startX, currentY).lineTo(startX + tableW, currentY).stroke();
        });

        // --- TANDA TANGAN BELAKANG ---
        let footerY = Math.max(currentY + 40, pageHeight - 220);
        if (footerY > pageHeight - 150) {
            doc.addPage({ layout: 'portrait', size: 'A4', margin: 50 });
            footerY = 100;
        }

        const footerX = pageWidth - 250;

        doc.font('Helvetica').fontSize(11).fillColor('black');
        doc.text(`${city}, ${dateExec}`, footerX, footerY, { align: 'left', width: 200 });
        
        doc.text(execIndo, footerX, footerY + 15, { align: 'left', width: 200 }); 
        doc.font('Helvetica-Oblique').fontSize(9).text(execEng, footerX, footerY + 27, { align: 'left', width: 200 });
        
        doc.font('Helvetica-Bold').fontSize(11).text(jobIndo, footerX, footerY + 40, { align: 'left', width: 200 });
        doc.font('Helvetica-Oblique').fontSize(9).text(jobEng, footerX, footerY + 52, { align: 'left', width: 200 });

        if (config.useSignatureImage && config.signatureImageUrl) {
            const imgData = await fetchImage(config.signatureImageUrl);
            if (imgData) {
                doc.image(imgData, footerX, footerY + 65, { width: 100 });
            }
        }

        const textNameY = footerY + 110; 
        doc.font('Helvetica-Bold').fontSize(12).text(config.signatoryName || "Admin", footerX, textNameY, { align: 'left', width: 200, underline: true });

        const noteY = pageHeight - 50;
        doc.font('Helvetica-Oblique').fontSize(10);
        doc.text('Catatan : Standar Minimum Kelulusan (SMK) : 70', 50, noteY);
    }

    doc.end();
};

// =========================================================================
// ROUTE HANDLERS
// =========================================================================

// 1. PREVIEW
router.post('/preview', requireAuth, async (req: AuthedRequest, res: express.Response) => {
    try {
        const body = req.body || {};
        const config = body.certificateConfig || {};
        
        let certNum = config.certificateNumber || '[NOMOR]';
        if (certNum.includes('{NO}')) {
            const startNo = config.startNumber || 1;
            const fmtNo = String(startNo).padStart(2, '0');
            certNum = certNum.replace('{NO}', fmtNo);
        }

        await generatePDF(res, {
            isPreview: true,
            config: config,
            competencies: body.competencies || [],
            showCompetencies: body.includeCompetenciesInCertificate,
            participantName: 'NAMA PESERTA', 
            courseTitle: 'JUDUL PELATIHAN',  
            certNumber: certNum,
            filename: 'preview.pdf'
        });
    } catch (e: any) { if(!res.headersSent) res.status(500).send(e.message); }
});

// 2. DOWNLOAD BY ADMIN (DASHBOARD)
router.get('/download-admin/:courseId/:userId', requireAuth, requireFacilitator, async (req: AuthedRequest, res: express.Response) => {
    try {
        const { courseId, userId } = req.params;
        let cert = await Certificate.findOne({ user: userId, course: courseId }).populate('user').populate('course');
        
        if (!cert) {
            const newCert = await Certificate.create({
                user: userId, course: courseId, status: 'issued', certificateNumber: `CERT-${Date.now()}`, approvals: []
            });
            cert = await Certificate.findById(newCert._id).populate('user').populate('course');
        }

        if (!cert) return res.status(404).json({ error: 'Gagal membuat sertifikat' });

        const course = cert.course as any;
        const config = course.certificateConfig || {};
        
        let finalNum = cert.certificateNumber; 
        if (config.certificateNumber && config.certificateNumber.includes('{NO}')) {
            const startNo = config.startNumber || 1; 
            const fmtNo = String(startNo).padStart(2, '0');
            finalNum = config.certificateNumber.replace('{NO}', fmtNo);
        }

        await generatePDF(res, {
            isPreview: false,
            config: config,
            competencies: course.competencies || [],
            showCompetencies: course.includeCompetenciesInCertificate,
            participantName: (cert.user as any).name,
            courseTitle: course.title,
            certNumber: finalNum,
            filename: `Sertifikat-${(cert.user as any).name}.pdf`
        });

    } catch (e: any) { if(!res.headersSent) res.status(500).send(e.message); }
});

// 3. DOWNLOAD STANDAR (USER)
router.get('/download/:id', async (req: express.Request, res: express.Response) => {
    try {
        const cert = await Certificate.findById(req.params.id).populate('user').populate('course');
        if (!cert) return res.status(404).send('Not Found');

        const course = cert.course as any;
        const config = course.certificateConfig || {};
        
        let finalNum = cert.certificateNumber; 
        if (config.certificateNumber && config.certificateNumber.includes('{NO}')) {
            const startNo = config.startNumber || 1; 
            const fmtNo = String(startNo).padStart(2, '0');
            finalNum = config.certificateNumber.replace('{NO}', fmtNo);
        }

        await generatePDF(res, {
            isPreview: false,
            config: config,
            competencies: course.competencies || [],
            showCompetencies: course.includeCompetenciesInCertificate,
            participantName: (cert.user as any).name,
            courseTitle: course.title,
            certNumber: finalNum,
            filename: `Sertifikat.pdf`
        });
    } catch (e: any) { if(!res.headersSent) res.status(500).send(e.message); }
});

// Lainnya
router.post('/claim', requireAuth, async (req: AuthedRequest, res: express.Response) => {
    try {
        const { courseId } = req.body;
        const existing = await Certificate.findOne({ user: req.user!.id, course: courseId });
        if(existing) return res.json({ status: existing.status });
        const newCert = await Certificate.create({
            user: req.user!.id, course: courseId, status: 'issued', certificateNumber: `CERT-${Date.now()}`, approvals: []
        });
        res.json({ status: 'issued', certificate: newCert });
    } catch(e:any) { res.status(500).json({error: e.message}); }
});
router.patch('/approve', async (req, res) => { res.json({ msg: "Approve OK" }) });
router.get('/status/:courseId', async (req, res) => { res.json({ msg: "Status OK" }) });

export default router;