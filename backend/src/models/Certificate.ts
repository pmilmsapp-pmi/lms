
// // // import mongoose, { Schema, Document } from 'mongoose';

// // // export interface ICertificate extends Document {
// // //   user: mongoose.Types.ObjectId;
// // //   course: mongoose.Types.ObjectId;
// // //   issuedAt: Date;
// // //   number: string; // unique certificate number
// // // }

// // // const CertificateSchema = new Schema<ICertificate>({
// // //   user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
// // //   course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
// // //   issuedAt: { type: Date, default: Date.now },
// // //   number: { type: String, required: true, unique: true }
// // // }, { timestamps: true });

// // // CertificateSchema.index({ user: 1, course: 1 }, { unique: true });
// // // CertificateSchema.index({ number: 1 }, { unique: true });

// // // export default mongoose.model<ICertificate>('Certificate', CertificateSchema);
// // import mongoose, { Schema, Document } from 'mongoose';

// // const CertificateSchema = new Schema({
// //   user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
// //   course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
// //   userName: String, // Nama user saat sertifikat dicetak
// //   courseName: String,
// //   certificateNumber: { type: String, unique: true },
// //   issueDate: { type: Date, default: Date.now }
// // }, { timestamps: true });

// // export const Certificate = mongoose.model('Certificate', CertificateSchema);
// import mongoose, { Schema, Document } from 'mongoose';

// export interface ICertificate extends Document {
//   userId: mongoose.Types.ObjectId;   // Pastikan ini userId
//   courseId: mongoose.Types.ObjectId; // Pastikan ini courseId
//   certificateCode: string;
//   issueDate: Date;
// }

// const CertificateSchema = new Schema({
//   userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//   courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
//   certificateCode: { type: String, required: true, unique: true },
//   issueDate: { type: Date, default: Date.now }
// }, { timestamps: true });

// export const Certificate = mongoose.model<ICertificate>('Certificate', CertificateSchema);
import mongoose, { Schema, Document } from 'mongoose';

export interface ICertificate extends Document {
  user: mongoose.Types.ObjectId;
  course: mongoose.Types.ObjectId;
  certificateNumber: string;
  issueDate: Date;
  status: 'pending' | 'issued'; // Pending = Menunggu Approval, Issued = Terbit
  
  // TRACKING APPROVAL FASILITATOR (Khusus Pelatihan)
  approvals: {
    facilitatorId: mongoose.Types.ObjectId;
    moduleId: mongoose.Types.ObjectId;
    isApproved: boolean;
    approvedAt?: Date;
  }[];
}

const certificateSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  certificateNumber: { type: String, unique: true },
  issueDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'issued'], default: 'issued' },
  
  approvals: [{
    facilitatorId: { type: Schema.Types.ObjectId, ref: 'User' },
    moduleId: { type: Schema.Types.ObjectId }, // Referensi Modul mana yang diapprove
    isApproved: { type: Boolean, default: false },
    approvedAt: Date
  }]
}, { timestamps: true });

export const Certificate = mongoose.model<ICertificate>('Certificate', certificateSchema);