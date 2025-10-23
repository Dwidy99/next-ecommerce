-- CreateEnum
CREATE TYPE "Language" AS ENUM ('ID', 'EN');

-- CreateTable
CREATE TABLE "configuration" (
    "id_konfigurasi" SERIAL NOT NULL,
    "bahasa" "Language" NOT NULL,
    "namaweb" TEXT NOT NULL,
    "nama_singkat" TEXT,
    "tagline" TEXT,
    "deskripsi" TEXT,
    "website" TEXT,
    "email" TEXT,
    "alamat" TEXT,
    "logo" TEXT,
    "icon" TEXT,
    "keywords" TEXT,
    "metatext" TEXT,
    "facebook" TEXT,
    "twitter" TEXT,
    "instagram" TEXT,
    "google_map" TEXT,
    "tanggal" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "configuration_pkey" PRIMARY KEY ("id_konfigurasi")
);
