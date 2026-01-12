import mongoose from 'mongoose';
import { User } from '../src/models/User'; // Sesuaikan path model User
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || 'mongodb+srv://misdbpmi:misdbpmi@cluster0.l4lq1.mongodb.net/lms_db';

const createAdmin = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to DB');

    // Hapus user lama (opsional, hati-hati)
    // await User.deleteMany({ email: 'admin@example.com' });

    const existingAdmin = await User.findOne({ email: 'admin@humanis.com' });
    if (existingAdmin) {
        console.log('Admin already exists. Updating password...');
        existingAdmin.password = '123456'; // Set password baru yang pasti
        await existingAdmin.save();
        console.log('Password updated to: 123456');
    } else {
        const newAdmin = new User({
            name: 'Super Admin',
            email: 'admin@humanis.com',
            password: '123456', // Password yang pasti
            role: 'SUPER_ADMIN',
            avatarUrl: ''
        });
        await newAdmin.save();
        console.log('Admin created with password: 123456');
    }

    mongoose.disconnect();
  } catch (error) {
    console.error(error);
  }
};

createAdmin();