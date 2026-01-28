import { Request, Response } from 'express';
import { findMemberHybrid } from '../services/memberService';

export const checkMemberStatus = async (req: Request, res: Response) => {
    try {
        const { nia } = req.body; // NIA atau KTP

        if (!nia) {
            return res.status(400).json({ error: "Nomor Anggota / KTP wajib diisi" });
        }

        const result = await findMemberHybrid(nia);

        if (!result.data) {
            return res.status(404).json({ 
                success: false, 
                source: result.source,
                message: result.message 
            });
        }

        res.json({
            success: true,
            source: result.source,
            message: result.message,
            member: result.data
        });

    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};