
import mongoose from 'mongoose';

export const connect = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb+srv://misdbpmi:misdbpmi@cluster0.l4lq1.mongodb.net/lms_db';
  await mongoose.connect(uri);
};
