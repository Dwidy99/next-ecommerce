"use server";

import { prisma } from "lib/prisma";

/**
 * 🧹 Hapus token verifikasi & reset yang sudah expired
 */
export async function cleanupExpiredTokens() {
    try {
        const result = await prisma.userToken.deleteMany({
            where: {
                expires: { lt: new Date() }, // semua token yang sudah lewat waktu
            },
        });

        console.log(`🧹 Cleaned up ${result.count} expired tokens.`);
        return { success: true, deleted: result.count };
    } catch (error) {
        console.error("❌ cleanupExpiredTokens error:", error);
        return { success: false, message: "Failed to clean expired tokens" };
    }
}

// ⚙️ 2. Jalankan otomatis setiap hari

// Kalau kamu di Vercel, tinggal tambahkan scheduled job:

// 📁 vercel.json

// {
//   "crons": [
//     {
//       "path": "/api/cleanup-tokens",
//       "schedule": "0 3 * * *"
//     }
//   ]
// }